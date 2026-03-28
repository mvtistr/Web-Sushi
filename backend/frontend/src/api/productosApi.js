import axios from './axios.js';

const API = 'http://localhost:4000/api';

// Crear un nuevo producto
export const createProductoRequest = (producto) => axios.post(`${API}/productos`, producto);

// Obtener todos los productos
export const getProductosRequest = () => axios.get(`${API}/productos`);

// Obtener un producto por su ID
export const getProductoRequest = (id) => axios.get(`${API}/productos/${id}`);

// Actualizar un producto por su ID
export const updateProductoRequest = (id, producto) => axios.put(`${API}/productos/${id}`, producto);

// Eliminar un producto por su ID
export const deleteProductoRequest = (id) => axios.delete(`${API}/productos/${id}`);
