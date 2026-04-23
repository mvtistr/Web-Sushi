import logo from '../img/fukusuke.jpg'

import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export function Header(){
    const { items } = useCart()
    const count = items.reduce((acc,i) => acc + (Number(i.cantidad || 0)), 0)
    return (
    <div className='bg-black m-0 p-0 h-full'>
        <header className='bg-black text-white h-32 flex items-center justify-between px-5 border-b-2 border-neon-red'>
        <NavLink to="/" className='link-logo'>
            <img src={logo} alt="logo" className="h-24" />
        </NavLink>
        <nav>
            <ul className="flex list-none p-0 m-0 justify-end flex-1">
                <li className='mx-4 flex items-center'>
                    <NavLink
                        to="https://tinyurl.com/kk5j4bjy"
                        className='text-white rounded-full px-5 py-2 bg-black border-2 border-neon-red transition-all duration-300 no-underline hover:bg-neon-red hover:text-black hover:shadow-red-glow-intense'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Local
                    </NavLink>
                </li>
                <li className='mx-4 flex items-center'>
                    <NavLink
                        to="/Carta"
                        className='text-white rounded-full px-5 py-2 bg-black border-2 border-neon-red transition-all duration-300 no-underline hover:bg-neon-red hover:text-black hover:shadow-red-glow-intense'
                    >
                        Carta
                    </NavLink>
                </li>
                <li className='mx-4 flex items-center relative'>
                    <NavLink
                        to="/Carro"
                        className='text-white rounded-full px-5 py-2 bg-black border-2 border-neon-red transition-all duration-300 no-underline hover:bg-neon-red hover:text-black hover:shadow-red-glow-intense'
                    >
                        Carro
                    </NavLink>
                    {count > 0 && (
                        <span className="absolute -top-1 -right-1 bg-neon-red text-black rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">{count}</span>
                    )}
                </li>
                <li className='mx-4 flex items-center'>
                    <NavLink
                        to="/Cuenta"
                        className='text-white rounded-full px-5 py-2 bg-black border-2 border-neon-red transition-all duration-300 no-underline hover:bg-neon-red hover:text-black hover:shadow-red-glow-intense'
                    >
                        Cuenta
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
</div>
);
}