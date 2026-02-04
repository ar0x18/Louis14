# Design System — Saint-Valentin

Aligné avec **UI/UX Pro Max** : accessibilité, interaction, typographie, couleurs, animation.

---

## 1. Accessibilité (CRITIQUE)

- **Contraste** : Texte principal `#1a1a1a` sur fond `#faf9f7` (≥ 4.5:1). Texte secondaire `#4a4a4a` (ratio suffisant).
- **Focus** : Anneau visible sur tous les éléments interactifs (`:focus-visible`), pas de `outline: none` sans remplacement.
- **Navigation clavier** : Ordre de tab logique ; lien d’évitement « Aller au contenu » / « Aller au menu ».
- **Sémantique** : `main`, `section`, `h1`–`h3`, `aria-labelledby` / `aria-label` où pertinent.
- **Pas d’icônes emoji** : Utiliser des SVG si besoin (Heroicons, Lucide).

---

## 2. Touch & interaction

- **Cibles tactiles** : Min. 44×44 px pour tout élément cliquable.
- **Curseur** : `cursor: pointer` sur liens et éléments interactifs.
- **Hover** : Retour visuel net (ombre, bordure) sans décalage de mise en page (pas de scale qui décale).
- **Transitions** : 150–300 ms pour micro-interactions (hover, focus).

---

## 3. Performance & mouvement

- **Animations** : `transform` et `opacity` uniquement (pas de `width`/`height`).
- **Réduction du mouvement** : Respect de `prefers-reduced-motion: reduce` (réduire ou désactiver fade-in au scroll).
- **Scroll** : `scroll-behavior: smooth` pour les ancres.

---

## 4. Layout & responsive

- **Viewport** : `width=device-width, initial-scale=1` (déjà en place).
- **Corps de texte** : Min. 16 px sur mobile (lisible).
- **Largeur de ligne** : 65–75 caractères (max-width ~42 rem).
- **Breakpoints** : 375 px (mobile), 768 px (tablette), 1024 px (desktop).
- **Pas de scroll horizontal** : Contenu contenu dans la largeur viewport.
- **Z-index** : Échelle simple si fixe (ex. 10 nav, 20 overlay).

---

## 5. Typographie & couleurs

- **Titres** : Cormorant Garamond (serif), 600.
- **Corps** : Source Sans 3, line-height 1.5–1.75.
- **Palette** : Fond `#faf9f7`, cartes `#fffbf9`, accent rose `#e8d4d8` / `#f5e6e8`, texte `#1a1a1a` / `#4a4a4a`.

---

## 6. Composants

- **Hero** : Pleine hauteur, titre + 2–3 phrases, liens d’évitement discrets.
- **Countdown** : Grille 4 colonnes ; sur très petit écran, garder 4 colonnes avec chiffres plus petits ou passer en 2×2.
- **Menu** : Cartes avec hover (ombre), pas de scale pour éviter layout shift.
- **Reveal** : Fade-in au scroll ; désactivé ou réduit si `prefers-reduced-motion`.

---

## Anti-patterns à éviter

- Pas d’emoji comme icônes UI.
- Pas de `outline: none` sans focus visible.
- Pas de transition > 500 ms sur les micro-interactions.
- Pas de texte en gris trop clair (contraste insuffisant).
