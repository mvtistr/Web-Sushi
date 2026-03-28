import { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import axios from 'axios';

export function Menu() {
    const [data, setData] = useState([]); // Estado para todos los productos
    const [promociones, setPromociones] = useState([]);
    const [productos, setProductos] = useState([]);
    const [bebidas, setBebidas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/productos');

                // Verificar la estructura de datos
                console.log("Datos recibidos:", response.data);

                const allData = response.data; // Asigna el resultado completo a "allData"
                setData(allData); // Actualiza el estado general

                // Filtrar datos por categorías
                const promos = allData.filter((item) => item.titulo.startsWith("promo"));
                const prods = allData.filter((item) => item.titulo.startsWith("sushi"));
                const drinks = allData.filter((item) => item.titulo.startsWith("bebida"));

                setPromociones(promos);
                setProductos(prods);
                setBebidas(drinks);

                console.log("Promociones:", promos);
                console.log("Productos:", prods);
                console.log("Bebidas:", drinks);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-8">
            <center>
                <h1 className="text-4xl font-bold mb-8">Todos los Productos:</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((item) => (
                        <ItemCard 
                            key={item._id} 
                            titulo={item.titulo} 
                            precio={`$${item.precio}`} 
                            stock={item.stock} 
                        />
                    ))}
                </div>
                <h1 className="text-3xl font-bold mb-4">Productos:</h1>
                <h2 className="text-2xl font-semibold mb-4">Sushi rolls (9 unidades)</h2>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {productos.map((producto) => (
                        <ItemCard
                            key={producto._id}
                            titulo={producto.titulo.replace("-", " ").toUpperCase()}
                            price={`$${producto.precio}`}
                            stock={producto.stock} 
                        />
                    ))}
                </section>
                <h1 className="text-3xl font-bold mb-4">Bebidas:</h1>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {bebidas.map((bebida) => (
                        <ItemCard
                            key={bebida._id}
                            titulo={bebida.titulo.replace("-", " ").toUpperCase()}
                            price={`$${bebida.precio}`}
                            stock={bebida.stock}
                        />
                    ))}
                </section>
            </center>
        </div>
    );
}
