import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // L'adresse de ton backend Node.js (Production sur Render)
});

export default api;