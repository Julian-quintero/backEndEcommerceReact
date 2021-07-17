import express from 'express'
const router = express.Router()

import { authUser,getUserProfile, registerUser, updateUserProfile,getUsers,deleteUser } from '../controllers/userController.js'
import { protect,admin } from '../middleware/authMiddleware.js'





//asynchandler es un middleware para los errores de las rutas y evitar usar try-catch

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login',authUser)

router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile) //se corre primero este middleware
router.route('/:id').delete(protect,admin,deleteUser)



export default router