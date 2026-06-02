import React from 'react';
import { Link } from 'react-router-dom';

// Importation de vos images de fond
import plombImg from '../assets/plomberie_sanitaire.jpg';
import chaufImg from '../assets/chauffage.jpg';
import climImg from '../assets/climatisation.jpg';

const ServicesPage = () => {
  // Liste des 3 grands domaines d'activité de SECCC
  const domaines = [
    {
      id: 1,
      titre: "Plomberie & Sanitaire",
      image: plombImg,
      lien: "/services/plomberie-sanitaire", // Aligné sur App.jsx
      description: "Création de salles de bain clés en main, pose de robinetteries encastrées et déploiement de réseaux d'alimentation fluides.",
      icone: "💧",
      couleur: "hover:border-blue-500 hover:shadow-blue-500/10",
      texteCouleur: "text-blue-600"
    },
    {
      id: 2,
      titre: "Chauffage Central",
      image: chaufImg,
      lien: "/services/chauffage-central", // CORRIGÉ : Aligné sur App.jsx
      description: "Installation de chaudières à condensation, intégration de radiateurs esthétiques verticaux et planchers chauffants.",
      icone: "🔥",
      couleur: "hover:border-red-500 hover:shadow-red-500/10",
      texteCouleur: "text-red-600"
    },
    {
      id: 3,
      titre: "Climatisation & HVAC",
      image: climImg,
      lien: "/services/climatisation", // Aligné sur App.jsx
      description: "Conception de réseaux de ventilation aéraulique, centrales de traitement d'air (CTA) et systèmes de désenfumage.",
      icone: "❄️",
      couleur: "hover:border-teal-500 hover:shadow-teal-500/10",
      texteCouleur: "text-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* EN-TÊTE DE LA PAGE */}
        <div className="text-center mb-16">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-2">SECCC Tunisie</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            Nos Domaines d'Activité
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto mt-2 font-medium">
            Sélectionnez une catégorie pour découvrir notre catalogue technique complet, nos solutions et nos fiches de chantiers réels.
          </p>
          <div className="h-1 w-16 bg-slate-900 mx-auto mt-4 rounded"></div>
        </div>

        {/* GRILLE DES 3 BLOCS DE REDIRECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {domaines.map((dom) => (
            <Link 
              to={dom.lien} 
              key={dom.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 flex flex-col transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 group ${dom.couleur}`}
            >
              
              {/* Image avec effet zoom au survol */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img 
                  src={dom.image} 
                  alt={dom.titre} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                {/* Icône flottante */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-md">
                  {dom.icone}
                </div>
              </div>

              {/* Contenu textuel */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-3 group-hover:text-slate-700 transition-colors leading-tight">
                    {dom.titre}
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                    {dom.description}
                  </p>
                </div>

                {/* Lien d'action avec transition */}
                <div className={`mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold uppercase tracking-wider ${dom.texteCouleur}`}>
                  <span>Voir le catalogue</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform">➔</span>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;