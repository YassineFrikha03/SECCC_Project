import React from 'react';
import FormulaireDevis from '../components/FormulaireDevis';

const DevisPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
          Devis Gratuit
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-secondary sm:text-5xl">
          Parlez-nous de votre projet
        </p>
        <p className="mt-4 text-lg text-gray-500">
          Remplissez ce formulaire et notre équipe SECCC vous recontactera rapidement.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
         <FormulaireDevis />
      </div>
    </div>
  );
};

export default DevisPage;