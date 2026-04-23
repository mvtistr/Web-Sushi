import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })
        console.log('✅ Base de datos conectada exitosamente')
    }catch(error){
        console.error('⚠️ No se pudo conectar a MongoDB:', error.message)
        console.log('Continuando sin base de datos...')
    }
}