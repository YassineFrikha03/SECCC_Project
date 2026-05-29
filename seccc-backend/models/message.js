const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'nouveau' }, // Pour votre espace Admin (lu/non lu)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);