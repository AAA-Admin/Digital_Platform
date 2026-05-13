import Image from 'next/image';

export function HeroShowcase() {
  return (
    <section className="hs-section" aria-label="AAA Events & Production showcase">
      {/* Visible artwork — responsive hero image.
          Desktop/tablet gets the 16:9 landscape; phones get the 9:16 portrait.
          Both are rendered; CSS hides the one that doesn't match the viewport
          so each variant is preloaded and laid out correctly. */}
      <div className="hs-image-wrap">
        <Image
          src="/images/hero/aaa-hero-16x9.png"
          alt="AAA Events & Production — concerts, corporate events, weddings, exhibitions, stage production, gala dinners, product launches, festivals & sports events"
          width={1672}
          height={941}
          priority
          fetchPriority="high"
          /* Match the actual rendered width: viewport minus the .hs-section
             side padding (clamp(28px, 7vw, 84px) per side ≈ 56–168 px total).
             Browser picks an appropriately-sized variant. */
          sizes="(max-width: 768px) 0px, calc(100vw - 168px)"
          className="hs-image hs-image-landscape"
        />
        <Image
          src="/images/hero/aaa-hero-9x16.png"
          alt=""
          aria-hidden="true"
          width={941}
          height={1672}
          priority
          fetchPriority="high"
          /* Mobile card has 28px side padding × 2 = 56px subtracted from vw. */
          sizes="(max-width: 768px) calc(100vw - 56px), 0px"
          className="hs-image hs-image-portrait"
        />
      </div>
      {/* Real HTML for SEO — visually hidden but indexable + screen-reader accessible.
          Mirrors every word rendered inside the hero artwork so crawlers read the
          same content human visitors see, plus supporting keywords, locations and
          structured service copy. */}
      <div className="hs-seo sr-only">
        <h2>
          AAA Events &amp; Production — Experience That Builds. Execution That Delivers.
        </h2>

        <p>
          AAA Events &amp; Production is India&apos;s specialist Ringlock scaffolding,
          stage, trussing and event-production partner. Trusted by corporates,
          institutions, promoters and large-scale event organisers across India,
          we deliver structural excellence, certified safety, and engineered
          execution from concept to completion — concerts, corporate events,
          weddings, exhibitions, stage production, gala dinners, product
          launches, festivals and sports events.
        </p>

        <h3>Our Services</h3>
        <ul>
          <li>
            <strong>Concerts</strong> — large scale, flawless experiences. Live
            music stages, festival main stages, artist stage rigging, concert
            trussing, FOH towers, delay towers, barricading and crowd-safe
            engineered structures.
          </li>
          <li>
            <strong>Corporate Events</strong> — engage, inspire, achieve.
            Conferences, summits, town halls, AGMs, dealer meets, award nights,
            keynote stages, LED video-wall scaffolding, custom branded sets.
          </li>
          <li>
            <strong>Weddings</strong> — crafting timeless memories. Wedding
            mandap structures, reception stages, sangeet and haldi platforms,
            destination-wedding scaffolding, bespoke decor rigging.
          </li>
          <li>
            <strong>Exhibitions &amp; Trade Fairs</strong> — showcasing brands,
            creating impact. Custom exhibition stalls, double-decker booths,
            hangar rigs, trade-show scaffolding, brand activations.
          </li>
          <li>
            <strong>Stage Production</strong> — engineered for strength, built
            to perform. Modular Ringlock stages, layher-compatible systems,
            ground-support roofs, truss towers, cantilever structures, ramps
            and risers.
          </li>
          <li>
            <strong>Gala Dinners</strong> — elegance, atmosphere, perfection.
            Ballroom staging, runway platforms, banquet rigging, red-carpet
            arrivals, award-ceremony backdrops.
          </li>
          <li>
            <strong>Product Launches</strong> — launch, engage, elevate.
            Reveal stages, automotive launch platforms, mobile launch rigs,
            immersive brand experiences.
          </li>
          <li>
            <strong>Festivals &amp; Sports Events</strong> — energy, scale,
            unforgettable moments. Multi-day festival infrastructure, sport
            finish-line gantries, podium structures, broadcast platforms,
            spectator seating.
          </li>
        </ul>

        <h3>Capabilities</h3>
        <ul>
          <li>Ringlock Scaffolding Rental &amp; Sale (India-manufactured, certified)</li>
          <li>Stage &amp; Trussing — spans up to 30 m, roof loads to 5 t</li>
          <li>Ground-Support Systems &amp; Layher-Compatible Rigs</li>
          <li>Event Production — end-to-end turnkey execution</li>
          <li>Structural Engineering &amp; Load Design Certification</li>
          <li>Crew Deployment, Site Supervision &amp; On-Ground Logistics</li>
          <li>Safety Audits, Wind-Load Analysis &amp; PPE Compliance</li>
          <li>Rigging, Trussing, Truss Towers, Line-Array Hangs</li>
          <li>Barricading, Crowd Control &amp; Spectator Seating</li>
          <li>Custom Fabrication, Cladding &amp; Branded Decks</li>
        </ul>

        <h3>Our Process</h3>
        <p>
          Planning · Engineering · Execution · Management · Support —
          one team, one accountability chain, endless possibilities.
        </p>
        <ul>
          <li>
            <strong>Planning</strong> — site surveys, load calculation, permit
            support, timeline mapping, budget engineering.
          </li>
          <li>
            <strong>Engineering</strong> — CAD drawings, structural analysis,
            safety certification, wind-load modelling, fabrication specs.
          </li>
          <li>
            <strong>Execution</strong> — rapid mobilisation, certified crews,
            precision assembly, quality control, on-schedule delivery.
          </li>
          <li>
            <strong>Management</strong> — on-site supervision, vendor
            coordination, live-event standby, change-order handling.
          </li>
          <li>
            <strong>Support</strong> — 24×7 event-day response, structural
            monitoring, safe dismantling, post-event reporting.
          </li>
        </ul>

        <h3>Where We Work</h3>
        <p>
          Headquartered in Mathikere, Bangalore — mobilising Pan-India.
          Active delivery across Bangalore / Bengaluru, Mumbai, Delhi NCR,
          Hyderabad, Chennai, Pune, Kolkata, Kochi, Ahmedabad, Jaipur, Goa
          and every major Indian metro and tier-2 city. Destination and
          outstation events handled turnkey.
        </p>

        <h3>Why AAA Events &amp; Production</h3>
        <ul>
          <li>15+ years of Ringlock scaffolding and event-production expertise</li>
          <li>500+ stage builds delivered across India without a single failure</li>
          <li>Founder-led projects — Antony Thomas Dsouza and Najib Bin Arif on site for every major build</li>
          <li>Certified, engineer-stamped structural drawings for every job</li>
          <li>Own inventory — no third-party dependencies, faster mobilisation</li>
          <li>Safety-first culture — PPE-compliant crew, load-tested systems</li>
          <li>Trusted by corporates, wedding planners, promoters and brands</li>
          <li>Transparent quoting — custom quote within two hours of enquiry</li>
        </ul>

        <h3>Events with Safety</h3>
        <p>
          <strong>Events with Safety</strong> is the AAA promise — every
          stage, every truss, every platform is engineered, load-tested
          and certified before a single guest arrives. Safe events.
          Secure crowds. Structurally sound stages. From permit-ready
          drawings to on-site safety marshals, AAA Events &amp; Production
          makes safety the first deliverable, not an afterthought —
          because when your name is on the event, ours is on the steel.
        </p>

        <h3>Keywords</h3>
        <p>
          Events with safety, safe event scaffolding, certified event
          structures, Ringlock scaffolding Bangalore, event scaffolding
          India, stage fabrication Bangalore, trussing rental India,
          concert stage builders, corporate event scaffolding, wedding
          mandap scaffolding, exhibition stall scaffolding,
          Layher-compatible Ringlock, ground-support roof system, truss
          tower rental, event production company Bangalore, turnkey
          stage builder India, Pan-India event infrastructure, safety
          certified stages, load-tested trussing, PPE-compliant event
          crew, AAA Events, AAA Events and Production, AAA Events &amp;
          Production Mathikere, Antony Thomas Dsouza, Najib Bin Arif.
        </p>
      </div>
    </section>
  );
}
