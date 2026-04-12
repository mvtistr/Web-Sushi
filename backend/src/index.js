import app from './app.js'
import { connectDB } from './bd.js'
import dotenv from 'dotenv'

dotenv.config()

connectDB()
app.listen(process.env.PORT || 7000, () => {
    console.log(`Servidor en el Puerto ${process.env.PORT || 7000}`)
})