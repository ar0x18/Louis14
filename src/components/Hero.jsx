import { useEffect, useRef, useState, useCallback } from 'react'
import { hero } from '../data/copy'

const PHASES = { CLOSED: 'closed', OPENING: 'opening', OPEN: 'open' }
const SWIPE_THRESHOLD = 60

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
  const [phase, setPhase] = useState(prefersReducedMotion ? PHASES.OPEN : PHASES.CLOSED)
  const [flapAngle, setFlapAngle] = useState(0)
  const [letterSlide, setLetterSlide] = useState(0)
  const [showLetter, setShowLetter] = useState(prefersReducedMotion)
  const [sparkles, setSparkles] = useState([])
  const [hint, setHint] = useState(true)
  const [letterAnimationComplete, setLetterAnimationComplete] = useState(false)

  const envelopeRef = useRef(null)
  const dragRef = useRef({ active: false, startY: 0, startAngle: 0, phase: null })
  const overlayDragRef = useRef({ active: false, startY: 0 })

  const letterText = hero.closing
    ? `${hero.subtitle}\n\n${hero.closing}`
    : hero.subtitle
  const lines = hero.subtitle.split('\n')
  const letterPreview = lines.slice(0, 3).join(' ').slice(0, 60) + '…'

  const burstSparkles = useCallback(() => {
    const newSparkles = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 70,
      y: 30 + (Math.random() - 0.5) * 40,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 0.4,
      duration: 0.8 + Math.random() * 0.6,
      type: Math.random() > 0.5 ? 'heart' : 'star',
    }))
    setSparkles(newSparkles)
    setTimeout(() => setSparkles([]), 2000)
  }, [])

  const handlePointerDown = useCallback(
    (e) => {
      if (phase === PHASES.OPEN || prefersReducedMotion) return
      e.preventDefault()
      dragRef.current = {
        active: true,
        startY: e.clientY,
        startAngle: flapAngle,
        phase: flapAngle >= 170 ? 'letter' : 'flap',
      }
      setHint(false)
    },
    [phase, flapAngle, prefersReducedMotion]
  )

  const handlePointerMove = useCallback(
    (e) => {
      if (!dragRef.current.active || phase === PHASES.OPEN || prefersReducedMotion) return
      e.preventDefault()
      const dy = dragRef.current.startY - e.clientY

      if (dragRef.current.phase === 'flap') {
        const newAngle = Math.min(180, Math.max(0, dragRef.current.startAngle + dy * 1.8))
        setFlapAngle(newAngle)
        if (newAngle > 10) setPhase(PHASES.OPENING)
      } else if (dragRef.current.phase === 'letter') {
        const slide = Math.min(1, Math.max(0, dy / 200))
        setLetterSlide(slide)
      }
    },
    [phase, prefersReducedMotion]
  )

  const handlePointerUp = useCallback(() => {
    if (!dragRef.current.active) return
    dragRef.current.active = false

    if (dragRef.current.phase === 'flap') {
      if (flapAngle > SWIPE_THRESHOLD) {
        setFlapAngle(180)
        setPhase(PHASES.OPENING)
      } else {
        setFlapAngle(0)
        setPhase(PHASES.CLOSED)
      }
    } else if (dragRef.current.phase === 'letter') {
      if (letterSlide > 0.3) {
        setLetterSlide(1)
        setShowLetter(true)
        setPhase(PHASES.OPEN)
        burstSparkles()
      } else {
        setLetterSlide(0)
      }
    }
  }, [flapAngle, letterSlide, burstSparkles])

  const handleClick = useCallback(() => {
    if (prefersReducedMotion) return
    if (phase === PHASES.CLOSED) {
      setHint(false)
      setFlapAngle(180)
      setPhase(PHASES.OPENING)
    } else if (phase === PHASES.OPENING && flapAngle >= 170) {
      setLetterSlide(1)
      setShowLetter(true)
      setPhase(PHASES.OPEN)
      burstSparkles()
    }
  }, [phase, flapAngle, burstSparkles, prefersReducedMotion])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick]
  )

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase(PHASES.OPEN)
      setShowLetter(true)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const onMove = (e) => handlePointerMove(e)
    const onUp = () => handlePointerUp()
    window.addEventListener('pointermove', onMove, { passive: false })
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [handlePointerMove, handlePointerUp])

  useEffect(() => {
    if (!showLetter) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setShowLetter(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showLetter])

  /* Fin de l'animation d'écriture → afficher le hint "Glisse vers le bas" */
  useEffect(() => {
    if (!showLetter || prefersReducedMotion) return
    setLetterAnimationComplete(false)
    const lineCount = lines.length
    const duration = Math.max(lineCount * 0.7 + 1.5, 10)
    const t = setTimeout(() => setLetterAnimationComplete(true), duration * 1000)
    return () => clearTimeout(t)
  }, [showLetter, prefersReducedMotion, lines.length])

  const [hintPulse, setHintPulse] = useState(false)
  useEffect(() => {
    if (!hint) return
    const t = setInterval(() => setHintPulse((p) => !p), 1500)
    return () => clearInterval(t)
  }, [hint])

  const flapOpenRatio = flapAngle / 180
  const isFlapped = flapAngle >= 170

  const handleOverlayPointerDown = useCallback((e) => {
    overlayDragRef.current = { active: true, startY: e.clientY }
  }, [])

  const handleOverlayPointerMove = useCallback((e) => {
    if (!overlayDragRef.current.active) return
    const dy = overlayDragRef.current.startY - e.clientY
    if (dy < -80) {
      setShowLetter(false)
      overlayDragRef.current.active = false
    }
  }, [])

  const handleOverlayPointerUp = useCallback(() => {
    overlayDragRef.current.active = false
  }, [])

  useEffect(() => {
    if (!showLetter) return
    const onMove = (e) => handleOverlayPointerMove(e)
    const onUp = () => handleOverlayPointerUp()
    window.addEventListener('pointermove', onMove, { passive: false })
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [showLetter, handleOverlayPointerMove, handleOverlayPointerUp])

  if (prefersReducedMotion) {
    return (
      <section className="hero" aria-labelledby="hero-title">
        <HeroDecoration />
        <h1 id="hero-title" className="hero__title hero__intro">
          {hero.title}
        </h1>
        {hero.note ? (
          <p className="hero__note hero__intro">{hero.note}</p>
        ) : null}
        <div
          className={['hero__letter', 'hero__letter--reduced', 'hero__intro']
            .filter(Boolean)
            .join(' ')}
        >
          <div className="letter__watermark" aria-hidden="true">♥</div>
          <div className="letter__decor-top" />
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
              )
            )}
          </p>
          {hero.closing ? (
            <p className="hero__letter-signature">{hero.closing}</p>
          ) : null}
          <div className="letter__decor-bottom" />
        </div>
      </section>
    )
  }

  return (
    <section className="hero hero--envelope-scene" aria-labelledby="hero-title">
      <HeroDecoration />
      <h1 id="hero-title" className="hero__title hero__intro">
        {hero.title}
      </h1>
      {hero.note ? (
        <p className="hero__note hero__intro">{hero.note}</p>
      ) : null}

      <div className="hero__envelope hero__envelope--love">
        {/* Floating background hearts */}
        <div className="envelope__bg-hearts" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="envelope__bg-heart"
              style={{
                left: `${10 + i * 15}%`,
                animationDelay: `${i * 1.2}s`,
                fontSize: `${14 + (i % 3) * 6}px`,
                opacity: 0.12 + (i % 3) * 0.04,
              }}
            >
              ♥
            </span>
          ))}
        </div>

        {sparkles.map((s) => (
          <span
            key={s.id}
            className="envelope__sparkle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: `${s.size}px`,
              color: s.type === 'heart' ? '#e8758a' : '#f4c76b',
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          >
            {s.type === 'heart' ? '♥' : '✦'}
          </span>
        ))}

        <div
          ref={envelopeRef}
          className="envelope__wrapper"
          onPointerDown={handlePointerDown}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Ouvrir la lettre d'amour"
        >
          <div
            className="envelope__seal-glow"
            style={{ opacity: phase === PHASES.CLOSED ? 0.6 : 0 }}
            aria-hidden="true"
          />

          <div
            className="envelope__letter-preview"
            style={{
              transform: `translateY(${-letterSlide * 110}%)`,
              opacity: letterSlide > 0 ? 1 : 0,
            }}
          >
            <div className="envelope__letter-paper">
              <div className="letter__watermark letter__watermark--preview">♥</div>
              <p className="envelope__letter-preview-text">{letterPreview}</p>
            </div>
          </div>

          <div className="envelope__body-new">
            <div className="envelope__body-inner" />
            <div className="envelope__body-border" />
            <svg
              className="envelope__fold-lines"
              viewBox="0 0 300 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M0 0 L150 100 L300 0"
                stroke="rgba(184, 92, 108, 0.08)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>

          <div
            className="envelope__flap-new"
            style={{ transform: `rotateX(${180 - flapAngle}deg)` }}
          >
            <div className="envelope__flap-front">
              <div
                className="envelope__wax-seal"
                style={{
                  opacity: 1 - flapOpenRatio,
                  transform: `scale(${1 - flapOpenRatio * 0.3})`,
                }}
              >
                <span className="envelope__seal-heart">♥</span>
              </div>
            </div>
            <div className="envelope__flap-back" />
          </div>

          {hint && phase === PHASES.CLOSED && (
            <div
              className="envelope__hint"
              style={{ opacity: hintPulse ? 1 : 0.5 }}
            >
              <span className="envelope__hint-arrow">↑</span>
              Glisse vers le haut
            </div>
          )}

          {isFlapped && !showLetter && phase !== PHASES.OPEN && (
            <div className="envelope__hint envelope__hint--continue">
              <span className="envelope__hint-arrow">↑</span>
              Continue pour lire
            </div>
          )}
        </div>
      </div>

      {showLetter && (
        <div
          className="letter__overlay letter__overlay--reading"
          onClick={(e) => e.target === e.currentTarget && setShowLetter(false)}
          onPointerDown={handleOverlayPointerDown}
          style={{ touchAction: 'none' }}
        >
          <div className="letter__overlay-content" onClick={(e) => e.stopPropagation()}>
            <div className="letter__watermark letter__watermark--overlay">♥</div>
            <div className="letter__decor-top" />
            <p className="letter__full-text">
              {lines.map((line, index) =>
                line.trim() === '' ? (
                  <span
                    key={index}
                    className="letter__line letter__line--empty"
                    aria-hidden="true"
                  >
                    {'\u00A0'}
                  </span>
                ) : (
                  <span key={index} className="letter__line">
                    {line}
                  </span>
                )
              )}
            </p>
            {hero.closing ? (
              <p className="letter__signature">{hero.closing}</p>
            ) : null}
            <div className="letter__decor-bottom" />
            {letterAnimationComplete && (
              <div className="letter__slide-hint">
                <span className="letter__slide-hint-arrow">↓</span>
                Glisse vers le bas pour voir le menu du soir
              </div>
            )}
            <button
              type="button"
              className="letter__close-btn"
              onClick={() => setShowLetter(false)}
              aria-label="Fermer et voir le menu"
            >
              Voir le menu
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
