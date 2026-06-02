import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSecretLogin = () => {
  const [etape, setEtape] = useState(0); // 0 = Caché, 1 = Scan FaceID, 2 = Mot de passe
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  // 1. ÉCOUTEUR DU CLAVIER (Le raccourci secret "P")
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Si on appuie sur 'p' ou 'P' et qu'on n'est pas déjà en train de taper dans un input
      if (e.key.toLowerCase() === 'p' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        declencherFaceID();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 2. DÉCLENCHEMENT DE FACE ID / TOUCH ID (WebAuthn)
  const declencherFaceID = async () => {
    setEtape(1); // Affiche l'interface de sécurité

    try {
      // On vérifie si l'appareil possède un lecteur biométrique (Face ID, Windows Hello...)
      if (window.PublicKeyCredential) {
        
        // ⚡ ASTUCE : C'est ce code qui réveille le Face ID de l'ordinateur/téléphone
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        await navigator.credentials.get({
          publicKey: {
            challenge: challenge,
            timeout: 60000,
            userVerification: "required", // Force l'OS à utiliser FaceID/Code PIN
          }
        });

        // Si l'utilisateur valide son Face ID, on passe à l'étape 2
        setEtape(2);
      } else {
        // Si l'appareil n'a pas Face ID, on passe direct au mot de passe
        setEtape(2);
      }
    } catch (error) {
      console.warn("L'authentification biométrique a été annulée ou n'est pas configurée :", error);
      // Pour le développement (sur localhost), on force le passage à l'étape 2 même si ça échoue
      // En production, vous mettriez : setEtape(0) pour bloquer l'accès.
      setEtape(2); 
    }
  };

  // 3. VÉRIFICATION DU MOT DE PASSE ADMIN
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Remplacer "admin123" par la vérification avec votre Backend API !
    if (password === 'admin123') {
      // Succès ! On redirige vers le dashboard
      setEtape(0);
      setPassword('');
      navigate('/admin'); // Assurez-vous d'avoir cette route configurée dans React
    } else {
      setErreur('Mot de passe incorrect');
      setPassword('');
    }
  };

  const annuler = () => {
    setEtape(0);
    setPassword('');
    setErreur('');
  };

  // Si l'étape est à 0, le composant est invisible (il tourne en fond)
  if (etape === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center relative border border-slate-200 transform transition-all">
        
        {/* Bouton Fermer */}
        <button onClick={annuler} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          ✕
        </button>

        {/* ÉTAPE 1 : SIMULATION / ATTENTE FACE ID */}
        {etape === 1 && (
          <div className="animate-pulse">
            <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-indigo-500">
              <span className="text-4xl">🧑‍💻</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Vérification de sécurité</h2>
            <p className="text-sm text-slate-500 mt-2">Veuillez utiliser Face ID / Touch ID pour continuer.</p>
          </div>
        )}

        {/* ÉTAPE 2 : MOT DE PASSE */}
        {etape === 2 && (
          <form onSubmit={handlePasswordSubmit}>
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              🔒
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-1">Accès Administrateur</h2>
            <p className="text-xs text-slate-500 mb-6">Identité confirmée. Veuillez saisir le mot de passe maître.</p>
            
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErreur('');
              }}
              placeholder="Mot de passe..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg tracking-widest focus:outline-none focus:border-red-500 focus:bg-white mb-4"
            />
            
            {erreur && <p className="text-red-500 text-xs font-bold mb-4">{erreur}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-black text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all"
            >
              Déverrouiller
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSecretLogin;