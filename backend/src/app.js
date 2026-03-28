import express from 'express'
import morgan from 'morgan'
import router from './rutas/auth.rutas.js'
import authRutas from './rutas/auth.rutas.js'
import tarRutas from './rutas/tasRutas.js'
import comprar from './rutas/compra.rutas.js'
import ordenesRouter from './rutas/ordenes.js'
import cors from 'cors'

const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(morgan('dev'))
app.use(express.json())

app.use('/api',router)
app.use('/api/productos',tarRutas)
app.use('/api',authRutas)
app.use('/api',comprar)
app.use('/ordenes', ordenesRouter);

app.get('/', (req, res) => {
    res.send('Servidor corriendo...');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app