import Producto from '../models/prodModelo.js'
import mongoose from 'mongoose'
import path from 'path'
import fs from 'fs'

export const getProductos = async (req,res) => {
    try {
        // Si mongoose no está conectado, devolver datos de ejemplo para que el frontend funcione
        if (mongoose.connection.readyState !== 1) {
            const ejemplo = [
                    { _id: 'p1', titulo: 'sushi-palta', precio: 7990, stock: 10, imagen: '/uploads/default-sushi.jpg' },
                    { _id: 'p2', titulo: 'sushi-salmon', precio: 8990, stock: 8, imagen: '/uploads/default-sushi.jpg' },
                    { _id: 'p3', titulo: 'sushi-tempura', precio: 9990, stock: 5, imagen: '/uploads/default-sushi.jpg' },
                    { _id: 'b1', titulo: 'bebida-coca', precio: 1000, stock: 30, imagen: '/uploads/default-drink.jpg' },
                    { _id: 'promo-1', titulo: 'promo-24-piezas', precio: 9990, stock: 20, imagen: '/uploads/default-promo.jpg' }
                ];
            return res.json(ejemplo);
        }

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
    // si hay archivo subido por multer, la ruta estará en req.file
    let imagenPath = undefined
    if (req.file) {
        imagenPath = `/uploads/${req.file.filename}`
    } else if (req.body.imagen) {
        imagenPath = req.body.imagen
    }
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
            fecha,
            imagen: imagenPath
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
        // Si producto tenía una imagen subida en /uploads, intentar borrar el archivo
        if (producto.imagen && producto.imagen.startsWith('/uploads/')){
            try {
                const uploadsDir = path.join(process.cwd(), 'backend', 'public')
                const filePath = path.join(uploadsDir, producto.imagen.replace('/uploads/',''))
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
            } catch(err) {
                console.warn('No se pudo borrar la imagen del producto:', err.message)
            }
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
}

export const updateProducto = async (req,res) => {
    try {
        const { precio, stock } = req.body;
        // maneja imagen subida
        if (req.file) {
            req.body.imagen = `/uploads/${req.file.filename}`
        }
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