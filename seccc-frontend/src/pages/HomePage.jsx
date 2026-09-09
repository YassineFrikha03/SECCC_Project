import React from "react";
import { Link } from "react-router-dom";
import imageHero from "../assets/images.png"; // Gardez votre image pour le haut
import plomberieImg from "../assets/plomberie_sanitaire.jpg"; // Image pour la section À propos
import chauffageImg from "../assets/chauffage.jpg"; // Image pour la section Domaines d'excellence
import climatisationImg from "../assets/climatisation.jpg"; // Image pour la section Domaines d'excellence

const HomePage = () => {
  return (
    <div className="bg-slate-50 font-sans overflow-x-hidden">
      {/* ==========================================
          1. SECTION HERO (L'image de haut de page)
          ========================================== */}
      <div className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden">
        <img
          src={imageHero}
          alt="SECCC"
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-60 scale-105 animate-[kenburns_20s_ease-out_infinite_alternate]"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-32 pb-20 animate-fade-in">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <p className="text-white font-bold uppercase tracking-[0.2em] text-[10px] opacity-90">
                Génie Climatique & Fluides
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
              SECCC<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">PLUMBING</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 mb-10 font-medium max-w-2xl leading-relaxed">
              Société d'Équipement Chauffage Central et Climatisation. <br className="hidden md:block"/>
              Expert en systèmes de plomberie et réseaux de fluides en Tunisie.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/21624285958"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-black text-xs uppercase tracking-widest rounded-xl overflow-hidden shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-1 transition-all"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span>Contactez-nous</span>
              </a>
              <Link
                to="/services"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-black text-xs uppercase tracking-widest rounded-xl hover:-translate-y-1 transition-all"
              >
                Découvrir nos services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          2. SECTION : À PROPOS
          ========================================== */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 blur-3xl rounded-full -translate-y-1/2"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-red-100 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
            <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070"
                alt="Équipe SECCC"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-white shadow-xl">
                  <p className="text-3xl font-black mb-1">+20 ans</p>
                  <p className="text-sm font-medium opacity-90 uppercase tracking-widest">d'expertise reconnue</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.2em] mb-3">À Propos de nous</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              L'expertise technique au service de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">votre confort</span>.
            </h3>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              La <strong>SECCC</strong> est une entreprise leader spécialisée dans la plomberie, le chauffage central et la climatisation. Depuis 2004, nous combinons savoir-faire technique et exigence qualité pour les industriels et les particuliers.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0 text-xl">📆</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Fondée en 2004</h4>
                  <p className="text-xs text-slate-500 mt-1">Par Racem Frikha</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0 text-xl">📍</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Siège à Ariana</h4>
                  <p className="text-xs text-slate-500 mt-1">Projets sur toute la Tunisie</p>
                </div>
              </div>
            </div>

            <Link to="/about" className="group inline-flex items-center gap-3 text-sm font-black text-slate-900 uppercase tracking-widest hover:text-red-600 transition-colors">
              Découvrir notre histoire
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. SECTION : DOMAINES D'EXCELLENCE
          ========================================== */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.2em] mb-3">Nos Services</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Nos domaines d'excellence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Plomberie Sanitaire", desc: "Réseaux de fluides, tuyauterie et installations sanitaires de grande envergure.", img: plomberieImg, icon: "💧" },
              { title: "Chauffage Central", desc: "Installation de chaudières, radiateurs et planchers chauffants haute performance.", img: chauffageImg, icon: "🔥" },
              { title: "Climatisation (HVAC)", desc: "Systèmes de traitement d'air, ventilation et climatisation pour tous locaux.", img: climatisationImg, icon: "❄️" }
            ].map((service, idx) => (
              <div key={idx} className="group relative rounded-[2rem] overflow-hidden bg-slate-900 aspect-[4/5] cursor-pointer shadow-xl">
                <img
                  src={service.img}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl mb-6 shadow-lg border border-white/20 group-hover:-translate-y-2 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:-translate-y-2 transition-transform duration-500 delay-75">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. SECTION : CHIFFRES CLÉS
          ========================================== */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-red-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { val: "+50", label: "Projets Réalisés" },
              { val: "+80", label: "Clients Satisfaits" },
              { val: "100%", label: "Sécurité Garantie" },
              { val: "24/7", label: "Support d'urgence" }
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors">
                <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-600 mb-3 drop-shadow-sm">{stat.val}</h3>
                <p className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. SECTION : POURQUOI NOUS CHOISIR
          ========================================== */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-bl from-slate-200 to-transparent rounded-[2rem] blur-xl"></div>
              <div className="h-[600px] rounded-[2rem] overflow-hidden shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=1974"
                  alt="Ingénieur SECCC"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-8 right-8 bg-white p-6 rounded-2xl shadow-2xl max-w-xs animate-fade-in border border-slate-100">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xl">🏆</div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase">Expertise</h4>
                      <p className="text-xs text-slate-500 font-medium">Certifiée aux normes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.2em] mb-3">Nos atouts</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-12 tracking-tight leading-tight">
                Pourquoi choisir SECCC pour vos travaux ?
              </h3>

              <div className="space-y-8">
                {[
                  { title: "Expertise Technique", desc: "Nos ingénieurs maîtrisent les normes les plus strictes en matière de fluides et de climatisation." },
                  { title: "Engagement Total", desc: "Nous respectons rigoureusement les délais et les budgets convenus pour chaque projet." },
                  { title: "Solutions Sur-Mesure", desc: "Chaque bâtiment est unique, nos installations s'adaptent parfaitement à vos contraintes." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-red-600 font-black text-xl shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-14">
                <Link
                  to="/devis"
                  className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-10 uppercase text-xs tracking-widest rounded-xl shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1"
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