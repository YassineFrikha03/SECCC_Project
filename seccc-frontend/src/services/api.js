import axios from 'axios';

const api = axios.create({
  baseURL: 'https://seccc-project.onrender.com/api', // L'adresse de ton backend Node.js (Production sur Render)
});

export default api;