# Notre Saint-Valentin

Site une page : message, compte à rebours jusqu’au 31 mars 2026, et menu du soir. React + Vite, déploiement Vercel.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre l’URL affichée (souvent `http://localhost:5173`).

## Build

```bash
npm run build
```

Sortie dans `dist/`.

## Déployer sur Vercel

1. Pousse le projet sur un repo Git (GitHub, GitLab ou Bitbucket).
2. Sur [vercel.com](https://vercel.com) : **Add New** → **Project** → importe le repo.
3. Vercel détecte Vite ; vérifie que **Build Command** = `npm run build` et **Output Directory** = `dist`.
4. Déploie.

Le fichier `vercel.json` est déjà configuré.

## Modifier le contenu

- **Textes du hero** (titre, sous-titre, phrase de fin) : `src/data/copy.js`
- **Menu** (plats, descriptions, catégories) : `src/data/menu.js`

Pas besoin de toucher aux composants pour changer les textes ou les plats.
