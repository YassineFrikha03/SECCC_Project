import React from 'react';
import { Link } from 'react-router-dom';

import mainImg from '../assets/34178.png';
import techImg from '../assets/34181.jpg';
import generalChaufImg from '../assets/chauffage.jpg';

const ChauffagePage = () => {
  const cataloguePrestations = [
    {
      id: 1,
      titre: "Radiateurs Verticaux Design",
      image: mainImg,
      description: "Installation d'émetteurs thermiques esthétiques noirs ou anthracite s'intégrant aux intérieurs modernes.",
      badge: "Design & Style"
    },
    {
      id: 2,
      titre: "Chaudières à Condensation",
      image: techImg,
      description: "Pose et raccordement de chaudières murales haute performance pour une économie d'énergie maximale.",
      badge: "Performance"
    },
    {
      id: 3,
      titre: "Systèmes de Régulation",
      image: generalChaufImg,
      description: "Distribution hydraulique complète, collecteurs de chauffage et vannes de sectorisation ajustées.",
      badge: "Maîtrise"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 font-sans">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center">
            <span className="text-red-600 text-xs font-bold uppercase tracking-widest mb-3 block">SECCC Expertise</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 leading-tight">
              Optimisez votre confort thermique tout en réduisant vos factures
            </h1>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm sm:text-base">
              SECCC installe des systèmes de chauffage performants et adaptés aux spécificités de votre bâtiment. Nous mettons un point d'honneur à allier performance énergétique, esthétique et confort d'utilisation au quotidien.
            </p>
            <ul className="space-y-3.5 mb-8">
              {["Installation de chaudières murales ou au sol à condensation", "Intégration de radiateurs esthétiques et verticaux design", "Pose de planchers chauffants hydrauliques basse température", "Régulation thermique connectée"].map((item, index) => (
                <li key={index} className="flex items-center text-slate-700 font-semibold text-sm">
                  <span className="bg-red-50 text-red-600 p-1 rounded-full mr-3 text-xs">✓</span> {item}
                </li>
              ))}
            </ul>
            <div>
              <Link to="/devis" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 text-xs uppercase tracking-wider transition-all inline-block shadow-lg shadow-red-600/20 rounded-xl">
                Demander un devis chauffage
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 h-[350px] lg:h-auto relative bg-slate-900">
            <img src={mainImg} alt="Chauffage SECCC" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-16">
        <div className="mb-10">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            Catalogue de nos équipements thermiques
          </h2>
          <p className="text-sm text-slate-500 mt-1">Une ingénierie thermique fiable pour un confort durable.</p>
          <div className="h-1 w-12 bg-red-600 mt-3 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cataloguePrestations.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 flex flex-col transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 group"
            >
              {/* Image augmentée à h-96 */}
              <div className="relative h-96 w-full overflow-hidden bg-slate-100">
                <img src={item.image} alt={item.titre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.badge}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-red-600 transition-colors">
                    {item.titre}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-red-600 uppercase tracking-wider">
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

export default ChauffagePage;