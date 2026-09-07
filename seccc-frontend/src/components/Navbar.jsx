import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false); // Pour le menu déroulant Desktop
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Pour le menu mobile global

  const fermerMenuMobile = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md border-b-4 border-gray-100 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* 1. Section Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link to="/" className="flex items-center" onClick={fermerMenuMobile}>
              <img
                src={logo}
                alt="Logo SECCC"
                className="h-24 w-auto object-contain"
              />
            </Link>
          </div>

          {/* ======================================================== */}
          {/* BOUTON HAMBURGER (Visible uniquement sur mobile) */}
          {/* ======================================================== */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-secondary hover:text-primary focus:outline-none"
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
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-secondary hover:text-primary font-bold text-sm tracking-wider transition-colors">ACCUEIL</Link>
            <Link to="/about" className="text-secondary hover:text-primary font-bold text-sm tracking-wider transition-colors">À PROPOS</Link>

            <div 
              className="relative group h-24 flex items-center"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Link
                to="/services"
                className={`flex items-center gap-2 font-bold text-sm tracking-wider transition-colors h-full px-4 ${
                  isOpen ? "bg-secondary text-white" : "text-secondary hover:text-primary"
                }`}
              >
                DOMAINES D'ACTIVITÉ
                <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                </svg>
              </Link>

              {isOpen && (
                <div className="absolute top-24 left-0 w-64 bg-white shadow-xl border-t-4 border-primary animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link to="/services/plomberie-sanitaire" className="block px-6 py-4 text-secondary hover:bg-gray-50 hover:text-primary font-bold text-xs border-b border-gray-100 transition-colors">Plomberie Sanitaire</Link>
                  <Link to="/services/chauffage-central" className="block px-6 py-4 text-secondary hover:bg-gray-50 hover:text-primary font-bold text-xs transition-colors">Chauffage Central</Link>
                  <Link to="/services/Climatisation" className="block px-6 py-4 text-secondary hover:bg-gray-50 hover:text-primary font-bold text-xs border-t border-gray-100 transition-colors">Climatisation & HVAC</Link>
                </div>
              )}
            </div>

            <Link to="/realisations" className="text-secondary hover:text-primary font-bold text-sm tracking-wider transition-colors">NOS REALISATIONS</Link>

            {user && user.role === "admin" && (
              <div className="flex items-center gap-4 border-l-2 pl-6 lg:pl-8 border-gray-200">
                <Link to="/admin-seccc" className="text-red-600 hover:text-red-800 font-bold text-sm tracking-wider transition-colors">ESPACE ADMIN</Link>
                <button
                  onClick={() => {
                    sessionStorage.removeItem('roleSECCC');
                    window.location.href = "/";
                  }}
                  className="text-gray-400 hover:text-gray-700 font-bold text-xs uppercase tracking-wider transition-colors"
                  title="Quitter le mode administrateur"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center">
            <Link to="/devis" className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-6 text-sm tracking-widest transition-colors shadow-sm">DEMANDE DE DEVIS</Link>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MENU MOBILE DÉROULANT */}
      {/* ======================================================== */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 animate-in slide-in-from-top-2">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link to="/" onClick={fermerMenuMobile} className="block px-3 py-4 text-base font-bold text-secondary border-b border-gray-50">ACCUEIL</Link>
            <Link to="/about" onClick={fermerMenuMobile} className="block px-3 py-4 text-base font-bold text-secondary border-b border-gray-50">À PROPOS</Link>
            
            {/* Rubrique Domaines avec sous-liens indentés */}
            <div className="block px-3 py-4 text-base font-bold text-secondary border-b border-gray-50 bg-gray-50">
              DOMAINES D'ACTIVITÉ
              <div className="mt-2 pl-4 space-y-2 border-l-2 border-primary ml-2">
                <Link to="/services/plomberie-sanitaire" onClick={fermerMenuMobile} className="block py-2 text-sm text-gray-600 hover:text-primary">Plomberie Sanitaire</Link>
                <Link to="/services/chauffage-central" onClick={fermerMenuMobile} className="block py-2 text-sm text-gray-600 hover:text-primary">Chauffage Central</Link>
                <Link to="/services/Climatisation" onClick={fermerMenuMobile} className="block py-2 text-sm text-gray-600 hover:text-primary">Climatisation & HVAC</Link>
              </div>
            </div>
            
            <Link to="/realisations" onClick={fermerMenuMobile} className="block px-3 py-4 text-base font-bold text-secondary border-b border-gray-50">NOS RÉALISATIONS</Link>
            
            <Link to="/devis" onClick={fermerMenuMobile} className="block px-3 py-4 text-base font-bold text-primary border-b border-gray-50">📝 DEMANDE DE DEVIS</Link>

            {user && user.role === "admin" && (
              <div className="bg-red-50 mt-4 rounded-lg p-2">
                <Link to="/admin-seccc" onClick={fermerMenuMobile} className="block px-3 py-3 text-base font-bold text-red-600 text-center">ESPACE ADMIN</Link>
                <button
                  onClick={() => {
                    sessionStorage.removeItem('roleSECCC');
                    window.location.href = "/";
                  }}
                  className="w-full text-center text-red-800 font-bold text-xs uppercase py-2 mt-1"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;