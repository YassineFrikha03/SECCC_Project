import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import whatsappIcon from '../assets/whatsapp.png';
import logo from '../assets/logo.png';

const Footer = () => {
  // ⚡ Références pour suivre discrètement le triple-clic secret sans perturber React
  const clickCountRef = useRef(0);
  const timeoutRef = useRef(null);

  const handleSecretTrigger = () => {
    clickCountRef.current += 1;
    
    if (clickCountRef.current === 3) {
      // Émission de l'événement global intercepté par votre AdminBarrier
      window.dispatchEvent(new Event('open-seccc-login'));
      clickCountRef.current = 0;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    // Réinitialisation du compteur si vous mettez plus d'une seconde entre les clics
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1000);
  };

  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-16 pb-8 border-t-4 border-primary print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grille principale du Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Colonne 1 : À propos de SECCC */}
          <div>
            <img src={logo} alt="SECCC" className="w-32 h-auto mb-4" />

            <h3 className="text-3xl font-extrabold text-white tracking-widest mb-2">
              SECCC
            </h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Société d'equipement chaufage central et climatisation spécialisée dans la plomberie sanitaire, le chauffage central et la climatisation en Tunisie.
            </p>
            <div className="flex space-x-4">
              {/* Icônes Réseaux Sociaux */}
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="text-white font-bold">in</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="text-white font-bold">f</span>
              </a>
              <a href="https://wa.me/21624285958" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="text-white font-bold"><img src={whatsappIcon} alt="WhatsApp" /></span>
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div>
            <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary">▸</span> Accueil</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary">▸</span> À Propos</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary">▸</span> Domaines d'activité</Link></li>
              <li><Link to="/realisations" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary">▸</span> Nos Realisations</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Nos Services */}
          <div>
            <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-6">
              Nos Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary">▸</span> Plomberie Industrielle</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary">▸</span> Chauffage Central</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary">▸</span> Climatisation & HVAC</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-primary">▸</span> Maintenance 24/7</a></li>
            </ul>
          </div>

          {/* Colonne 4 : Contact */}
          <div>
            <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-6">
              Contactez-nous
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>14 Rue Ibn Elhani Immeuble IRIS Ariana - 2080 Tunis<br />Tunisie</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>+216 52 391 917</span>
                <span>+216 24 285 958</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>seccc.fluide@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Barre de Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          {/* ⚡ MODIFICATION : Rendu du texte non sélectionnable et liaison à l'événement secret */}
          <p 
            onClick={handleSecretTrigger} 
            className="cursor-default select-none transition-colors duration-300"
          >
            © {new Date().getFullYear()} SECCC. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;