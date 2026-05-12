'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Overlap gallery — manual two-slide gallery.
 *
 * Slide 1: short video (muted, playsInline). Plays once each time the
 *           slide becomes active, then rewinds and pauses on frame 0
 *           — it does NOT loop.
 * Slide 2: static image.
 *
 * Both slides have mobile (9:16) and desktop (16:9) variants. The
 * inactive viewport variant is hidden via CSS.
 *
 * Navigation is user-driven only — left/right chevrons and dot
 * pagination. No auto-rotate.
 */

export function OverlapGallery() {
  const [active, setActive] = useState(0); // 0 = video, 1 = image
  const videoLandscapeRef = useRef<HTMLVideoElement>(null);
  const videoPortraitRef = useRef<HTMLVideoElement>(null);

  // When the video slide becomes active, rewind + play. When the video
  // ends, rewind to frame 0 (no looping). When leaving the slide, pause
  // and rewind so the next visit starts cleanly.
  useEffect(() => {
    const landscape = videoLandscapeRef.current;
    const portrait = videoPortraitRef.current;

    if (active === 0) {
      [landscape, portrait].forEach(v => {
        if (!v) return;
        try { v.currentTime = 0; } catch {}
        v.play().catch(() => {});
      });
    } else {
      [landscape, portrait].forEach(v => {
        if (!v) return;
        v.pause();
        try { v.currentTime = 0; } catch {}
      });
    }

    const handleEnded = (v: HTMLVideoElement | null) => () => {
      if (!v) return;
      v.pause();
      try { v.currentTime = 0; } catch {}
    };
    const lh = handleEnded(landscape);
    const ph = handleEnded(portrait);
    landscape?.addEventListener('ended', lh);
    portrait?.addEventListener('ended', ph);
    return () => {
      landscape?.removeEventListener('ended', lh);
      portrait?.removeEventListener('ended', ph);
    };
  }, [active]);

  const go = (next: number) => {
    setActive(((next % 2) + 2) % 2);
  };

  return (
    <section className="og-section" aria-label="AAA Events gallery">
      <div className="og-heading">
        <p className="section-label">Why AAA</p>
        <h2 className="section-h">Safety First Company</h2>
      </div>
      <div className="og-card">
        {/* Slide 0 — video */}
        <div className={`og-slide ${active === 0 ? 'is-active' : ''}`} aria-hidden={active !== 0}>
          <video
            ref={videoLandscapeRef}
            className="og-media og-media-landscape"
            src="/videos/overlap-1-16x9.mp4"
            width={1920}
            height={1080}
            muted
            playsInline
            preload="auto"
          />
          <video
            ref={videoPortraitRef}
            className="og-media og-media-portrait"
            src="/videos/overlap-1-9x16.mp4"
            width={1080}
            height={1920}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>

        {/* Slide 1 — image */}
        <div className={`og-slide ${active === 1 ? 'is-active' : ''}`} aria-hidden={active !== 1}>
          <img
            className="og-media og-media-landscape"
            src="/images/overlap/overlap-2-16x9.png"
            alt="AAA Events showcase"
            width={1920}
            height={1080}
          />
          <img
            className="og-media og-media-portrait"
            src="/images/overlap/overlap-2-9x16.png"
            alt=""
            aria-hidden="true"
            width={1080}
            height={1920}
          />
        </div>

        <button
          className="og-nav og-nav-prev"
          aria-label="Previous slide"
          onClick={() => go(active - 1)}
        >
          &#8249;
        </button>
        <button
          className="og-nav og-nav-next"
          aria-label="Next slide"
          onClick={() => go(active + 1)}
        >
          &#8250;
        </button>

        <div className="og-dots" role="tablist" aria-label="Gallery slides">
          {[0, 1].map(i => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to slide ${i + 1}`}
              className={`og-dot ${active === i ? 'is-active' : ''}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
