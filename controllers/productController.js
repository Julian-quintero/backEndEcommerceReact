import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc  Fetch all products
//@route GET /api/products
//@acess Public  

const getProducts = asyncHandler(async(req,res) => {
    const products = await Product.find({}) //devuelve todos los productos y es una promesa
    // res.status(401)
    // throw new Error('oee') 
     res.json(products)
})

//@desc  Fetch single product
//@route GET /api/products/:id
//@acess Public  

const getProductById = asyncHandler(async(req,res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)    
    } catch (error) {
        res.status(404).json({message:'Producto no encontrado'})
        
    }
})

export {
    getProducts,getProductById
}