import Orden from '../modelo/Orden.js';  
import PDFDocument from 'pdfkit';  // importamos PDFKit para generar el PDF

// Esta función crea una nueva orden
export const crearOrden = async (req, res) => {
  const { productos } = req.body;

  // Ver si el "productos" no es un arreglo o esta vacio
  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje: 'El campo "productos" es obligatorio y debe ser un arreglo.' });
  }

  try {
    // total de la orden: precio x cantidad de producto
    const total = productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    
    //nueva orden con los productos y el total calculado
    const nuevaOrden = new Orden({ productos, total });
    await nuevaOrden.save();

    // orden creada con exito
    res.status(201).json({ mensaje: 'Orden creada con éxito', orden: nuevaOrden });
  } catch (error) {
    // mensaje de error
    res.status(500).json({ mensaje: 'Error al crear la orden', error: error.message });
  }
};

//esta funcion obtiene todas las ordenes almacenadas 
export const obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.find();
    res.status(200).json(ordenes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las órdenes', error: error.message });
  }
};

// esta funcion obtiene una orden específica por ID
export const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }
    res.status(200).json(orden);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la orden', error: error.message });
  }
};

//esta funcion actualiza una orden especifica
export const actualizarOrden = async (req, res) => {
  const { productos } = req.body; // se extrae los productos de la solicitud
  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ mensaje: 'El campo "productos" es obligatorio y debe ser un arreglo.' });
  }

  try {
    // buscamos la orden por su ID
    const orden = await Orden.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }
    const total = productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0); //total de la orden con los productos actualizados

    //actualiza los productos y el total en la orden
    orden.productos = productos;
    orden.total = total;
    await orden.save();
    res.status(200).json({ mensaje: 'Orden actualizada con éxito', orden });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la orden', error: error.message });
  }
};

// esta funcion elimina una orden por su ID
export const eliminarOrden = async (req, res) => {
  try {
    const orden = await Orden.findByIdAndDelete(req.params.id);
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }
    res.status(200).json({ mensaje: 'Orden eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la orden', error: error.message });
  }
};

// esta funcion genera un reporte de todas las ventas realizadas
export const obtenerReporteVentas = async (req, res) => {
  try {
    const ordenes = await Orden.find();
    const totalVentas = ordenes.reduce((acc, orden) => acc + orden.total, 0);
    // se crea un objeto para almacenar la cantidad de cada producto vendido
    const productosVendidos = {};
    // recorremos todas las ordenes y sumamos la cantidad de productos vendidos
    ordenes.forEach(orden => {
      orden.productos.forEach(producto => {
        productosVendidos[producto.nombre] = 
          (productosVendidos[producto.nombre] || 0) + producto.cantidad;
      });
    });

    // Responde el total de ventas y los productos vendidos
    res.status(200).json({ totalVentas, productosVendidos });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el reporte de ventas', error: error.message });
  }
};

//esta funcion genera la orden de despacho en formato HTML
export const generarOrdenDespacho = async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }

    // marcamos la orden como finalizada
    orden.estado = 'finalizada';
    await orden.save();

    // creamos el contenido HTML para la orden de despacho
    const htmlContent = `
      <html>
        <head>
          <title>Orden de Despacho</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; }
            .order-details { margin-top: 20px; }
            .order-details p { margin: 5px 0; }
            .products { margin-top: 20px; }
            .products ul { list-style-type: none; padding: 0; }
            .products li { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>Orden de Despacho</h1>
          <div class="order-details">
            <p><strong>ID de Orden:</strong> ${orden._id}</p>
            <p><strong>Fecha de Venta:</strong> ${orden.fechaVenta.toLocaleDateString()}</p>
            <p><strong>Total:</strong> $${orden.total.toFixed(2)}</p>
            <p><strong>Estado:</strong> ${orden.estado}</p>
          </div>
          <div class="products">
            <h3>Productos:</h3>
            <ul>
              ${orden.productos.map(producto => 
                `<li>${producto.nombre}: ${producto.cantidad} x $${producto.precio.toFixed(2)}</li>`
              ).join('')}
            </ul>
          </div>
        </body>
      </html>
    `;

    // respondemos con el HTML generado como respuesta
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar la orden de despacho', error: error.message });
  }
};
