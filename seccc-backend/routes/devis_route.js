const express = require('express');
const router = express.Router();
const Devis = require('../models/devis.js');
const envoyerEmailConfirmation = require('../utiles/send_email.js');
const multer = require('multer');
const nodemailer = require('nodemailer');

// On force express à lire le fichier .env
require('dotenv').config();

// ==========================================
// 1. Route POST : Créer un nouveau devis (Côté Client)
// ==========================================
router.post('/', async (req, res) => {
    try {
        console.log("📥 Données reçues depuis React :", req.body);

        // Étape 1 : Sauvegarde dans MongoDB
        const nouveauDevis = new Devis(req.body);
        const devisEnregistre = await nouveauDevis.save();
        
        console.log("✅ Devis sauvegardé avec succès dans la base de données !");

        // Étape 2 : Envoi de l'email de confirmation (Isolé dans un try/catch)
        try {
            envoyerEmailConfirmation(devisEnregistre).catch(err => {
                console.error("⚠️ Le devis est enregistré, mais l'email a échoué en arrière-plan :", err.message);
            });
            console.log("📧 Processus d'envoi d'email lancé en arrière-plan !");
        } catch (emailError) {
            console.error("⚠️ Erreur au lancement de l'email :", emailError.message);
        }

        // On répond un succès à React (201) IMMÉDIATEMENT sans attendre l'email
        res.status(201).json({ message: "Devis créé avec succès !", devis: devisEnregistre });

    } catch (error) {
        // C'est ICI que s'affiche la vraie erreur Mongoose si la donnée est refusée
        console.error("❌ ERREUR DE BASE DE DONNÉES :", error.message);
        res.status(400).json({ message: "Erreur lors de la création du devis", erreur: error.message });
    }
});

// ==========================================
// 2. Route GET : Récupérer TOUS les devis
// ==========================================
router.get('/', async (req, res) => {
    try {
        const tousLesDevis = await Devis.find().sort({ createdAt: -1 });
        res.status(200).json(tousLesDevis);
    } catch (error) {
        res.status(500).json({ message: "Erreur", erreur: error.message });
    }
});

// ==========================================
// 3. Route PUT : Mettre à jour un devis
// ==========================================
router.put('/:id', async (req, res) => {
    try {
        const devisMisAJour = await Devis.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!devisMisAJour) {
            return res.status(404).json({ message: "Devis introuvable" });
        }
        res.status(200).json({ message: "Devis mis à jour", devis: devisMisAJour });
    } catch (error) {
        res.status(400).json({ message: "Erreur de mise à jour", erreur: error.message });
    }
});

// ==========================================
// 4. Route DELETE : Supprimer un devis définitivement
// ==========================================
router.delete('/:id', async (req, res) => {
    try {
        const devisSupprime = await Devis.findByIdAndDelete(req.params.id);
        if (!devisSupprime) {
            return res.status(404).json({ message: "Devis introuvable" });
        }
        res.status(200).json({ message: "Devis supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", erreur: error.message });
    }
});

// ==========================================
// 5. Route GET : Recuperer un devis par nom
// ==========================================
router.get('/nom/:nomClient', async (req, res) => {
    try {
        const nomRecherche = req.params.nomClient;
        const devisTrouves = await Devis.find({ nom: nomRecherche }).sort({ createdAt: -1 });
        if (devisTrouves.length === 0) {
            return res.status(404).json({ message: "Aucun devis trouvé pour ce nom exact." });
        }
        res.status(200).json({ message: `${devisTrouves.length} devis trouvé(s)`, donnees: devisTrouves });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", erreur: error.message });
    }
});

// ==========================================
// 6. Route DELETE : Supprimer un devis par nom
// ==========================================
router.delete('/nom/:nomClient', async (req, res) => {
    try {
        const nomRecherche = req.params.nomClient;
        const result = await Devis.deleteMany({ nom: nomRecherche });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Aucun devis trouvé pour ce nom exact." });
        }
        res.status(200).json({ message: `${result.deletedCount} devis supprimé(s) pour le nom "${nomRecherche}".` });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", erreur: error.message });
    }
});

// Configuration de Multer pour le PDF
const upload = multer({ storage: multer.memoryStorage() });

// ==========================================
// 7. ROUTE : L'ADMIN ENVOIE UN DEVIS PDF AU CLIENT
// ==========================================
router.post('/:id/send-pdf', upload.single('pdf'), async (req, res) => {
  try {
    const devis = await Devis.findById(req.params.id);
    if (!devis) {
      return res.status(404).json({ erreur: "Devis introuvable" });
    }

    const fichier = req.file;
    if (!fichier) {
      return res.status(400).json({ erreur: "Aucun fichier PDF n'a été fourni" });
    }

    // Vérification dans la console du backend
    console.log("🛠️ VERIFICATION EMAIL :", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: devis.email,
      subject: `Votre devis SECCC - Projet : ${devis.typeBien || devis.servicesChoisis}`,
      text: `Bonjour ${devis.nom},\n\nSuite à votre demande, veuillez trouver ci-joint votre devis en format PDF.\n\nRestant à votre disposition pour toute question,\n\nCordialement,\nL'équipe SECCC`,
      attachments: [
        {
          filename: fichier.originalname,
          content: fichier.buffer
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Devis PDF envoyé avec succès au client !" });

  } catch (error) {
    console.error("Erreur d'envoi du devis PDF:", error);
    res.status(500).json({ erreur: "Erreur serveur lors de l'envoi de l'email" });
  }
});

module.exports = router;