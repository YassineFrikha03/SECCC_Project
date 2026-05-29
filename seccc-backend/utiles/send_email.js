const nodemailer = require('nodemailer');

const envoyerEmailConfirmation = async (devis) => {
    try {
        console.log("---- TENTATIVE D'ENVOI D'EMAIL EN COURS ----");
        // 1. Configurer le "transporteur" (celui qui livre le mail)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Vous pouvez utiliser Outlook, Yahoo, etc.
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // 2. Préparer le contenu de l'e-mail pour le client
        const mailOptionsClient = {
            from: `"SECCC Contact" <${process.env.EMAIL_USER}>`,
            to: devis.email, // L'e-mail tapé par le client dans le formulaire
            subject: 'Confirmation de votre demande de devis - SECCC',
            html: `
                <h2>Bonjour ${devis.nom},</h2>
                <p>Nous avons bien reçu votre demande de devis pour votre projet de type <strong>${devis.typeBien}</strong>.</p>
                <p>Notre équipe technique va étudier votre demande et vous contactera sous 24h au <strong>${devis.telephone}</strong>.</p>
                <br/>
                <p>Cordialement,</p>
                <p><strong>L'équipe SECCC</strong></p>
            `
        };

        // 3. Envoyer l'e-mail
        await transporter.sendMail(mailOptionsClient);
        console.log(`E-mail de confirmation envoyé à ${devis.email}`);

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
    }
};
module.exports = envoyerEmailConfirmation;