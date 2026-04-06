export function Cta() {
  return (
    <section className="cta-section">
      <div className="section-max">
        <p className="section-label reveal" style={{ textAlign: 'center' }}>Get in Touch</p>
        <h2 className="cta-h reveal">Ready to Build<br/>Something <span className="gold">Extraordinary?</span></h2>
        <p className="cta-sub reveal">Tell us about your event. We&apos;ll get back to you within 2 hours with a custom quote — no obligations, no pressure.</p>
        <div className="cta-actions reveal delay-1">
          <a
            className="btn-wa"
            href="https://wa.me/919108934435?text=Hi%20Antony%2C%20I%20need%20scaffolding%20for%20an%20event%20in%20Bangalore.%20Can%20we%20discuss%3F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.534 5.847L0 24l6.29-1.506A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.568 9.568 0 01-4.9-1.343l-.351-.208-3.733.894.938-3.613-.228-.371A9.544 9.544 0 012.4 12C2.4 6.698 6.698 2.4 12 2.4S21.6 6.698 21.6 12 17.302 21.6 12 21.6z"/>
            </svg>
            Chat on WhatsApp
          </a>
          <a className="btn-call" href="tel:+919108934435">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
