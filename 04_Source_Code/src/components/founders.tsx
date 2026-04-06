export function Founders() {
  return (
    <section className="founders-section" id="founders">
      <div className="section-max">
        <p className="section-label reveal">The Team</p>
        <h2 className="section-h reveal">The Founders Behind<br/>Every Stage</h2>
        <p className="section-sub reveal">Three owners. One mission. We are personally on-site for every major project — because our name is on the stage.</p>
        <div className="founders-grid">
          <div className="founder-card reveal delay-1">
            <div className="founder-avatar">AT</div>
            <div className="founder-name">Antony Thomas Dsouza</div>
            <div className="founder-role">Director &amp; Lead Engineer</div>
            <p className="founder-bio">The technical backbone of AAA. Antony brings 15+ years of hands-on Ringlock scaffolding expertise, having personally overseen 500+ stage builds across Bangalore. Every large-format project runs through his sign-off.</p>
            <div className="founder-contact">
              <a className="contact-pill" href="https://wa.me/919108934435" target="_blank" rel="noopener noreferrer">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.534 5.847L0 24l6.29-1.506A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
                +91 91089 34435
              </a>
              <a className="contact-pill" href="mailto:aaaevents58@gmail.com">
                ✉ aaaevents58@gmail.com
              </a>
            </div>
          </div>
          {/* Founder 2 — placeholder for client to fill */}
          <div className="founder-card reveal delay-2">
            <div className="founder-avatar" style={{ background: 'linear-gradient(135deg, var(--bg3), #001a1a)' }}>F2</div>
            <div className="founder-name">[Co-Founder Name]</div>
            <div className="founder-role">Co-Founder &amp; Operations</div>
            <p className="founder-bio">Manages on-ground logistics, crew deployment, and vendor relationships across all active projects in Bangalore. Ensures every stage is built to spec and delivered on schedule.</p>
            <div className="founder-contact">
              <span className="contact-pill">+91 99455 13198</span>
            </div>
          </div>
          {/* Founder 3 — placeholder for client to fill */}
          <div className="founder-card reveal delay-3">
            <div className="founder-avatar" style={{ background: 'linear-gradient(135deg, var(--bg3), #001a0a)' }}>F3</div>
            <div className="founder-name">[Co-Founder Name]</div>
            <div className="founder-role">Co-Founder &amp; Business Development</div>
            <p className="founder-bio">Drives client relationships and new business across the corporate, entertainment, and government sectors. The face of AAA Events at every negotiation and new project kickoff.</p>
            <div className="founder-contact">
              <span className="contact-pill">Available on WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
