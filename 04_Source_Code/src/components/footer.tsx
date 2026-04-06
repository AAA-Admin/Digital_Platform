export function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" style={{ height: '38px', width: 'auto', opacity: 0.85 }}>
          <path d="M 82.1,797.0 194.0,797.0 497.8,189.5 403.0,0.0 4.5,797.0 41.4,797.0 403.0,73.8 460.9,189.5 173.7,763.8 135.6,763.8 421.4,192.2 403.0,155.3 Z" fill="#00ADEE"/>
          <path d="M 239.6,797.0 567.3,797.0 442.1,546.6 351.6,727.6 453.6,727.6 437.2,694.9 407.0,694.9 443.1,622.5 513.5,763.3 293.5,763.3 442.1,466.2 607.5,797.0 722.5,797.0 498.7,349.5 519.0,308.9 763.1,797.0 800.9,797.0 519.3,233.9 461.6,349.3 668.6,763.3 626.4,763.3 441.4,393.4 Z" fill="#00ADEE"/>
        </svg>
        <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '15px' }}>AAA Events</span>
      </div>
      <p>
        Specialist in Ringlock Scaffolding Systems &nbsp;&middot;&nbsp; Mathikere, Bangalore 560054<br/>
        <a href="mailto:antony@aaa-events.in">antony@aaa-events.in</a> &nbsp;&middot;&nbsp;
        <a href="tel:+919108934435">+91 91089 34435</a>
      </p>
      <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--muted2)' }}>
        &copy; 2025 AAA Events &amp; Production. All rights reserved.
      </p>
    </footer>
  );
}
