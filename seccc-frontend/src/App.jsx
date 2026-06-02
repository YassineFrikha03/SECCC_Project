import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminBarrier from "./components/AdminBarrier.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import RealisationsPage from "./pages/Realisations.jsx";
import ServicesPage from "./pages/ServicePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import DevisPage from "./pages/DevisPage.jsx";
import FacturePage from "./pages/FacturePage.jsx";
import Plomberie from './pages/PlomberiePage.jsx';
import Chauffage from './pages/ChauffagePage.jsx';
import Climatisation from './pages/ClimatisationPage.jsx';

// Composant de protection des routes Admin
const ProtectedRoute = ({ user, children }) => {
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  // Vérification du rôle au chargement
  const [user, setUser] = useState(() => {
    const roleSauvegarde = sessionStorage.getItem("roleSECCC");
    return { role: roleSauvegarde || "user" };
  });

  // Gestion des accès via l'URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("acces") === "admin") {
      sessionStorage.setItem("roleSECCC", "admin");
      setUser({ role: "admin" });
      window.history.replaceState({}, "", "/");
    } else if (params.get("acces") === "client") {
      sessionStorage.setItem("roleSECCC", "user");
      setUser({ role: "user" });
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <Router>
      <AdminBarrier>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar user={user} />

          <main className="flex-grow">
            <Routes>
              {/* --- Routes Publiques --- */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/realisations" element={<RealisationsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/devis" element={<DevisPage />} />

              {/* --- Routes Services alignées sur la Navbar --- */}
              <Route path="/services/plomberie-sanitaire" element={<Plomberie />} />
              <Route path="/services/chauffage-central" element={<Chauffage />} />
              <Route path="/services/climatisation" element={<Climatisation />} />

              {/* --- Route Admin : Cachée ET Protégée --- */}
              <Route
                path="/admin-seccc"
                element={
                  <ProtectedRoute user={user}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-seccc/facture"
                element={
                  <ProtectedRoute user={user}>
                    <FacturePage />
                  </ProtectedRoute>
                }
              />

              {/* Redirection automatique pour la sécurité */}
              <Route path="/admin" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AdminBarrier>
    </Router>
  );
}

export default App;