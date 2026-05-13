'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Hero showcase 2 — autoplays a short video once when the section enters
 * the viewport, then holds on the final frame. No scroll-scrub, no loop,
 * no sticky pin. Mobile and desktop both play the video.
 *
 * The mp4 src is gated behind an IntersectionObserver so the file is only
 * fetched when the user is close to seeing the section.
 */
export function HeroShowcase2() {
  const sectionRef = useRef<HTMLElement>(null);
  const landscapeRef = useRef<HTMLVideoElement>(null);
  const portraitRef = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [played, setPlayed] = useState(false);

  // Attach the mp4 src when the section is within ~1 viewport of being
  // visible. Start playback on first true intersection.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setArmed(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // First arm the videos (sets src), then on the next tick play.
          setArmed(true);
        }
      },
      { rootMargin: '100% 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Once armed and the section is actually visible, play once.
  useEffect(() => {
    if (!armed || played) return;
    const el = sectionRef.current;
    if (!el) return;

    const tryPlay = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const v = isMobile ? portraitRef.current : landscapeRef.current;
      if (!v) return;
      v.play().catch(() => {});
      setPlayed(true);
    };

    // Fire on next paint so the src has propagated.
    const id = requestAnimationFrame(tryPlay);
    return () => cancelAnimationFrame(id);
  }, [armed, played]);

  // When the video ends, hold on the final frame (browsers do this by
  // default since loop is off, but we explicitly pause for safety).
  useEffect(() => {
    const onEnded = (v: HTMLVideoElement | null) => () => {
      if (!v) return;
      v.pause();
    };
    const lh = onEnded(landscapeRef.current);
    const ph = onEnded(portraitRef.current);
    landscapeRef.current?.addEventListener('ended', lh);
    portraitRef.current?.addEventListener('ended', ph);
    return () => {
      landscapeRef.current?.removeEventListener('ended', lh);
      portraitRef.current?.removeEventListener('ended', ph);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hs-section"
      aria-label="AAA Events & Production — second showcase"
    >
      <div className="hs-image-wrap">
        <video
          ref={landscapeRef}
          className="hs-image hs-image-landscape"
          src={armed ? '/videos/aaa-hero-2-16x9.mp4' : undefined}
          poster="/images/hero/aaa-hero-2-16x9.avif"
          width={1536}
          height={1024}
          muted
          playsInline
          preload="metadata"
        />
        <video
          ref={portraitRef}
          className="hs-image hs-image-portrait"
          src={armed ? '/videos/aaa-hero-2-9x16.mp4' : undefined}
          poster="/images/hero/aaa-hero-2-9x16.avif"
          width={941}
          height={1672}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
