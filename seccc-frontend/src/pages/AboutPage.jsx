import React from "react";
import { Link } from "react-router-dom";
import image2 from "../assets/image2.jpg";
import img from "../assets/aboutimg.png";

const AboutPage = () => {
  return (
    <div className="bg-white">
      
      {/* ==========================================
          1. SECTION HERO (L'image de haut de page)
          ========================================== */}
      {/* On réduit un peu la hauteur (h-[40vh] ou py-32) pour ne pas prendre tout l'écran comme l'accueil */}
      <div className="relative pt-32 pb-20 flex items-center bg-black overflow-hidden">
        {/* Votre image de fond */}
        <img
          src={image2}
          alt="SECCC"
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-60"
        />
        {/* Le filtre sombre pour lire le texte */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        
        {/* Le Titre par-dessus l'image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full mt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            À propos de <span className="text-primary">SECCC</span>
          </h1>
          <div className="w-20 h-1 bg-primary mt-6"></div>
        </div>
      </div>

      {/* ==========================================
          2. SECTION CONTENU (Texte + Image droite)
          ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Section Texte (à gauche) */}
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-6">
              Notre Mission
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Chez SECCC, notre mission est de fournir des solutions de plomberie
              industrielle, de chauffage central et de climatisation de la plus
              haute qualité en Tunisie. Nous nous engageons à offrir un service
              exceptionnel à nos clients, en combinant expertise technique,
              innovation et respect des délais.
            </p>
            
            <h2 className="text-3xl font-bold text-secondary mb-6">
              Notre Histoire
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Fondée en 2004, SECCC a rapidement évolué pour devenir l'un des meilleurs
              sociétés dans le secteur de la plomberie en Tunisie. Avec une équipe
              d'experts passionnés et une approche centrée sur le client, nous
              avons réalisé de nombreux projets réussis à travers le pays.
              
               <p style={{ fontSize: '0.875rem', color: '#000000' }}>📆 2004 : Création par Racem Frikha</p>
               <p style={{ fontSize: '0.875rem', color: '#000000' }}>🏢 Siège à Ariana, avec des projets à travers toute la Tunisie</p>
               <p style={{ fontSize: '0.875rem', color: '#000000' }}>🏗️ Plus de 20 ans d'experience </p>
              
            </p>

            {/* Bouton de retour */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-black text-white font-bold py-4 px-8 transition-colors uppercase tracking-widest text-sm mt-4"
            >
              Retour à l'accueil
            </Link>
          </div>

          {/* Section Image (à droite) */}
          <div className="h-[300px] rounded-lg shadow-2xl overflow-hidden relative border-t-6 border-primary">
            <img
              src={img}
              alt="À propos de SECCC"
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default AboutPage;