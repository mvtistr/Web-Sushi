import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/sushidb')
        console.log('Base de datos conectada exitosamente')
    }catch(error){
        console.log(error)
    }
}