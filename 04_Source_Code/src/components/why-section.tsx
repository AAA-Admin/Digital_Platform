export function WhySection() {
  return (
    <section className="why-section">
      <div className="section-max">
        <div className="why-grid">
          <div>
            <p className="section-label reveal">Why AAA</p>
            <h2 className="section-h reveal">The Difference Is<br/>in the Details</h2>
            <p className="section-sub reveal" style={{ marginBottom: '32px' }}>
              We don&apos;t just rent scaffolding — we engineer safe, beautiful structures that become part of the event experience.
            </p>
            <div className="why-list">
              <div className="why-item reveal delay-1">
                <div className="why-icon">🔩</div>
                <div className="why-text">
                  <h4>Ringlock Certified Specialists</h4>
                  <p>The only company in Bangalore specializing exclusively in the superior Ringlock system — faster to erect, safer under load.</p>
                </div>
              </div>
              <div className="why-item reveal delay-2">
                <div className="why-icon">⚡</div>
                <div className="why-text">
                  <h4>48-Hour Setup Guarantee</h4>
                  <p>Our trained crew can erect a full concert-scale stage within 48 hours of confirmation. No delays, no excuses.</p>
                </div>
              </div>
              <div className="why-item reveal delay-3">
                <div className="why-icon">🛡️</div>
                <div className="why-text">
                  <h4>Zero Incident Safety Record</h4>
                  <p>15+ years, 500+ events, zero structural failures. Our reputation is built on the safety of every performer and every audience member.</p>
                </div>
              </div>
              <div className="why-item reveal delay-4">
                <div className="why-icon">📍</div>
                <div className="why-text">
                  <h4>Pan-Bangalore Coverage</h4>
                  <p>Based in Mathikere, we cover every corner of Bangalore and Bengaluru Rural — from Whitefield to Yelahanka.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="why-visual reveal reveal-right">
            <h3 style={{ fontSize: '16px', marginBottom: '20px', color: 'var(--muted)' }}>CREDENTIALS &amp; STANDARDS</h3>
            <div className="cert-badge">
              <div className="cert-icon" style={{ background: 'rgba(240,180,41,.1)' }}>🏅</div>
              <div className="cert-text">
                <h5>Ringlock System Certified</h5>
                <p>Layher-standard scaffolding installation</p>
              </div>
              <span className="cert-check">✓</span>
            </div>
            <div className="cert-badge">
              <div className="cert-icon" style={{ background: 'rgba(34,197,94,.1)' }}>✅</div>
              <div className="cert-text">
                <h5>GST Registered Business</h5>
                <p>Fully compliant — invoices for all projects</p>
              </div>
              <span className="cert-check">✓</span>
            </div>
            <div className="cert-badge">
              <div className="cert-icon" style={{ background: 'rgba(59,130,246,.1)' }}>🔐</div>
              <div className="cert-text">
                <h5>Insured Operations</h5>
                <p>Full liability coverage on all event projects</p>
              </div>
              <span className="cert-check">✓</span>
            </div>
            <div className="cert-badge">
              <div className="cert-icon" style={{ background: 'rgba(168,85,247,.1)' }}>📋</div>
              <div className="cert-text">
                <h5>Load-Rated Structures</h5>
                <p>Engineering sign-off available on request</p>
              </div>
              <span className="cert-check">✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
