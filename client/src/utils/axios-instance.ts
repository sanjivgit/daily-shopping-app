import axios from 'axios';
import { API_BASE_URL } from './config';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL  //import.meta.env.VITE_APP_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token invalid or expired
            // localStorage.removeItem('authToken');
            // localStorage.removeItem('user');
            // window.location.href = '/login';   // redirect to login page
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;