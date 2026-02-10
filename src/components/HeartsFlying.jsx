/* Cœurs volants à l'ouverture — animation décorative Saint-Valentin */

const HEART_PATH =
  "M32 52C32 52 12 36 12 24c0-8 6-12 12-12 6 0 8 4 8 4s2-4 8-4c6 0 12 4 12 12 0 12-20 28-20 28z";

/* Cœurs : left %, size px, delay s, color class
   → plus nombreux, plus grands, et VRAIMENT de tailles variées */
const HEARTS_CONFIG = Array.from({ length: 44 }, (_, i) => {
  const band = i % 3; // 0 = petit, 1 = moyen, 2 = très grand

  let size;
  if (band === 0) {
    // petits cœurs
    size = 12 + (i % 4) * 2; // ~12–18px
  } else if (band === 1) {
    // moyens
    size = 22 + (i % 4) * 3; // ~22–31px
  } else {
    // très grands
    size = 34 + (i % 4) * 4; // ~34–46px
  }

  return {
    left: ((i * 11 + 9) % 100) - 4,
    size,
    delay: (i * 0.09) % 2.6,
    colorClass:
      i % 3 === 0
        ? "hearts-flying__heart--sharp"
        : "hearts-flying__heart--soft",
  };
});

export default function HeartsFlying() {
  return (
    <div className="hearts-flying" aria-hidden="true">
      {HEARTS_CONFIG.map(({ left, size, delay, colorClass }, i) => (
        <div
          key={i}
          className={`hearts-flying__heart ${colorClass}`}
          style={{
            left: `${left}%`,
            width: size,
            height: size,
            animationDelay: `${delay}s`,
          }}
        >
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path
              d={HEART_PATH}
              stroke="currentColor"
              strokeWidth="1.2"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
