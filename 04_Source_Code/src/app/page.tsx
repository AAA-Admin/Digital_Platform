import { HeroShowcase } from '@/components/hero-showcase';
import { HeroShowcase2 } from '@/components/hero-showcase-2';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Hero2 } from '@/components/hero-2';
import { Marquee } from '@/components/marquee';
import { Stats } from '@/components/stats';
import { OverlapGallery } from '@/components/overlap-gallery';
import { Founders } from '@/components/founders';
import { Location } from '@/components/location';
import { Cta } from '@/components/cta';
import { Footer } from '@/components/footer';
import { RevealObserver } from '@/components/reveal-observer';

export default function Home() {
  return (
    <>
      {/* Floating WhatsApp button — scrolls to enquiry form so details get structured */}
      <a
        className="wa-float"
        href="#contact"
        aria-label="Send an enquiry"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.534 5.847L0 24l6.29-1.506A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.568 9.568 0 01-4.9-1.343l-.351-.208-3.733.894.938-3.613-.228-.371A9.544 9.544 0 012.4 12C2.4 6.698 6.698 2.4 12 2.4S21.6 6.698 21.6 12 17.302 21.6 12 21.6z"/>
        </svg>
      </a>

      <HeroShowcase />
      <Nav />
      <Hero />
      <HeroShowcase2 />
      <Hero2 />
      <Marquee />
      <Stats />
      <OverlapGallery />
      <Founders />
      <Location />
      <Cta />
      <Footer />
      <RevealObserver />
    </>
  );
}
