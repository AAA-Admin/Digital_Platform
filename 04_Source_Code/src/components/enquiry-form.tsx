'use client';

import { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const EVENT_TYPES = [
  'Corporate Event',
  'Wedding',
  'Concert / Live Show',
  'Exhibition / Trade Fair',
  'Product Launch',
  'Other',
];

const BUDGET_RANGES = ['Under ₹5L', '₹5L–10L', '₹10L–25L', '₹25L+'];

interface FormData {
  name: string;
  phone: string;
  city: string;
  eventType: string;
  budgetRange: string;
  brief: string;
  website: string; // honeypot
}

function buildWaMessage(form: FormData): string {
  const lines: string[] = [
    `Hi Antony, I just submitted an enquiry on the AAA Events website.`,
    ``,
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
  ];
  if (form.city.trim())   lines.push(`City: ${form.city.trim()}`);
  if (form.eventType)     lines.push(`Event: ${form.eventType}`);
  if (form.budgetRange)   lines.push(`Budget: ${form.budgetRange}`);
  if (form.brief.trim())  lines.push(``, form.brief.trim());
  lines.push(``, `Looking forward to hearing from you.`);
  return lines.join('\n');
}

export function EnquiryForm() {
  const [submitState, setSubmitState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', city: '', eventType: '',
    budgetRange: '', brief: '', website: '',
  });

  function set(field: keyof FormData, value: string) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  }

  function validate(): Partial<Record<keyof FormData, string>> {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    const phone = form.phone.replace(/[\s\-()]/g, '');
    if (!/^[6-9]\d{9}$/.test(phone)) e.phone = 'Enter a valid 10-digit Indian mobile number';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitState('submitting');

    // Open WhatsApp with the structured message — this is the user-facing action
    const waText = buildWaMessage(form);
    const waHref = `https://wa.me/919945513198?text=${encodeURIComponent(waText)}`;
    window.open(waHref, '_blank', 'noopener,noreferrer');

    // Fire-and-forget background ping to /api/enquiry for lead tracking;
    // don't block the user on it or fail the flow if the API is down.
    fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).catch(() => { /* intentionally swallowed — WA flow already triggered */ });

    setSubmitState('success');
  }

  if (submitState === 'success') {
    const waText = buildWaMessage(form);
    const waHref = `https://wa.me/919945513198?text=${encodeURIComponent(waText)}`;
    return (
      <div className="enquiry-success reveal delay-1">
        <div className="success-icon">✓</div>
        <h3>We&apos;ve received your enquiry!</h3>
        <p>Expect a call or WhatsApp from us within 2 hours.</p>
        <div className="cta-fallback">
          <span>Start a direct conversation:</span>
          <a className="btn-wa" href={waHref} target="_blank" rel="noopener noreferrer">
            <WaIcon /> Continue on WhatsApp
          </a>
          <a className="btn-call" href="tel:+919945513198">
            <PhoneIcon /> Call Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="enquiry-form reveal delay-1" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="ef-name" className="form-label">Your Name</label>
          <input
            id="ef-name" type="text" placeholder="Rajan Kumar"
            value={form.name} onChange={e => set('name', e.target.value)}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="ef-phone" className="form-label">Phone Number</label>
          <input
            id="ef-phone" type="tel" placeholder="98765 43210"
            value={form.phone} onChange={e => set('phone', e.target.value)}
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="ef-city" className="form-label form-label-opt">
            City / Location <span className="opt-tag">optional</span>
          </label>
          <input
            id="ef-city" type="text" placeholder="Bangalore"
            value={form.city} onChange={e => set('city', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="ef-event" className="form-label form-label-opt">
            Event Type <span className="opt-tag">optional</span>
          </label>
          <div className="select-wrap">
            <select
              id="ef-event"
              value={form.eventType} onChange={e => set('eventType', e.target.value)}
            >
              <option value="">Select event type</option>
              {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronIcon />
          </div>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label form-label-opt">
          Budget Range <span className="opt-tag">optional</span>
        </label>
        <div className="budget-options">
          {BUDGET_RANGES.map(r => (
            <label key={r} className={`budget-pill${form.budgetRange === r ? ' selected' : ''}`}>
              <input
                type="radio" name="budgetRange" value={r}
                checked={form.budgetRange === r}
                onChange={e => set('budgetRange', e.target.value)}
              />
              {r}
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="ef-brief" className="form-label form-label-opt">
          Brief Requirement <span className="opt-tag">optional</span>
        </label>
        <textarea
          id="ef-brief"
          placeholder="e.g. 3-day corporate summit for 500 guests, need full ringlock staging and trussing…"
          rows={3} value={form.brief} onChange={e => set('brief', e.target.value)}
        />
      </div>

      {/* honeypot */}
      <input
        type="text" name="website" value={form.website}
        onChange={e => set('website', e.target.value)}
        style={{ display: 'none' }} tabIndex={-1} autoComplete="off"
      />

      <button type="submit" className="btn-submit" disabled={submitState === 'submitting'}>
        {submitState === 'submitting' ? 'Opening…' : (
          <>
            <WaIcon /> Chat on WhatsApp
          </>
        )}
      </button>

      {submitState === 'error' && (
        <p className="form-error-global">
          Something went wrong. Please call us:{' '}
          <a href="tel:+919945513198">+91 99455 13198</a>
        </p>
      )}

      <div className="cta-fallback">
        <span>Prefer to talk?</span>
        <a className="btn-call" href="tel:+919945513198">
          <PhoneIcon /> Call Now
        </a>
      </div>
    </form>
  );
}

function WaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.534 5.847L0 24l6.29-1.506A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.568 9.568 0 01-4.9-1.343l-.351-.208-3.733.894.938-3.613-.228-.371A9.544 9.544 0 012.4 12C2.4 6.698 6.698 2.4 12 2.4S21.6 6.698 21.6 12 17.302 21.6 12 21.6z"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}
