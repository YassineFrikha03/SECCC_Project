import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';

const AdminBarrier = ({ children }) => {
  const [etape, setEtape] = useState(0); // 0 = Caché, 1 = Scan Webcam, 2 = Mot de passe
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const [statusScan, setStatusScan] = useState('');
  const [iaChargee, setIaChargee] = useState(false); 
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // 1. CHARGEMENT DES MODÈLES AU DÉMARRAGE
  useEffect(() => {
    const chargerModelesAuDemarrage = async () => {
      try {
        console.log("🤖 [SECCC BIOMETRIE] Chargement des modèles IA en arrière-plan...");
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        setIaChargee(true);
        console.log("✅ [SECCC BIOMETRIE] Modèles face-api.js prêts !");
      } catch (err) {
        console.error("❌ Échec critique du chargement des modèles Face-API :", err);
      }
    };
    chargerModelesAuDemarrage();
  }, []);

  // 2. 🔄 NOUVEAU : ÉCOUTEUR DU SIGNAL SECRET (Plus de clavier !)
  useEffect(() => {
    const handleSecretTrigger = () => {
      // Si déjà connecté admin dans la session, on redirige directement
      if (sessionStorage.getItem("roleSECCC") === "admin") {
        navigate('/admin-seccc');
        return;
      }

      // Sinon, on ouvre la modale et on lance la caméra
      setEtape(1);
      allumerCameraEtScanner();
    };

    window.addEventListener('open-seccc-login', handleSecretTrigger);
    return () => window.removeEventListener('open-seccc-login', handleSecretTrigger);
  }, [navigate, iaChargee]);

  // 3. ALLUMAGE DE LA CAMÉRA
  const allumerCameraEtScanner = async () => {
    setErreur('');
    setStatusScan("Vérification des droits...");

    const visageSauvegardeStr = localStorage.getItem('adminVisage');
    if (!visageSauvegardeStr) {
      setErreur("❌ Aucun Face ID configuré. Utilisez la console ou l'URL d'accès pour lier votre visage.");
      setStatusScan("Échec.");
      return;
    }

    if (!iaChargee) {
      setErreur("❌ Les fichiers de l'IA chargent encore. Réessayez dans 3 secondes.");
      setStatusScan("Veuillez patienter.");
      return;
    }

    try {
      setStatusScan("Démarrage de la caméra...");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStatusScan("Analyse faciale en cours... Ne bougez pas.");
        
        setTimeout(() => {
          executerAnalyseFaciale(JSON.parse(visageSauvegardeStr));
        }, 1500);
      }
    } catch (err) {
      console.error("Erreur caméra :", err);
      setErreur("❌ Impossible d'accéder à la caméra ou flux bloqué.");
      setStatusScan("Erreur.");
    }
  };

  // 4. ANALYSE ET COMPARAISON DU VISAGE
  const executerAnalyseFaciale = async (visageSauvegardeTableau) => {
    if (!videoRef.current || !videoRef.current.srcObject) return;

    try {
      const detectionActuelle = await faceapi.detectSingleFace(videoRef.current)
                                             .withFaceLandmarks()
                                             .withFaceDescriptor();

      couperCamera();

      if (!detectionActuelle) {
        setErreur("❌ Visage non détecté. Alignez-vous bien face au capteur.");
        setStatusScan("Échec.");
        return;
      }

      const descripteurSauvegarde = new Float32Array(visageSauvegardeTableau);
      const distance = faceapi.euclideanDistance(detectionActuelle.descriptor, descripteurSauvegarde);

      console.log("📊 [SECCC] Distance de correspondance faciale :", distance);

      if (distance < 0.6) {
        setStatusScan("✅ Identité confirmée.");
        setEtape(2); 
      } else {
        const pourcentageRessemblance = Math.round((1 - distance) * 100);
        setErreur(`❌ Accès interdit : Correspondance insuffisante (${pourcentageRessemblance}% de ressemblance).`);
        setStatusScan("Échec.");
      }
    } catch (err) {
      console.error(err);
      setErreur("❌ Erreur lors du traitement de l'image.");
      setStatusScan("Erreur.");
      couperCamera();
    }
  };

  // 5. ENVOI DU MOT DE PASSE MAÎTRE
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') { 
      sessionStorage.setItem("roleSECCC", "admin");
      setEtape(0);
      setPassword('');
      window.location.href = '/admin-seccc'; 
    } else {
      setErreur('❌ Mot de passe incorrect.');
      setPassword('');
    }
  };

  const couperCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const fermerTout = () => {
    couperCamera();
    setEtape(0);
    setPassword('');
    setErreur('');
    setStatusScan('');
  };

  return (
    <>
      {children}

      {etape > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center relative border border-slate-100">
            
            <button onClick={fermerTout} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-black text-lg">
              ✕
            </button>

            {etape === 1 && (
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-1 uppercase tracking-wide">Authentification Biométrique</h2>
                <p className={`text-xs font-semibold px-2 py-1.5 rounded-lg mb-4 inline-block ${erreur ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500 animate-pulse'}`}>
                  {statusScan}
                </p>
                
                <div className="relative w-full h-60 bg-black rounded-xl overflow-hidden mb-4 border-4 border-slate-900 shadow-inner">
                  <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                  {!erreur && <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_15px_4px_rgba(239,68,68,0.7)] animate-scan" style={{ animation: 'scan 2s linear infinite' }} />}
                </div>

                {erreur && <p className="text-red-500 text-xs font-bold leading-relaxed bg-red-50 p-3 rounded-xl border border-red-100">{erreur}</p>}
              </div>
            )}

            {etape === 2 && (
              <form onSubmit={handlePasswordSubmit}>
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 text-2xl border border-emerald-100 shadow-sm">✓</div>
                <h2 className="text-xl font-black text-slate-900 mb-1 uppercase tracking-wide">Visage Validé</h2>
                <p className="text-xs text-slate-400 mb-6 font-medium">Saisissez le mot de passe maître.</p>
                
                <input
                  type="password"
                  autoFocus
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErreur(''); }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xl tracking-widest font-bold focus:outline-none focus:border-red-500 focus:bg-white mb-4"
                />
                
                {erreur && <p className="text-red-500 text-xs font-bold mb-4 bg-red-50 p-2 rounded-lg border border-red-100">{erreur}</p>}

                <button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg">
                  Confirmer l'accès
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {etape === 1 && (
        <style>{`@keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }`}</style>
      )}
    </>
  );
};

export default AdminBarrier;