const express = require('express');
const cors = require('cors');
const message = require('../models/message');
const nodemailer = require('nodemailer');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/', async (req, res) => {
  const { name, email, telephone, message: userMessage } = req.body;

  try {
    // Enregistrer le message dans la base de données
    const nouveauMessage = new message({ name, email, telephone, message: userMessage });
    await nouveauMessage.save();

    // Configurer le transporteur pour envoyer l'email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Définir les options de l'email
    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: process.env.EMAIL_ADMIN,
      subject: 'Nouveau message de contact',
      text: `Vous avez reçu un nouveau message de ${name} (${email}, ${telephone}):\n\n${userMessage}`
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error("🚨 ERREUR DÉTAILLÉE DU BACKEND :", error);
    console.error('Erreur lors de l\'envoi du message:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des messages' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const messageSupprime = await message.findByIdAndDelete(req.params.id);
    
    if (!messageSupprime) {
      return res.status(404).json({ message: "Message introuvable" });
    }
    res.status(200).json({ message: "Message supprimé avec succès" });
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du message' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const messageMisAJour = await message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!messageMisAJour) {
      return res.status(404).json({ message: "Message introuvable" });
    }
    res.status(200).json({ message: "Message mis à jour", message: messageMisAJour });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error);
    res.status(400).json({ message: 'Erreur lors de la mise à jour du message' });
  }
});

router.get('/:nom', async (req, res) => {
  try {
    const messages = await message.find({ name: req.params.nom }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages par nom:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des messages par nom' });
  }
});

const messageRoutes = router;
module.exports = messageRoutes;