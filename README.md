# Projet SECCC

Bienvenue sur le projet SECCC, une application web complète dédiée aux services d'installation et de maintenance en plomberie, chauffage et climatisation.

## 📖 Description

Le projet SECCC permet de gérer et de présenter les services d'une entreprise spécialisée. Il offre une vitrine pour les clients afin de découvrir les prestations (plomberie, chauffage, climatisation), de demander des devis et de consulter des réalisations. Une partie administration sécurisée permet de gérer les demandes de devis, les messages et la facturation.

## 🚀 Fonctionnalités principales

**Côté Client :**
- **Présentation des services** : Pages dédiées à la Plomberie, au Chauffage et à la Climatisation.
- **Demande de devis** : Formulaire interactif pour les clients souhaitant estimer leurs travaux.
- **Contact** : Formulaire pour l'envoi de messages directs.
- **Réalisations** : Galerie affichant les projets précédents.
- **Facturation** : Interface permettant la gestion et la consultation des factures.

**Côté Administrateur :**
- **Tableau de bord sécurisé** : Espace réservé à l'administrateur pour la gestion globale.
- **Gestion des devis** : Consultation, validation ou rejet des demandes de devis.
- **Gestion des messages** : Réception et suivi des messages clients.
- **Authentification** : Accès protégé à l'aide de JSON Web Tokens (JWT) et potentiellement de reconnaissance faciale (`face-api.js`).

## 🛠️ Technologies utilisées

L'application est construite autour de la stack MERN (adaptée) :

### Frontend (Client)
- **React.js** avec **Vite** : Pour une interface utilisateur rapide et réactive.
- **React Router** : Gestion de la navigation entre les pages.
- **Tailwind CSS** : Pour le stylisme et la conception responsive.
- **Axios** : Pour les requêtes HTTP vers l'API.
- **Face-api.js** : Pour la reconnaissance faciale (authentification/sécurité).

### Backend (Serveur)
- **Node.js** & **Express.js** : Pour la création de l'API RESTful.
- **MongoDB** & **Mongoose** : Base de données NoSQL pour stocker les devis, messages et utilisateurs.
- **JWT (JSON Web Token)** : Pour la sécurisation des routes de l'API.
- **Multer** : Gestion du téléchargement des fichiers.
- **Nodemailer** : Pour l'envoi de notifications ou confirmations par e-mail.
- **Swagger** : Pour la documentation de l'API.

## ⚙️ Installation et lancement en local

### Prérequis
- Node.js (v16 ou supérieur)
- MongoDB (local ou via MongoDB Atlas)

### 1. Configuration du Backend

```bash
# 1. Se déplacer dans le dossier backend
cd seccc-backend

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
# Créez ou modifiez le fichier .env avec les informations nécessaires (ex: PORT, MONGODB_URI, JWT_SECRET, etc.)

# 4. Lancer le serveur
npm start
# ou pour le mode développement (si nodemon est configuré)
npm run dev
```

### 2. Configuration du Frontend

```bash
# 1. Se déplacer dans le dossier frontend depuis la racine du projet
cd seccc-frontend

# 2. Installer les dépendances
npm install

# 3. Lancer l'environnement de développement
npm run dev
```
L'application frontend sera généralement accessible sur `http://localhost:5173`.

---
*Ce fichier a été généré pour documenter le projet SECCC.*
