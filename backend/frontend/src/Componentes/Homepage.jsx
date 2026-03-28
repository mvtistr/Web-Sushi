import i1 from '../img/foto1.png';
import i2 from '../img/foto2.png';
import i3 from '../img/foto3.png';
import i4 from '../img/foto4.png';
import i5 from '../img/foto5.png';
import i6 from '../img/foto6.png';

import logo from '../img/logo-restourant.webp';
import logoDelivery from '../img/logo-delivery.jpg';
import mesas from '../img/mesas-restaurant.png';

import '../css/home.css';

export function Homepag() {
    return (
        <div className='body'>
            <section id="Sobrenosotros" className="content-section p-50">
                <h2 className="content-section-h2 mb-20 text-red">Sobre Nosotros</h2>
                <p className="mb-4 text-gray-300">Nuestros ancestros de origen japonés llegaron a Chile en el año 1976, comenzando una nueva vida en la comuna de Maipú y trayendo sus tradiciones milenarias del Oriente al Occidente, siendo la primera casa de sushi de la comuna, región y del país.</p>
                <p className="mb-4 text-gray-300">Nos enorgullece contar con 48 años de experiencia, brindando piezas de fusión japonesa/americana y piezas 100% japonesas. Gracias a la disciplina y amor, hemos transmitido nuestro conocimiento sobre el sushi de generación en generación, siendo esta la tercera generación de la familia que decide ser parte de este gran y bello proyecto, enfocados en entregarte una experiencia de primer nivel tanto culinariamente como en entretenimiento.</p>
                <p className="mb-4 text-gray-300">Ven a visitarnos a nuestro nuevo local ubicado en Mar de Chile 516, Maipú</p>
                <p className="font-semibold text-red-500">¡Pide ya!</p>
            </section>

            <section id="opciones" className="content-section p-8">
                <h2 className="mb-20 text-red">Nuestras opciones</h2>
                <div className="opciones-grid">
                    <div className="opciones-item">
                        <img src={logo} alt="retiro en local" className="opciones-item-img" />
                        <h3 className="opciones-item-h3 mt-15">Retiro en local</h3>
                        <p>Puedes pedir a través de nuestra página y retirar tu pedido en nuestro local en Mar de Chile 516, Maipú</p>
                    </div>
                    <div className="opciones-item">
                        <img src={logoDelivery} alt="despacho" className="opciones-item-img" />
                        <h3 className="opciones-item-h3 mt-15">Despacho a domicilio</h3>
                        <p>Si te encuentras en un radio de 3KM, tu pedido es entregado de manera gratuita en tu domicilio.</p>
                    </div>
                    <div className="opciones-item">
                        <img src={mesas} alt="comer en local" className="opciones-item-img" />
                        <h3 className="opciones-item-h3 mt-15">Ven a nuestro local</h3>
                        <p>Contamos con capacidad para 12 personas, ¡así que corre y ven pronto a disfrutar de nuestro local!</p>
                    </div>
                </div>
                <div className="photo-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    <img src={i1} alt="Foto 1" className="w-full h-auto rounded-lg shadow-md" />
                    <img src={i2} alt="Foto 2" className="w-full h-auto rounded-lg shadow-md" />
                    <img src={i3} alt="Foto 3" className="w-full h-auto rounded-lg shadow-md" />
                    <img src={i4} alt="Foto 4" className="w-full h-auto rounded-lg shadow-md" />
                    <img src={i5} alt="Foto 5" className="w-full h-auto rounded-lg shadow-md" />
                    <img src={i6} alt="Foto 6" className="w-full h-auto rounded-lg shadow-md" />
                </div>
            </section>

            <section id="recomendaciones" className="content-section p-8">
                <h2 className="text-3xl font-bold mb-4 text-red-600">Comentarios</h2>
                <div className="recomendaciones-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="recomendaciones-item bg-gray-800 shadow-md rounded-lg p-4">
                        <p>&quot;La mejor experiencia de comida japonesa que he tenido en mucho tiempo. ¡Altamente recomendado!&quot;</p>
                        <p className="font-semibold text-red-500">- Javier Fuenzalida</p>
                    </div>
                    <div className="recomendaciones-item bg-gray-800 shadow-md rounded-lg p-4">
                        <p>&quot;Los sabores son exquisitos y el ambiente es inmejorable.&quot;</p>
                        <p className="font-semibold text-red-500">- Matias Sepulveda</p>
                    </div>
                    <div className="recomendaciones-item bg-gray-800 shadow-md rounded-lg p-4">
                        <p>&quot;El Teraki me recordó a mi viaje a Japón. ¡Delicioso!&quot;</p>
                        <p className="font-semibold text-red-500">- Matias Salas</p>
                    </div>
                </div>
            </section>

            <footer id="contact" className="footer">
                <h2 className="footer-h2 mb-10">Contáctanos</h2>
                <p className='m-5-0'>A través del número: <span className="font-semibold">+569 8920 0172</span></p>
                <p className='m-5-0'>A través del correo: <span className="font-semibold">Fukusuke_sushi@gmail.com</span></p>
                <p className='m-5-0'>Visítanos en nuestro local ubicado en Mar de Chile 516, Santiago, Maipú, Región Metropolitana.</p>
                <p className='m-5-0'>&copy; 2024 Fukusuke. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}