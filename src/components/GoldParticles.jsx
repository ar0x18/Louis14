// Particules dorées scintillantes en arrière-plan

const PARTICLE_COUNT = 24

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: (i * 13 + 7) % 100,
  top: (i * 17 + 11) % 100,
  size: 2 + (i % 3),
  delay: (i * 0.15) % 3,
  duration: 2.5 + (i % 4) * 0.5,
}))

export default function GoldParticles() {
  return (
    <div className="gold-particles" aria-hidden="true">
      {particles.map(({ id, left, top, size, delay, duration }) => (
        <span
          key={id}
          className="gold-particles__dot"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      ))}
    </div>
  )
}
