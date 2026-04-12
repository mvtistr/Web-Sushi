import axios from 'axios';

const instancia = axios.create({
    baseURL: 'http://localhost:5000/api', // Asegúrate de que este puerto esté en uso por tu servidor
    withCredentials: true,
});

export default instancia;