import axios from 'axios';

// Détection intelligente : si on est en développement local sur localhost,
// on pointe vers le backend local (port 5001) pour des réponses instantanées (< 100ms) et emails directs.
// En ligne, on utilise l'URL Render de production ou VITE_API_URL.
const isLocal = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const baseURL = import.meta.env.VITE_API_URL || 
  (isLocal ? 'http://localhost:5001/api' : 'https://seccc-project.onrender.com/api');

const api = axios.create({
  baseURL,
  timeout: 8000, // 8 secondes max pour ne jamais bloquer l'interface
});

export default api;