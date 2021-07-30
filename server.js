import express from 'express'
import dotenv from 'dotenv' //necesita .js en los archivos
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from "path";

import { errorHandler, notFound } from './middleware/errorMiddleware.js';



dotenv.config()
connectDB()
const app = express()
app.use(express.json())




//creo un middleware para errores custom


const PORT = process.env.PORT || 5000

app.listen(PORT,console.log("server running on 5000"))

app.use('/api/products',productRoutes) // lo que vaya a esta direccion que use el archivo especificado
app.use('/api/users',userRoutes) // lo que vaya a esta direccion que use el archivo especificado
app.use('/api/orders',orderRoutes) // lo que vaya a esta direccion que use el archivo especificado

app.use('/api/upload',uploadRoutes) // lo que vaya a esta direccion que use el archivo especificado

app.get('/',(req,res) => {
    res.send("api is up...")
})

app.get('/api/config/paypal',(req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})


const __dirname = path.resolve()
console.log(__dirname);

app.use('/uploads',express.static(path.join(__dirname)))
//__dirname no funciona con la sintaxis de imports, usamos resolve

//middleware de errores
app.use(notFound)
app.use(errorHandler)




