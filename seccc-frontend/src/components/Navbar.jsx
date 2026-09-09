import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fermerMenuMobile = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-900/5 border-b border-white/20 z-50 transition-all duration-300 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* 1. Section Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group">
            <Link to="/" className="flex items-center" onClick={fermerMenuMobile}>
              <img
                src={logo}
                alt="Logo SECCC"
                className="h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* ======================================================== */}
          {/* BOUTON HAMBURGER (Mobile) */}
          {/* ======================================================== */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-800 hover:text-red-600 focus:outline-none transition-colors p-2 rounded-full hover:bg-red-50"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* 2. Section Liens de navigation (DESKTOP) */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link to="/" className="px-4 py-2 text-slate-700 hover:text-red-600 font-bold text-xs lg:text-sm tracking-widest transition-all rounded-full hover:bg-red-50">ACCUEIL</Link>
            <Link to="/about" className="px-4 py-2 text-slate-700 hover:text-red-600 font-bold text-xs lg:text-sm tracking-widest transition-all rounded-full hover:bg-red-50">À PROPOS</Link>

            <div 
              className="relative group h-24 flex items-center"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Link
                to="/services"
                className={`flex items-center gap-2 font-bold text-xs lg:text-sm tracking-widest transition-all px-4 py-2 rounded-full ${
                  isOpen ? "bg-red-50 text-red-600" : "text-slate-700 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                DOMAINES
                <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                </svg>
              </Link>

              {isOpen && (
                <div className="absolute top-[80px] left-0 w-64 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="h-1 w-full bg-gradient-to-r from-red-600 to-red-400"></div>
                  <Link to="/services/plomberie-sanitaire" className="block px-6 py-4 text-slate-700 hover:bg-red-50 hover:text-red-600 font-bold text-xs border-b border-slate-50 transition-colors">💧 Plomberie Sanitaire</Link>
                  <Link to="/services/chauffage-central" className="block px-6 py-4 text-slate-700 hover:bg-red-50 hover:text-red-600 font-bold text-xs transition-colors">🔥 Chauffage Central</Link>
                  <Link to="/services/Climatisation" className="block px-6 py-4 text-slate-700 hover:bg-red-50 hover:text-red-600 font-bold text-xs border-t border-slate-50 transition-colors">❄️ Climatisation & HVAC</Link>
                </div>
              )}
            </div>

            <Link to="/realisations" className="px-4 py-2 text-slate-700 hover:text-red-600 font-bold text-xs lg:text-sm tracking-widest transition-all rounded-full hover:bg-red-50">RÉALISATIONS</Link>

            {user && user.role === "admin" && (
              <div className="flex items-center gap-2 border-l-2 pl-4 ml-2 border-slate-200">
                <Link to="/admin-seccc" className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-bold text-xs tracking-widest transition-colors shadow-sm">ADMIN</Link>
                <button
                  onClick={() => {
                    sessionStorage.removeItem('roleSECCC');
                    window.location.href = "/";
                  }}
                  className="px-3 py-1.5 text-slate-400 hover:text-slate-700 font-bold text-[10px] uppercase tracking-widest transition-colors"
                  title="Déconnexion"
                >
                  Quitter
                </button>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center ml-4">
            <Link to="/devis" className="relative group overflow-hidden bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3 px-6 rounded-xl text-xs tracking-widest transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5">
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span>DEMANDE DE DEVIS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MENU MOBILE DÉROULANT */}
      {/* ======================================================== */}
      <div className={`md:hidden absolute w-full left-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-4 pb-8 space-y-2">
          <Link to="/" onClick={fermerMenuMobile} className="block px-4 py-4 text-sm font-black text-slate-800 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">ACCUEIL</Link>
          <Link to="/about" onClick={fermerMenuMobile} className="block px-4 py-4 text-sm font-black text-slate-800 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">À PROPOS</Link>
          
          <div className="block px-4 py-4 text-sm font-black text-slate-800 bg-slate-50 rounded-xl">
            DOMAINES D'ACTIVITÉ
            <div className="mt-3 pl-4 space-y-2 border-l-2 border-red-500 ml-2">
              <Link to="/services/plomberie-sanitaire" onClick={fermerMenuMobile} className="block py-2 text-xs font-bold text-slate-600 hover:text-red-600">💧 Plomberie Sanitaire</Link>
              <Link to="/services/chauffage-central" onClick={fermerMenuMobile} className="block py-2 text-xs font-bold text-slate-600 hover:text-red-600">🔥 Chauffage Central</Link>
              <Link to="/services/Climatisation" onClick={fermerMenuMobile} className="block py-2 text-xs font-bold text-slate-600 hover:text-red-600">❄️ Climatisation & HVAC</Link>
            </div>
          </div>
          
          <Link to="/realisations" onClick={fermerMenuMobile} className="block px-4 py-4 text-sm font-black text-slate-800 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">NOS RÉALISATIONS</Link>
          
          <Link to="/devis" onClick={fermerMenuMobile} className="block mt-4 px-4 py-4 text-sm font-black text-white bg-gradient-to-r from-red-600 to-red-500 rounded-xl text-center shadow-lg shadow-red-500/30">📝 DEMANDE DE DEVIS</Link>

          {user && user.role === "admin" && (
            <div className="bg-slate-900 mt-6 rounded-xl p-3 border border-slate-800">
              <Link to="/admin-seccc" onClick={fermerMenuMobile} className="block px-4 py-3 text-sm font-black text-white text-center">ESPACE ADMIN</Link>
              <button
                onClick={() => {
                  sessionStorage.removeItem('roleSECCC');
                  window.location.href = "/";
                }}
                className="w-full text-center text-slate-400 hover:text-white font-bold text-[10px] uppercase tracking-widest py-2 mt-1 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;