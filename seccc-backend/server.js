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

// 1. LE BOUCLIER RADAR : Doit être placé TOUT EN HAUT !
// Ainsi, on voit la requête avant que quoi que ce soit ne la bloque.
app.use((req, res, next) => {
    console.log(`\n========================================`);
    console.log(`🌍 [REQUÊTE ENTRANTE] : ${req.method} ${req.originalUrl}`);
    next();
});

// 2. Middlewares de base
app.use(cors());
app.use(express.json());

// 3. DÉTECTEUR D'ERREUR JSON (C'est lui qui causait votre 400 fantôme)
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error("❌ ERREUR CRITIQUE : React a envoyé des données mal formatées !");
        return res.status(400).json({ message: "Données JSON illisibles par le serveur." });
    }
    next();
});

// 4. Les Routes
app.use('/api/devis', devisRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);

/* Note : J'ai retiré votre `app.get('/api/devis', verifierCleAPI...)` car 
la route `/api/devis` est déjà gérée à 100% par `devisRoutes` juste au-dessus. 
Avoir deux fois la même route crée des conflits ! */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré et écoute sur le port ${PORT}`));