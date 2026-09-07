import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';

const AdminBarrier = ({ children }) => {
  const [etape, setEtape] = useState(0); // 0 = Caché, 1 = Scan Webcam, 2 = Mot de passe, 3 = Enregistrement Visage
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

  // 2. ÉCOUTEUR DU SIGNAL SECRET
  useEffect(() => {
    const handleSecretTrigger = () => {
      if (sessionStorage.getItem("roleSECCC") === "admin") {
        navigate('/admin-seccc');
        return;
      }
      setEtape(1);
      allumerCameraEtScanner();
    };

    window.addEventListener('open-seccc-login', handleSecretTrigger);
    return () => window.removeEventListener('open-seccc-login', handleSecretTrigger);
  }, [navigate, iaChargee]);

  // 3. ALLUMAGE DE LA CAMÉRA ET BOUCLE DE SCAN
  const allumerCameraEtScanner = async () => {
    setErreur('');
    setStatusScan("Vérification des droits...");

    const visage1Str = localStorage.getItem('adminVisage1') || localStorage.getItem('adminVisage');
    const visage2Str = localStorage.getItem('adminVisage2');

    if (!visage1Str && !visage2Str) {
      setErreur("❌ Aucun Face ID configuré.");
      setStatusScan("Veuillez configurer un visage.");
      // We will show a configuration button in the UI
      return;
    }

    if (!iaChargee) {
      setErreur("❌ L'IA charge encore. Réessayez dans quelques secondes.");
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
        
        scanLoop(visage1Str, visage2Str);
      }
    } catch (err) {
      console.error("Erreur caméra :", err);
      setErreur("❌ Impossible d'accéder à la caméra.");
      setStatusScan("Erreur.");
    }
  };

  const scanLoop = (visage1Str, visage2Str) => {
    let attempts = 0;
    const maxAttempts = 10;
    
    const interval = setInterval(async () => {
      if (!videoRef.current || !videoRef.current.srcObject) {
        clearInterval(interval);
        return;
      }
      
      attempts++;
      
      try {
        const detectionActuelle = await faceapi.detectSingleFace(videoRef.current)
                                               .withFaceLandmarks()
                                               .withFaceDescriptor();
                                               
        if (detectionActuelle) {
          clearInterval(interval);
          executerComparaison(detectionActuelle, visage1Str, visage2Str);
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          couperCamera();
          setErreur("❌ Visage introuvable après plusieurs tentatives. Alignez-vous bien face au capteur.");
          setStatusScan("Échec.");
        }
      } catch (err) {
        clearInterval(interval);
        couperCamera();
        setErreur("❌ Erreur lors de l'analyse.");
        setStatusScan("Erreur.");
      }
    }, 1000); // Check every second
    
    videoRef.current.scanInterval = interval;
  };

  const executerComparaison = (detectionActuelle, visage1Str, visage2Str) => {
    couperCamera();
    
    let distance1 = Infinity;
    let distance2 = Infinity;

    if (visage1Str) {
      try {
        const desc1 = new Float32Array(JSON.parse(visage1Str));
        distance1 = faceapi.euclideanDistance(detectionActuelle.descriptor, desc1);
      } catch (e) { console.error(e); }
    }
    
    if (visage2Str) {
      try {
        const desc2 = new Float32Array(JSON.parse(visage2Str));
        distance2 = faceapi.euclideanDistance(detectionActuelle.descriptor, desc2);
      } catch (e) { console.error(e); }
    }

    const distanceMin = Math.min(distance1, distance2);

    if (distanceMin < 0.55) { // Un peu plus strict/fiable
      setStatusScan("✅ Identité confirmée.");
      setEtape(2); 
    } else {
      const ressemblance = Math.max(0, Math.round((1 - distanceMin) * 100));
      setErreur(`❌ Accès interdit (${ressemblance}% de correspondance).`);
      setStatusScan("Échec.");
    }
  };

  // 5. ENREGISTREMENT D'UN NOUVEAU VISAGE (ETAPE 3)
  const demarrerEnregistrement = async () => {
    setEtape(3);
    setErreur('');
    setPassword('');
    setStatusScan("Démarrage de la caméra pour l'enregistrement...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStatusScan("Placez votre visage au centre...");
      }
    } catch (err) {
      setErreur("❌ Impossible d'accéder à la caméra.");
      setStatusScan("Erreur.");
    }
  };

  const validerEtEnregistrerVisage = async (e) => {
    e.preventDefault();
    const currentPassword = localStorage.getItem('adminPassword') || 'admin123';
    if (password !== currentPassword) {
      setErreur('❌ Mot de passe maître incorrect.');
      return;
    }

    if (!videoRef.current || !videoRef.current.srcObject) return;

    setStatusScan("Capture en cours...");
    try {
      const detection = await faceapi.detectSingleFace(videoRef.current)
                                     .withFaceLandmarks()
                                     .withFaceDescriptor();
      if (!detection) {
        setErreur("❌ Aucun visage détecté. Rapprochez-vous de la caméra.");
        setStatusScan("Échec de la capture.");
        return;
      }

      // Save as visage 1 if empty, otherwise visage 2
      const visage1 = localStorage.getItem('adminVisage1') || localStorage.getItem('adminVisage');
      if (!visage1) {
        localStorage.setItem('adminVisage1', JSON.stringify(Array.from(detection.descriptor)));
      } else {
        localStorage.setItem('adminVisage2', JSON.stringify(Array.from(detection.descriptor)));
      }

      couperCamera();
      setStatusScan("✅ Visage enregistré avec succès !");
      setErreur('');
      setTimeout(() => {
        setEtape(1);
        allumerCameraEtScanner();
      }, 2000);

    } catch (err) {
      setErreur("❌ Erreur lors de l'enregistrement.");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const currentPassword = localStorage.getItem('adminPassword') || 'admin123';
    if (password === currentPassword) { 
      sessionStorage.setItem("roleSECCC", "admin");
      fermerTout();
      window.location.href = '/admin-seccc'; 
    } else {
      setErreur('❌ Mot de passe incorrect.');
      setPassword('');
    }
  };

  const couperCamera = () => {
    if (videoRef.current) {
      if (videoRef.current.scanInterval) {
        clearInterval(videoRef.current.scanInterval);
      }
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
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

            {/* ETAPE 1 : SCAN */}
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

                {erreur && (
                  <div className="mt-4 space-y-3">
                    <p className="text-red-500 text-xs font-bold leading-relaxed bg-red-50 p-3 rounded-xl border border-red-100">{erreur}</p>
                    
                    {erreur.includes("Aucun Face ID configuré") ? (
                      <button onClick={demarrerEnregistrement} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg transition-colors">
                        📷 Configurer un visage
                      </button>
                    ) : (
                      <button onClick={allumerCameraEtScanner} className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg transition-colors">
                        🔄 Réessayer
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ETAPE 2 : MOT DE PASSE APRÈS SCAN */}
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
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xl tracking-widest font-bold focus:outline-none focus:border-emerald-500 focus:bg-white mb-4"
                />
                
                {erreur && <p className="text-red-500 text-xs font-bold mb-4 bg-red-50 p-2 rounded-lg border border-red-100">{erreur}</p>}

                <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg">
                  Confirmer l'accès
                </button>
              </form>
            )}

            {/* ETAPE 3 : ENREGISTREMENT NOUVEAU VISAGE */}
            {etape === 3 && (
              <form onSubmit={validerEtEnregistrerVisage}>
                <h2 className="text-xl font-black text-indigo-600 mb-1 uppercase tracking-wide">Nouveau Visage</h2>
                <p className="text-xs text-slate-500 mb-4 font-medium">{statusScan}</p>

                <div className="relative w-full h-40 bg-black rounded-xl overflow-hidden mb-4 border-2 border-indigo-200">
                  <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                </div>

                <p className="text-xs text-slate-400 mb-2 font-medium">Mot de passe maître requis pour l'ajout :</p>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErreur(''); }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg tracking-widest font-bold focus:outline-none focus:border-indigo-500 focus:bg-white mb-4"
                />

                {erreur && <p className="text-red-500 text-xs font-bold mb-4 bg-red-50 p-2 rounded-lg border border-red-100">{erreur}</p>}

                <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg">
                  💾 Sauvegarder ce visage
                </button>
                <button type="button" onClick={() => setEtape(1)} className="w-full mt-2 py-2 text-slate-500 hover:text-slate-700 text-xs font-bold uppercase">
                  Annuler
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {etape > 0 && (
        <style>{`@keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }`}</style>
      )}
    </>
  );
};

export default AdminBarrier;