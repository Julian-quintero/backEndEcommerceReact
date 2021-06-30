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
      res.status(401)
      throw new Error('invalid email or password')
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
        res.status(404)
        throw new Error('User not found')
    }

    res.send('sucess')
  });

export {authUser,getUserProfile}
