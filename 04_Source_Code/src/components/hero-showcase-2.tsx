'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * Hero showcase 2 — scroll-scrubbed video on desktop, static image on mobile.
 *
 * Mobile (≤768px): renders only the AVIF poster as a Next.js <Image>. No
 * video element is ever attached to the DOM, so the 8+ MB mp4 never enters
 * the mobile network payload. We trade the desktop-only scroll-scrub
 * polish for a dramatically better mobile LCP / total payload.
 *
 * Desktop (≥769px): the existing scroll-scrub experience — sticky pin,
 * scrollY drives video.currentTime at 90 px/s, 3 s dwell at the end.
 * Heavy mp4 is still IntersectionObserver-gated.
 */
const SCRUB_PX_PER_SECOND = 90;
const DWELL_SECONDS = 3;
// Assumed video duration before metadata loads. Picking a value close to
// the real 3 s avoids a layout shift when scrubHeight resolves.
const ASSUMED_DURATION = 3;

export function HeroShowcase2() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // null until the client decides; prevents an SSR/CSR mismatch where the
  // server would otherwise commit to one branch.
  const [variant, setVariant] = useState<'mobile' | 'desktop' | null>(null);
  const [scrubHeight, setScrubHeight] = useState<number>(
    (ASSUMED_DURATION + DWELL_SECONDS) * SCRUB_PX_PER_SECOND + 800
  );
  const [videoArmed, setVideoArmed] = useState(false);

  // Decide variant on mount based on viewport. Re-check on resize so
  // rotating the device picks the right one.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const apply = () => setVariant(mq.matches ? 'mobile' : 'desktop');
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Update default scrub height when viewport height changes (desktop only).
  useEffect(() => {
    if (variant !== 'desktop') return;
    const onResize = () => {
      const v = videoRef.current;
      const dur = v?.duration && isFinite(v.duration) && v.duration > 0
        ? v.duration : ASSUMED_DURATION;
      setScrubHeight((dur + DWELL_SECONDS) * SCRUB_PX_PER_SECOND + window.innerHeight);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [variant]);

  // Arm the video once the wrapper is within ~1 viewport of being visible.
  useEffect(() => {
    if (variant !== 'desktop') return;
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVideoArmed(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVideoArmed(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: '100% 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  // Refine scrub height after metadata is known.
  useEffect(() => {
    if (variant !== 'desktop' || !videoArmed) return;
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => {
      if (v.duration && isFinite(v.duration) && v.duration > 0) {
        setScrubHeight((v.duration + DWELL_SECONDS) * SCRUB_PX_PER_SECOND + window.innerHeight);
      }
    };
    v.addEventListener('loadedmetadata', onMeta);
    if (v.readyState >= 1) onMeta();
    return () => v.removeEventListener('loadedmetadata', onMeta);
  }, [variant, videoArmed]);

  // Scroll-scrub.
  useEffect(() => {
    if (variant !== 'desktop' || !videoArmed) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    let rafQueued = false;
    const onScroll = () => {
      if (rafQueued) return;
      rafQueued = true;
      requestAnimationFrame(() => {
        rafQueued = false;
        const v = videoRef.current;
        if (!v || !isFinite(v.duration) || v.duration === 0) return;
        const rect = wrap.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        const scrubRange = v.duration * SCRUB_PX_PER_SECOND;
        const videoScrolled = Math.min(scrolled, scrubRange);
        if (!v.paused) v.pause();
        v.currentTime = videoScrolled / SCRUB_PX_PER_SECOND;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant, videoArmed, scrubHeight]);

  // SSR / pre-hydration: render the mobile-safe Image branch so the heavy
  // wrapper / sticky / video DOM isn't created server-side. Hydration may
  // promote to the desktop branch.
  if (variant !== 'desktop') {
    return (
      <section
        className="hs-section"
        aria-label="AAA Events & Production — second showcase"
      >
        <div className="hs-image-wrap">
          <Image
            src="/images/hero/aaa-hero-2-9x16.avif"
            alt="AAA Events & Production showcase"
            width={941}
            height={1672}
            sizes="(max-width: 768px) calc(100vw - 56px), 0px"
            className="hs-image hs-image-portrait"
            priority={false}
            loading="lazy"
          />
          <Image
            src="/images/hero/aaa-hero-2-16x9.avif"
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
            sizes="(max-width: 768px) 0px, calc(100vw - 168px)"
            className="hs-image hs-image-landscape"
            priority={false}
            loading="lazy"
          />
        </div>
      </section>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="hs-2-scrub-wrap"
      style={{ height: `${scrubHeight}px` }}
    >
      <section
        className="hs-section hs-section-sticky"
        aria-label="AAA Events & Production — second showcase"
      >
        <div className="hs-image-wrap">
          <video
            ref={videoRef}
            className="hs-image hs-image-landscape"
            src={videoArmed ? '/videos/aaa-hero-2-16x9.mp4' : undefined}
            poster="/images/hero/aaa-hero-2-16x9.avif"
            width={1536}
            height={1024}
            muted
            playsInline
            preload="metadata"
          />
        </div>
      </section>
    </div>
  );
}
