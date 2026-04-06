'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function RevealObserver() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => el.classList.add('visible'),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
