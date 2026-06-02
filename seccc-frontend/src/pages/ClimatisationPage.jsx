import React from 'react';
import { Link } from 'react-router-dom';

import mainImg from '../assets/34202.jpg'; 
import techImg from '../assets/34198.png'; 
import generalClimImg from '../assets/climatisation.jpg'; 

const ClimatisationPage = () => {
  const cataloguePrestations = [
    {
      id: 1,
      titre: "Réseaux de Ventilation & Gaines",
      image: mainImg,
      description: "Conception et pose de réseaux de gaines rectangulaires ou circulaires en acier galvanisé pour le transport de l'air.",
      badge: "Génie Climatique"
    },
    {
      id: 2,
      titre: "Centrales de Traitement d'Air (CTA)",
      image: techImg,
      description: "Installation de caissons de ventilation robustes, systèmes de désenfumage mécanique et filtration de l'air.",
      badge: "Haute Technologie"
    },
    {
      id: 3,
      titre: "Climatisation Centralisée VRV / VRF",
      image: generalClimImg,
      description: "Déploiement de systèmes thermiques réversibles multi-splits ou à débit de réfrigérant variable pour le tertiaire.",
      badge: "Tertiaire & Pro"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 font-sans">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center">
            <span className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-3 block">SECCC Expertise</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 leading-tight">
              Expertise complète en traitement de l'air et génie climatique
            </h1>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm sm:text-base">
              Pour les professionnels, le secteur tertiaire et le résidentiel, SECCC déploie des solutions globales de ventilation, désenfumage et climatisation. Nos installations sur-mesure assurent un renouvellement et un contrôle parfait de votre environnement.
            </p>
            <ul className="space-y-3.5 mb-8">
              {["Systèmes de climatisation centralisés (VRV / VRF)", "Réseaux complets de gaines de ventilation en acier galvanisé", "Centrales de traitement d'air (CTA) pour grands volumes", "Réseaux de désenfumage conformes aux normes de sécurité"].map((item, index) => (
                <li key={index} className="flex items-center text-slate-700 font-semibold text-sm">
                  <span className="bg-teal-50 text-teal-600 p-1 rounded-full mr-3 text-xs">✓</span> {item}
                </li>
              ))}
            </ul>
            <div>
              <Link to="/devis" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-8 text-xs uppercase tracking-wider transition-all inline-block shadow-lg shadow-teal-600/20 rounded-xl">
                Demander un devis HVAC
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 h-[350px] lg:h-auto relative bg-slate-900">
            <img src={mainImg} alt="Climatisation et HVAC SECCC" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-16">
        <div className="mb-10">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            Catalogue de nos solutions aérauliques
          </h2>
          <p className="text-sm text-slate-500 mt-1">Maîtrise absolue des flux d'air, de la sécurité et du confort thermique.</p>
          <div className="h-1 w-12 bg-teal-600 mt-3 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cataloguePrestations.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 flex flex-col transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 group"
            >
              {/* Image augmentée à h-96 pour plus de hauteur verticale */}
              <div className="relative h-96 w-full overflow-hidden bg-slate-100">
                <img 
                  src={item.image} 
                  alt={item.titre} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.badge}
                </span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-3 group-hover:text-teal-600 transition-colors leading-snug">
                    {item.titre}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
                
                <div className="mt-5 pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-teal-600 uppercase tracking-wider">
                  Photos Réelles SECCC
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ClimatisationPage;