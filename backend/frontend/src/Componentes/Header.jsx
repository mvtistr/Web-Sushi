import logo from '../img/fukusuke.jpg'
import '../css/header.css'

import { NavLink } from 'react-router-dom'

export function Header(){
    return (
    <div className='general'>
        <header className='header'>
        <NavLink to="/" className='link-logo'>
            <img src={logo} alt="logo" className="logo" />
        </NavLink>
        <nav>
            <ul className="ref">
                <li className='li'>
                    <NavLink 
                        to="https://tinyurl.com/kk5j4bjy" 
                        className='link' 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Local
                    </NavLink>
                </li>
                <li className='li'>
                    <NavLink 
                        to="/Carta" 
                        className='link'
                    >
                        Carta
                    </NavLink>
                </li>
                <li className='li'>
                    <NavLink 
                        to="/Carro" 
                        className='link'
                    >
                        Carro
                    </NavLink>
                </li>
                <li className='li'>
                    <NavLink 
                        to="/Cuenta" 
                        className='link'
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