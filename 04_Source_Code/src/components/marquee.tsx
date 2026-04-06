export function Marquee() {
  const items = [
    'Concert Stages',
    'Corporate Events',
    'Award Ceremonies',
    'Fashion Shows',
    'Sports Events',
    'Exhibitions',
    'Film Shoots',
    'Political Rallies',
  ];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {/* Doubled for seamless infinite loop */}
        {[...items, ...items].map((item, i) => (
          <span className="marquee-item" key={i}>
            {item} <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
