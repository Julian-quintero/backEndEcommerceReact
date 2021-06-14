import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


const router = express.Router()


//asynchandler es un middleware para los errores de las rutas y evitar usar try-catch

//@desc  Fetch all products
//@route GET /api/products
//@acess Public  

router.get('/', asyncHandler (async (req,res) => {

    const products = await Product.find({}) //devuelve todos los productos y es una promesa


    res.json(products)
}))


//@desc  Fetch single product
//@route GET /api/products/:id
//@acess Public  
router.get('/:id', asyncHandler(async(req,res) => {
    //const product= products.find (item => item._id === req.params.id)
    

    try {
        const product = await Product.findById(req.params.id)
        res.json(product)    
    } catch (error) {
        res.status(404).json({message:'Producto no encontrado'})
        
    }


}))



export default router