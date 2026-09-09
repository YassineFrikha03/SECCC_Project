require('dotenv').config();
const envoyerEmailConfirmation = require('./utiles/send_email');

const devisTest = {
    nom: "Test Agent",
    typeClient: "Particulier",
    telephone: "+216 55 555 555",
    email: "yassine@example.com", // Mettre un faux email ou un vrai pour tester
    servicesChoisis: ["Plomberie"],
    typeBatiment: "Villa",
    superficie: "Moins de 100 m²",
    urgence: "Sans urgence",
    adresse: "Tunis",
    dateSouhaitee: "Dès que possible",
    description: "Ceci est un test."
};

console.log("Tentative d'envoi d'email avec :", process.env.EMAIL_USER);

envoyerEmailConfirmation(devisTest)
    .then(() => console.log("Test réussi !"))
    .catch(err => console.error("Erreur détaillée lors du test :", err));
