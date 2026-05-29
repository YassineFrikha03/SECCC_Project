import React, { useEffect } from 'react';

const AdminBarrier = ({ children }) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Si vous appuyez sur la touche "P" (comme Privé)
      if (e.key === 'p' || e.key === 'P') {
        const password = prompt("Accès restreint SECCC. Entrez le code :");
        
        if (password === "1928") { 
          // 1. On vous donne le badge officiel d'administrateur
          sessionStorage.setItem('roleSECCC', 'admin');
          
          // 2. On utilise window.location au lieu de navigate pour forcer 
          // la page à se recharger et à lire votre nouveau badge
          window.location.href = "/admin-seccc";
          
        } else if (password !== null) { 
          // S'il tape un mauvais code (et s'il n'a pas cliqué sur "Annuler")
          alert("Mauvais code !");
        }
      }
    };

    // On dit au navigateur d'écouter les touches du clavier
    window.addEventListener('keydown', handleKeyDown);
    
    // On nettoie quand on quitte
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <>{children}</>;
};

export default AdminBarrier;