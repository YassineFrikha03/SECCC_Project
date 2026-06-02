import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Importation de vos nouvelles images spécifiques aux grands projets (Réf: image_e3afc9.png)
import violetImg from '../assets/violet.jpg';
import irisImg from '../assets/iris.jpg';
import jonquillesImg from '../assets/jonquilles.jpg';
import pivoineImg from '../assets/pivoine.jpg';
import bleuetImg from '../assets/bleuet.jpg';
import aeroportImg from '../assets/aeroport.gif'; // Attention à bien laisser l'extension .gif
import siaImg from '../assets/sia.png'; // Fichier en .png
import assadImg from '../assets/assad.png'; // Fichier en .png
import stadeImg from '../assets/stade.jpg';

const NosRealisationsPage = () => {
  const [filtreActif, setFiltreActif] = useState('Tous');

  // Les catégories sectorielles mises à jour
  const categories = ['Tous', 'Centre Médicaux', 'Habitations', 'Industrielle'];

  // Association parfaite de vos images réelles avec vos projets phares
  const projets = [
    {
      id: 1,
      titre: "Centre Médical Violet - Ennasr 2",
      categorie: "Centre Médicaux",
      image: violetImg, 
      description: "Installation complète des réseaux de traitement d'air, ventilation et climatisation centralisée pour les cabinets et espaces médicaux.",
      badge: "Ennasr 2"
    },
    {
      id: 2,
      titre: "Centre Médical Iris - Ennasr 2",
      categorie: "Centre Médicaux",
      image: irisImg,
      description: "Déploiement des infrastructures sanitaires de pointe, réseaux d'alimentation et équipements médicaux haut de gamme.",
      badge: "Ennasr 2"
    },
    {
      id: 3,
      titre: "Centre Médical Les Jonquilles",
      categorie: "Centre Médicaux",
      image: jonquillesImg,
      description: "Installation complète des réseaux de traitement d'air, ventilation et climatisation centralisée pour les cabinets et espaces médicaux.",
      badge: "Ennasr 2"
    },
    {
      id: 4,
      titre: "Résidence Les Pivoines",
      categorie: "Habitations",
      image: pivoineImg,
      description: "Pose de chaudières à condensation haute performance et raccordement des collecteurs pour l'ensemble des appartements.",
      badge: "Chauffage"
    },
    {
      id: 5,
      titre: "Résidence Bleuet",
      categorie: "Habitations",
      image: bleuetImg,
      description: "Installations sanitaires collectives, colonnes montantes d'alimentation et robinetteries encastrées modernes.",
      badge: "Sanitaire"
    },
    {
      id: 6,
      titre: "Aéroport International Tunis-Carthage",
      categorie: "Industrielle",
      image: aeroportImg,
      description: "Génie climatique d'envergure, traitement de l'air de grands volumes et réseaux de désenfumage mécanique pour l'aérogare fret et passagers.",
      badge: "Aéroport"
    },
    {
      id: 7,
      titre: "Usine SIA",
      categorie: "Industrielle",
      image: siaImg,
      description: "Installation des réseaux fluides industriels, traitement de l'air des lignes de production et gestion de la ventilation forcée.",
      badge: "Usine / SIA"
    },
    {
      id: 8,
      titre: "Usine ASSAD & Bloc Administratif",
      categorie: "Industrielle",
      image: assadImg,
      description: "Climatisation centralisée de type VRV / VRF pour les bureaux administratifs et extraction mécanique pour la zone industrielle.",
      badge: "Usine / ASSAD"
    },
    {
      id: 9,
      titre: "Stade Olympique d'El Menzah",
      categorie: "Industrielle",
      image: stadeImg, 
      description: "Rénovation lourde des infrastructures de plomberie collective, des vestiaires et des réseaux d'évacuation d'eau.",
      badge: "Grand Projet Public"
    }
  ];

  // Logique de filtrage dynamique
  const projetsFiltrés = filtreActif === 'Tous' 
    ? projets 
    : projets.filter(p => p.categorie === filtreActif);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 font-sans">
      
      {/* EN-TÊTE DE LA PAGE */}
      <div className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal-600 text-xs font-bold uppercase tracking-widest block mb-2">Notre Portfolio</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            Nos Grandes Réalisations
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-3xl mx-auto mt-2 font-medium">
            Fiers d'accompagner les grands secteurs médicaux, résidentiels et industriels partout en Tunisie.
          </p>
          <div className="h-1 w-16 bg-slate-900 mx-auto mt-4 rounded"></div>
        </div>
      </div>

      {/* BOUTONS DE FILTRES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 flex justify-center flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltreActif(cat)}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm ${
              filtreActif === cat
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRILLE DES CARTES CATALOGUE (HAUTEUR D'IMAGE h-96) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetsFiltrés.map((projet) => (
            <div 
              key={projet.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 flex flex-col transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 group"
            >
              <div className="relative h-96 w-full overflow-hidden bg-slate-100">
                <img 
                  src={projet.image} 
                  alt={projet.titre} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {projet.badge}
                </span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-teal-600 mb-1">
                    {projet.categorie}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-2 leading-snug group-hover:text-teal-600 transition-colors">
                    {projet.titre}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    {projet.description}
                  </p>
                </div>
                
                <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-400">Chantier Réel</span>
                  <Link to="/devis" className="text-slate-900 hover:text-teal-600 transition-colors flex items-center gap-1">
                    S'en inspirer →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default NosRealisationsPage;