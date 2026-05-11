import Image from 'next/image';

export function HeroShowcase2() {
  return (
    <section className="hs-section" aria-label="AAA Events & Production — second showcase">
      <div className="hs-image-wrap">
        <Image
          src="/images/hero/aaa-hero-2-16x9.png"
          alt="AAA Events & Production — one vision, one team, one extraordinary experience"
          width={1536}
          height={1024}
          sizes="(max-width: 768px) 0px, 100vw"
          className="hs-image hs-image-landscape"
        />
        <Image
          src="/images/hero/aaa-hero-2-9x16.png"
          alt=""
          aria-hidden="true"
          width={941}
          height={1672}
          sizes="(max-width: 768px) 100vw, 0px"
          className="hs-image hs-image-portrait"
        />
      </div>
    </section>
  );
}
