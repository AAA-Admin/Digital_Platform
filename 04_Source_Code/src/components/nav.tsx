'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { toggle } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : undefined}>
      <a className="nav-logo" href="#" id="site-nav-logo-wrap">
        <svg className="logo-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <path d="M 82.1,797.0 194.0,797.0 497.8,189.5 403.0,0.0 4.5,797.0 41.4,797.0 403.0,73.8 460.9,189.5 173.7,763.8 135.6,763.8 421.4,192.2 403.0,155.3 Z" fill="#00ADEE"/>
          <path d="M 239.6,797.0 567.3,797.0 442.1,546.6 351.6,727.6 453.6,727.6 437.2,694.9 407.0,694.9 443.1,622.5 513.5,763.3 293.5,763.3 442.1,466.2 607.5,797.0 722.5,797.0 498.7,349.5 519.0,308.9 763.1,797.0 800.9,797.0 519.3,233.9 461.6,349.3 668.6,763.3 626.4,763.3 441.4,393.4 Z" fill="#00ADEE"/>
        </svg>
        <span className="nav-logo-text">AAA <span>Events</span></span>
      </a>
      <div className="nav-links">
        <a href="#services">Services</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#founders">Team</a>
        <a href="#location">Location</a>
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
        <a className="nav-cta" href="https://wa.me/919108934435" target="_blank" rel="noopener noreferrer">Get a Quote</a>
      </div>
    </nav>
  );
}
