const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const devisRoutes = require('./routes/devis_route.js');
const messageRoutes = require('./routes/message_route.js');
const adminRoutes = require('./routes/admin_route.js');

// Charger les variables d'environnement
dotenv.config();

// Connecter à MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[GLOBAL LOG] Request: ${req.method} ${req.url}`);
    next();
});


app.use('/api/devis', devisRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);

const verifierCleAPI = (req, res, next) => {
  const cle = req.headers['x-api-key'];
  if (cle === 'MA_CLE_SUPER_SECRETE') {
    next(); 
  } else {
    res.status(403).json({ message: "Accès interdit : Clé API invalide" });
  }
};

app.get('/api/devis', verifierCleAPI, async (req, res) => {
  const devis = await Devis.find();
  res.json(devis);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));