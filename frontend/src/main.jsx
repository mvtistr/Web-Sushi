import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import './css/index.css'
import { CartProvider } from './context/CartContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'

createRoot(document.getElementById('root')).render(
    <NotificationProvider>
        <CartProvider>
            <App/>
        </CartProvider>
    </NotificationProvider>
)