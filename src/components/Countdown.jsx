import { useEffect, useState } from 'react'

const TARGET = new Date('2026-03-31T00:00:00')

const targetLabel = (() => {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(TARGET)
  } catch {
    return '31 mars 2026'
  }
})()

function getTimeLeft(now) {
  const diff = TARGET - now
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  if (timeLeft === null) {
    return (
      <section className="countdown countdown--done" id="countdown">
        <h2 className="countdown__title">C’est le grand jour</h2>
        <p className="countdown__message">Enfin chez nous.</p>
      </section>
    )
  }

  const { days, hours, minutes, seconds } = timeLeft

  return (
    <section className="countdown" id="countdown" aria-label="Compte à rebours jusqu’au 31 mars 2026">
      <h2 className="countdown__title">Plus que…</h2>
      <p className="countdown__target">jusqu’au {targetLabel} — notre emménagement</p>
      <div className="countdown__grid" role="timer">
        <div className="countdown__cell">
          <span className="countdown__value-wrap"><span className="countdown__value">{days}</span></span>
          <span className="countdown__label">Jours</span>
        </div>
        <div className="countdown__cell">
          <span className="countdown__value-wrap"><span className="countdown__value">{pad(hours)}</span></span>
          <span className="countdown__label">Heures</span>
        </div>
        <div className="countdown__cell">
          <span className="countdown__value-wrap"><span className="countdown__value">{pad(minutes)}</span></span>
          <span className="countdown__label">Minutes</span>
        </div>
        <div className="countdown__cell countdown__cell--seconds">
          <span className="countdown__value-wrap" key={seconds}>
            <span className="countdown__value">{pad(seconds)}</span>
          </span>
          <span className="countdown__label">Secondes</span>
        </div>
      </div>
      <noscript>
        <p className="countdown__noscript">Plus que quelques semaines jusqu’à notre emménagement.</p>
      </noscript>
    </section>
  )
}
