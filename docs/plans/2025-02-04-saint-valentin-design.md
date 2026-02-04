# Design — Site Saint-Valentin

**Date :** 2025-02-04  
**Projet :** Site web express pour la Saint-Valentin (menu du soir + expérience personnalisée).  
**Stack :** React, sans backend. Déploiement Vercel.

---

## 1. Objectifs et contenu

- **Message affectueux** en haut de page (ton léger, complice, pas solennel).
- **Compte à rebours en direct** jusqu’au **31 mars 2026** (jour d’emménagement) : jours, heures, minutes, secondes, mis à jour chaque seconde.
- **Menu du soir** : base actuelle — linguine crème/parmesan, poulet pané (optionnel), mousse au chocolat ; structure modulable (entrée optionnelle, plats, dessert).
- **Direction artistique :** épuré, moderne, romantique, sobre et élégant.

---

## 2. Stack et structure du projet

- **React 18** (Vite recommandé). Pas de backend ni API.
- **Contenu :** texte et menu dans des fichiers de données (`src/data/menu.js`, éventuellement `src/data/copy.js`) pour modifier facilement plats et textes sans toucher à la logique.
- **Déploiement Vercel :** build `npm run build`, output `dist`. Pas de variables d’environnement.

Structure type :

```
src/
  App.jsx
  main.jsx
  components/   (Hero, Countdown, Menu)
  data/         (menu.js, copy.js si besoin)
  styles/       ou CSS modules / Tailwind
```

---

## 3. Structure de la page (une seule page, scroll fluide)

1. **Hero** — Bloc pleine hauteur (ou quasi). Titre court + 2–3 phrases (texte affectueux). Typo lisible, espacement généreux.
2. **Countdown** — Section dédiée, date cible 31 mars 2026 00h00. Affichage : Jours | Heures | Minutes | Secondes. Mise à jour chaque seconde.
3. **Menu** — Titre de section puis liste des plats (nom + description optionnelle). Structure : entrée (optionnel), plat(s), dessert. Données dans `data/menu.js`.

Composants : `Hero`, `Countdown`, `Menu`. `App` enchaîne les trois sans routing. Ancres optionnelles (`id="menu"` etc.) pour liens internes si besoin.

---

## 4. Direction artistique

- **Palette :** Fond clair (blanc cassé / crème). Accents rose pâle. Texte noir ou gris très foncé. Pas de rouge vif.
- **Typo :** Une police élégante pour les titres (serif ou sans), une lisible pour le corps. Tailles généreuses au hero.
- **Espacement :** Marges et padding larges, contenu centré avec max-width (720–900 px).
- **Animations :** Fade-in au scroll par section (Intersection Observer ou Framer Motion), transitions douces au chargement. Pas d’animation à chaque tick du countdown. Hover discret sur les cartes du menu. Pas de son ni musique.

---

## 5. Détails techniques

- **Countdown :** `new Date('2026-03-31T00:00:00')` vs `new Date()`, décomposition J/H/M/S, `setInterval(1000)` avec cleanup dans `useEffect`. Si date dépassée : afficher un message type « C’est le grand jour ».
- **Menu :** Données en tableau d’objets (`id`, `name`, `description?`, `category`). Composant `Menu` fait un `.map` ; fallback minimal si données absentes.
- **Noscript :** Phrase de repli pour les visiteurs sans JS (ex. « Plus que quelques semaines… »).

---

## 6. Récapitulatif des validations

- Menu : base linguine / poulet pané (optionnel) / mousse au chocolat, structure modulable.
- Une seule page, scroll fluide.
- Ton du texte : léger et complice.
- Ambiance visuelle : claire et douce (crème, rose pâle, blanc).
- Countdown : jours, heures, minutes, secondes en direct.
- Animations : fade-in au scroll, transitions douces, hover discret.
