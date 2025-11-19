import axios from 'axios';
import { API_BASE_URL } from './config';

const vendorAxiosInstance = axios.create({
    baseURL: API_BASE_URL  //import.meta.env.VITE_APP_API_URL,
});

vendorAxiosInstance.interceptors.request.use((config) => {
    const user = localStorage.getItem('vendor');
    const token = user ? JSON.parse(user).token : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

vendorAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token invalid or expired
            localStorage.removeItem('vendorAuthToken');
            localStorage.removeItem('vendor');
            window.location.href = '/vendor/login';   // redirect to login page
        }

        return Promise.reject(error);
    }
);

export default vendorAxiosInstance;