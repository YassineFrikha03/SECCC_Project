const nodemailer = require('nodemailer');
require('dotenv').config();

const envoyerEmailConfirmation = async (devis) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // On transforme le tableau de services en un beau texte propre
        const servicesDemandes = devis.servicesChoisis && devis.servicesChoisis.length > 0 
            ? devis.servicesChoisis.join(', ') 
            : 'Non spécifié';

        // Message de l'email en HTML stylisé (Design moderne et professionnel)
        const mailOptions = {
            from: `"SECCC Tunisie" <${process.env.EMAIL_USER}>`, // Expéditeur plus pro
            to: devis.email,
            subject: `Confirmation de votre demande de devis - SECCC`,
            html: `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                
                <div style="background-color: #0f172a; padding: 30px 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px;">SECCC</h1>
                    <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Société d'Équipement Chauffage Centrale et Climatisation</p>
                </div>
                
                <div style="padding: 35px 30px; background-color: #ffffff; color: #334155; line-height: 1.6;">
                    <h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Bonjour ${devis.nom},</h2>
                    <p style="font-size: 15px;">Nous vous confirmons la bonne réception de votre demande de devis. Notre équipe technique est déjà en train d'analyser votre dossier.</p>
                    
                    <div style="background-color: #f8fafc; border-left: 4px solid #e11d48; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                        <h3 style="margin-top: 0; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Récapitulatif de votre projet</h3>
                        <ul style="list-style-type: none; padding: 0; margin: 15px 0 0 0; font-size: 15px;">
                            <li style="margin-bottom: 10px;">👤 <strong>Profil :</strong> ${devis.typeClient}</li>
                            <li style="margin-bottom: 10px;">🛠️ <strong>Prestations :</strong> ${servicesDemandes}</li>
                            <li style="margin-bottom: 0;">📞 <strong>Téléphone :</strong> ${devis.telephone}</li>
                        </ul>
                    </div>
                    
                    <p style="font-size: 15px;">Un conseiller technique vous contactera sous <strong>24 à 48 heures</strong> au <strong>${devis.telephone}</strong> pour discuter des détails de votre projet et vous proposer une offre sur-mesure.</p>
                    
                    <p style="font-size: 15px; margin-top: 30px;">Cordialement,</p>
                    <p style="font-weight: 800; color: #0f172a; margin-top: 5px; font-size: 16px;">L'équipe technique SECCC</p>
                </div>
                
                <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0;">14 Rue Ibn Elhani Immeuble IRIS, Ariana - 2080 Tunis</p>
                    <p style="margin: 5px 0 0 0;">Tél : +216 52 391 917</p>
                    <p style="margin: 15px 0 0 0;">© ${new Date().getFullYear()} SECCC. Tous droits réservés.</p>
                </div>
            </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Email HTML professionnel envoyé avec succès !");
        
    } catch (error) {
        console.error("❌ Erreur d'envoi d'email de confirmation:", error);
        throw error;
    }
};

module.exports = envoyerEmailConfirmation;