'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Hero showcase 2 — scroll-scrubbed video (a.k.a. scroll-driven video
 * animation / scrollytelling).
 *
 * Mechanics:
 * - The component renders a tall outer wrapper. Its height = video
 *   duration × SCRUB_PX_PER_SECOND (so scrolling that distance covers
 *   the whole video) plus one viewport so the video stays visible the
 *   entire time it's being scrubbed.
 * - Inside, the section is `position: sticky` and pins to the top of
 *   the viewport while the wrapper is in view.
 * - Scroll progress inside the wrapper maps linearly to
 *   video.currentTime, so +90 px of scroll = +1 s of video.
 * - Once the wrapper's bottom reaches viewport bottom, the sticky
 *   releases and the page continues into Hero 2 text below.
 *
 * Lazy mount: the heavy mp4 sources are not attached until the wrapper
 * is within ~1 viewport of being on screen. Until then the AVIF poster
 * is the only network cost. The scroll-scrub listener is also gated on
 * the mount flag so it doesn't no-op for nothing.
 */
const SCRUB_PX_PER_SECOND = 90;
// Extra scroll distance, in seconds, after the video reaches its end —
// the section stays pinned on the final frame for this long before
// the page releases and continues to Hero 2 text below.
const DWELL_SECONDS = 3;

export function HeroShowcase2() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const landscapeRef = useRef<HTMLVideoElement>(null);
  const portraitRef = useRef<HTMLVideoElement>(null);
  const [scrubHeight, setScrubHeight] = useState<number>(0);
  const [videosArmed, setVideosArmed] = useState(false);

  // Arm videos when the wrapper is within ~1 viewport of being visible.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
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
  }, []);

  useEffect(() => {
    if (!videosArmed) return;
    const activeVideo = (): HTMLVideoElement | null =>
      window.matchMedia('(max-width: 768px)').matches
        ? portraitRef.current
        : landscapeRef.current;

    const updateHeight = () => {
      const v = activeVideo();
      const dur = v?.duration;
      if (dur && isFinite(dur) && dur > 0) {
        setScrubHeight(
          (dur + DWELL_SECONDS) * SCRUB_PX_PER_SECOND + window.innerHeight
        );
      }
    };

    // Wait for metadata so duration is known.
    const landscape = landscapeRef.current;
    const portrait = portraitRef.current;
    landscape?.addEventListener('loadedmetadata', updateHeight);
    portrait?.addEventListener('loadedmetadata', updateHeight);
    if (landscape?.readyState && landscape.readyState >= 1) updateHeight();
    if (portrait?.readyState && portrait.readyState >= 1) updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => {
      landscape?.removeEventListener('loadedmetadata', updateHeight);
      portrait?.removeEventListener('loadedmetadata', updateHeight);
      window.removeEventListener('resize', updateHeight);
    };
  }, [videosArmed]);

  useEffect(() => {
    if (!videosArmed) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const activeVideo = (): HTMLVideoElement | null =>
      window.matchMedia('(max-width: 768px)').matches
        ? portraitRef.current
        : landscapeRef.current;

    let rafQueued = false;

    const onScroll = () => {
      if (rafQueued) return;
      rafQueued = true;
      requestAnimationFrame(() => {
        rafQueued = false;
        const v = activeVideo();
        if (!v || !isFinite(v.duration) || v.duration === 0) return;
        const rect = wrap.getBoundingClientRect();
        // scrolled = how many px of the wrapper have passed the top of viewport.
        const scrolled = Math.max(0, -rect.top);
        // Only the first dur*PX_PER_SECOND px drive playback; anything past
        // that is the dwell window where the video is held on its last frame.
        const scrubRange = v.duration * SCRUB_PX_PER_SECOND;
        const videoScrolled = Math.min(scrolled, scrubRange);
        if (!v.paused) v.pause();
        v.currentTime = videoScrolled / SCRUB_PX_PER_SECOND;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrubHeight, videosArmed]);

  return (
    <div
      ref={wrapRef}
      className="hs-2-scrub-wrap"
      style={scrubHeight > 0 ? { height: `${scrubHeight}px` } : undefined}
    >
      <section
        className="hs-section hs-section-sticky"
        aria-label="AAA Events & Production — second showcase"
      >
        <div className="hs-image-wrap">
          <video
            ref={landscapeRef}
            className="hs-image hs-image-landscape"
            src={videosArmed ? '/videos/aaa-hero-2-16x9.mp4' : undefined}
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
            src={videosArmed ? '/videos/aaa-hero-2-9x16.mp4' : undefined}
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
    </div>
  );
}
