import { useEffect, useRef, useState } from 'react'
import { hero } from '../data/copy'

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

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
  const prefersReducedMotion = usePrefersReducedMotion()
  const [phase, setPhase] = useState(prefersReducedMotion ? 'reading' : 'closed')
  const pointerStartYRef = useRef(null)
  const timeoutsRef = useRef([])
  const lines = hero.subtitle.split('\n')

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase('reading')
      // Nettoyer d’éventuels timeouts si la préférence change en cours de route
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [])

  function openEnvelope() {
    if (prefersReducedMotion) {
      setPhase('reading')
      return
    }
    if (phase !== 'closed') return

    setPhase('opening')

    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    const toUnfold = setTimeout(() => {
      setPhase('unfolded')
    }, 650)

    const toReading = setTimeout(() => {
      setPhase('reading')
    }, 1450)

    timeoutsRef.current = [toUnfold, toReading]
  }

  function handlePointerDown(event) {
    if (prefersReducedMotion) return
    pointerStartYRef.current = event.clientY
  }

  function handlePointerUp(event) {
    if (prefersReducedMotion) return
    if (pointerStartYRef.current == null) return

    const deltaY = pointerStartYRef.current - event.clientY
    pointerStartYRef.current = null

    if (deltaY > 40) {
      openEnvelope()
    }
  }

  function handleClick() {
    openEnvelope()
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openEnvelope()
    }
  }

  const letterContent = (
    <div
      className={[
        'hero__letter',
        prefersReducedMotion ? 'hero__intro' : 'hero__letter--from-envelope',
        phase === 'reading' ? 'hero__letter--reading' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p className="hero__letter-text">
        {lines.map((line, index) =>
          line.trim() === '' ? (
            <span
              key={index}
              className="hero__letter-line hero__letter-line--empty"
              aria-hidden="true"
            >
              {'\u00A0'}
            </span>
          ) : (
            <span key={index} className="hero__letter-line">
              {line}
            </span>
          ),
        )}
      </p>
      {hero.closing ? (
        <p className="hero__letter-signature">{hero.closing}</p>
      ) : null}
    </div>
  )

  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroDecoration />
      <h1 id="hero-title" className="hero__title hero__intro">
        {hero.title}
      </h1>

      {prefersReducedMotion ? (
        letterContent
      ) : (
        <div className={`hero__envelope hero__envelope--${phase}`}>
          <div
            className={`envelope envelope--${phase}`}
            role="button"
            tabIndex={0}
            aria-label="Ouvrir la lettre"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            <div className="envelope__body" aria-hidden="true" />
            <div className="envelope__flap" aria-hidden="true" />
            <div className="envelope__prompt">
              Glisse vers le haut pour ouvrir
            </div>
          </div>

          {letterContent}
        </div>
      )}
    </section>
  )
}
