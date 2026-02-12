/* Cœurs volants à l'ouverture — animation décorative Saint-Valentin */

const HEART_PATH =
  "M32 52C32 52 12 36 12 24c0-8 6-12 12-12 6 0 8 4 8 4s2-4 8-4c6 0 12 4 12 12 0 12-20 28-20 28z";

/* Palette DA : rose poudré, rose vif, bordeaux, touches d'or */
const PINK_COLORS = [
  "#FFB6C1", "#FF69B4", "#8B0035", "#D4AF37", "#ffc0cb", "#ff9ebb",
  "#ff85b3", "#a6395c", "#c94e6e", "#e8758a", "#f5c6d6", "#f0a5bc",
  "#ffdfe6", "#ffe4eb", "#ff1493", "#b85c6c", "#d4af37", "#e8c547",
  "#ffb6c1", "#ff69b4", "#8b0035", "#fff5f5", "#ffc9d8", "#ffdfe6",
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
