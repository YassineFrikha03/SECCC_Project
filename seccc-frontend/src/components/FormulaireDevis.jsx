import React, { useState } from 'react';
import api from '../services/api.js';
import { Link } from 'react-router-dom';

const FormulaireDevis = () => {
  const [formData, setFormData] = useState({
    typeClient: '',      
    servicesChoisis: [],
    typeBatiment: '',
    superficie: '',
    urgence: '',
    nom: '',
    telephone: '',
    email: '',
    adresse: '',
    dateSouhaitee: '',
    description: ''
  });
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectUnique = (champ, valeur) => {
    // Permet de désélectionner si on clique sur le même élément
    if (formData[champ] === valeur) {
      setFormData({ ...formData, [champ]: '' });
    } else {
      setFormData({ ...formData, [champ]: valeur });
    }
  };

  const handleToggleService = (service) => {
    const { servicesChoisis } = formData;
    if (servicesChoisis.includes(service)) {
      setFormData({
        ...formData,
        servicesChoisis: servicesChoisis.filter(s => s !== service)
      });
    } else {
      setFormData({
        ...formData,
        servicesChoisis: [...servicesChoisis, service]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEnvoiEnCours(true);

    try {
      const response = await api.post('/devis', formData);
      const message = response?.data?.message || `Votre demande a été transmise avec succès ! Nous vous contacterons très vite.`;
      
      alert(message);
      
      setFormData({
        typeClient: '',
        servicesChoisis: [],
        typeBatiment: '',
        superficie: '',
        urgence: '',
        nom: '',
        telephone: '',
        email: '',
        adresse: '',
        dateSouhaitee: '',
        description: ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Erreur lors de l’envoi du devis :', error);
      alert("Erreur lors de l'envoi. Veuillez réessayer ou nous contacter par téléphone.");
    } finally {
      setEnvoiEnCours(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col lg:flex-row pt-24 lg:pt-0">
      
      {/* ==========================================
          PANNEAU GAUCHE (Sticky sur Desktop)
          ========================================== */}
      <div className="lg:w-[40%] bg-slate-950 text-white relative lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between overflow-hidden shadow-2xl z-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=1974')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950"></div>
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 blur-[100px] rounded-full"></div>

        <div className="relative z-10 p-8 lg:p-16 pt-12 lg:pt-32">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-12">
            <span>←</span> Retour à l'accueil
          </Link>
          
          <span className="inline-block py-1.5 px-4 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-black uppercase tracking-widest mb-6">
            Étude personnalisée
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter mb-6">
            Décrivez-nous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">votre projet</span>.
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-md font-medium mb-12">
            Notre bureau d'études analyse vos besoins en fluides et génie climatique pour vous proposer une solution technique sur-mesure et chiffrée.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500">⚡</div>
              <div>
                <p className="text-white font-bold text-sm">Réponse rapide</p>
                <p className="text-slate-500 text-xs">Sous 24h à 48h ouvrées</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500">🛡️</div>
              <div>
                <p className="text-white font-bold text-sm">Expertise certifiée</p>
                <p className="text-slate-500 text-xs">+20 ans de savoir-faire technique</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 p-8 lg:p-16 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Besoin d'aide immédiate ?</p>
          <div className="flex flex-col gap-2">
            <a href="tel:+21652391917" className="text-white font-medium hover:text-red-400 transition-colors text-lg flex items-center gap-3">
              <span className="text-red-500 text-sm">📞</span> +216 52 391 917
            </a>
            <a href="mailto:seccc.fluide@gmail.com" className="text-white font-medium hover:text-red-400 transition-colors text-lg flex items-center gap-3">
              <span className="text-red-500 text-sm">✉️</span> seccc.fluide@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* ==========================================
          PANNEAU DROIT (Formulaire Scrollable)
          ========================================== */}
      <div className="lg:w-[60%] p-6 sm:p-12 lg:p-20 lg:py-32">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* BLOC 1 : PROFIL (OPTIONNEL) */}
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-300"></div>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">1. Votre profil</h2>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">Optionnel</span>
              </div>
              <p className="text-xs text-slate-500 mb-8 font-medium">Êtes-vous un particulier ou représentez-vous une entreprise ?</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => handleSelectUnique('typeClient', 'Particulier')} 
                  className={`group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                    formData.typeClient === 'Particulier' 
                      ? 'border-red-500 bg-red-50/50 shadow-md' 
                      : 'border-slate-100 bg-slate-50/50 hover:border-red-200 hover:bg-white'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 ${formData.typeClient === 'Particulier' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white text-slate-400 shadow-sm group-hover:text-red-400'}`}>
                    🏠
                  </div>
                  <div>
                    <span className={`block font-black text-sm uppercase tracking-wider ${formData.typeClient === 'Particulier' ? 'text-red-700' : 'text-slate-700'}`}>Particulier</span>
                    <span className="text-[10px] text-slate-500 font-medium">Logement, villa...</span>
                  </div>
                </div>
                
                <div 
                  onClick={() => handleSelectUnique('typeClient', 'Professionnel')} 
                  className={`group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                    formData.typeClient === 'Professionnel' 
                      ? 'border-red-500 bg-red-50/50 shadow-md' 
                      : 'border-slate-100 bg-slate-50/50 hover:border-red-200 hover:bg-white'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 ${formData.typeClient === 'Professionnel' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white text-slate-400 shadow-sm group-hover:text-red-400'}`}>
                    🏢
                  </div>
                  <div>
                    <span className={`block font-black text-sm uppercase tracking-wider ${formData.typeClient === 'Professionnel' ? 'text-red-700' : 'text-slate-700'}`}>Professionnel</span>
                    <span className="text-[10px] text-slate-500 font-medium">Industrie, tertiaire...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BLOC 2 : PRESTATIONS (OPTIONNEL) */}
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-300"></div>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">2. Domaines d'intervention</h2>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">Optionnel</span>
              </div>
              <p className="text-xs text-slate-500 mb-8 font-medium">Sélectionnez le ou les services dont vous avez besoin (si vous le savez déjà).</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'Plomberie', icon: '💧', label: 'Plomberie' },
                  { id: 'Chauffage', icon: '🔥', label: 'Chauffage' },
                  { id: 'Climatisation', icon: '❄️', label: 'Climatisation' }
                ].map((service) => {
                  const isSelected = formData.servicesChoisis.includes(service.id);
                  return (
                    <div 
                      key={service.id}
                      onClick={() => handleToggleService(service.id)} 
                      className={`group p-5 rounded-2xl border-2 text-center cursor-pointer transition-all duration-300 flex flex-col items-center relative ${
                        isSelected 
                          ? 'border-red-500 bg-red-50/50 shadow-md' 
                          : 'border-slate-100 bg-slate-50/50 hover:border-red-200 hover:bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md animate-in zoom-in duration-200">
                          ✓
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 ${isSelected ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white text-slate-400 shadow-sm group-hover:text-red-400'}`}>
                        {service.icon}
                      </div>
                      <span className={`font-black text-xs uppercase tracking-wider ${isSelected ? 'text-red-700' : 'text-slate-700'}`}>{service.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BLOC 3 : DÉTAILS DU PROJET (NOUVEAU) */}
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">3. Détails du projet</h2>
              <p className="text-xs text-slate-500 mb-8 font-medium">Aidez-nous à mieux comprendre l'ampleur de votre besoin.</p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest group-focus-within:text-red-600 transition-colors">Type de Bâtiment</label>
                    <div className="relative">
                      <select name="typeBatiment" value={formData.typeBatiment} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all appearance-none cursor-pointer">
                        <option value="">Sélectionnez un type</option>
                        <option value="Villa / Maison">Villa / Maison</option>
                        <option value="Appartement">Appartement</option>
                        <option value="Immeuble Résidentiel">Immeuble Résidentiel</option>
                        <option value="Bureaux / Tertiaire">Bureaux / Tertiaire</option>
                        <option value="Usine / Industriel">Usine / Industriel</option>
                        <option value="Hôtel / Clinique">Hôtel / Clinique</option>
                        <option value="Autre">Autre</option>
                      </select>
                      <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">▼</div>
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest group-focus-within:text-red-600 transition-colors">Superficie estimée</label>
                    <div className="relative">
                      <select name="superficie" value={formData.superficie} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all appearance-none cursor-pointer">
                        <option value="">Sélectionnez une surface</option>
                        <option value="Moins de 100 m²">Moins de 100 m²</option>
                        <option value="De 100 à 300 m²">De 100 à 300 m²</option>
                        <option value="De 300 à 1000 m²">De 300 à 1000 m²</option>
                        <option value="Plus de 1000 m²">Plus de 1000 m²</option>
                      </select>
                      <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">▼</div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest group-focus-within:text-red-600 transition-colors">Urgence de l'intervention</label>
                  <div className="flex flex-wrap gap-3">
                    {['Panne critique', 'Projet urgent (1-2 mois)', 'Étude (3-6 mois)', 'Sans urgence'].map(u => (
                      <button 
                        type="button"
                        key={u}
                        onClick={() => handleSelectUnique('urgence', u)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                          formData.urgence === u 
                            ? 'bg-red-500 text-white border-red-500' 
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-red-300'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest group-focus-within:text-red-600 transition-colors">Description détaillée du projet</label>
                  <textarea name="description" rows="5" value={formData.description} onChange={handleChange} placeholder="Nature des locaux, contraintes techniques particulières, ou ce dont vous avez besoin précisément..." className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* BLOC 4 : COORDONNÉES */}
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">4. Informations de contact</h2>
              <p className="text-xs text-slate-500 mb-8 font-medium">Où pouvons-nous vous joindre pour vous envoyer l'étude ?</p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest group-focus-within:text-red-600 transition-colors">Nom complet *</label>
                    <input type="text" name="nom" required value={formData.nom} onChange={handleChange} placeholder="ex: Yassine Frikha" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all" />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest group-focus-within:text-red-600 transition-colors">Téléphone *</label>
                    <input type="tel" name="telephone" required value={formData.telephone} onChange={handleChange} placeholder="ex: +216 -- --- ---" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest group-focus-within:text-red-600 transition-colors">Adresse e-mail *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="ex: contact@entreprise.com" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all" />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest group-focus-within:text-red-600 transition-colors">Ville / Adresse du projet</label>
                    <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="ex: Z.I. Charguia, Tunis" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* BOUTON D'ENVOI */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={envoiEnCours}
                className={`w-full group relative overflow-hidden px-8 py-5 text-white text-sm font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 ${
                  envoiEnCours 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-red-600 to-red-500 shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-1'
                }`}
              >
                {!envoiEnCours && <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>}
                
                {envoiEnCours ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Transmission en cours...
                  </>
                ) : (
                  <>
                    Envoyer ma demande d'étude <span>→</span>
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-4">
                Vos données sont sécurisées et strictement confidentielles.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default FormulaireDevis;