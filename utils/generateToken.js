import jwt from "jsonwebtoken";

const generateToken = (id) =>{
    //token que usa el id para crear un token
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

export default generateToken

