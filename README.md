# 🍣 Sushi Web App

Una aplicación web completa para un restaurante de sushi, construida con React (frontend) y Node.js/Express (backend), utilizando MongoDB como base de datos.

## 📋 Características

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Autenticación**: JWT con bcrypt
- **Estilos**: Diseño unificado con colores rojos neón y efectos glow
- **Responsive**: Adaptable a diferentes dispositivos

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 18 o superior)
- MongoDB (local o en la nube)
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/sushi-web-app.git
   cd sushi-web-app
   ```

2. Instala las dependencias del monorepo:
   ```bash
   npm install
   ```

   Esto instalará las dependencias de frontend y backend automáticamente.

### Configuración

1. Crea un archivo `.env` en la carpeta `backend/`:
   ```env
   PORT=12345
   MONGODB_URI=mongodb://localhost:27017/sushidb
   TOKEN_SECRET=tu-clave-secreta-muy-segura-aqui
   NODE_ENV=development
   ```

2. Asegúrate de que MongoDB esté ejecutándose.

### Ejecución

Para ejecutar tanto frontend como backend simultáneamente:
```bash
npm run dev
```

Esto iniciará:
- Backend en `http://localhost:12345`
- Frontend en `http://localhost:5173`

### Scripts Disponibles

- `npm run dev`: Ejecuta frontend y backend en modo desarrollo
- `npm run build`: Construye el frontend para producción
- `npm run start`: Inicia el backend en modo producción
- `npm run clean`: Limpia node_modules de todos los workspaces

## 📁 Estructura del Proyecto

```
sushi-web-app/
├── backend/                 # API REST con Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores de rutas
│   │   ├── models/          # Modelos de MongoDB
│   │   ├── routes/          # Definición de rutas
│   │   ├── middleware/      # Middlewares personalizados
│   │   ├── libs/            # Utilidades (JWT, etc.)
│   │   └── app.js           # Configuración de Express
│   ├── package.json
│   └── .env                 # Variables de entorno
├── frontend/                # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── styles/          # Estilos Tailwind
│   │   ├── api/             # Configuración de API
│   │   └── App.jsx          # App principal
│   ├── tailwind.config.js   # Configuración Tailwind
│   └── package.json
├── package.json             # Configuración del monorepo
└── README.md
```

## 🎨 Diseño y Colores

La aplicación utiliza una paleta de colores unificada:
- **Fondo oscuro**: `#333235`
- **Rojo neón**: `#fa0000`
- **Burdeos**: `#833434`
- **Efectos glow**: Sombras rojas intensas

Todos los estilos están consolidados usando Tailwind CSS con clases personalizadas.

## 🔧 Tecnologías Utilizadas

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB con Mongoose
- JWT para autenticación
- bcryptjs para hashing de contraseñas
- CORS para manejo de orígenes cruzados

## 📡 API Endpoints

### Autenticación
- `POST /api/register` - Registro de usuarios
- `POST /api/login` - Inicio de sesión
- `POST /api/logout` - Cierre de sesión

### Productos
- `GET /api/productos` - Obtener todos los productos
- `POST /api/productos` - Crear producto (admin)
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### Compras y Órdenes
- `GET /api/compras` - Obtener compras
- `POST /api/compras` - Crear compra
- `GET /ordenes` - Obtener órdenes
- `POST /ordenes` - Crear orden

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Para preguntas o soporte, contacta al desarrollador.

---

¡Disfruta tu experiencia culinaria digital! 🍱</content>
<parameter name="filePath">c:/Users/matia/OneDrive/Escritorio/sushi/README.md