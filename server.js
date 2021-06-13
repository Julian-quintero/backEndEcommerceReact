import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv' //necesita .js en los archivos
import connectDB from './config/db.js';

dotenv.config()
const app = express()

connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log("server running on 5000"))

app.get('/',(req,res) => {
    res.send("api is runnign...")
})


app.get('/api/products',(req,res) => {
    res.json(products)
})

app.get('/api/products/:id',(req,res) => {
    const product= products.find (item => item._id === req.params.id)
    res.json(product)
})


app.get('/',(req,res) => {
    res.send("api is runnign...")
})

