import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const API = axios.create({ baseURL: API_URL });

export const fetchProducts = () => API.get('/products');
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const toggleAvailability = (id, available) => API.patch(`/products/${id}?available=${available}`);
export const placeOrder = (orderData) => API.post('/orders', orderData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const signup = (userData) => API.post('/auth/signup', userData);
export const login = (userData) => API.post('/auth/login', userData);

export default API;
