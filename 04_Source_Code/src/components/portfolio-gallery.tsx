'use client';
import { useEffect, useRef, useState } from 'react';

const CARDS = [
  {
    tag: 'Concert Stage',
    title: 'Music Festival — Palace Grounds',
    desc: '30ft Ringlock stage · 12,000 capacity · 48-hr setup',
    stripLabel: 'Concert Stage',
    slides: [
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1540039155733-5bb30b4c22e7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    tag: 'Corporate Event',
    title: 'NASSCOM Tech Summit 2024',
    desc: 'Multi-level stage · 2,000 delegates · Bangalore',
    stripLabel: 'Corporate',
    slides: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    tag: 'Stage Production',
    title: 'LED Truss Stage — Whitefield',
    desc: 'Full rigging system · Ringlock base · 5,000 crowd',
    stripLabel: 'Stage Production',
    slides: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    tag: 'Stadium Event',
    title: 'IPL Pre-Season — Chinnaswamy',
    desc: 'Multi-section scaffolding · 35,000 audience',
    stripLabel: 'Stadium',
    slides: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    tag: 'Award Ceremony',
    title: 'Filmfare South Awards 2024',
    desc: '360° stage · 5,000 guests · Bangalore',
    stripLabel: 'Awards',
    slides: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1540039155733-5bb30b4c22e7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    ],
  },
];

export function PortfolioGallery() {
  const [activeCard, setActiveCard] = useState(0);
  const [slideIndex, setSlideIndex] = useState(CARDS.map(() => 0));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (cardIdx: number, slideIdx: number) => {
    setSlideIndex(prev => {
      const next = [...prev];
      next[cardIdx] = (slideIdx + CARDS[cardIdx].slides.length) % CARDS[cardIdx].slides.length;
      return next;
    });
  };

  const startAutoAdvance = (cardIdx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSlideIndex(prev => {
        const next = [...prev];
        next[cardIdx] = (prev[cardIdx] + 1) % CARDS[cardIdx].slides.length;
        return next;
      });
    }, 3000);
  };

  const stopAutoAdvance = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => () => stopAutoAdvance(), []);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-max" style={{ paddingBottom: '40px' }}>
        <p className="section-label reveal">Our Work</p>
        <h2 className="section-h reveal">Stages We&apos;ve Built</h2>
        <p className="section-sub reveal">From intimate corporate setups to city-wide festivals — hover to explore each project.</p>
      </div>
      <div className="gallery-flex reveal">
        {CARDS.map((card, ci) => {
          const curSlide = slideIndex[ci];
          return (
            <div
              key={ci}
              className={`gallery-card${activeCard === ci ? ' active' : ''}`}
              onMouseEnter={() => {
                setActiveCard(ci);
                startAutoAdvance(ci);
              }}
              onMouseLeave={stopAutoAdvance}
            >
              <div className="slide-track">
                {card.slides.map((src, si) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={si}
                    className={`slide${curSlide === si ? ' active' : ''}`}
                    src={src}
                    alt=""
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="gallery-overlay"></div>
              <button
                className="slide-btn slide-prev-btn"
                onClick={e => { e.stopPropagation(); goTo(ci, curSlide - 1); }}
              >&#8249;</button>
              <button
                className="slide-btn slide-next-btn"
                onClick={e => { e.stopPropagation(); goTo(ci, curSlide + 1); }}
              >&#8250;</button>
              <div className="gallery-info">
                <span className="gallery-tag">{card.tag}</span>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
                <div className="slide-controls">
                  <div className="slide-dots">
                    {card.slides.map((_, si) => (
                      <span
                        key={si}
                        className={`dot${curSlide === si ? ' active' : ''}`}
                        onClick={e => { e.stopPropagation(); goTo(ci, si); }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-strip-label"><span>{card.stripLabel}</span></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
