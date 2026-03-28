import app from './app.js'
import { connectDB } from './bd.js'

connectDB()
app.listen(4000)
console.log('Servidor en el Puerto 4000')