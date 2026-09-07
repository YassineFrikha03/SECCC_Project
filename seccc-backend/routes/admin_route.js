const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');

// Stockage temporaire du PIN (pourrait être en BDD mais en mémoire suffit pour ce cas d'usage)
let currentPinCode = null;
let pinExpiration = null;

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

// ==========================================
// ⚡ ROUTES DE SÉCURITÉ : MODIFICATION MOT DE PASSE
// ==========================================

router.post('/request-password-change', async (req, res) => {
    try {
        // 1. Générer un PIN à 6 chiffres
        currentPinCode = Math.floor(100000 + Math.random() * 900000).toString();
        pinExpiration = Date.now() + 10 * 60 * 1000; // Valable 10 minutes

        // 2. Configurer Nodemailer avec les identifiants existants
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // 3. Envoyer l'email
        const mailOptions = {
            from: `"Sécurité SECCC" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // L'admin reçoit le mail sur sa propre boîte
            subject: `Code de sécurité - Changement de mot de passe`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
                <h2 style="color: #0f172a;">Demande de changement de mot de passe</h2>
                <p>Quelqu'un a demandé à changer le mot de passe maître de l'espace d'administration SECCC.</p>
                <p>Voici votre code de sécurité (valable 10 minutes) :</p>
                <div style="background: #f8fafc; border: 2px dashed #cbd5e1; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #ef4444; border-radius: 8px;">
                    ${currentPinCode}
                </div>
                <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Si vous n'êtes pas à l'origine de cette demande, ignorez cet email. Votre espace reste sécurisé.</p>
            </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Code envoyé avec succès par email." });
    } catch (error) {
        console.error("Erreur envoi email PIN:", error);
        res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
    }
});

router.post('/verify-password-change', (req, res) => {
    const { pin } = req.body;
    
    if (!currentPinCode || !pinExpiration) {
        return res.status(400).json({ message: "Aucune demande de changement en cours." });
    }
    
    if (Date.now() > pinExpiration) {
        currentPinCode = null; // Invalider le vieux code
        return res.status(400).json({ message: "Le code a expiré. Veuillez recommencer." });
    }

    if (pin === currentPinCode) {
        currentPinCode = null; // Réinitialisation par sécurité après succès
        return res.status(200).json({ message: "Code vérifié avec succès." });
    } else {
        return res.status(401).json({ message: "Code incorrect." });
    }
});

module.exports = router;