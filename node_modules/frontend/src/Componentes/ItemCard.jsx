import PropTypes from 'prop-types';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx'
import sushiPalta from '../img/sushi-palta.jfif';
import sushiSalmon from '../img/sushi-salmon.jfif';
import sushiSesamo from '../img/sushi-sesamo.jfif';
import sushiTempura from '../img/sushi-tempura.jfif';
import bebidaCoca from '../img/bebida-coca.jfif';
import bebidaFanta from '../img/bebida-fanta.jfif';
import bebidaKem from '../img/bebida-kem.jfif';
import bebidaSprite from '../img/bebida-sprite.jfif';
import promo1 from '../img/promo-1.jpg';
import promo2 from '../img/promo-2.jpg';
import promo3 from '../img/promo-3.jpg';

const imageMap = [
    { keys: ['palta', 'avocado'], img: sushiPalta },
    { keys: ['salmon', 'salmón', 'sake'], img: sushiSalmon },
    { keys: ['sesamo', 'sésamo'], img: sushiSesamo },
    { keys: ['tempura'], img: sushiTempura },
    { keys: ['coca'], img: bebidaCoca },
    { keys: ['fanta'], img: bebidaFanta },
    { keys: ['kem'], img: bebidaKem },
    { keys: ['sprite'], img: bebidaSprite },
];

const promoImages = [promo1, promo2, promo3];

function findImage(title) {
    if (!title || typeof title !== 'string') return sushiPalta;
    const t = title.toLowerCase();
    // promos
    if (t.includes('promo') || t.includes('promoc')) return promoImages[0];
    for (const entry of imageMap) {
        for (const k of entry.keys) {
            if (t.includes(k)) return entry.img;
        }
    }
    // fallback: try to extract first word and map
    const first = t.split(/\s|-|_/)[0];
    for (const entry of imageMap) {
        if (entry.keys.includes(first)) return entry.img;
    }
    return sushiPalta;
}

function formatPrice(price) {
    if (typeof price === 'number') {
        return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
    }
    // Try to parse strings like "$7990.00" or "7990.00"
    const cleaned = String(price).replace(/[^0-9.-]+/g, '');
    const num = Number(cleaned);
    if (!isNaN(num)) {
        return Number.isInteger(num) ? `$${num}` : `$${num.toFixed(2)}`;
    }
    return price;
}

export default function ItemCard({ id, price, titulo, stock }) {
    const [open, setOpen] = useState(false);
    const imageUrl = findImage(titulo);
    // Debug: registrar qué imagen se usa para este producto
    console.log('ItemCard image selected:', { titulo, imageUrl });

    const { addItem } = useCart()

    return (
        <>
            <div className="bg-dark-bg border-2 border-neon-red rounded-lg shadow-lg overflow-hidden hover:shadow-red-glow transition-all duration-300">
                <div
                    role="img"
                    aria-label={titulo}
                    className="w-full h-40 bg-center bg-cover"
                    style={{ backgroundImage: `url(${imageUrl})`, backgroundColor: '#111' }}
                />
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-neon-red">{titulo}</h2>
                    <p className="text-gray-300 mt-2">{formatPrice(price)}</p>
                    <div className="mt-4 flex gap-2">
                        <button onClick={() => setOpen(true)} className="flex-1 bg-transparent border-2 border-neon-red text-neon-red py-2 rounded hover:bg-neon-red hover:text-black transition">Ver</button>
                        <button onClick={() => addItem({ id, titulo, price, imageUrl })} className="flex-1 bg-neon-red text-black py-2 rounded font-bold hover:bg-red-accent transition">Agregar</button>
                    </div>
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-black max-w-3xl w-full mx-4 rounded-lg overflow-hidden">
                        <div className="flex justify-end p-2">
                            <button onClick={() => setOpen(false)} className="text-neon-red px-3 py-1">Cerrar</button>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="w-full h-80 rounded bg-center bg-cover" style={{ backgroundImage: `url(${imageUrl})`, backgroundColor: '#111' }} />
                            <div>
                                <h2 className="text-2xl font-bold text-neon-red mb-2">{titulo}</h2>
                                <p className="text-gray-300 mb-4">Precio: {formatPrice(price)}</p>
                                <p className="text-gray-300 mb-4">Stock: {stock ?? 'N/A'}</p>
                                <p className="text-gray-300">Descripción: Producto delicioso preparado por nuestro chef.</p>
                                <div className="mt-4">
                                    <button onClick={() => { addItem({ id, titulo, price, imageUrl }); setOpen(false); }} className="bg-neon-red text-black py-2 px-4 rounded font-bold">Agregar al carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// Validación de props con PropTypes
ItemCard.propTypes = {
    id: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    titulo: PropTypes.string.isRequired,
    stock: PropTypes.number,
};
