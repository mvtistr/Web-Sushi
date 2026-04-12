function Carrito(){
    const productosEnCarrito = [
        { nombre: "Veggie Keto Oriental", precio: 10.00 },
        { nombre: "Coreano Oriental", precio: 12.00 },
        { nombre: "Hot Salmón", precio: 12.00 },
    ];

    const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio, 0);

    return (
        <section className="bg-white rounded-lg p-5 shadow-lg w-2/5 mx-auto">
            <h2 className="mt-0">Carrito de Compras 🛒</h2>
            <ul className="list-none p-0 m-0">
                {productosEnCarrito.map((producto, index) => (
                    <li key={index} className="flex justify-between py-5 border-b border-gray-300">
                        <span>{producto.nombre} </span>
                        <span>${producto.precio.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between">
                <span>Descuentos:</span>
                <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold mt-5 text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <button className="bg-red-500 text-white border-none p-2.5 rounded cursor-pointer mt-5 w-full hover:bg-red-600 transition"> ¡Ir a pagar! </button>
        </section>
    );
};

export default Carrito;