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
          CSS COMPATIBLE 100% M3A CHROME MULTI-PAGE
          ========================================== */}
      <style type="text/css" media="print">
        {`
          @page { 
            size: A4 portrait; 
            margin: 20mm 15mm 20mm 15mm;
          }
          
          body { 
            background-color: white !important; 
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
          }
          
          .no-print { display: none !important; }
          
          .print-area { 
            width: 100% !important; 
            min-height: 0 !important;
            margin: 0 !important; 
            padding: 0 !important; 
            box-shadow: none !important;
            border: none !important;
            position: static !important;
          }

          /* Force la répétition native parfaite sur chaque page sans bug de flex */
          thead.report-header { 
            display: table-header-group !important; 
          }
          
          tfoot.report-footer { 
            display: table-footer-group !important; 
          }
          
          .item-row, .keep-together { 
            page-break-inside: avoid !important; 
            break-inside: avoid !important; 
          }

          /* Nettoyage pour les tableaux imbriqués wa9t l'impression */
          .nested-print-table {
            width: 100% !important;
            border-collapse: collapse !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .nested-print-table td {
            border: none !important;
            padding: 0 !important;
          }
        `}
      </style>

      <div className="w-full max-w-7xl flex flex-col xl:flex-row gap-8 items-start print:block print:w-full print:max-w-none print:m-0">
        
        {/* PANNEAU DE CONTRÔLE */}
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

        {/* FACTURE VISUELLE */}
        <div className="bg-white shadow-2xl print-area w-[210mm] min-h-[297mm] mx-auto p-8 sm:p-12 text-gray-900 relative">
          
          <img 
            src={logo} 
            alt="" 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 opacity-[0.03] pointer-events-none z-0 filter grayscale print:hidden" 
          />

          <table className="w-full border-collapse">
            
            {/* ==========================================
                THEAD RÉPARÉ : PLUS DE FLEX, REPETITION OK
                ========================================== */}
            <thead className="report-header">
              <tr>
                <td colSpan="5" className="pb-4">
                  {/* Utilisation d'un sous-tableau pour l'alignement gauche/droite propre au Print */}
                  <table className="nested-print-table">
                    <tbody>
                      <tr>
                        {/* Côté Gauche : Infos Boite */}
                        <td className="w-1/2 align-top text-left pb-6">
                          <img src={logo} alt="SECCC Logo" className="h-20 object-contain mb-2" />
                          <div className="text-gray-700 text-sm font-medium">
                            <h1 className="text-3xl font-black text-blue-700 tracking-tight">SECCC</h1>
                            <p className="text-gray-600 text-xs mt-0.5">Chauffage Central et Climatisation</p>
                            <div className="text-gray-500 text-[11px] mt-3 leading-relaxed">
                              <p>14 Rue Ibn Elhani Immeuble IRIS, Ariana, Tunisie</p>
                              <p><strong>Tél :</strong> +216 24 285 958 | +216 52 391 917</p>
                              <p className="text-[10px]"><strong>M.F :</strong> 1234567/X/A/M/000</p>
                            </div>
                          </div>
                        </td>

                        {/* Côté Droit : Facture & Infos Client */}
                        <td className="w-1/2 align-top text-right pb-6">
                          <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-3">Facture</h2>
                          
                          <div className="bg-gray-50 p-4 rounded border border-gray-200 text-left w-72 inline-block shadow-sm">
                            <table className="nested-print-table mb-2">
                              <tbody>
                                <tr>
                                  <td>
                                    <p className="text-[9px] text-gray-400 uppercase font-bold">Numéro</p>
                                    <p className="font-bold text-xs text-gray-900">{numeroFacture}</p>
                                  </td>
                                  <td className="text-right">
                                    <p className="text-[9px] text-gray-400 uppercase font-bold">Date</p>
                                    <p className="font-medium text-xs text-gray-800">{new Date().toLocaleDateString('fr-FR')}</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <div className="border-t border-gray-200 my-2"></div>

                            <div>
                              <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Facturé à</h3>
                              <p className="font-black text-base text-gray-900 leading-tight">{client.nom || "Nom du client"}</p>
                              {client.matriculeFiscal && (
                                <p className="text-[11px] text-gray-500 font-mono mt-0.5">M.F : {client.matriculeFiscal}</p>
                              )}
                              <p className="text-xs text-gray-600 mt-1.5 whitespace-pre-wrap leading-tight">
                                {client.adresse || "Adresse complète du client"}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="border-b-2 border-gray-800 w-full mb-4"></div>
                </td>
              </tr>
              
              {/* Header des Colonnes du Tableau */}
              <tr className="border-b-2 border-gray-900 text-gray-900 bg-gray-50">
                <th className="py-2.5 px-2 text-left font-bold uppercase text-xs tracking-wider">Description</th>
                <th className="py-2.5 px-2 text-center font-bold uppercase text-xs tracking-wider w-20">Qté</th>
                <th className="py-2.5 px-2 text-right font-bold uppercase text-xs tracking-wider w-32">P.U HT</th>
                <th className="py-2.5 px-2 text-right font-bold uppercase text-xs tracking-wider w-36">Total HT</th>
                <th className="p-0 print:hidden border-none w-8"></th> 
              </tr>
            </thead>

            {/* LES ARTICLES */}
            <tbody>
              {articles.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-400 italic border-b border-gray-100">
                    Aucun service facturé pour le moment.
                  </td>
                </tr>
              )}
              {articles.map((article) => (
                <tr key={article.id} className="item-row border-b border-gray-100 hover:bg-gray-50 transition-colors tabular-nums">
                  <td className="py-3.5 px-2 text-gray-800 font-medium text-sm">{article.description}</td>
                  <td className="py-3.5 px-2 text-center text-gray-600 text-sm tabular-nums">{article.quantite}</td>
                  <td className="py-3.5 px-2 text-right text-gray-600 text-sm tabular-nums">{formatTND(article.prixUnitaire)}</td>
                  <td className="py-3.5 px-2 text-right font-bold text-gray-900 text-sm tabular-nums">{formatTND(article.totalHT)}</td>
                  <td className="p-0 print:hidden text-center pl-2">
                    <button onClick={() => supprimerArticle(article.id)} className="text-red-300 hover:text-red-600 font-bold text-lg">×</button>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* LES TOTAUX (Suivent uniquement la fin des articles) */}
            <tbody className="keep-together border-none">
              <tr>
                <td colSpan="2" className="border-none"></td>
                <td className="py-2 px-2 text-gray-500 text-sm border-b border-gray-100">Total HT</td>
                <td className="py-2 px-2 text-right font-medium text-gray-900 text-sm tabular-nums border-b border-gray-100">{formatTND(totalHT)}</td>
                <td className="print:hidden border-none"></td>
              </tr>
              <tr>
                <td colSpan="2" className="border-none"></td>
                <td className="py-2 px-2 text-gray-500 text-sm border-b border-gray-100">TVA (19%)</td>
                <td className="py-2 px-2 text-right text-gray-900 text-sm tabular-nums border-b border-gray-100">{formatTND(montantTVA)}</td>
                <td className="print:hidden border-none"></td>
              </tr>
              {timbreActif && (
                <tr>
                  <td colSpan="2" className="border-none"></td>
                  <td className="py-2 px-2 text-gray-500 text-sm border-b border-gray-100">Timbre Fiscal</td>
                  <td className="py-2 px-2 text-right text-gray-800 text-sm tabular-nums border-b border-gray-100">{formatTND(1.000)}</td>
                  <td className="print:hidden border-none"></td>
                </tr>
              )}
              <tr className="border-t border-gray-900">
                <td colSpan="2" className="border-none"></td>
                <td className="py-3 px-2 font-bold text-gray-900 text-sm uppercase tracking-widest">Total TTC</td>
                <td className="py-3 px-2 text-right font-bold text-lg text-red-600 tabular-nums">{formatTND(totalTTC)}</td>
                <td className="print:hidden border-none"></td>
              </tr>
            </tbody>

            {/* ==========================================
                TFOOT RÉPARÉ : REPETITION PARFAITE EN BAS
                ========================================== */}
            <tfoot className="report-footer align-bottom">
              <tr>
                <td colSpan="5" className="pt-4">
                  <div className="border-t-2 border-gray-900 pt-4 mt-2">
                    <table className="nested-print-table text-xs text-gray-600">
                      <tbody>
                        <tr>
                          {/* Banque */}
                          <td className="w-1/2 align-top text-left pr-4">
                            <p className="font-bold text-gray-900 uppercase tracking-wider mb-1">Coordonnées Bancaires</p>
                            <p>Banque : <span className="font-medium text-gray-800">Amen Banque</span></p>
                            <p className="font-mono mt-0.5 text-gray-900 text-xs tabular-nums mb-1">RIB : 07 123 456789 123456 78</p>
                            <p className="text-[9px] text-gray-400 leading-tight">Le paiement est exigible à réception de la facture.</p>
                          </td>
                          {/* Signature */}
                          <td className="w-1/2 align-top text-right flex flex-col items-end">
                            <p className="font-bold text-gray-900 uppercase tracking-wider mb-1 text-right w-full">Cachet et Signature</p>
                            <div className="w-44 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50/50">
                              <span className="text-gray-400 italic text-[10px]">Signature & Cachet SECCC</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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