'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Generic two-slide gallery used for both the "Safety First Company" and
 * "Our Unique Strengths" sections. Manual navigation only — arrow
 * buttons and dot pagination, no auto-rotate.
 *
 * Each slide is either:
 *  - a video (mp4 with optional landscape + portrait variants), or
 *  - an image (responsive variants or a single source for both).
 *
 * Per-slide `bg` recolors the card while that slide is active so a
 * square asset on a coloured background blends in cleanly across
 * desktop (16:9) and mobile (9:16) without showing dark side-bands.
 */

type SlideMedia = {
  type: 'video' | 'image';
  srcLandscape: string;
  srcPortrait: string;
  posterLandscape?: string;
  posterPortrait?: string;
  alt: string;
  /** object-fit applied to the media; defaults to 'cover'. */
  fit?: 'cover' | 'contain';
  /** background colour painted on the card while this slide is active. */
  bg?: string;
};

type Props = {
  ariaLabel?: string;
  eyebrow?: string;
  headline?: string;
  slides: SlideMedia[];
};

export function OverlapGallery({ ariaLabel = 'Gallery', eyebrow, headline, slides }: Props) {
  const [active, setActive] = useState(0);
  const videoLandscapeRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const videoPortraitRefs = useRef<Array<HTMLVideoElement | null>>([]);

  // When a video slide becomes active, rewind + play once; rewind on leave.
  useEffect(() => {
    slides.forEach((slide, i) => {
      if (slide.type !== 'video') return;
      const landscape = videoLandscapeRefs.current[i] ?? null;
      const portrait = videoPortraitRefs.current[i] ?? null;
      if (i === active) {
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
    });
  }, [active, slides]);

  // When a video ends, rewind to frame 0 and hold (no loop).
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    slides.forEach((slide, i) => {
      if (slide.type !== 'video') return;
      const landscape = videoLandscapeRefs.current[i];
      const portrait = videoPortraitRefs.current[i];
      const handler = (v: HTMLVideoElement | null) => () => {
        if (!v) return;
        v.pause();
        try { v.currentTime = 0; } catch {}
      };
      const lh = handler(landscape);
      const ph = handler(portrait);
      landscape?.addEventListener('ended', lh);
      portrait?.addEventListener('ended', ph);
      cleanups.push(() => {
        landscape?.removeEventListener('ended', lh);
        portrait?.removeEventListener('ended', ph);
      });
    });
    return () => cleanups.forEach(fn => fn());
  }, [slides]);

  const go = (next: number) => {
    const n = slides.length;
    setActive(((next % n) + n) % n);
  };

  const cardBg = slides[active]?.bg;

  return (
    <section className="og-section" aria-label={ariaLabel}>
      {(eyebrow || headline) && (
        <div className="og-heading">
          {eyebrow && <p className="section-label">{eyebrow}</p>}
          {headline && <h2 className="section-h">{headline}</h2>}
        </div>
      )}
      <div
        className="og-card"
        style={cardBg ? { background: cardBg } : undefined}
      >
        {slides.map((slide, i) => {
          const isActive = active === i;
          const fitClass = slide.fit === 'contain' ? 'og-fit-contain' : 'og-fit-cover';
          return (
            <div
              key={i}
              className={`og-slide ${isActive ? 'is-active' : ''} ${fitClass}`}
              aria-hidden={!isActive}
              style={slide.bg ? { background: slide.bg } : undefined}
            >
              {slide.type === 'video' ? (
                <>
                  <video
                    ref={el => { videoLandscapeRefs.current[i] = el; }}
                    className="og-media og-media-landscape"
                    src={slide.srcLandscape}
                    poster={slide.posterLandscape}
                    muted
                    playsInline
                    preload="auto"
                  />
                  <video
                    ref={el => { videoPortraitRefs.current[i] = el; }}
                    className="og-media og-media-portrait"
                    src={slide.srcPortrait}
                    poster={slide.posterPortrait}
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                  />
                </>
              ) : (
                <>
                  <img
                    className="og-media og-media-landscape"
                    src={slide.srcLandscape}
                    alt={slide.alt}
                  />
                  <img
                    className="og-media og-media-portrait"
                    src={slide.srcPortrait}
                    alt=""
                    aria-hidden="true"
                  />
                </>
              )}
            </div>
          );
        })}

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
          {slides.map((_, i) => (
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
