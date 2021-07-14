import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js"

//@desc  Auth the user and get token
//@route POST /api/users/login
//@acess Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email:email}) // encontrar un documento por email


  if (user && (await user.matchPassword(password))) {
      res.json({
          _id:user._id,
          name:user.name,
          email:user.email,
          isAdmin:user.isAdmin,
          token:generateToken(user._id)
      })
      
  }else{
      res.status(404)
      throw new Error('Usuario no valido')
  }
});

//@desc  Get the user profile
//@route GET /api/users/profile
//@acess Private

const getUserProfile = asyncHandler(async (req, res) => {  
      
    const user = await User.findById(req.user._id) // encontrar un documento por email


    if (user) {

        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin            
        })
        
    }else {
        console.log('entre');
        res.status(404)
        throw new Error('User not found')
    }


  });

    //@desc  Update a new user
//@route PUT /api/users/profile
//@acess Private

  const updateUserProfile = asyncHandler(async (req, res) => {  
      
    const user = await User.findById(req.user._id) // encontrar un documento por email


    if (user) {

        user.name = req.body.name || user.name      
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password            
        }

        const updatedUser = await user.save()

          res.json({
          _id:updatedUser._id,
          name:updatedUser.name,
          email:updatedUser.email,
          isAdmin:updatedUser.isAdmin,
          token:generateToken(updatedUser._id)
      })

      
        
    }else {
        console.log('error usuario no encontrado');
        res.status(404)
        throw new Error('User not found')
    }

  });

  //@desc  Register a new user
//@route GET /api/users/profile
//@acess Public

  
const registerUser = asyncHandler(async (req, res) => { 

    const { name, email, password } = req.body;

    const userExists = await User.findOne({email:email}) // encontrar un documento por email
  
   if (userExists) {
       res.status(400)
       throw new Error('User already exists')       
   }

   const user = await User.create({
       name,
       email,
       password
   })
   // si todo anda bien

   if (user) {
       //me autentico despues de registrarme inmediatamente
       //201 significa usuario registrado
       res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)         
    })
       
   } else{
       res.status(400)
       throw new Error('Invalid User data')

   }



  });

export {authUser,getUserProfile,registerUser,updateUserProfile}
