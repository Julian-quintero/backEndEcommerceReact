import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })

        
    } catch (error) {

        console.log('error',error.message);
        process.exit(1) // 1 significa salir y mensaje de error
        
    }
}

export default connectDB