import express from 'express'
const router = express.Router()

import { authUser } from '../controllers/userController.js'




//asynchandler es un middleware para los errores de las rutas y evitar usar try-catch



router.post('/login',authUser)



export default router