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
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      connectionTimeout: 4000,
      greetingTimeout: 4000,
      socketTimeout: 4000
    });

    // Définir les options de l'email
    const mailOptions = {
      from: `"SECCC Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Nouveau message de contact : ${name}`,
      text: `Vous avez reçu un nouveau message de ${name} (${email}, ${telephone}):\n\n${userMessage}`
    };

    // Envoyer l'email en arrière-plan sans bloquer
    transporter.sendMail(mailOptions).then(() => {
      console.log("✅ Message contact relayé par email avec succès !");
    }).catch(mailErr => {
      console.warn("⚠️ Impossible de relayer par email le message :", mailErr.message);
    });

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