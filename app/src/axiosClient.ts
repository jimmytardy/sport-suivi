import axios from 'axios'

export const baseURL =
    // @ts-ignore
    (import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin) +
    '/api';

// Next we make an 'instance' of it
const axiosClient = axios.create({
    // .. where we make our configurations
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient
