import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://seccc-project.onrender.com/api', // L'adresse de ton backend Node.js
  timeout: 60000, // 60 secondes pour laisser le temps à Render de se réveiller (timeout free tier)
});

export default api;