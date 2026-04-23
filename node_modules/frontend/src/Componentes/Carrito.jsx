import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useNotification } from '../context/NotificationContext.jsx'

function formatPrice(price){
    const num = typeof price === 'number' ? price : Number(String(price).replace(/[^0-9.-]+/g, ''))
    if (isNaN(num)) return price
    return Number.isInteger(num) ? `$${num}` : `$${num.toFixed(2)}`
}

function Carrito({ items: initialItems = [], onChange }){
    const { items, addItem, removeItem, increase, decrease, clearCart, total } = useCart()
    const { confirm, notify } = useNotification()

    // si el padre pasa items iniciales, agregarlos al contexto una vez
    useEffect(() => {
        if (initialItems && initialItems.length > 0) {
            initialItems.forEach(it => addItem(it))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlePago = async () => {
        try {
            if (!items || items.length === 0) return alert('El carro está vacío')

            const payload = {
                items: items.map(i => ({
                    title: i.nombre || i.titulo || 'Producto',
                    quantity: i.cantidad || i.quantity || 1,
                    unit_price: i.precio || i.unit_price || 0
                })),
                back_urls: {
                    success: window.location.origin,
                    failure: window.location.origin,
                    pending: window.location.origin
                }
            }

            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:12345/api'
            const resp = await fetch(`${apiBase}/payment/create_preference`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data = await resp.json()
            if (!resp.ok) {
                const detail = data.detail || data
                const msg = typeof detail === 'string' ? detail : JSON.stringify(detail)
                notify && notify('Error creando preferencia: ' + msg, 'error')
                return alert('Error al crear preferencia: ' + (data.message || msg))
            }

            if (data.init_point) window.open(data.init_point, '_blank')
            else alert('No se recibió init_point desde Mercado Pago')
        } catch (err) {
            console.error('Pago error', err)
            alert('Error al iniciar pago')
        }
    }

    // total provisto por el contexto

    const findImage = (item) => {
        if (!item) return '/src/img/sushi-palta.jfif'
        if (item.img) return item.img
        const name = (item.nombre || item.titulo || '').toLowerCase()
        if (name.includes('palta') || name.includes('veggie')) return '/src/img/sushi-palta.jfif'
        if (name.includes('salmon') || name.includes('salm')) return '/src/img/sushi-salmon.jfif'
        if (name.includes('sesamo') || name.includes('sésamo')) return '/src/img/sushi-sesamo.jfif'
        if (name.includes('tempura') || name.includes('hot')) return '/src/img/sushi-tempura.jfif'
        return '/src/img/sushi-palta.jfif'
    }

    return (
        <section className="max-w-3xl mx-auto p-6 bg-black text-white rounded-lg border-2 border-neon-red shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-neon-red">Carrito de Compras 🛒</h2>
                <div className="flex gap-2">
                    <Link to="/Carta" className="px-3 py-1 border-2 border-neon-red text-neon-red rounded hover:bg-neon-red hover:text-black transition">Seguir comprando</Link>
                </div>
            </div>

                    {items.length === 0 ? (
                <div className="text-center text-gray-300 py-12">Tu carrito está vacío.</div>
            ) : (
                <ul className="space-y-4">
                    {items.map(item => (
                        <li key={item.id} className="flex items-center justify-between bg-dark-bg p-3 rounded border border-neon-red border-opacity-20">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-center bg-cover rounded" style={{backgroundImage:`url(${findImage(item)})`}} />
                                <div>
                                    <div className="font-semibold text-neon-red">{item.nombre}</div>
                                    <div className="text-gray-300 text-sm">{formatPrice(item.precio)}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center border border-neon-red rounded overflow-hidden">
                                    <button onClick={() => { decrease(item.id); notify('Cantidad disminuida', 'info') }} className="px-3 py-1 bg-black text-neon-red">-</button>
                                    <div className="px-4 py-1 bg-dark-bg text-white">{item.cantidad}</div>
                                    <button onClick={() => { increase(item.id); notify('Cantidad aumentada', 'info') }} className="px-3 py-1 bg-black text-neon-red">+</button>
                                </div>
                                <div className="text-gray-300 mr-4">{formatPrice(item.precio * item.cantidad)}</div>
                                <button onClick={() => { removeItem(item.id); notify('Producto eliminado', 'info') }} className="px-3 py-1 bg-transparent border-2 border-red-600 text-red-400 rounded hover:bg-red-600/20">Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-6 flex items-center justify-between">
                <div className="text-gray-300">Descuentos: <span className="text-neon-red">$0</span></div>
                <div className="text-lg font-bold text-neon-red">Total: {formatPrice(total)}</div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <button onClick={handlePago} className="w-full bg-neon-red text-black py-2 rounded font-bold">Ir a pagar</button>
                <button onClick={async () => {
                    const ok = await confirm('¿Estás seguro que deseas vaciar todo el carrito?')
                    if (ok) clearCart()
                }} className="w-full border-2 border-neon-red text-neon-red py-2 rounded hover:bg-neon-red hover:text-black transition">Vaciar carro</button>
            </div>
        </section>
    )
}

export default Carrito