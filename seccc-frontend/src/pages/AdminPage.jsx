import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import api from '../services/api.js';
import * as faceapi from 'face-api.js';

const AdminPage = () => {
  const [listeDevis, setListeDevis] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // États pour le scan de visage
  const [modeScan, setModeScan] = useState(false);
  const [statusScan, setStatusScan] = useState("Chargement de l'IA...");
  const videoRef = useRef();

  // Chargement initial des devis
  useEffect(() => {
    const fetchDevis = async () => {
      try {
        const response = await api.get('/devis');
        setListeDevis(response.data);
        setChargement(false);
      } catch (err) {
        console.error("Erreur de récupération :", err);
        setErreur("Impossible de charger les devis. Vérifiez que le backend is allumé.");
        setChargement(false);
      }
    };
    fetchDevis();
  }, []);

  // Fonction de suppression d'un devis
  const handleDelete = async (id) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce devis définitivement ?");
    if (confirmation) {
      try {
        await api.delete(`/devis/${id}`);
        setListeDevis(listeDevis.filter((devis) => devis._id !== id));
      } catch (error) {
        console.error("Erreur serveur lors de la suppression :", error);
        alert("Erreur lors de la suppression du devis.");
      }
    }
  };

  // Fonction d'envoi du PDF
  const handleSendPdf = async (idDevis, nomClient, fichierPdf) => {
    if (!fichierPdf) return;

    const confirmation = window.confirm(`Voulez-vous vraiment envoyer un devis à ${nomClient} ?`);
    if (!confirmation) return;

    const nomFormate = nomClient.trim().replace(/\s+/g, '_').toLowerCase();
    const nouveauNomFichier = `devis_seccc_${nomFormate}.pdf`;
    const fichierRenomme = new File([fichierPdf], nouveauNomFichier, { type: fichierPdf.type });

    const formData = new FormData();
    formData.append('pdf', fichierRenomme);

    try {
      alert("Envoi en cours, veuillez patienter...");
      await api.post(`/devis/${idDevis}/send-pdf`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(`✅ Le devis (${nouveauNomFichier}) a été envoyé avec succès par email à ${nomClient} !`);
    } catch (error) {
      console.error("Erreur lors de l'envoi du PDF :", error);
      alert("❌ Une erreur s'est produite lors de l'envoi de l'email.");
    }
  };

  // ==========================================
  // ⚡ ENREGISTREMENT FACE ID INTERNE
  // ==========================================
  
  // 1. Ouvrir la modale et charger les modèles
  const ouvrirConfigurationFaceID = async () => {
    setModeScan(true);
    setStatusScan("Chargement de l'Intelligence Artificielle...");
    
    try {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      setStatusScan("IA prête. Cliquez sur 'Allumer la caméra'.");
    } catch (err) {
      console.error(err);
      setStatusScan("❌ Erreur : Impossible de charger les modèles. Vérifiez le dossier public/models.");
    }
  };

  // 2. Allumer la webcam
  const demarrerCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStatusScan("Caméra allumée. Regardez l'objectif et cliquez sur Scanner.");
        }
      })
      .catch((err) => {
        console.error("Erreur caméra :", err);
        setStatusScan("❌ Impossible d'accéder à la caméra.");
      });
  };

  // 3. Scanner et sauvegarder le visage
  const scannerEtEnregistrer = async () => {
    setStatusScan("Analyse en cours... Veuillez patienter.");
    
    try {
      const detection = await faceapi.detectSingleFace(videoRef.current)
                                     .withFaceLandmarks()
                                     .withFaceDescriptor();

      if (detection) {
        const empreinte = Array.from(detection.descriptor);
        // Sauvegarde locale du visage maître
        localStorage.setItem('adminVisage', JSON.stringify(empreinte));
        setStatusScan("✅ Visage enregistré avec succès ! Vous pouvez fermer cette fenêtre.");
        arreterCamera();
      } else {
        setStatusScan("❌ Aucun visage détecté. Éclairez bien votre visage.");
      }
    } catch (err) {
      setStatusScan("❌ Erreur lors de l'analyse.");
    }
  };

  // 4. Arrêter proprement la caméra
  const arreterCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const fermerModale = () => {
    arreterCamera();
    setModeScan(false);
  };

  // ==========================================

  // Filtrage
  const filteredDevis = listeDevis.filter((devis) => {
    const nomClient = devis.nom || "";
    return nomClient.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    /* 🛠️ MODIFICATION ICI : Changement de py-12 en pt-28 pb-12 pour passer sous la Navbar fixe */
    <div className="max-w-7xl mx-auto px-4 pt-28 pb-12 sm:px-6 lg:px-8 relative">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Tableau de bord</h1>
          <p className="text-gray-500 mt-1">Gestion des demandes de devis reçues.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          
          {/* BOUTON CONFIGURATION FACE ID */}
          <button 
            onClick={ouvrirConfigurationFaceID}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-slate-900 transition-colors flex items-center gap-2 border border-slate-700"
            title="Enregistrer votre visage pour la touche P"
          >
            <span className="text-lg">🧑‍💻</span> Configurer Face ID
          </button>

          <Link 
            to="/admin-seccc/facture"
            className="bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-red-800 transition-colors flex items-center gap-2"
          >
            📝 Créer une Facture
          </Link>

          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold border border-blue-100 shadow-sm">
            Total : {filteredDevis.length} demande(s)
          </div>
        </div>
      </div>

      {chargement && <p className="text-center text-gray-500 py-10 animate-pulse">Chargement des données en cours...</p>}
      {erreur && <p className="text-center text-red-500 bg-red-50 p-4 rounded-lg border border-red-200">{erreur}</p>}

      {!chargement && !erreur && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
            <span className="text-gray-500 mr-3 font-medium">Rechercher :</span>
            <input
              type="text"
              placeholder="Filtrer par nom de client..."
              className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type / Projet</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                
                {filteredDevis.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500 font-medium">
                      {listeDevis.length === 0 ? "Aucune demande." : "Aucun client trouvé."}
                    </td>
                  </tr>
                )}

                {filteredDevis.map((devis) => (
                  <tr key={devis._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-secondary text-base">{devis.nom}</div>
                      <div className="text-sm text-gray-500 font-medium">{devis.typeClient}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{devis.email}</div>
                      <div className="text-sm text-gray-500">{devis.telephone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-red-100 text-red-800 mb-2 shadow-sm">
                        {devis.typeBien || devis.servicesChoisis}
                      </span>
                      <div className="text-sm text-gray-600 truncate max-w-xs font-medium" title={devis.adresse || devis.description}>
                        📍 {devis.adresse || "Adresse non spécifiée"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-3">
                        <label className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md font-bold text-sm transition-colors border border-blue-200 hover:border-blue-600 shadow-sm">
                          Envoyer Devis PDF
                          <input 
                            type="file" 
                            accept=".pdf" 
                            className="hidden" 
                            onChange={(e) => {
                              handleSendPdf(devis._id, devis.nom, e.target.files[0]);
                              e.target.value = null; 
                            }} 
                          />
                        </label>
                        <button 
                          onClick={() => handleDelete(devis._id)}
                          className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md font-bold text-sm transition-colors border border-red-200 hover:border-red-600 shadow-sm"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= MODALE FACE ID ================= */}
      {modeScan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center relative border border-slate-200">
            <button onClick={fermerModale} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 font-bold text-xl">✕</button>
            
            <h2 className="text-2xl font-black text-slate-900 mb-2">Configuration Face ID</h2>
            <p className="text-sm text-slate-500 mb-6 font-medium bg-slate-50 p-3 rounded-lg">{statusScan}</p>
            
            <div className="relative w-full h-64 bg-black rounded-xl overflow-hidden mb-6 border-4 border-slate-200 shadow-inner">
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                className="w-full h-full object-cover transform scale-x-[-1]" 
              />
            </div>
            
            <div className="flex gap-3 justify-center">
              <button 
                onClick={demarrerCamera} 
                className="px-5 py-3 bg-slate-800 hover:bg-black text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all"
              >
                1. Allumer Caméra
              </button>
              <button 
                onClick={scannerEtEnregistrer} 
                className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all"
              >
                2. Scanner
              </button>
            </div>
          </div>
        </div>
      )}
      {/* =================================================== */}

    </div>
  );
};

export default AdminPage;