'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

// IDs of the in-page anchors the scroll-spy + nav links target. Must
// match the `id` props on the corresponding <section> elements.
const NAV_SECTIONS = ['safety', 'strengths', 'founders', 'location'] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { toggle } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    // Track which section is currently in view. Use rootMargin so the
    // "active" hand-off happens near the top of the viewport rather than
    // the middle, matching how a user reads a long page.
    const sections = NAV_SECTIONS
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const linkCls = (id: string) =>
    activeSection === id ? 'active' : undefined;

  return (
    <nav className={scrolled ? 'scrolled' : undefined}>
      <a className="nav-logo" href="#" id="site-nav-logo-wrap" aria-label="AAA Events — home">
        {/* Theme-aware logo. Both <Image>s render; CSS shows the one that
            matches the active theme. Hover/focus applies a smooth zoom. */}
        <Image
          src="/images/logo/logo-dark.png"
          alt="AAA Events"
          width={600}
          height={400}
          priority
          fetchPriority="high"
          className="nav-logo-img nav-logo-img-dark"
        />
        <Image
          src="/images/logo/logo-light.png"
          alt=""
          aria-hidden="true"
          width={600}
          height={400}
          className="nav-logo-img nav-logo-img-light"
        />
      </a>
      <div className="nav-links">
        <a href="#safety" className={linkCls('safety')}>Why AAA</a>
        <a href="#strengths" className={linkCls('strengths')}>Strengths</a>
        <a href="#founders" className={linkCls('founders')}>Team</a>
        <a href="#location" className={linkCls('location')}>Location</a>
      </div>
      <div className="nav-right">
        <button className="theme-toggle" id="themeToggle" aria-label="Toggle dark/light mode" onClick={toggle}>
          <svg className="icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-5.4-5.4c0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
          </svg>
          <svg className="icon-sun" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zM2 13h2a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm18 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2zM11 2v2a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0zm0 18v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0zM5.99 4.58a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06z"/>
          </svg>
        </button>
        <a className="nav-cta" href="#contact">Get a Quote</a>
      </div>
    </nav>
  );
}
