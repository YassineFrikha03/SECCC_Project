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
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-8 border-t border-white/5 relative overflow-hidden print:hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Grille principale du Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Colonne 1 : À propos de SECCC */}
          <div>
            <img src={logo} alt="SECCC" className="w-32 h-auto mb-6 brightness-0 invert opacity-90" />

            <h3 className="text-2xl font-black text-white tracking-tighter mb-4">
              SECCC <span className="text-red-500">PLUMBING</span>
            </h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">
              Société d'équipement chauffage central et climatisation spécialisée dans la plomberie sanitaire, le chauffage central et la climatisation en Tunisie.
            </p>
            <div className="flex space-x-3">
              {/* Icônes Réseaux Sociaux */}
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all hover:-translate-y-1 group">
                <span className="text-slate-300 group-hover:text-white font-bold transition-colors">in</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all hover:-translate-y-1 group">
                <span className="text-slate-300 group-hover:text-white font-bold transition-colors">f</span>
              </a>
              <a href="https://wa.me/21624285958" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition-all hover:-translate-y-1 group">
                <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all" />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4 inline-block">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-red-400 transition-colors flex items-center gap-3 group"><span className="w-1.5 h-1.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></span> Accueil</Link></li>
              <li><Link to="/about" className="hover:text-red-400 transition-colors flex items-center gap-3 group"><span className="w-1.5 h-1.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></span> À Propos</Link></li>
              <li><Link to="/services" className="hover:text-red-400 transition-colors flex items-center gap-3 group"><span className="w-1.5 h-1.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></span> Domaines d'activité</Link></li>
              <li><Link to="/realisations" className="hover:text-red-400 transition-colors flex items-center gap-3 group"><span className="w-1.5 h-1.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></span> Nos Réalisations</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Nos Services */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4 inline-block">
              Nos Services
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/services/plomberie-sanitaire" className="hover:text-red-400 transition-colors flex items-center gap-3 group"><span className="w-1.5 h-1.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></span> Plomberie Industrielle</Link></li>
              <li><Link to="/services/chauffage-central" className="hover:text-red-400 transition-colors flex items-center gap-3 group"><span className="w-1.5 h-1.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></span> Chauffage Central</Link></li>
              <li><Link to="/services/Climatisation" className="hover:text-red-400 transition-colors flex items-center gap-3 group"><span className="w-1.5 h-1.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></span> Climatisation & HVAC</Link></li>
              <li><Link to="/services" className="hover:text-red-400 transition-colors flex items-center gap-3 group"><span className="w-1.5 h-1.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></span> Maintenance 24/7</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Contact */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4 inline-block">
              Contactez-nous
            </h4>
            <ul className="space-y-5 text-sm font-medium">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-red-500">📍</div>
                <span className="text-slate-400 mt-1 leading-relaxed">14 Rue Ibn Elhani Immeuble IRIS Ariana - 2080 Tunis<br />Tunisie</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-red-500">📞</div>
                <div className="flex flex-col text-slate-400">
                  <span>+216 52 391 917</span>
                  <span>+216 24 285 958</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-red-500">✉️</div>
                <a href="mailto:seccc.fluide@gmail.com" className="text-slate-400 hover:text-red-400 transition-colors">seccc.fluide@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Barre de Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
          {/* ⚡ MODIFICATION : Rendu du texte non sélectionnable et liaison à l'événement secret */}
          <p 
            onClick={handleSecretTrigger} 
            className="cursor-default select-none transition-colors duration-300 hover:text-slate-400"
          >
            © {new Date().getFullYear()} SECCC. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;