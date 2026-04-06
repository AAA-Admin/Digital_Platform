'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { target: 500, unit: '+', label: 'Events Completed', delay: '' },
  { target: 15,  unit: '+', label: 'Years of Experience', delay: 'delay-1' },
  { target: 3,   unit: '',  label: 'Expert Founders', delay: 'delay-2' },
  { target: 100, unit: '%', label: 'Safety Record', delay: 'delay-3' },
  { target: 48,  unit: 'hr',label: 'Setup Turnaround', delay: 'delay-4' },
];

export function Stats() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('.counter').forEach(el => {
        const target = parseInt(el.dataset.target ?? '0', 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(obj.val).toString();
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="stats-section">
      <div className="stats-grid">
        {STATS.map(({ target, unit, label, delay }) => (
          <div className={`stat-box reveal${delay ? ` ${delay}` : ''}`} key={label}>
            <div className="stat-num">
              <span className="counter" data-target={target}>0</span>
              {unit && <span className="stat-unit">{unit}</span>}
            </div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
