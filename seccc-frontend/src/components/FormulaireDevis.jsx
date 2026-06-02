import React, { useState } from 'react';
import api from '../services/api.js';

const FormulaireDevis = () => {
  const [etape, setEtape] = useState(1);
  const [formData, setFormData] = useState({
    typeClient: '',      
    servicesChoisis: [], 
    nom: '',
    telephone: '',
    email: '',
    description: ''
  });
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectUnique = (champ, valeur) => {
    setFormData({ ...formData, [champ]: valeur });
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

  const etapeSuivante = () => {
    if (etape < 3) setEtape(etape + 1);
  };

  const etapePrecedente = () => {
    if (etape > 1) setEtape(etape - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.servicesChoisis.length === 0) {
      alert('Veuillez sélectionner au moins un service avant d’envoyer votre demande.');
      setEtape(2);
      return;
    }

    setEnvoiEnCours(true);

    try {
      // ⚡ On envoie formData PUREMENT tel quel, en parfaite harmonie avec le nouveau Backend
      const response = await api.post('/devis', formData);
      const message = response?.data?.message || `Votre demande de devis pour [${formData.servicesChoisis.join(', ')}] a été transmise avec succès !`;
      
      alert(message);
      
      setFormData({
        typeClient: '',
        servicesChoisis: [],
        nom: '',
        telephone: '',
        email: '',
        description: ''
      });
      setEtape(1);
    } catch (error) {
      console.error('Erreur lors de l’envoi du devis :', error);
      alert("Erreur 400 : Regardez le terminal de votre backend (VS Code) pour voir le texte rouge exact !");
    } finally {
      setEnvoiEnCours(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 font-sans">
      <div className="max-w-3xl mx-auto px-4">
        
        <div className="text-center mb-8">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-1">Devis Multicritères Gratuit</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            Parlez-nous de votre projet
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Sélectionnez un ou plusieurs besoins. Notre équipe SECCC vous recontactera rapidement.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* BARRE DE PROGRESSION */}
          <div className="bg-slate-900 px-6 py-6 border-b border-slate-800">
            <div className="flex items-center justify-between max-w-md mx-auto relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>
              <div 
                className="absolute left-0 top-1/2 h-0.5 bg-red-500 -translate-y-1/2 z-0 transition-all duration-300"
                style={{ width: etape === 1 ? '0%' : etape === 2 ? '50%' : '100%' }}
              ></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${etape >= 1 ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-slate-800 text-slate-400'}`}>1</div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1.5">Profil</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${etape >= 2 ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-slate-800 text-slate-400'}`}>2</div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1.5">Prestations</span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${etape === 3 ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-slate-800 text-slate-400'}`}>3</div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1.5">Contact</span>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit}>

              {/* ÉTAPE 1 : PROFIL CLIENT */}
              {etape === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-lg font-black text-slate-900 uppercase">Vous êtes ?</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div onClick={() => handleSelectUnique('typeClient', 'Particulier')} className={`p-6 rounded-2xl border-2 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${formData.typeClient === 'Particulier' ? 'border-red-500 bg-red-50/40 text-red-600 shadow-md' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}>
                      <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-lg ${formData.typeClient === 'Particulier' ? 'bg-red-500 text-white' : 'bg-slate-50 text-slate-400'}`}>🏠</div>
                      <span className="font-bold text-sm uppercase tracking-wider">Un Particulier</span>
                    </div>
                    <div onClick={() => handleSelectUnique('typeClient', 'Professionnel')} className={`p-6 rounded-2xl border-2 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${formData.typeClient === 'Professionnel' ? 'border-red-500 bg-red-50/40 text-red-600 shadow-md' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}>
                      <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-lg ${formData.typeClient === 'Professionnel' ? 'bg-red-500 text-white' : 'bg-slate-50 text-slate-400'}`}>🏢</div>
                      <span className="font-bold text-sm uppercase tracking-wider">Un Professionnel</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ÉTAPE 2 : CHOIX MULTIPLE */}
              {etape === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-lg font-black text-slate-900 uppercase">Quels sont vos besoins ?</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div onClick={() => handleToggleService('Plomberie')} className={`p-5 rounded-2xl border-2 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center relative ${formData.servicesChoisis.includes('Plomberie') ? 'border-red-500 bg-red-50/40 text-red-600 shadow-md' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}>
                      {formData.servicesChoisis.includes('Plomberie') && <span className="absolute top-2 right-3 text-red-600 font-bold text-xs">✓</span>}
                      <div className={`w-10 h-10 rounded-xl mb-2 flex items-center justify-center text-base ${formData.servicesChoisis.includes('Plomberie') ? 'bg-red-500 text-white' : 'bg-slate-50 text-slate-400'}`}>💧</div>
                      <span className="font-bold text-xs uppercase tracking-wider">Plomberie</span>
                    </div>
                    <div onClick={() => handleToggleService('Chauffage')} className={`p-5 rounded-2xl border-2 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center relative ${formData.servicesChoisis.includes('Chauffage') ? 'border-red-500 bg-red-50/40 text-red-600 shadow-md' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}>
                      {formData.servicesChoisis.includes('Chauffage') && <span className="absolute top-2 right-3 text-red-600 font-bold text-xs">✓</span>}
                      <div className={`w-10 h-10 rounded-xl mb-2 flex items-center justify-center text-base ${formData.servicesChoisis.includes('Chauffage') ? 'bg-red-500 text-white' : 'bg-slate-50 text-slate-400'}`}>🔥</div>
                      <span className="font-bold text-xs uppercase tracking-wider">Chauffage</span>
                    </div>
                    <div onClick={() => handleToggleService('Climatisation')} className={`p-5 rounded-2xl border-2 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center relative ${formData.servicesChoisis.includes('Climatisation') ? 'border-red-500 bg-red-50/40 text-red-600 shadow-md' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}>
                      {formData.servicesChoisis.includes('Climatisation') && <span className="absolute top-2 right-3 text-red-600 font-bold text-xs">✓</span>}
                      <div className={`w-10 h-10 rounded-xl mb-2 flex items-center justify-center text-base ${formData.servicesChoisis.includes('Climatisation') ? 'bg-red-500 text-white' : 'bg-slate-50 text-slate-400'}`}>❄️</div>
                      <span className="font-bold text-xs uppercase tracking-wider">Climatisation</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ÉTAPE 3 : COORDONNÉES */}
              {etape === 3 && (
                <div className="space-y-5">
                  <div className="text-center mb-4">
                    <h2 className="text-lg font-black text-slate-900 uppercase">Vos Coordonnées</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 tracking-wider">Nom complet *</label>
                      <input type="text" name="nom" required value={formData.nom} onChange={handleChange} placeholder="Yassine Frikha" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 tracking-wider">Téléphone *</label>
                      <input type="tel" name="telephone" required value={formData.telephone} onChange={handleChange} placeholder="+216 -- --- ---" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 tracking-wider">Adresse e-mail *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="exemple@gmail.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 tracking-wider">Description de votre projet</label>
                    <textarea name="description" rows="3" value={formData.description} onChange={handleChange} placeholder="Détaillez vos travaux..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 resize-none"></textarea>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                {etape > 1 ? (
                  <button type="button" onClick={etapePrecedente} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl">Retour</button>
                ) : <div />}

                {etape < 3 ? (
                  <button
                    type="button"
                    onClick={etapeSuivante}
                    disabled={etape === 1 ? !formData.typeClient : formData.servicesChoisis.length === 0}
                    className={`px-7 py-3 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md ${
                      (etape === 1 && !formData.typeClient) || (etape === 2 && formData.servicesChoisis.length === 0)
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                        : 'bg-red-600 hover:bg-red-700 shadow-red-600/10'
                    }`}
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={envoiEnCours}
                    className={`px-7 py-3 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-red-600/20 transition-all ${envoiEnCours ? 'bg-slate-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                  >
                    {envoiEnCours ? 'Envoi en cours...' : 'Envoyer ma demande'}
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaireDevis;