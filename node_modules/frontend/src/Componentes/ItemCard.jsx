import PropTypes from 'prop-types';

export default function ItemCard({ price, titulo }) {
    return (
        <div className="border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{titulo}</h2>
                <p className="text-gray-600 mt-2">{price}</p>
                <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}

// Validación de props con PropTypes
ItemCard.propTypes = {
    price: PropTypes.number.isRequired, // El precio debe ser una cadena y obligatorio
    titulo: PropTypes.string.isRequired, // El título debe ser una cadena y obligatorio
};
