import { createContext, useContext, useEffect, useState } from 'react'
import { useNotification } from './NotificationContext.jsx'

const CartContext = createContext(null)

export function CartProvider({ children }){
    const [items, setItems] = useState([])
    const { notify } = useNotification()

    // Cargar desde localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem('cartItems')
            if (raw) setItems(JSON.parse(raw))
        } catch (err) {
            console.error('Error cargando carrito', err)
            setItems([])
        }
    }, [])

    // Persistir cambios
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(items))
            // sincronizar otras pestañas
            window.dispatchEvent(new Event('storage'))
        } catch (err) {
            console.error('Error guardando carrito', err)
        }
    }, [items])

    // Escuchar storage external changes
    useEffect(() => {
        const onStorage = (e) => {
            try {
                const raw = localStorage.getItem('cartItems')
                setItems(raw ? JSON.parse(raw) : [])
            } catch (err) {
                console.error('Error parseando cartItems desde storage', err)
            }
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const addItem = (item) => {
        setItems(prev => {
            const ident = item.id || item.nombre || item.titulo
            const exists = prev.find(i => (i.id || i.nombre || i.titulo) === ident)
            if (exists) return prev.map(i => ((i.id || i.nombre || i.titulo) === ident ? { ...i, cantidad: (i.cantidad || 1) + 1 } : i))
            const newItem = { id: ident, nombre: item.nombre || item.titulo, precio: item.price || item.precio || 0, cantidad: item.cantidad || 1, img: item.imageUrl || item.img }
            return [...prev, newItem]
        })
        notify('Producto agregado al carrito', 'success')
    }

    const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
    const increase = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, cantidad: (i.cantidad || 1) + 1 } : i))
    const decrease = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, cantidad: Math.max(1, (i.cantidad || 1) - 1) } : i))
    const clearCart = () => { setItems([]); notify('Carrito vaciado', 'info') }

    const total = items.reduce((acc, i) => acc + (Number(i.precio || 0) * (i.cantidad || 1)), 0)

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, increase, decrease, clearCart, total }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext)
}

export default CartContext
