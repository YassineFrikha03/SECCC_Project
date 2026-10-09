import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://seccc-project.onrender.com/api', // L'adresse de ton backend Node.js
});

export default api;