import logo from '../img/fukusuke.jpg'

import { NavLink } from 'react-router-dom'

export function Header(){
    return (
    <div className='bg-dark-bg m-0 p-0 h-full'>
        <header className='bg-black text-white h-32 flex items-center justify-between px-5'>
        <NavLink to="/" className='link-logo'>
            <img src={logo} alt="logo" className="h-24" />
        </NavLink>
        <nav>
            <ul className="flex list-none p-0 m-0 justify-end flex-1">
                <li className='mx-4 flex items-center'>
                    <NavLink
                        to="https://tinyurl.com/kk5j4bjy"
                        className='text-white rounded-full px-5 py-2 bg-dark-bg transition-colors duration-300 no-underline hover:bg-neon-red hover:text-white hover:shadow-red-glow-intense'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Local
                    </NavLink>
                </li>
                <li className='mx-4 flex items-center'>
                    <NavLink
                        to="/Carta"
                        className='text-white rounded-full px-5 py-2 bg-dark-bg transition-colors duration-300 no-underline hover:bg-neon-red hover:text-white hover:shadow-red-glow-intense'
                    >
                        Carta
                    </NavLink>
                </li>
                <li className='mx-4 flex items-center'>
                    <NavLink
                        to="/Carro"
                        className='text-white rounded-full px-5 py-2 bg-dark-bg transition-colors duration-300 no-underline hover:bg-neon-red hover:text-white hover:shadow-red-glow-intense'
                    >
                        Carro
                    </NavLink>
                </li>
                <li className='mx-4 flex items-center'>
                    <NavLink
                        to="/Cuenta"
                        className='text-white rounded-full px-5 py-2 bg-dark-bg transition-colors duration-300 no-underline hover:bg-neon-red hover:text-white hover:shadow-red-glow-intense'
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