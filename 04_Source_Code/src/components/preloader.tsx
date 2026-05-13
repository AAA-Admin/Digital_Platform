'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * Minimal preloader — covers the page on first paint with just the AAA
 * logo (theme-aware: black-bg variant for dark theme, white-bg for
 * light). The overlay fades out once the page is ready. No SVG, no
 * choreography — keeps the initial frame on-brand and uncluttered.
 */
export function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const MIN_VISIBLE_MS = 1600;  // never hide sooner than this
    const HARD_CAP_MS = 4500;     // never wait longer than this
    const mountedAt = Date.now();

    const hide = () => {
      overlay.style.transition = 'opacity .6s ease';
      overlay.style.opacity = '0';
      window.setTimeout(() => {
        overlay.style.display = 'none';
      }, 650);
    };

    const scheduleHide = () => {
      const elapsed = Date.now() - mountedAt;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(hide, wait);
    };

    const hardCap = window.setTimeout(hide, HARD_CAP_MS);
    if (document.readyState === 'complete') {
      scheduleHide();
    } else {
      window.addEventListener('load', scheduleHide, { once: true });
    }
    return () => window.clearTimeout(hardCap);
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <Image
        src="/images/logo/logo-dark.png"
        alt=""
        width={600}
        height={400}
        priority
        className="preloader-logo preloader-logo-dark"
      />
      <Image
        src="/images/logo/logo-light.png"
        alt=""
        width={600}
        height={400}
        priority
        className="preloader-logo preloader-logo-light"
      />
    </div>
  );
}
