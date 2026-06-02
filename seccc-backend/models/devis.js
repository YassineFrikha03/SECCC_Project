const mongoose = require('mongoose');

const devisSchema = mongoose.Schema({
    typeClient: { type: String, required: true },
    
    // ⚡ MODIFIÉ : Accepte directement le tableau envoyé par React
    servicesChoisis: { type: [String], required: true }, 
    
    nom: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { 
        type: String, 
        required: true,
        match: [/^\+?[0-9\s\-\.\(\)]{8,20}$/, 'Le numéro de téléphone est invalide'] 
    },
    
    // ⚡ AJOUTÉ : Permet de sauvegarder le texte tapé par le client
    description: { type: String, default: '' },
    
    // NOUVEAU CHAMP POUR L'ADMIN :
    statut: { type: String, default: 'Nouveau' }

    // Le champ "adresse" a été complètement supprimé pour ne plus bloquer
    // Le champ "typeBien" a été remplacé par "servicesChoisis"
}, {
    timestamps: true
});

module.exports = mongoose.model('Devis', devisSchema);