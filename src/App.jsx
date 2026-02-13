import { useState, useEffect, useRef, useCallback } from 'react'
import { hero } from './data/copy'
import { menuItems } from './data/menu'
import coupleImg from './IMG/unnamed (10).jpg'

/* ────────────────────────────────────────────
   SECTION 1 — HERO CINÉMATIQUE
   ──────────────────────────────────────────── */
function HeroSection() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="section section--hero" aria-labelledby="hero-title">
      <div className="hero-bg-orbs" aria-hidden="true">
        <div className="hero-bg-orb hero-bg-orb--1" />
        <div className="hero-bg-orb hero-bg-orb--2" />
        <div className="hero-bg-orb hero-bg-orb--3" />
      </div>
      <div className={`hero-content ${visible ? 'hero-content--visible' : ''}`}>
        <div className="hero-sparkle-ring" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="hero-sparkle-ring__dot" style={{
              transform: `rotate(${i * 30}deg) translateY(-60px)`,
              animationDelay: `${i * 0.15}s`
            }} />
          ))}
        </div>
        <h1 id="hero-title" className="hero__title">{hero.title}</h1>
        <div className="hero__line-deco" aria-hidden="true" />
        <p className="hero__note">{hero.note}</p>
        <div className="hero__scroll-hint" aria-hidden="true">
          <span className="hero__scroll-arrow">↓</span>
        </div>
      </div>
      {/* Transition bridge → light */}
      <div className="section-bridge section-bridge--to-light" aria-hidden="true" />
    </section>
  )
}

/* ────────────────────────────────────────────
   SECTION 2 — ENVELOPPE + LETTRE (inline)
   ──────────────────────────────────────────── */
function EnvelopeSection() {
  const [opened, setOpened] = useState(false)
  const [flapAngle, setFlapAngle] = useState(0)
  const [letterVisible, setLetterVisible] = useState(false)
  const [sparkles, setSparkles] = useState([])
  const letterRef = useRef(null)

  const lines = hero.subtitle.split('\n')

  const burstSparkles = useCallback(() => {
    const newSparkles = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 80,
      y: 40 + (Math.random() - 0.5) * 60,
      size: 6 + Math.random() * 14,
      delay: Math.random() * 0.5,
      duration: 0.6 + Math.random() * 0.8,
      type: Math.random() > 0.4 ? 'heart' : 'star',
    }))
    setSparkles(newSparkles)
    setTimeout(() => setSparkles([]), 2500)
  }, [])

  const openEnvelope = useCallback(() => {
    if (opened) return
    setOpened(true)
    burstSparkles()
    let angle = 0
    const interval = setInterval(() => {
      angle += 6
      if (angle >= 180) {
        setFlapAngle(180)
        clearInterval(interval)
        setTimeout(() => {
          setLetterVisible(true)
          setTimeout(() => {
            letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }, 500)
        }, 400)
      } else {
        setFlapAngle(angle)
      }
    }, 16)
  }, [opened, burstSparkles])

  return (
    <section className="section section--envelope">
      {/* Point 2 : texte d'accroche avant l'enveloppe */}
      <p className="envelope-intro">J'ai quelque chose pour toi…</p>

      <div className="envelope-scene">
        {/* Floating particles */}
        <div className="envelope-particles" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="envelope-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }} />
          ))}
        </div>

        {/* Sparkle burst */}
        {sparkles.map((s) => (
          <span key={s.id} className="envelope-sparkle" style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            color: s.type === 'heart' ? '#FF69B4' : '#D4AF37',
          }}>
            {s.type === 'heart' ? '♥' : '✦'}
          </span>
        ))}

        {/* Envelope */}
        <div
          className={`envelope ${opened ? 'envelope--opened' : ''}`}
          onClick={openEnvelope}
          role="button"
          tabIndex={0}
          aria-label="Ouvrir la lettre d'amour"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openEnvelope()}
        >
          <div className="envelope__body">
            <div className="envelope__body-shine" />
            <svg className="envelope__fold-lines" viewBox="0 0 300 180" fill="none" aria-hidden="true">
              <path d="M0 0 L150 100 L300 0" stroke="rgba(139,0,53,0.06)" strokeWidth="1" />
            </svg>
          </div>

          <div className="envelope__flap" style={{ transform: `rotateX(${180 - flapAngle}deg)` }}>
            <div className="envelope__flap-front">
              <div className="envelope__wax-seal" style={{
                opacity: 1 - (flapAngle / 180),
                transform: `scale(${1 - (flapAngle / 180) * 0.3})`
              }}>
                <span className="envelope__seal-icon">♥</span>
              </div>
            </div>
            <div className="envelope__flap-back" />
          </div>

          {!opened && (
            <div className="envelope__click-hint">
              <span className="envelope__hint-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Letter inline */}
      <div ref={letterRef} className={`letter-inline ${letterVisible ? 'letter-inline--visible' : ''}`}>
        <div className="letter-paper">
          <div className="letter-paper__glow" aria-hidden="true" />
          <div className="letter-paper__watermark" aria-hidden="true">♥</div>
          <div className="letter-paper__decor-top" />
          <div className="letter-paper__text">
            {lines.map((line, index) =>
              line.trim() === '' ? (
                <span key={index} className="letter-paper__line letter-paper__line--empty">&nbsp;</span>
              ) : (
                <span key={index} className="letter-paper__line" style={{
                  animationDelay: `${0.4 + index * 0.55}s`
                }}>{line}</span>
              )
            )}
          </div>
          {hero.closing && (
            <p className="letter-paper__signature" style={{
              animationDelay: `${0.4 + lines.length * 0.55}s`
            }}>{hero.closing}</p>
          )}
          <div className="letter-paper__decor-bottom" />
        </div>
      </div>

      {/* Transition bridge → dark (countdown) */}
      <div className="section-bridge section-bridge--to-dark" aria-hidden="true" />
    </section>
  )
}

/* ────────────────────────────────────────────
   SECTION 3 — COUNTDOWN CINÉMATIQUE
   Point 8 : texte émotionnel au lieu de factuel
   ──────────────────────────────────────────── */
const TARGET = new Date('2026-03-31T00:00:00')

function getTimeLeft(now) {
  const diff = TARGET - now
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function pad(n) { return String(n).padStart(2, '0') }

const MAX_PARTICLES = 72

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(new Date()))
  const [visible, setVisible] = useState(false)
  const [particles, setParticles] = useState([])
  const ref = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!timeLeft) return
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      vx: (Math.random() - 0.5) * 160,
      vy: (Math.random() - 0.5) * 160 - 40,
      type: Math.random() > 0.5 ? 'heart' : 'sparkle',
      delay: Math.random() * 0.15,
    }))
    setParticles((prev) => {
      const merged = [...prev, ...newParticles]
      return merged.length > MAX_PARTICLES ? merged.slice(-MAX_PARTICLES) : merged
    })
  }, [timeLeft?.seconds])

  useEffect(() => {
    const id = setInterval(() => {
      setParticles((p) => p.filter((x) => x.id > Date.now() - 2500))
    }, 500)
    return () => clearInterval(id)
  }, [])

  if (!timeLeft) {
    return (
      <section className="section section--countdown" ref={ref}>
        <div className={`countdown-content ${visible ? 'countdown-content--visible' : ''}`}>
          <h2 className="countdown__title">C'est le grand jour</h2>
          <p className="countdown__subtitle">Plus jamais de « bonne nuit » par snap...</p>
        </div>
      </section>
    )
  }

  const { days, hours, minutes, seconds } = timeLeft

  return (
    <section className="section section--countdown" ref={ref} id="countdown">
      <div className="countdown-bg-glow" aria-hidden="true" />
      <div className={`countdown-content ${visible ? 'countdown-content--visible' : ''}`}>
        <p className="countdown__eyebrow">Bientôt ensemble</p>
        <h2 className="countdown__title">Plus que…</h2>

        <div className="countdown-heart">
          <svg className="countdown-heart__svg" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF69B4" />
                <stop offset="50%" stopColor="#E6396C" />
                <stop offset="100%" stopColor="#8B0035" />
              </linearGradient>
              <filter id="heartGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="heartShine" cx="35%" cy="30%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <path
              className="countdown-heart__path"
              fill="url(#heartGradient)"
              filter="url(#heartGlow)"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
            <ellipse className="countdown-heart__shine" cx="8" cy="8" rx="5" ry="4" fill="url(#heartShine)" />
          </svg>

          <div className="countdown-heart__content">
            <span className="countdown__days-main" key={days}>{days}</span>
            <span className="countdown__days-label">jours</span>
            <span className="countdown__hm">
              {pad(hours)}h {pad(minutes)}min
            </span>
          </div>

          <div className="countdown-heart__particles" aria-hidden="true">
            {particles.map((p) => (
              <span
                key={p.id}
                className={`countdown-particle countdown-particle--${p.type}`}
                style={{
                  '--vx': `${p.vx}px`,
                  '--vy': `${p.vy}px`,
                  animationDelay: `${p.delay}s`,
                }}
              >
                {p.type === 'heart' ? '♥' : '✨'}
              </span>
            ))}
          </div>
        </div>

        <p className="countdown__target">avant le <strong>31 mars 2026</strong></p>
        <p className="countdown__emotional">Plus jamais de « bonne nuit » par snap...</p>
      </div>
      {/* Transition bridge → light (menu) */}
      <div className="section-bridge section-bridge--to-light" aria-hidden="true" />
    </section>
  )
}

/* ────────────────────────────────────────────
   SECTION 4 — MENU DU SOIR
   Cartes flip : face avant mystère, face arrière révélation
   ──────────────────────────────────────────── */
const categoryLabels = { 'entrée': 'Entrée', 'plat': 'Plat', 'dessert': 'Dessert' }
const categoryIcons = { 'entrée': '✧', 'plat': '◆', 'dessert': '❋' }

function FlipCard({ item, index, visible }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card ${flipped ? 'flip-card--flipped' : ''}`}
      style={{ transitionDelay: visible ? `${0.15 + index * 0.2}s` : '0s' }}
      onClick={() => setFlipped(f => !f)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped(f => !f)}
      role="button"
      tabIndex={0}
      aria-label={`Découvrir ${categoryLabels[item.category]}`}
    >
      <div className="flip-card__inner">
        {/* FRONT — mystère */}
        <div className="flip-card__face flip-card__front">
          <div className="flip-card__front-glow" aria-hidden="true" />
          <span className="flip-card__icon" aria-hidden="true">{categoryIcons[item.category]}</span>
          <span className="flip-card__number">{String(index + 1).padStart(2, '0')}</span>
          <span className="flip-card__category">{categoryLabels[item.category] || item.category}</span>
          <span className="flip-card__tap-hint">touche pour découvrir</span>
        </div>
        {/* BACK — révélation */}
        <div className="flip-card__face flip-card__back">
          <div className="flip-card__back-shimmer" aria-hidden="true" />
          <span className="flip-card__back-category">{categoryLabels[item.category]}</span>
          <h3 className="flip-card__name">{item.name}</h3>
          {item.description && <p className="flip-card__description">{item.description}</p>}
          <span className="flip-card__heart" aria-hidden="true">♥</span>
        </div>
      </div>
    </div>
  )
}

function MenuSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section section--menu" ref={ref} id="menu">
      <div className={`menu-content ${visible ? 'menu-content--visible' : ''}`}>
        <p className="menu__eyebrow">Ce soir</p>
        <h2 className="menu__title">Menu du Soir</h2>
        <div className="menu__line-deco" aria-hidden="true" />
        <p className="menu__subtitle">Touche chaque carte pour découvrir ton repas</p>
        <div className="menu__flip-grid">
          {menuItems.map((item, i) => (
            <FlipCard key={item.id} item={item} index={i} visible={visible} />
          ))}
        </div>
      </div>
      {/* Transition bridge → dark (photo) */}
      <div className="section-bridge section-bridge--to-dark" aria-hidden="true" />
    </section>
  )
}

/* ────────────────────────────────────────────
   SECTION 5 — PHOTO FINALE
   Point 4 : message de clôture dynamique
   ──────────────────────────────────────────── */
function PhotoSection() {
  const [visible, setVisible] = useState(false)
  const [daysLeft, setDaysLeft] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const diff = TARGET - new Date()
    if (diff > 0) {
      setDaysLeft(Math.floor(diff / (1000 * 60 * 60 * 24)))
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section section--photo" ref={ref} id="nous">
      <div className={`photo-content ${visible ? 'photo-content--visible' : ''}`}>
        <p className="photo__eyebrow">Nous</p>
        <h2 className="photo__title">Toi & Moi</h2>
        <div className="photo__frame">
          <div className="photo__frame-border" aria-hidden="true" />
          <div className="photo__frame-glow" aria-hidden="true" />
          <img
            src={coupleImg}
            alt="Louis et sa copine"
            className="photo__img"
            loading="lazy"
          />
        </div>
        <p className="photo__closing">
          {daysLeft !== null
            ? `Dans ${daysLeft} jours, plus jamais séparés.`
            : 'Enfin ensemble, pour de vrai.'
          }
        </p>
        <p className="photo__footer">Je t'aime ♥</p>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   FLOATING HEARTS (global)
   ──────────────────────────────────────────── */
function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {[...Array(25)].map((_, i) => (
        <div key={i} className="floating-heart" style={{
          left: `${(i * 17 + 3) % 100}%`,
          animationDelay: `${(i * 0.5) % 10}s`,
          animationDuration: `${10 + (i % 6) * 3}s`,
          fontSize: `${8 + (i % 5) * 4}px`,
          opacity: 0.04 + (i % 4) * 0.015,
        }}>♥</div>
      ))}
    </div>
  )
}

/* ────────────────────────────────────────────
   GOLD PARTICLES (global)
   ──────────────────────────────────────────── */
function GoldParticlesGlobal() {
  return (
    <div className="gold-particles" aria-hidden="true">
      {[...Array(16)].map((_, i) => (
        <span key={i} className="gold-particle" style={{
          left: `${(i * 13 + 7) % 100}%`,
          top: `${(i * 19 + 11) % 100}%`,
          width: `${2 + (i % 3)}px`,
          height: `${2 + (i % 3)}px`,
          animationDelay: `${(i * 0.2) % 4}s`,
          animationDuration: `${2.5 + (i % 4) * 0.5}s`,
        }} />
      ))}
    </div>
  )
}

/* ────────────────────────────────────────────
   APP — One-page storytelling
   ──────────────────────────────────────────── */
export default function App() {
  return (
    <div className="story">
      <FloatingHearts />
      <GoldParticlesGlobal />
      <HeroSection />
      <EnvelopeSection />
      <CountdownSection />
      <MenuSection />
      <PhotoSection />
    </div>
  )
}
