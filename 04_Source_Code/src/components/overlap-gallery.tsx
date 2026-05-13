'use client';
import Image from 'next/image';
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
  const sectionRef = useRef<HTMLElement>(null);
  // Lazy-mount heavy <video> elements: we don't attach a src until the
  // section is within ~1 viewport of being on screen. Until then the
  // poster shows and we save 20+ MB of network on initial load.
  const [videosArmed, setVideosArmed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // If any slide is a video, watch for it to come into view.
    const hasVideo = slides.some(s => s.type === 'video');
    if (!hasVideo) return;
    // Skip videos entirely on mobile — the mp4s are multi-MB and dominate
    // mobile LCP/payload. Mobile users see the poster (or no video slide).
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVideosArmed(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVideosArmed(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: '100% 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [slides]);

  // When a video slide becomes active, rewind + play once; rewind on leave.
  useEffect(() => {
    if (!videosArmed) return;
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
  }, [active, slides, videosArmed]);

  // When a video ends, rewind to frame 0 and hold (no loop).
  useEffect(() => {
    if (!videosArmed) return;
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
  }, [slides, videosArmed]);

  const go = (next: number) => {
    const n = slides.length;
    setActive(((next % n) + n) % n);
  };

  const cardBg = slides[active]?.bg;

  return (
    <section ref={sectionRef} className="og-section" aria-label={ariaLabel}>
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
          // First image slide gets priority; everything else lazy-loads.
          const isFirst = i === 0;
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
                    src={videosArmed ? slide.srcLandscape : undefined}
                    poster={slide.posterLandscape}
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <video
                    ref={el => { videoPortraitRefs.current[i] = el; }}
                    className="og-media og-media-portrait"
                    src={videosArmed ? slide.srcPortrait : undefined}
                    poster={slide.posterPortrait}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  />
                </>
              ) : (
                <>
                  <Image
                    className="og-media og-media-landscape"
                    src={slide.srcLandscape}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority={isFirst}
                    loading={isFirst ? undefined : 'lazy'}
                  />
                  <Image
                    className="og-media og-media-portrait"
                    src={slide.srcPortrait}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority={isFirst}
                    loading={isFirst ? undefined : 'lazy'}
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
