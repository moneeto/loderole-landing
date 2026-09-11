import { useI18n } from '../i18n/I18nProvider.jsx';
import { site, whatsappUrl } from '../site.js';

const LINKS = [
  { href: '#solutions', key: 'nav.solutions' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#planey', key: 'nav.planey' },
  { href: '#about', key: 'nav.about' },
  { href: '#faq', key: 'nav.faq' },
  { href: '#contact', key: 'nav.contact' },
];

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const socials = [
    site.social.linkedin && { href: site.social.linkedin, label: 'LinkedIn' },
    site.social.github && { href: site.social.github, label: 'GitHub' },
  ].filter(Boolean);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <a href="#top" className="footer__brand wordmark">
              Loderole
            </a>
            <p className="footer__blurb">{t('footer.blurb')}</p>
          </div>
          <div>
            <h3>{t('footer.nav')}</h3>
            <ul>
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{t(link.key)}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{t('footer.contact')}</h3>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={whatsappUrl(t('whatsapp.message'))} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>{t('contact.location')}</li>
            </ul>
          </div>
          {socials.length ? (
            <div>
              <h3>{t('footer.social')}</h3>
              <ul>
                {socials.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div />
          )}
        </div>
        <p className="footer__copy">
          © {year} Loderole. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
