import Image from 'next/image';

export function Founders() {
  return (
    <section className="founders-section" id="founders">
      <div className="founders-heading">
        <p className="section-label reveal">The Team</p>
        <h2 className="section-h reveal">Founders</h2>
      </div>
      <div className="founders-images-grid">
        <Image
          src="/images/founders/founder-1.png"
          alt="Antony Thomas Dsouza — Director, Business Development"
          width={1672}
          height={941}
          className="founder-image reveal"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <Image
          src="/images/founders/founder-2.png"
          alt="Najib Bin Arif — Director, Administrations"
          width={1672}
          height={941}
          className="founder-image reveal delay-1"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
