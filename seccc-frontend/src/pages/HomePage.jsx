import React from "react";
import { Link } from "react-router-dom";
import imageHero from "../assets/images.png"; // Gardez votre image pour le haut
import plomberieImg from "../assets/plomberie_sanitaire.jpg"; // Image pour la section À propos
import chauffageImg from "../assets/chauffage.jpg"; // Image pour la section Domaines d'excellence
import climatisationImg from "../assets/climatisation.jpg"; // Image pour la section Domaines d'excellence

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* ==========================================
          1. SECTION HERO (L'image de haut de page)
          ========================================== */}
      <div className="relative min-h-screen flex items-center bg-black overflow-hidden">
        <img
          src={imageHero}
          alt="SECCC"
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-20">
          <div className="max-w-3xl">
            <p className="text-white font-medium uppercase tracking-[0.2em] text-xs mb-4 opacity-80">
              Génie Climatique & Fluides
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              SECCC
              <span className="font-light block text-gray-100">PLUMBING</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 font-medium opacity-90">
              Societe d'Equipement Chauffage Central et Climatisation - Expert en
              Systèmes de plomberie et réseaux de fluides en Tunisie.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/21624285958"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-6 py-2 rounded inline-block"
              >
                Contactez-nous
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          2. SECTION : À PROPOS (Texte + Image droite)
          ========================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-secondary mb-6">
              SECCC : L'expertise au service de votre confort
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              La Société d'équipement chauffage central et climatisation (SECCC)
              est une entreprise spécialisée dans le domaine de la plomberie, du
              chauffage central et de la climatisation.
            </p>
            
            {/* CORRECTION : Remplacement du <p> parent par un <div> */}
            <div className="text-gray-600 mb-6 leading-relaxed">
              Depuis notre création en 2004, nous combinons expertise technique
              et engagement de qualité pour répondre aux besoins industriels et
              résidentiels les plus exigeants.
              
              <p style={{ fontSize: '0.875rem', color: '#000000', marginTop: '1rem' }}>📆 2004 : Création par Racem Frikha</p>
              <p style={{ fontSize: '0.875rem', color: '#000000' }}>🏢 Siège à Ariana, avec des projets à travers toute la Tunisie</p>
              <p style={{ fontSize: '0.875rem', color: '#000000' }}>🏗️ Plus de 20 ans d'experience </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700 font-medium">
                <span className="text-primary mr-3">✔</span> Installation et
                maintenance
              </li>
              <li className="flex items-center text-gray-700 font-medium">
                <span className="text-primary mr-3">✔</span> Plus de 20 ans
                d'expérience
              </li>
            </ul>
            <button className="bg-primary hover:bg-red-800 text-white font-bold py-3 px-8 uppercase text-sm tracking-wider">
              <a href="/about" className="text-white hover:text-gray-300">
                En savoir plus
              </a>
            </button>
          </div>
          {/* Image de la section À Propos */}
          <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070"
              alt="Équipe SECCC"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ==========================================
          3. SECTION : DOMAINES D'EXCELLENCE (3 Cartes)
          ========================================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary">
              Nos domaines d'excellence
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Carte 1 */}
            <div className="bg-white shadow-md group hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gray-300 overflow-hidden">
                <img
                  src={plomberieImg}
                  alt="Plomberie industrielle"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 border-b-4 border-primary">
                <h3 className="text-xl font-bold text-secondary mb-2">
                  Plomberie Sanitaire
                </h3>
                <p className="text-gray-600 text-sm">
                  Réseaux de fluides, tuyauterie et installations sanitaires de
                  grande envergure.
                </p>
              </div>
            </div>
            {/* Carte 2 */}
            <div className="bg-white shadow-md group hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gray-300 overflow-hidden">
                <img
                  src={chauffageImg}
                  alt="Chauffage central"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 border-b-4 border-primary">
                <h3 className="text-xl font-bold text-secondary mb-2">
                  Chauffage Central
                </h3>
                <p className="text-gray-600 text-sm">
                  Installation de chaudières, radiateurs et planchers chauffants
                  haute performance.
                </p>
              </div>
            </div>
            {/* Carte 3 */}
            <div className="bg-white shadow-md group hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gray-300 overflow-hidden">
                <img
                  src={climatisationImg}
                  alt="Climatisation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 border-b-4 border-primary">
                <h3 className="text-xl font-bold text-secondary mb-2">
                  Climatisation (HVAC)
                </h3>
                <p className="text-gray-600 text-sm">
                  Systèmes de traitement d'air, ventilation et climatisation
                  pour tous types de locaux.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. SECTION : CHIFFRES CLÉS (Fond sombre)
          ========================================== */}
      <section className="py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 border border-gray-700 hover:bg-gray-800 transition-colors">
              <h3 className="text-5xl font-bold text-primary mb-2">+50</h3>
              <p className="text-gray-300 uppercase tracking-widest text-sm">
                Projets Réalisés
              </p>
            </div>
            <div className="p-6 border border-gray-700 hover:bg-gray-800 transition-colors">
              <h3 className="text-5xl font-bold text-primary mb-2">+80</h3>
              <p className="text-gray-300 uppercase tracking-widest text-sm">
                Clients Satisfaits
              </p>
            </div>
            <div className="p-6 border border-gray-700 hover:bg-gray-800 transition-colors">
              <h3 className="text-5xl font-bold text-primary mb-2">100%</h3>
              <p className="text-gray-300 uppercase tracking-widest text-sm">
                Sécurité Garantie
              </p>
            </div>
            <div className="p-6 border border-gray-700 hover:bg-gray-800 transition-colors">
              <h3 className="text-5xl font-bold text-primary mb-2">24/7</h3>
              <p className="text-gray-300 uppercase tracking-widest text-sm">
                Support d'urgence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. SECTION : POURQUOI NOUS CHOISIR (FAQ / Atouts)
          ========================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="h-[500px] bg-gray-200 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=1974"
                alt="Ingénieur SECCC"
                className="w-full h-full object-cover"
              />
              {/* Petit encart par dessus l'image comme sur la vidéo */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 shadow-xl hidden md:block">
                <h4 className="text-2xl font-bold">Expertise Certifiée</h4>
              </div>
            </div>

            {/* Liste des raisons */}
            <div>
              <h2 className="text-4xl font-bold text-secondary mb-10">
                Pourquoi choisir SECCC ?
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-secondary">
                      Expertise Technique
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Nos ingénieurs maîtrisent les normes les plus strictes en
                      matière de fluides.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-secondary">
                      Engagement Total
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Nous respectons rigoureusement les délais et les budgets
                      convenus.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-secondary">
                      Solutions Sur-Mesure
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Chaque bâtiment est unique, nos installations de
                      climatisation le sont aussi.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  to="/devis"
                  className="bg-secondary hover:bg-gray-800 text-white font-bold py-3 px-8 uppercase text-sm tracking-wider inline-block"
                >
                  Discutons de votre projet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;