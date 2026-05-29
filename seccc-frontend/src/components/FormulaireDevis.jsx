import { useState } from "react";
import api from "../services/api";

const FormulaireDevis = () => {
  const [etape, setEtape] = useState(1);
  const [formData, setFormData] = useState({
    typeClient: "",
    typeBien: "",
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
  });
  const [succes, setSucces] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const soumettreFormulaire = async (e) => {
    e.preventDefault();
    try {
      await api.post("/devis", formData);
      setSucces(true);
    } catch (erreur) {
      alert("Erreur lors de l'envoi du devis.");
    }
  };

  if (succes) {
    return (
      <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-green-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Demande envoyée avec succès !
        </h2>
        <p className="text-gray-600">
          Notre équipe SECCC va étudier votre projet et vous contacter très
          prochainement.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-secondary text-white rounded hover:bg-opacity-90"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="bg-secondary p-6 text-white text-center">
        <h2 className="text-3xl font-bold">Discutons de votre projet</h2>
        <p className="mt-2 text-sm opacity-80">Étape {etape} sur 3</p>
      </div>

      <div className="p-8">
        {etape === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold text-center mb-6">
              Vous êtes ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Particulier", "Professionnel"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, typeClient: type })}
                  className={`p-6 border-2 rounded-lg text-lg font-medium transition-all duration-300 ${
                    formData.typeClient === type
                      ? "border-primary text-primary bg-red-50"
                      : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setEtape(2)}
                disabled={!formData.typeClient}
                className="px-6 py-3 bg-primary text-white rounded-md font-semibold disabled:bg-gray-300"
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {etape === 2 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold text-center mb-6">
              Quel type de bien souhaitez-vous équiper ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Maison", "Appartement", "Usine / Industriel"].map((bien) => (
                <button
                  key={bien}
                  onClick={() => setFormData({ ...formData, typeBien: bien })}
                  className={`p-4 border-2 rounded-lg text-center font-medium transition-all duration-300 ${
                    formData.typeBien === bien
                      ? "border-primary text-primary bg-red-50"
                      : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {bien}
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setEtape(1)}
                className="px-6 py-3 text-gray-600 font-semibold hover:text-gray-900"
              >
                Retour
              </button>
              <button
                onClick={() => setEtape(3)}
                disabled={!formData.typeBien}
                className="px-6 py-3 bg-primary text-white rounded-md font-semibold disabled:bg-gray-300"
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {etape === 3 && (
          <form onSubmit={soumettreFormulaire} className="animate-fade-in">
            <h3 className="text-xl font-semibold text-center mb-6">
              Vos Coordonnées
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                name="nom"
                placeholder="Nom complet ou raison sociale"
                onChange={handleInput}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  onChange={handleInput}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  name="telephone"
                  placeholder="Téléphone"
                  onChange={handleInput}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <input
                type="text"
                name="adresse"
                placeholder="Adresse complète du projet"
                onChange={handleInput}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setEtape(2)}
                className="px-6 py-3 text-gray-600 font-semibold hover:text-gray-900"
              >
                Retour
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-white text-lg rounded-md font-bold hover:bg-red-700 shadow-lg"
              >
                Envoyer la demande
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormulaireDevis;
