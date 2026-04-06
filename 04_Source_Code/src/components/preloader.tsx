'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ─── AAA logo path data — rounded variant (Q bezier at every edge) ────────────
const PATH_1 =
  'M 102.10,797.00 L 174.00,797.00 Q 194.00,797.00 202.95,779.11 L 488.85,207.39 Q 497.80,189.50 488.85,171.61 L 411.95,17.89 Q 403.00,0.00 394.06,17.89 L 12.75,780.50 Q 4.50,797.00 22.95,797.00 L 22.95,797.00 Q 41.40,797.00 49.65,780.50 L 394.06,91.69 Q 403.00,73.80 411.95,91.69 L 451.95,171.61 Q 460.90,189.50 451.95,207.39 L 182.22,746.76 Q 173.70,763.80 154.65,763.80 L 154.65,763.80 Q 135.60,763.80 144.12,746.76 L 412.46,210.09 Q 421.40,192.20 412.48,174.30 L 411.92,173.20 Q 403.00,155.30 394.05,173.19 L 91.05,779.11 Q 82.10,797.00 102.10,797.00 Z';
const PATH_2 =
  'M 259.60,797.00 L 547.30,797.00 Q 567.30,797.00 558.36,779.11 L 451.04,564.49 Q 442.10,546.60 433.16,564.49 L 360.54,709.71 Q 351.60,727.60 371.60,727.60 L 435.31,727.60 Q 453.60,727.60 445.40,711.25 L 443.97,708.40 Q 437.20,694.90 422.10,694.90 L 422.10,694.90 Q 407.00,694.90 413.74,681.39 L 434.18,640.40 Q 443.10,622.50 452.04,640.39 L 504.56,745.41 Q 513.50,763.30 493.50,763.30 L 313.50,763.30 Q 293.50,763.30 302.45,745.41 L 433.15,484.09 Q 442.10,466.20 451.04,484.09 L 598.56,779.11 Q 607.50,797.00 627.50,797.00 L 702.50,797.00 Q 722.50,797.00 713.55,779.11 L 507.65,367.39 Q 498.70,349.50 507.64,331.61 L 510.06,326.79 Q 519.00,308.90 527.95,326.79 L 754.65,780.10 Q 763.10,797.00 782.00,797.00 L 782.00,797.00 Q 800.90,797.00 792.45,780.10 L 528.25,251.79 Q 519.30,233.90 510.36,251.79 L 470.54,331.41 Q 461.60,349.30 470.54,367.19 L 659.66,745.41 Q 668.60,763.30 648.60,763.30 L 646.40,763.30 Q 626.40,763.30 617.45,745.41 L 450.35,411.29 Q 441.40,393.40 432.46,411.29 L 248.54,779.11 Q 239.60,797.00 259.60,797.00 Z';

// Rounded outer triangle — mirrors the logo's Q bezier corner rounding
const OUTER_TRIANGLE =
  'M 411,17 Q 403,0 395,17 L 12,780 Q 4,797 23,797 L 777,797 Q 797,797 788,780 L 411,17 Z';

const BRAND = '#00ADEE';

// ─── Main logo — brand blue fill ─────────────────────────────────────────────
function AaaLogo() {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ display: 'block' }}
    >
      <path d={PATH_1} fill={BRAND} />
      <path d={PATH_2} fill={BRAND} />
    </svg>
  );
}

// ─── Ghost — outline of logo paths, stroke set at runtime ────────────────────
function AaaGhost() {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ display: 'block' }}
    >
      <path d={PATH_1} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="22" strokeLinejoin="round" />
      <path d={PATH_2} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="22" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Ring — rounded outer triangle, sonar pulse ───────────────────────────────
function AaaRing() {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ display: 'block' }}
    >
      <path
        d={OUTER_TRIANGLE}
        fill="none"
        stroke="rgba(0,173,238,0.55)"
        strokeWidth="22"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const WORDMARK = 'AAA Events';
const LOGO_SIZE = 140;
// Tiny ghost logos at ring vertices: same triangle shape, small container
const TINY_SIZE = 26;

function centered(size: number): React.CSSProperties {
  const half = size / 2;
  return { position: 'absolute', width: size, height: size, top: -half, left: -half };
}

// Triangle vertex positions in display-px relative to logo centre (0,0),
// evaluated at ring scale ≈ 1.5 so tiny ghosts sit where the ring is
// when the last ring is fading (matches the reference where ghosts appear near logo).
// SVG apex (403,17): offset from centre (400,400) = (3,-383) → scaled to 140px = (0.5,-67) → ×1.5 = (0.75,-100)
// SVG BL  (12,780):  offset (-388,380) → display (-68, 67) → ×1.5 = (-102, 100)
// SVG BR  (788,780): offset (388,380)  → display ( 68, 67) → ×1.5 = ( 102, 100)
const VERTEX_APEX = { x: 0, y: -100 };
const VERTEX_BL = { x: -102, y: 100 };
const VERTEX_BR = { x: 102, y: 100 };

function tinyStyle(v: { x: number; y: number }): React.CSSProperties {
  return {
    position: 'absolute',
    width: TINY_SIZE,
    height: TINY_SIZE,
    top: v.y - TINY_SIZE / 2,
    left: v.x - TINY_SIZE / 2,
    pointerEvents: 'none',
    opacity: 0,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
export function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ghost1Ref = useRef<HTMLDivElement>(null);
  const ghost2Ref = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const ring4Ref = useRef<HTMLDivElement>(null);
  const ring5Ref = useRef<HTMLDivElement>(null);
  // Tiny ghost triangles that appear at each vertex as the first ring sweeps through
  const tinyApexRef = useRef<HTMLDivElement>(null);
  const tinyBLRef = useRef<HTMLDivElement>(null);
  const tinyBRRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navLogoEl = document.getElementById('site-nav-logo-wrap') as HTMLElement | null;
    if (navLogoEl) gsap.set(navLogoEl, { opacity: 0 });

    // ── Colour-scheme awareness ───────────────────────────────────────────────
    const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const ghostColor = isLight ? 'rgba(26,16,8,0.50)' : 'rgba(255,255,255,0.55)';
    [ghost1Ref.current, ghost2Ref.current].forEach((el) =>
      el?.querySelectorAll('path').forEach((p) => p.setAttribute('stroke', ghostColor)),
    );

    const textEl = textRef.current;
    const textW = textEl?.offsetWidth ?? 420;
    const gap = 24;
    const totalW = LOGO_SIZE + gap + textW;
    const logoFinalX = -(totalW / 2 - LOGO_SIZE / 2);
    const textFinalX = logoFinalX + LOGO_SIZE / 2 + gap;

    const ctx = gsap.context(() => {
      const letters = Array.from(
        textEl?.querySelectorAll<HTMLElement>('.pl-letter') ?? [],
      );

      // ── Initial states ────────────────────────────────────────────────────
      gsap.set(logoRef.current, { scale: 4.2, opacity: 0, filter: 'brightness(0.05)' });
      gsap.set(ghost1Ref.current, { scale: 0, opacity: 0, x: 0, y: 0 });
      gsap.set(ghost2Ref.current, { scale: 0, opacity: 0, x: 0, y: 0 });
      gsap.set(
        [ring1Ref.current, ring2Ref.current, ring3Ref.current, ring4Ref.current, ring5Ref.current],
        { scale: 0.22, opacity: 0 },
      );
      gsap.set([tinyApexRef.current, tinyBLRef.current, tinyBRRef.current], { scale: 0, opacity: 0 });
      gsap.set(textEl, { x: textFinalX, opacity: 0, y: 0 });
      // Character reveal: rotateY flip-in (like a card turning) — letter starts edge-on (vertical sliver) and rotates to face forward
      letters.forEach((l) => gsap.set(l, { rotateY: 90, opacity: 0, transformOrigin: '50% 50%', transformPerspective: 350 }));

      // ── Master timeline ───────────────────────────────────────────────────
      const tl = gsap.timeline({
        onComplete() {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
          if (navLogoEl) gsap.set(navLogoEl, { clearProps: 'opacity' });
        },
      });

      // ── Phase 1: Logo materialises (0 → 0.85s) ───────────────────────────
      tl.to(logoRef.current, {
        scale: 1, opacity: 1, filter: 'brightness(1)',
        duration: 0.85, ease: 'power2.out',
      });

      // ── Phase 2: Five overlapping rings — slow, thick, clearly visible ──────
      // Each ring expands 0.80s, stagger 0.22s.
      // Ring 1: 0.85–1.65   Ring 5: 1.73–2.53
      const ringRefs = [ring1Ref, ring2Ref, ring3Ref, ring4Ref, ring5Ref];
      ringRefs.forEach((ref, i) => {
        tl.fromTo(
          ref.current,
          { scale: 0.22, opacity: 1.0 },
          { scale: 3.8, opacity: 0, duration: 0.80, ease: 'power2.out' },
          0.85 + i * 0.22,
        );
      });

      // ── Tiny ghosts at vertices — parallel with rings 4–5 fading ─────────
      // Ring 4 starts at 1.51s, ring 5 at 1.73s. Tiny ghosts grow at ~2.10s.
      const tinyT = 2.10;
      const tinys = [
        { ref: tinyApexRef, dt: 0.00 },
        { ref: tinyBLRef,   dt: 0.06 },
        { ref: tinyBRRef,   dt: 0.06 },
      ];
      tinys.forEach(({ ref, dt }) => {
        tl.fromTo(
          ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.65, duration: 0.30, ease: 'power2.out' },
          tinyT + dt,
        );
        tl.to(ref.current, { opacity: 0, scale: 0.4, duration: 0.22, ease: 'power2.in' }, tinyT + dt + 0.38);
      });

      // ── Phase 3: Ghost pop — logo pulses, ghosts born diagonally (2.65 → 3.1s)
      tl.to(logoRef.current, { scale: 1.16, duration: 0.10, ease: 'power3.out' }, 2.65);
      tl.to(logoRef.current, { scale: 1.00, duration: 0.24, ease: 'power2.inOut' }, 2.75);

      tl.fromTo(ghost1Ref.current,
        { scale: 0, opacity: 0, x: -40, y: 32 },
        { scale: 0.76, opacity: 1, x: -115, y: 88, duration: 0.36, ease: 'back.out(2.4)' },
        2.68);
      tl.fromTo(ghost2Ref.current,
        { scale: 0, opacity: 0, x: 40, y: -32 },
        { scale: 0.76, opacity: 1, x: 115, y: -88, duration: 0.36, ease: 'back.out(2.4)' },
        2.68);

      // ── Phase 4a: Ghosts drift vertically (3.15 → 4.35s) ────────────────
      tl.to(ghost1Ref.current, { x: -50, y: 230, scale: 0.52, opacity: 0.55, duration: 1.2, ease: 'power1.inOut' }, 3.15);
      tl.to(ghost2Ref.current, { x: 50, y: -230, scale: 0.52, opacity: 0.55, duration: 1.2, ease: 'power1.inOut' }, 3.15);

      // ── Phase 4b: Ghosts converge back — absorbed (4.35 → 5.15s) ────────
      tl.to(ghost1Ref.current, { x: 0, y: 0, scale: 0.15, opacity: 0, duration: 0.80, ease: 'power2.in' }, 4.35);
      tl.to(ghost2Ref.current, { x: 0, y: 0, scale: 0.15, opacity: 0, duration: 0.80, ease: 'power2.in' }, 4.35);

      // Logo micro-pulse as ghosts are absorbed
      tl.to(logoRef.current, { scale: 1.10, duration: 0.12, ease: 'power2.out' }, 5.05);
      tl.to(logoRef.current, { scale: 1.00, duration: 0.20, ease: 'power2.inOut' }, 5.17);

      // ── Phase 5: Compose — lockup assembles (5.35 → 7.2s) ───────────────
      tl.to(logoRef.current, { x: logoFinalX, duration: 0.65, ease: 'power2.inOut' }, 5.37);

      tl.set(textEl, { opacity: 1 }, 5.59);
      // rotateY card-flip: each letter swings from edge-on (90°) to facing forward (0°).
      // Large stagger means trailing letters are still thin vertical slivers while early ones are settled.
      tl.to(letters, {
        rotateY: 0, opacity: 1,
        duration: 0.52,
        stagger: 0.13,
        ease: 'power3.out',
        transformOrigin: '50% 50%',
        transformPerspective: 350,
      }, 5.61);

      // ── Phase 6: Text fades, logo flies to nav (7.2 → 8.0s) ─────────────
      tl.to(textEl, { opacity: 0, y: -10, duration: 0.25, ease: 'power2.in' }, 7.20);

      tl.add(() => {
        const navEl = document.getElementById('site-nav-logo-wrap') as HTMLElement | null;
        const logoEl = logoRef.current;
        if (!navEl || !logoEl) return;

        const r = navEl.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const tx = (r.left + r.width / 2) - vw / 2;
        const ty = (r.top + r.height / 2) - vh / 2;
        const tscale = r.height / LOGO_SIZE;

        gsap.to(logoEl, { x: tx, y: ty, scale: tscale, duration: 0.65, ease: 'power3.inOut' });
        gsap.to(navEl, { opacity: 1, duration: 0.28, delay: 0.58 });
        gsap.to(logoEl, { opacity: 0, duration: 0.20, delay: 0.60 });
      }, 7.50);

      // ── Phase 7: Overlay fade out (8.15s) ────────────────────────────────
      tl.to(overlayRef.current, { opacity: 0, duration: 0.45, ease: 'power2.inOut' }, 8.15);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', width: 0, height: 0 }}>

        {/* Sonar rings — 5 overlapping, all start hidden */}
        <div ref={ring1Ref} style={{ ...centered(LOGO_SIZE), pointerEvents: 'none', opacity: 0 }}><AaaRing /></div>
        <div ref={ring2Ref} style={{ ...centered(LOGO_SIZE), pointerEvents: 'none', opacity: 0 }}><AaaRing /></div>
        <div ref={ring3Ref} style={{ ...centered(LOGO_SIZE), pointerEvents: 'none', opacity: 0 }}><AaaRing /></div>
        <div ref={ring4Ref} style={{ ...centered(LOGO_SIZE), pointerEvents: 'none', opacity: 0 }}><AaaRing /></div>
        <div ref={ring5Ref} style={{ ...centered(LOGO_SIZE), pointerEvents: 'none', opacity: 0 }}><AaaRing /></div>

        {/* Tiny ghost triangles at each vertex — appear as ring sweeps through */}
        <div ref={tinyApexRef} style={tinyStyle(VERTEX_APEX)}><AaaRing /></div>
        <div ref={tinyBLRef} style={tinyStyle(VERTEX_BL)}  ><AaaRing /></div>
        <div ref={tinyBRRef} style={tinyStyle(VERTEX_BR)}  ><AaaRing /></div>

        {/* Ghost 1 — lower-left, stroke colour set at runtime */}
        <div ref={ghost1Ref} style={{ ...centered(LOGO_SIZE), pointerEvents: 'none', opacity: 0 }}>
          <AaaGhost />
        </div>

        {/* Ghost 2 — upper-right, stroke colour set at runtime */}
        <div ref={ghost2Ref} style={{ ...centered(LOGO_SIZE), pointerEvents: 'none', opacity: 0 }}>
          <AaaGhost />
        </div>

        {/* Main logo — brand blue, gap between A's, starts hidden */}
        <div ref={logoRef} style={{ ...centered(LOGO_SIZE), opacity: 0 }}>
          <AaaLogo />
        </div>

        {/* Wordmark — letters animate up with elastic overshoot */}
        <div
          ref={textRef}
          style={{
            position: 'absolute',
            top: -46,
            left: 0,
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: '5rem',
            color: 'var(--text)',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'flex-end',
            opacity: 0,
          }}
        >
          {WORDMARK.split('').map((char, i) => (
            <span
              key={i}
              className="pl-letter"
              style={{
                display: 'inline-block',
                // Slight gap between the three A's in "AAA"
                marginRight: i < 2 ? '0.06em' : undefined,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
