import Producto from '../modelo/prodModelo.js'

export const getProductos = async (req,res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
}

export const getProducto = async (req,res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
}

export const createProducto = async (req,res) => {
    const {titulo,precio,stock,fecha} = req.body
    try{
        if (isNaN(precio) || precio < 0) {
            return res.status(400).json({ message: 'El precio debe ser un número positivo' });
        }
        if (isNaN(stock) || stock < 0) {
            return res.status(400).json({ message: 'El stock debe ser un número positivo' });
        }
        const prodDuplicado = await Producto.findOne({titulo})
        if(prodDuplicado){
            return res.json({message:"Producto Duplicado"})
        }
        const newProducto = new Producto({
            titulo,
            precio,
            stock,
            fecha
        })
        const productoGuardado = await newProducto.save();
        res.status(201).json({ message: 'Producto agregado exitosamente', producto: productoGuardado });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
}

export const deleteProducto = async (req,res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
}

export const updateProducto = async (req,res) => {
    try {
        const { precio, stock } = req.body;
        if (precio !== undefined && (isNaN(precio) || precio < 0)) {
            return res.status(400).json({ message: 'El precio debe ser un número positivo' });
        }
        if (stock !== undefined && (isNaN(stock) || stock < 0)) {
            return res.status(400).json({ message: 'El stock debe ser un número positivo' });
        }
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente', producto });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
}