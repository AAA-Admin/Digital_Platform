'use client';
import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('aaa-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      setTheme(saved);
    }
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    html.classList.add('theme-transitioning');
    setTimeout(() => html.classList.remove('theme-transitioning'), 400);
    const curr =
      html.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const next = curr === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('aaa-theme', next);
    setTheme(next);
  };

  return { theme, toggle };
}
