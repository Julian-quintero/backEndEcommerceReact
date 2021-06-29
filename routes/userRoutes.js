import express from 'express'
const router = express.Router()

import { authUser,getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'





//asynchandler es un middleware para los errores de las rutas y evitar usar try-catch


router.post('/login',authUser)
router.route('/profile',(protect,getUserProfile)) //se corre primero este middleware



export default router