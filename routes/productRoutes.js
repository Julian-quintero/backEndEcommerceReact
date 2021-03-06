import express from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct,createProductReview} from '../controllers/productController.js'
import { protect,admin } from '../middleware/authMiddleware.js'



const router = express.Router()


//asynchandler es un middleware para los errores de las rutas y evitar usar try-catch

router.route('/').get(getProducts).post(protect, admin,createProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect,createProductReview)



export default router