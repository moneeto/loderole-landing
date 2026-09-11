import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { site, whatsappUrl } from '../site.js';
import { Reveal } from './Reveal.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const empty = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  website: '',
};

export function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = t('contact.validation.name');
    if (!EMAIL_RE.test(form.email.trim())) next.email = t('contact.validation.email');
    if (form.message.trim().length < 5) next.message = t('contact.validation.message');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company ? `Company: ${form.company}` : null,
      form.phone ? `Phone: ${form.phone}` : null,
      '',
      'Message:',
      form.message,
      '',
      '---',
      'Loderole landing',
    ]
      .filter(Boolean)
      .join('\n');

    const payload = new FormData();
    payload.append('site', site.mailerSite);
    payload.append('fullName', form.name.trim());
    payload.append('email', form.email.trim());
    payload.append('message', body);
    payload.append('form_type', 'contact');
    payload.append('website', form.website);

    const headers = {};
    if (site.mailerKey) headers['X-Mailer-Key'] = site.mailerKey;

    try {
      const response = await fetch(site.mailerUrl, { method: 'POST', body: payload, headers });
      const data = await response.json().catch(() => ({}));
      if (data.success) {
        setStatus('ok');
        setForm(empty);
        setErrors({});
      } else {
        setStatus('err');
      }
    } catch {
      setStatus('err');
    }
  };

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{t('contact.kicker')}</p>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="about__body">{t('contact.body')}</p>
        </Reveal>
        <div className="contact__grid">
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="hp" aria-hidden="true">
              <label>
                website
                <input name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="field">
              <label htmlFor="name">{t('contact.name')}</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder={t('contact.namePlaceholder')}
                autoComplete="name"
                required
              />
              {errors.name ? <span className="field__error">{errors.name}</span> : null}
            </div>
            <div className="field">
              <label htmlFor="email">{t('contact.email')}</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder={t('contact.emailPlaceholder')}
                autoComplete="email"
                required
              />
              {errors.email ? <span className="field__error">{errors.email}</span> : null}
            </div>
            <div className="field">
              <label htmlFor="company">
                {t('contact.company')} ({t('contact.optional')})
              </label>
              <input
                id="company"
                name="company"
                value={form.company}
                onChange={onChange}
                placeholder={t('contact.companyPlaceholder')}
                autoComplete="organization"
              />
            </div>
            <div className="field">
              <label htmlFor="phone">
                {t('contact.phone')} ({t('contact.optional')})
              </label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder={t('contact.phonePlaceholder')}
                autoComplete="tel"
              />
            </div>
            <div className="field">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder={t('contact.messagePlaceholder')}
                required
              />
              {errors.message ? <span className="field__error">{errors.message}</span> : null}
            </div>
            <button className="btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? t('contact.sending') : t('contact.submit')}
            </button>
            {status === 'ok' ? <p className="form__status is-ok">{t('contact.success')}</p> : null}
            {status === 'err' ? <p className="form__status is-err">{t('contact.error')}</p> : null}
          </form>
          <aside className="contact__aside">
            <div>
              <span>{t('contact.emailLabel')}</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div>
              <span>{t('contact.whatsappLabel')}</span>
              <a href={whatsappUrl(t('whatsapp.message'))} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
            <div>
              <span>{t('contact.locationLabel')}</span>
              <p>{t('contact.location')}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
