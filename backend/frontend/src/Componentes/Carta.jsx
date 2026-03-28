import { useEffect, useState } from 'react';
import { getProductosRequest } from '../api/productosApi.js';
import '../css/header.css';

function increaseQuantity(e) {
    const promoItem = e.target.closest('.card');
    const input = promoItem.querySelector('.quantity-input');
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity(e) {
    const promoItem = e.target.closest('.card');
    const input = promoItem.querySelector('.quantity-input');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function addToCart(productName, price, e) {
    const promoItem = e.target.parentElement;
    const quantityInput = promoItem.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex((item) => item.nombre === productName);

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].cantidad += quantity;
    } else {
        cart.push({
            nombre: productName,
            precio: price,
            cantidad: quantity,
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showConfirmationMessage();
}

function showConfirmationMessage() {
    const messageElement = document.getElementById('confirmation-message');

    if (messageElement) {
        messageElement.style.display = 'block';
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 2000);
    } else {
        console.error('Elemento de mensaje de confirmación no encontrado.');
    }
}

export function Carta() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        async function fetchProductos() {
            try {
                const response = await getProductosRequest();
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        }
        fetchProductos();
    }, []);

    return (
        <div className="productos-container">
            {productos.map((producto) => (
                <div className="card" key={producto._id}>
                    <h1>{producto.titulo}</h1>
                    <h2>Precio: ${producto.precio}</h2>
                    <h3>Stock: {producto.stock}</h3>
                    <button className="quantity-btn" onClick={decreaseQuantity}>
                        -
                    </button>
                    <input type="number" defaultValue="1" className="quantity-input" />
                    <button className="quantity-btn" onClick={increaseQuantity}>
                        +
                    </button>
                    <button
                        className="add-to-cart-btn"
                        onClick={(e) => addToCart(producto.titulo, producto.precio, e)}
                    >
                        Agregar al carrito
                    </button>
                    <div
                        id="confirmation-message"
                        style={{ display: 'none', color: 'green', marginTop: '10px' }}
                    >
                        ¡Producto añadido al carrito!
                    </div>
                </div>
            ))}
        </div>
    );
}