import axios from 'axios'

const clienteVuelos = axios.create({
    baseURL: process.env.REACT_APP_SKYSCANNER_URL
});

const clienteHoteles = axios.create({
    baseURL: process.env.REACT_APP_HOTELS_URL
});

export {
    clienteVuelos,
    clienteHoteles
};