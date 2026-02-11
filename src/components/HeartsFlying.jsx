/* Cœurs volants à l'ouverture — animation décorative Saint-Valentin */

const HEART_PATH =
  "M32 52C32 52 12 36 12 24c0-8 6-12 12-12 6 0 8 4 8 4s2-4 8-4c6 0 12 4 12 12 0 12-20 28-20 28z";

/* Nuances de rose pour les cœurs */
const PINK_COLORS = [
  "#ffb3c6", "#ff9ebb", "#ff85b3", "#ff6b9d", "#e8758a", "#e0607a",
  "#d84a6a", "#c93a5c", "#b85c6c", "#a64d5c", "#f5c6d6", "#f0a5bc",
  "#eba3b8", "#e8d4d8", "#fce4ec", "#f8bbd9", "#f48fb1", "#ec407a",
  "#d81b60", "#ad1457", "#880e4f", "#ffc0cb", "#ff69b4", "#ff1493",
];

/* Cœurs : left %, size px, delay s, color — beaucoup plus nombreux, toutes tailles, tous roses */
const HEARTS_CONFIG = Array.from({ length: 120 }, (_, i) => {
  // Tailles variées : de tout petits (6px) à très grands (58px)
  const size = 6 + (i * 7 + 13) % 53;

  return {
    left: ((i * 17 + 3) % 110) - 8,
    size,
    delay: (i * 0.06 + 0.02) % 3,
    color: PINK_COLORS[i % PINK_COLORS.length],
  };
});

export default function HeartsFlying() {
  return (
    <div className="hearts-flying" aria-hidden="true">
      {HEARTS_CONFIG.map(({ left, size, delay, color }, i) => (
        <div
          key={i}
          className="hearts-flying__heart"
          style={{
            left: `${left}%`,
            width: size,
            height: size,
            animationDelay: `${delay}s`,
            color,
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
