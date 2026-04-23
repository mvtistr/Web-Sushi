import express from 'express'
import morgan from 'morgan'
import authRutas from './routes/auth.rutas.js'
import tarRutas from './routes/tasRutas.js'
import comprar from './routes/compra.rutas.js'
import ordenesRouter from './routes/ordenes.js'
import paymentRutas from './routes/payment.rutas.js'
import cors from 'cors'
import path from 'path'

const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(morgan('dev'))
app.use(express.json())

// Servir archivos subidos (imágenes)
const uploadsPath = path.join(process.cwd(), 'backend', 'public')
app.use('/uploads', express.static(path.join(uploadsPath, 'uploads')))

app.use('/api',authRutas)
app.use('/api/productos',tarRutas)
app.use('/api',comprar)
app.use('/ordenes', ordenesRouter);
app.use('/api',comprar)
app.use('/ordenes', ordenesRouter);
app.use('/api/payment', paymentRutas)

app.get('/', (req, res) => {
    res.send('Servidor corriendo...');
});

export default app