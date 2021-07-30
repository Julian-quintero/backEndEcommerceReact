import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async(req,res,next) =>{

let token

if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
   
    
    try {
        token = req.headers.authorization.split(' ')[1] //con esto saco el token y quito el bearer
       
       // console.log(token);
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id).select('-password')//no me devuelvas el password
        next()
    } catch (error) {
        console.error('hay error',error)
        res.status(401)
        throw new Error('not authorized,token failed')
        
    }
    
}

if (!token) {
    res.status(401)
    throw new Error('Not authorized, not token')
    
}


})

const admin = (req,res,next) => {


    if (req.user && req.user.isAdmin) // si existe el usuario y tambien es admin

     {
       
        next()
        
    }else {
        res.status(401)
        throw new Error('not authorized as admin')
    }
}

export {protect,admin}