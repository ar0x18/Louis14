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
    </section>
  )
}

/* ────────────────────────────────────────────
   SECTION 3 — COUNTDOWN CINÉMATIQUE
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

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(new Date()))
  const [visible, setVisible] = useState(false)
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

  if (!timeLeft) {
    return (
      <section className="section section--countdown" ref={ref}>
        <div className={`countdown-content ${visible ? 'countdown-content--visible' : ''}`}>
          <h2 className="countdown__title">C'est le grand jour</h2>
          <p className="countdown__subtitle">Enfin chez nous. ♥</p>
        </div>
      </section>
    )
  }

  const { days, hours, minutes, seconds } = timeLeft
  const cells = [
    { value: days, label: 'Jours', key: 'days' },
    { value: pad(hours), label: 'Heures', key: 'hours' },
    { value: pad(minutes), label: 'Minutes', key: 'minutes' },
    { value: pad(seconds), label: 'Secondes', key: 'seconds' },
  ]

  return (
    <section className="section section--countdown" ref={ref} id="countdown">
      <div className="countdown-bg-glow" aria-hidden="true" />
      <div className={`countdown-content ${visible ? 'countdown-content--visible' : ''}`}>
        <p className="countdown__eyebrow">Bientôt ensemble</p>
        <h2 className="countdown__title">Plus que…</h2>
        <div className="countdown__grid">
          {cells.map((c, i) => (
            <div key={c.key} className={`countdown__cell ${c.key === 'seconds' ? 'countdown__cell--seconds' : ''}`} style={{ transitionDelay: visible ? `${i * 0.12}s` : '0s' }}>
              <span className="countdown__value" key={c.key === 'seconds' ? seconds : c.value}>{c.value}</span>
              <span className="countdown__label">{c.label}</span>
            </div>
          ))}
        </div>
        <p className="countdown__target">jusqu'au <strong>31 mars 2026</strong> — notre emménagement</p>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   SECTION 4 — MENU DU SOIR
   ──────────────────────────────────────────── */
const categoryLabels = { 'entrée': 'Entrée', 'plat': 'Plat', 'dessert': 'Dessert' }

function MenuSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section section--menu" ref={ref} id="menu">
      <div className={`menu-content ${visible ? 'menu-content--visible' : ''}`}>
        <p className="menu__eyebrow">Ce soir</p>
        <h2 className="menu__title">Menu du Soir</h2>
        <div className="menu__line-deco" aria-hidden="true" />
        <div className="menu__cards">
          {menuItems.map((item, i) => (
            <article key={item.id} className="menu__card" style={{ transitionDelay: visible ? `${0.2 + i * 0.18}s` : '0s' }}>
              <div className="menu__card-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
              <span className="menu__category">{categoryLabels[item.category] || item.category}</span>
              <h3 className="menu__name">{item.name}</h3>
              {item.description && <p className="menu__description">{item.description}</p>}
              <div className="menu__card-heart" aria-hidden="true">♥</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   SECTION 5 — PHOTO FINALE
   ──────────────────────────────────────────── */
function PhotoSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

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
