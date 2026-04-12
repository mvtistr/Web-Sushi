import React, { useState } from 'react';

const Producto = ({ nombre, precio, imagen }) => {
    const [cantidad, setCantidad] = useState(1);

    const aumentarCantidad = () => {
        setCantidad(cantidad + 1);
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    return (
        <div className="producto">
            <div className="eliminar-producto">
                <button className="eliminar-btn">x</button>
                <p className="eliminar-texto">Eliminar producto</p>
            </div>
            <img src={imagen} alt={nombre} />
            <p className="producto_nombre">{nombre}</p>
            <p><strong>${precio.toFixed(2)}/u</strong></p>
            <div className="cantidad">
                <button className="cantidad-btn disminuir" onClick={disminuirCantidad}>-</button>
                <span className="cantidad-num">{cantidad}</span>
                <button className="cantidad-btn aumentar" onClick={aumentarCantidad}>+</button>
            </div>
        </div>
    );
};

export default Producto;