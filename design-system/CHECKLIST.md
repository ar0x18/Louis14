# Pre-Delivery Checklist (UI/UX Pro Max)

## Qualité visuelle
- [x] Pas d’emoji comme icônes (aucune icône emoji utilisée)
- [x] Hover sans layout shift (ombre uniquement, pas de scale)
- [x] Transitions 150–300 ms (--ease: 0.2s)

## Interaction
- [x] Éléments cliquables avec focus visible (skip links :focus-visible)
- [x] Hover avec retour visuel (ombre sur cartes countdown et menu)
- [x] Curseur adapté (cursor: default sur cartes non cliquables)

## Accessibilité
- [x] Contraste texte suffisant (#1a1a1a, #4a4a4a sur fond clair)
- [x] Liens d’évitement « Aller au menu » / « Aller au compte à rebours »
- [x] `prefers-reduced-motion` : scroll auto, reveal sans animation, skip sans transition

## Layout
- [x] Viewport meta présent
- [x] Pas de contenu masqué derrière un bandeau fixe
- [x] Responsive 375px (grille countdown 2×2), 768px+, pas de scroll horizontal (overflow-x: hidden)

## Touch
- [x] Cibles min. 44px (countdown__cell, menu__card avec min-height 44px)
