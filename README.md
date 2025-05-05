# Next-Strapi

Projet fullstack composé de :

- **Frontend** : [Next.js](https://nextjs.org/) (avec [Mantine UI](https://mantine.dev/), [NextAuth.js](https://next-auth.js.org/))
- **Backend** : [Strapi](https://strapi.io/) (headless CMS avec API REST sécurisée)

---

## 📁 Structure du projet

```
Next-Strapi/
├── frontend   → Application Next.js
└── backend    → API Strapi
```

---

## 🚀 Installation rapide

### 1. Cloner le dépôt

```bash
git clone https://github.com/syalicheff/Next-Strapi.git
cd Next-Strapi
```

### 2. Lancer le backend (Strapi)

```bash
cd backend
npm install
npm run develop
```

- Interface admin : http://localhost:1337/admin
- API : http://localhost:1337/api

### 3. Lancer le frontend (Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

- App web : http://localhost:3000

---

## 🔐 Authentification

Le frontend utilise `next-auth` avec le provider **Credentials** connecté à Strapi :

- Connexion via `/login`
- Middleware pour protéger les routes
- Le JWT est injecté automatiquement dans les appels API sécurisés

---

## 🧪 Fonctionnalités incluses

- [x] Authentification avec NextAuth.js
- [x] Protection des routes via middleware
- [x] Connexion propre entre Next.js et Strapi
- [x] UI réactive avec Mantine
- [x] Architecture modulaire et évolutive

---

## 📦 Stack technique

- Next.js 14+ (App Router)
- TypeScript
- Mantine UI
- NextAuth.js (JWT + credentials)
- Strapi v4 (Node.js + REST API)

---

## 📃 Scripts utiles

### Frontend

```bash
npm run dev       # Lancer Next.js en développement
npm run build     # Compiler pour la production
npm run lint      # Linter le code
```

### Backend

```bash
npm run develop   # Lancer Strapi en développement
npm run build     # Compiler l’admin panel
npm run start     # Démarrer en mode production
```

---

## 📌 Pré-requis

- Node.js v18+
- npm
- Git

---

## ✅ TODO / idées futures

- [ ] Inscription frontend (`/register`)
- [ ] Réinitialisation de mot de passe
- [ ] Dashboard utilisateur
- [ ] Uploads avec Strapi Media Library
- [ ] Déploiement Vercel + Render/Railway

---

## ✨ Auteur

**Sébastien Yalicheff**  
🔗 [https://github.com/syalicheff](https://github.com/syalicheff)

---

## 🪪 Licence

Ce projet est open-source et libre d’utilisation.
