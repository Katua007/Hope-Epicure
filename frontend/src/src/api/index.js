import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000' });

export const fetchProducts = () => API.get('/products');
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const toggleAvailability = (id, available) => API.patch(`/products/${id}?available=${available}`);
export const placeOrder = (orderData) => API.post('/orders', orderData);