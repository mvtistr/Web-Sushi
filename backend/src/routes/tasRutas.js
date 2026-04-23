import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import {
    getProductos,
    getProducto,
    createProducto,
    deleteProducto,
    updateProducto

} from '../controllers/productoControl.js'

const router = Router()

// configurar uploads
const uploadsDir = path.join(process.cwd(), 'backend', 'public', 'uploads')
fs.mkdirSync(uploadsDir, { recursive: true })
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`
        cb(null, name)
    }
})
const upload = multer({ storage })

router.get('/', getProductos)
router.get('/:id', getProducto)
router.post('/', upload.single('image'), createProducto)
router.delete('/:id', deleteProducto)
router.put('/:id', upload.single('image'), updateProducto)

export default router