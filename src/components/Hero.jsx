import { hero } from '../data/copy'

/* Forme décorative minimaliste (cœur en trait) — casse la grille, ton Saint-Valentin */
function HeroDecoration() {
  return (
    <div className="hero__decoration hero__intro" aria-hidden="true">
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 52C32 52 12 36 12 24c0-8 6-12 12-12 6 0 8 4 8 4s2-4 8-4c6 0 12 4 12 12 0 12-20 28-20 28z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroDecoration />
      <h1 id="hero-title" className="hero__title hero__intro">{hero.title}</h1>
      <p className="hero__subtitle hero__intro">{hero.subtitle}</p>
      <p className="hero__closing hero__intro">{hero.closing}</p>
    </section>
  )
}
