import express from 'express';
import {
  crearOrden,
  obtenerOrdenes,
  obtenerOrdenPorId,
  actualizarOrden,
  eliminarOrden,
  obtenerReporteVentas,
  generarOrdenDespacho
} from '../controlador/ordenesController.js';

const router = express.Router();

// ruta para el reporte de ventas 
router.get('/reporte', obtenerReporteVentas);

// rutas para manejar las ordenes 
router.post('/', crearOrden);
router.get('/', obtenerOrdenes);
router.get('/:id', obtenerOrdenPorId);
router.put('/:id', actualizarOrden);
router.delete('/:id', eliminarOrden);

// ruta para generar la orden de despacho con HTML
router.get('/:id/despacho', generarOrdenDespacho);

export default router;