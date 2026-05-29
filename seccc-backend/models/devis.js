const mongoose = require('mongoose');

const devisSchema = mongoose.Schema({
    typeClient: { type: String, required: true },
    typeBien: { type: String, required: true },
    nom: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { 
        type: String, 
        required: true,
        match: [/^\+?[0-9\s\-\.\(\)]{8,20}$/, 'Le numéro de téléphone est invalide'] 
    },
    adresse: { type: String, required: true },
    // NOUVEAU CHAMP POUR L'ADMIN :
    statut: { type: String, default: 'Nouveau' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Devis', devisSchema);