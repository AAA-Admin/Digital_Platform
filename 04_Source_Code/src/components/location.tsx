export function Location() {
  return (
    <section className="location-section" id="location">
      <div className="section-max">
        <p className="section-label reveal">Find Us</p>
        <h2 className="section-h reveal">Based in Bangalore.<br/>Built for India.</h2>
        <p className="section-sub reveal">Centrally located in Mathikere — we mobilise anywhere in India for your event.</p>
        <div className="location-grid">
          <div className="location-info">
            <div className="location-address reveal">
              <h3>Our Office &amp; Yard</h3>
              <p>Building No. #14, 4th Cross<br/>SBM Colony, Brindavan Nagar<br/>Mathikere, Bangalore — 560054<br/>Karnataka, India</p>
            </div>
            <div className="location-address reveal delay-1">
              <h3>Contact</h3>
              <p>
                WhatsApp: <a href="#contact" style={{ color: 'var(--gold)' }}>+91 99455 13198</a><br/>
                Email: <a href="mailto:antony@aaa-events.in" style={{ color: 'var(--gold)' }}>antony@aaa-events.in</a>
              </p>
            </div>
            <div className="reveal delay-2">
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Areas We Cover</p>
              <div className="coverage-tags">
                {['Bangalore','Mumbai','Delhi','Hyderabad','Chennai','Pune','Kolkata','Kochi','Pan-India'].map(area => (
                  <span className="coverage-tag" key={area}>{area}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="map-container reveal reveal-right">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4058756753384!2d77.56195517507637!3d13.027492387276437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17bb5d2b3ea5%3A0x7e2f5e8b9c3d1a0f!2sMathikere%2C%20Bengaluru%2C%20Karnataka%20560054!5e0!3m2!1sen!2sin!4v1741400000000!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AAA Events &amp; Production — Mathikere, Bangalore"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
