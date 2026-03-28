import '../css/carro.css'


function Carrito(){
    const productosEnCarrito = [
        { nombre: "Veggie Keto Oriental", precio: 10.00 },
        { nombre: "Coreano Oriental", precio: 12.00 },
        { nombre: "Hot Salmón", precio: 12.00 },
    ];

    const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio, 0);

    return (
        <section className="carrito">
            <h2>Carrito de Compras 🛒</h2>
            <ul className="carrito-items">
                {productosEnCarrito.map((producto, index) => (
                    <li key={index}>
                        <span>{producto.nombre} </span>
                        <span>${producto.precio.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="descuentos">
                <span>Descuentos:</span>
                <span>$0.00</span>
            </div>
            <div className="total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout"> ¡Ir a pagar! </button>
        </section>
    );
};

export default Carrito;