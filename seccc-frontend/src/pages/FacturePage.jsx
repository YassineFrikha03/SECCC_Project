import React, { useState } from 'react';
import logo from '../assets/logo.png'; 

const FacturePage = () => {
  const [client, setClient] = useState({ nom: '', adresse: '', telephone: '', matriculeFiscal: '' });
  const [numeroFacture, setNumeroFacture] = useState(`FAC-${new Date().getFullYear()}-001`);
  const [timbreActif, setTimbreActif] = useState(true); 
  const [articles, setArticles] = useState([]);
  const [nouvelArticle, setNouvelArticle] = useState({ description: '', quantite: 1, prixUnitaire: '' });

  const ajouterArticle = (e) => {
    e.preventDefault();
    if (!nouvelArticle.description || nouvelArticle.prixUnitaire === '') return;

    const prixFormatte = Number(nouvelArticle.prixUnitaire);
    const articleComplet = {
      ...nouvelArticle,
      prixUnitaire: prixFormatte,
      id: Date.now(),
      totalHT: nouvelArticle.quantite * prixFormatte
    };

    setArticles([...articles, articleComplet]);
    setNouvelArticle({ description: '', quantite: 1, prixUnitaire: '' });
  };

  const supprimerArticle = (id) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const totalHT = articles.reduce((somme, article) => somme + article.totalHT, 0);
  const montantTVA = totalHT * 0.19; 
  const montantTimbre = timbreActif ? 1.000 : 0; 
  const totalTTC = totalHT + montantTVA + montantTimbre;

  const formatTND = (montant) => {
    return Number(montant).toFixed(3) + ' TND';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 pt-24 font-sans flex justify-center print:bg-white print:p-0 print:block">
      
      {/* ==========================================
          CSS MAGIQUE POUR LE RESSORT ET L'IMPRESSION
          ========================================== */}
      <style type="text/css" media="print">
        {`
          @page { size: A4 portrait; margin: 0; }
          
          body { 
            background-color: white !important; 
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
          }
          
          .no-print { display: none !important; }
          
          .print-area { 
            width: 210mm !important; 
            min-height: 297mm !important;
            margin: 0 auto !important; 
            padding: 15mm 15mm !important; 
            box-shadow: none !important;
            border: none !important;
          }

          /* Force la répétition de l'en-tête sur chaque page */
          thead.report-header { display: table-header-group; }
          /* Force la répétition du pied de page en bas de chaque page */
          tfoot.report-footer { display: table-footer-group; }
          
          .item-row { page-break-inside: avoid; break-inside: avoid; }
          .keep-together { page-break-inside: avoid; break-inside: avoid; }
        `}
      </style>
      
      {/* Classe spécifique pour le ressort visuel sur l'écran et l'impression */}
      <style type="text/css">
        {`
          .spacer-row { height: 100%; }
          .spacer-row td { border: none !important; }
        `}
      </style>

      <div className="w-full max-w-7xl flex flex-col xl:flex-row gap-8 items-start print:block print:w-full print:max-w-none print:m-0">
        
        {/* ==========================================
            PANNEAU DE CONTRÔLE
            ========================================== */}
        <div className="w-full xl:w-1/3 bg-white p-6 rounded-lg shadow-md no-print sticky top-24 z-30">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Paramètres de la Facture</h2>

          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wider">1. Infos Client</h3>
            <input 
              type="text" placeholder="N° Facture (ex: FAC-2026-001)" 
              value={numeroFacture} onChange={(e) => setNumeroFacture(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-gray-500"
            />
            <input 
              type="text" placeholder="Nom de l'entreprise ou du client" 
              value={client.nom} onChange={(e) => setClient({ ...client, nom: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-gray-500"
            />
            <input 
              type="text" placeholder="Matricule Fiscal (Optionnel)" 
              value={client.matriculeFiscal} onChange={(e) => setClient({ ...client, matriculeFiscal: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-gray-500"
            />
            <textarea 
              placeholder="Adresse complète" 
              value={client.adresse} onChange={(e) => setClient({ ...client, adresse: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-gray-500"
              rows="2"
            />
          </div>

          <div className="mb-6 bg-gray-50 p-4 rounded border border-gray-200">
            <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-3">2. Taxes</h3>
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={timbreActif} 
                onChange={(e) => setTimbreActif(e.target.checked)}
                className="w-4 h-4 text-gray-800 bg-gray-100 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 font-medium">Inclure le Timbre Fiscal (1.000 TND)</span>
            </label>
          </div>

          <form onSubmit={ajouterArticle} className="space-y-4 mb-8 bg-gray-50 p-4 rounded border border-gray-200">
            <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wider">3. Ajouter un Service</h3>
            <input 
              type="text" placeholder="Description (ex: Installation chaudière)" required
              value={nouvelArticle.description} onChange={(e) => setNouvelArticle({ ...nouvelArticle, description: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-gray-500"
            />
            <div className="flex gap-4">
              <div className="w-1/3">
                <label className="text-xs text-gray-500 font-bold mb-1 block">Qté</label>
                <input 
                  type="number" min="1" required
                  value={nouvelArticle.quantite} onChange={(e) => setNouvelArticle({ ...nouvelArticle, quantite: Number(e.target.value) })}
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-gray-500"
                />
              </div>
              <div className="w-2/3">
                <label className="text-xs text-gray-500 font-bold mb-1 block">P.U HT (TND)</label>
                <input 
                  type="number" min="0" step="0.001" required
                  value={nouvelArticle.prixUnitaire} 
                  onChange={(e) => setNouvelArticle({ ...nouvelArticle, prixUnitaire: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-gray-500"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-black font-bold text-sm transition-colors">
              + Ajouter la ligne
            </button>
          </form>

          <button onClick={handlePrint} className="w-full bg-blue-600 text-white py-3 rounded text-lg font-bold hover:bg-blue-700 shadow-lg transition-colors flex items-center justify-center gap-2">
            🖨️ Imprimer la Facture
          </button>
        </div>

        {/* ==========================================
            LA FACTURE VISUELLE (AVEC TABLEAU PLEINE HAUTEUR)
            ========================================== */}
        <div className="bg-white shadow-2xl print-area w-[210mm] min-h-[297mm] mx-auto p-8 sm:p-12 text-gray-900 relative">
          
          {/* Filigrane centré au milieu de la feuille */}
          <img 
            src={logo} 
            alt="" 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 opacity-[0.03] pointer-events-none z-0 filter grayscale" 
          />

          {/* TABLEAU PRINCIPAL : `h-full` force le tableau à s'étirer sur toute la feuille */}
          <table className="w-full h-full border-collapse relative z-10">
            
            <thead className="report-header">
              <tr>
                <td colSpan="5" className="pb-8">
                  <div className="flex justify-between items-start border-b-2 border-gray-800 pb-8 mb-4 mt-2">
                    
                    {/* Gauche : Logo et Infos SECCC */}
                    <div className="flex flex-col items-start gap-4">
                      <img src={logo} alt="SECCC Logo" className="h-24 object-contain mb-2" />
                      <div className="flex flex-col text-gray-700 text-sm font-medium">
                        <h1 className="text-3xl font-black text-blue-700 tracking-tight">SECCC</h1>
                        <p className="text-gray-600 text-sm mt-1">Chauffage Central et Climatisation</p>
                        
                        <div className="text-gray-500 text-xs mt-4 leading-relaxed">
                          <p>12 Rue Exemple, Ariana 2080, Tunisie</p>
                          <p><strong>Tél :</strong> +216 24 285 958</p>
                          <p className="mt-2 text-xs"><strong>M.F :</strong> 1234567/X/A/M/000</p>
                          <p><strong>R.C :</strong> B12345678912</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Droite : Titre et encadré Client */}
                    <div className="text-right flex flex-col items-end">
                      <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">Facture</h2>
                      
                      <div className="bg-gray-50 p-5 rounded border border-gray-200 text-left w-80 shadow-sm mt-2">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Numéro</p>
                            <p className="font-bold text-sm text-gray-900">{numeroFacture}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Date</p>
                            <p className="font-medium text-sm text-gray-800">{new Date().toLocaleDateString('fr-FR')}</p>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 my-4"></div>

                        <div>
                          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Facturé à</h3>
                          <p className="font-black text-lg text-gray-900 leading-tight">{client.nom || "Nom du client"}</p>
                          {client.matriculeFiscal && (
                            <p className="text-xs text-gray-600 mt-1 font-mono">M.F : {client.matriculeFiscal}</p>
                          )}
                          <p className="text-xs text-gray-600 mt-2 whitespace-pre-wrap leading-relaxed">
                            {client.adresse || "Adresse complète du client"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              
              <tr className="border-b-2 border-gray-900 text-gray-900">
                <th className="py-4 px-2 font-bold uppercase text-xs tracking-wider">Description</th>
                <th className="py-4 px-2 text-center font-bold uppercase text-xs tracking-wider w-20">Qté</th>
                <th className="py-4 px-2 text-right font-bold uppercase text-xs tracking-wider w-32">P.U HT</th>
                <th className="py-4 px-2 text-right font-bold uppercase text-xs tracking-wider w-36">Total HT</th>
                <th className="p-0 print:hidden border-none w-8"></th> 
              </tr>
            </thead>

            {/* CORPS DE LA FACTURE (align-top colle les articles en haut) */}
            <tbody className="align-top">
              {articles.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-400 italic border-b border-gray-100">
                    Aucun service facturé pour le moment.
                  </td>
                </tr>
              )}
              {articles.map((article) => (
                <tr key={article.id} className="item-row border-b border-gray-100 hover:bg-gray-50 transition-colors tabular-nums">
                  <td className="py-5 px-2 text-gray-800 font-medium">{article.description}</td>
                  <td className="py-5 px-2 text-center text-gray-600 tabular-nums">{article.quantite}</td>
                  <td className="py-5 px-2 text-right text-gray-600 tabular-nums">{formatTND(article.prixUnitaire)}</td>
                  <td className="py-5 px-2 text-right font-bold text-gray-900 tabular-nums">{formatTND(article.totalHT)}</td>
                  <td className="p-0 print:hidden text-center pl-2">
                    <button onClick={() => supprimerArticle(article.id)} className="text-red-300 hover:text-red-600 font-bold text-lg">×</button>
                  </td>
                </tr>
              ))}

              {/* === LA LIGNE RESSORT MAGIQUE === */}
              {/* Elle prend 100% de la hauteur vide restante et pousse le reste vers le bas */}
              <tr className="spacer-row">
                <td colSpan="5"></td>
              </tr>
            </tbody>

            {/* LES TOTAUX (Protégés contre la coupure et collés en bas par le ressort) */}
            <tbody className="keep-together align-bottom">
              <tr>
                <td colSpan="2" className="border-none"></td>
                <td className="py-2 px-2 text-gray-500 text-sm">Total HT</td>
                <td className="py-2 px-2 text-right font-medium text-gray-900 text-sm tabular-nums">{formatTND(totalHT)}</td>
                <td className="print:hidden border-none"></td>
              </tr>
              <tr>
                <td colSpan="2" className="border-none"></td>
                <td className="py-2 px-2 text-gray-500 text-sm">TVA (19%)</td>
                <td className="py-2 px-2 text-right text-gray-900 text-sm tabular-nums">{formatTND(montantTVA)}</td>
                <td className="print:hidden border-none"></td>
              </tr>
              {timbreActif && (
                <tr>
                  <td colSpan="2" className="border-none"></td>
                  <td className="py-2 px-2 text-gray-500 text-sm">Timbre Fiscal</td>
                  <td className="py-2 px-2 text-right text-gray-800 text-sm tabular-nums">{formatTND(1.000)}</td>
                  <td className="print:hidden border-none"></td>
                </tr>
              )}
              <tr className="border-t border-gray-900">
                <td colSpan="2" className="border-none"></td>
                <td className="py-4 px-2 font-bold text-gray-900 text-sm uppercase tracking-widest">Total TTC</td>
                <td className="py-4 px-2 text-right font-bold text-lg text-gray-900 tabular-nums">{formatTND(totalTTC)}</td>
                <td className="print:hidden border-none"></td>
              </tr>
            </tbody>

            {/* LE PIED DE PAGE : Banque et Signature */}
            {/* Utilisé comme TFOOT pour s'imprimer tout en bas, sous les totaux */}
            <tfoot className="report-footer align-bottom">
              <tr>
                <td colSpan="5">
                  <div className="border-t-2 border-gray-900 pt-6 mt-8 flex flex-row justify-between items-start text-xs text-gray-600 bg-white tabular-nums w-full">
                    
                    {/* GAUCHE : Coordonnées Bancaires */}
                    <div className="w-1/2 flex flex-col items-start text-left pr-4">
                      <p className="font-bold text-gray-900 uppercase tracking-wider mb-2">Coordonnées Bancaires</p>
                      <p>Banque : <span className="font-medium text-gray-800 tabular-nums">Amen Banque</span></p>
                      <p className="font-mono mt-1 text-gray-900 text-sm tabular-nums mb-4">RIB : 07 123 456789 123456 78</p>
                      
                      <p className="text-[10px] text-gray-400">Le paiement est exigible à réception de la facture.</p>
                      <p className="text-[10px] text-gray-400">Aucun escompte consenti pour règlement anticipé.</p>
                    </div>

                    {/* DROITE : Cachet et Signature */}
                    <div className="w-1/2 flex flex-col items-end">
                      <p className="font-bold text-gray-900 uppercase tracking-wider mb-2">Cachet et Signature</p>
                      <div className="w-48 h-28 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50/50">
                        <span className="text-gray-400 italic">Signature SECCC</span>
                      </div>
                    </div>

                  </div>
                </td>
              </tr>
            </tfoot>

          </table>
        </div>
      </div>
    </div>
  );
};

export default FacturePage;