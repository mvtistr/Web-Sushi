import { Router } from 'express'
import {
    getProductos,
    getProducto,
    createProducto,
    deleteProducto,
    updateProducto

} from '../controlador/productoControl.js'

const router = Router()

router.get('/',getProductos)
router.get('/:id',getProducto)
router.post('/',createProducto)
router.delete('/:id',deleteProducto)
router.put('/:id',updateProducto)

export default router