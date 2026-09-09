const mongoose = require('mongoose');

const devisSchema = mongoose.Schema({
    typeClient: { type: String, default: '' },
    
    // ⚡ MODIFIÉ : Accepte directement le tableau envoyé par React
    servicesChoisis: { type: [String], default: [] }, 
    
    nom: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { 
        type: String, 
        required: true,
        match: [/^\+?[0-9\s\-\.\(\)]{8,20}$/, 'Le numéro de téléphone est invalide'] 
    },
    
    // NOUVEAUX CHAMPS D'ÉVALUATION PROFESSIONNELLE :
    typeBatiment: { type: String, default: '' },
    superficie: { type: String, default: '' },
    urgence: { type: String, default: '' },
    
    // ⚡ AJOUTÉ : Permet de sauvegarder le texte tapé par le client
    description: { type: String, default: '' },
    
    // NOUVELLES INFORMATIONS :
    adresse: { type: String, default: '' },
    dateSouhaitee: { type: String, default: '' },
    
    // NOUVEAU CHAMP POUR L'ADMIN :
    statut: { type: String, default: 'Nouveau' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Devis', devisSchema);