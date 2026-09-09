const nodemailer = require('nodemailer');
// Conseil: require('dotenv').config(); min a7sen ta3melha mara wa7da fi server.js wala index.js mte3k

const envoyerEmailConfirmation = async (devis) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const servicesDemandes = devis.servicesChoisis && devis.servicesChoisis.length > 0 
            ? devis.servicesChoisis.join(', ') 
            : 'Non spécifié';

        // 1. Email au client (Confirmation)
        const mailClient = {
            from: `"SECCC Tunisie" <${process.env.EMAIL_USER}>`, 
            replyTo: process.env.EMAIL_USER,
            to: devis.email,
            subject: `Confirmation de votre demande de devis - SECCC`,
            text: `Bonjour ${devis.nom},\n\nNous vous confirmons la bonne réception de votre demande d'étude.\nUn conseiller technique vous contactera sous 24 à 48 heures au ${devis.telephone}.\n\nCordialement,\nL'équipe technique SECCC`,
            html: `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                <div style="background-color: #0f172a; padding: 30px 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px;">SECCC</h1>
                    <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Confirmation de votre demande</p>
                </div>
                <div style="padding: 35px 30px; background-color: #ffffff; color: #334155; line-height: 1.6;">
                    <h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Bonjour ${devis.nom},</h2>
                    <p style="font-size: 15px;">Nous vous confirmons la bonne réception de votre demande d'étude. Notre équipe technique est déjà en train d'analyser votre dossier.</p>
                    <div style="background-color: #f8fafc; border-left: 4px solid #e11d48; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                        <h3 style="margin-top: 0; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Récapitulatif de votre projet</h3>
                        <ul style="list-style-type: none; padding: 0; margin: 15px 0 0 0; font-size: 15px;">
                            <li style="margin-bottom: 10px;">👤 <strong>Profil :</strong> ${devis.typeClient || 'Non précisé'}</li>
                            <li style="margin-bottom: 10px;">🛠️ <strong>Prestations :</strong> ${servicesDemandes}</li>
                            <li style="margin-bottom: 10px;">🏢 <strong>Bâtiment :</strong> ${devis.typeBatiment || 'Non précisé'}</li>
                            <li style="margin-bottom: 10px;">📞 <strong>Téléphone :</strong> ${devis.telephone}</li>
                            <li style="margin-bottom: 10px;">📍 <strong>Adresse :</strong> ${devis.adresse || 'Non renseignée'}</li>
                            <li style="margin-bottom: 0;">📅 <strong>Date souhaitée :</strong> ${devis.dateSouhaitee || 'Non renseignée'}</li>
                        </ul>
                    </div>
                    <p style="font-size: 15px;">Un conseiller technique vous contactera très prochainement.</p>
                    <p style="font-size: 15px; margin-top: 30px;">Cordialement,<br><strong>L'équipe SECCC</strong></p>
                </div>
            </div>`
        };

        // 2. Email à l'administrateur (Notification)
        const mailAdmin = {
            from: `"Site Web SECCC" <${process.env.EMAIL_USER}>`, 
            to: process.env.EMAIL_USER, // S'envoie à lui-même
            replyTo: devis.email, // L'admin peut répondre directement au client
            subject: `🚨 NOUVELLE DEMANDE DE DEVIS : ${devis.nom}`,
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #e11d48; border-radius: 10px;">
                <h2 style="color: #e11d48;">Nouvelle demande d'étude technique !</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                    <div style="flex: 1; min-width: 250px;">
                        <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">Coordonnées</h3>
                        <p><strong>Nom :</strong> ${devis.nom}</p>
                        <p><strong>Profil :</strong> ${devis.typeClient || 'Non précisé'}</p>
                        <p><strong>Téléphone :</strong> <a href="tel:${devis.telephone}">${devis.telephone}</a></p>
                        <p><strong>Email :</strong> <a href="mailto:${devis.email}">${devis.email}</a></p>
                        <p><strong>Adresse :</strong> ${devis.adresse || 'Non renseignée'}</p>
                    </div>
                    <div style="flex: 1; min-width: 250px;">
                        <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">Détails Techniques</h3>
                        <p><strong>Prestations :</strong> ${servicesDemandes}</p>
                        <p><strong>Type de bâtiment :</strong> ${devis.typeBatiment || 'Non précisé'}</p>
                        <p><strong>Superficie :</strong> ${devis.superficie || 'Non précisée'}</p>
                        <p><strong>Urgence :</strong> <span style="color: #e11d48; font-weight: bold;">${devis.urgence || 'Non précisée'}</span></p>
                        <p><strong>Date souhaitée :</strong> ${devis.dateSouhaitee || 'Non renseignée'}</p>
                    </div>
                </div>
                <div style="background-color: #f1f5f9; padding: 15px; margin-top: 20px; border-radius: 5px;">
                    <strong>Description détaillée du projet :</strong><br/>
                    ${devis.description || 'Aucune description fournie.'}
                </div>
            </div>`
        };

        // Envoi des deux emails
        await transporter.sendMail(mailClient);
        await transporter.sendMail(mailAdmin);
        
        console.log("✅ Emails (Client + Admin) envoyés avec succès !");
        
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi des emails:", error);
        throw error;
    }
};

module.exports = envoyerEmailConfirmation;