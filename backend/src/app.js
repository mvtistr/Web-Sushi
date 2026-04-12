import express from 'express'
import morgan from 'morgan'
import authRutas from './routes/auth.rutas.js'
import tarRutas from './routes/tasRutas.js'
import comprar from './routes/compra.rutas.js'
import ordenesRouter from './routes/ordenes.js'
import cors from 'cors'

const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(morgan('dev'))
app.use(express.json())

app.use('/api',authRutas)
app.use('/api/productos',tarRutas)
app.use('/api',comprar)
app.use('/ordenes', ordenesRouter);
app.use('/api',comprar)
app.use('/ordenes', ordenesRouter);

app.get('/', (req, res) => {
    res.send('Servidor corriendo...');
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app