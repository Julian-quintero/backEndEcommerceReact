// esto es para importar datos de prueba
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import connectDB from './config/db.js'


dotenv.config()
connectDB()

const importData = async() =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id // es el primer objeto en users estatico que tenemos
        const sampleProducts = products.map(product=>{ // a cada producto le agrego un admin
            return { //retorno un objeto con todos los productos y le agrego el admin
                ...product,
                user:adminUser
            }
        })

        await Product.insertMany(sampleProducts)
        console.log('Data Imported');
        process.exit()
    } catch (error) {
        console.log('Error');
        process.exit()
        
    }
}

const destroyData = async() =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
  


        console.log('Data destroyed');
        process.exit()
    } catch (error) {
        console.log('Data destroyed');
        process.exit()
        
    }
}

if (process.argv[2] === "-d") {//Esto es para ejecutar con el comando de node
    destroyData()
    
}else {
    importData()
}