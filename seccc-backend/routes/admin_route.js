const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // On vérifie si ce qui est tapé correspond au fichier .env
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        // Si oui, on crée le fameux "badge" (Token) valable 24 heures
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.status(200).json({ message: "Connexion réussie", token: token });
    } else {
        res.status(401).json({ message: "Identifiants incorrects" });
    }
});

module.exports = router;