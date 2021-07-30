import express from 'express'
const router = express.Router()

import { addOrderItems ,getOrderById, updateOrderToPaid, getMyOrders,getOrders,updateToDelivered} from '../controllers/orderController.js'
import { protect,admin } from '../middleware/authMiddleware.js'





//asynchandler es un middleware para los errores de las rutas y evitar usar try-catch

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/deliver').put(protect,admin,updateToDelivered)
router.route('/:id/pay').put(protect,updateOrderToPaid)



export default router