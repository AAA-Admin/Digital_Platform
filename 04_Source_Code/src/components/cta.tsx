import { EnquiryForm } from '@/components/enquiry-form';

export function Cta() {
  return (
    <section className="cta-section" id="contact">
      <div className="section-max">
        <p className="section-label reveal" style={{ textAlign: 'center' }}>Get in Touch</p>
        <h2 className="cta-h reveal">Ready to Build<br/>Something <span className="gold">Extraordinary?</span></h2>
        <p className="cta-sub reveal">Tell us about your event. We&apos;ll get back to you within 2 hours with a custom quote — no obligations, no pressure.</p>
        <EnquiryForm />
      </div>
    </section>
  );
}
