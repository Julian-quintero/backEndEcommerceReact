import express from 'express'
import { getProductById, getProducts } from '../controllers/productController.js'



const router = express.Router()


//asynchandler es un middleware para los errores de las rutas y evitar usar try-catch



router.get('/',getProducts)
router.get('/:id', getProductById)



export default router