import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { LanguageSwitcher } from './LanguageSwitcher.jsx';

const LINKS = [
  { href: '#solutions', key: 'nav.solutions' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#planey', key: 'nav.planey' },
  { href: '#about', key: 'nav.about' },
  { href: '#faq', key: 'nav.faq' },
];

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('scroll-sentinel');
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 1,
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap header__inner">
        <a href="#top" className="header__brand wordmark" onClick={close}>
          Loderole
        </a>
        <nav className="header__nav" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} className="header__link" href={link.href}>
              {t(link.key)}
            </a>
          ))}
          <LanguageSwitcher />
          <a className="btn header__cta" href="#contact">
            {t('nav.contact')}
          </a>
        </nav>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="header__drawer" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} className="header__link" href={link.href} onClick={close}>
              {t(link.key)}
            </a>
          ))}
          <LanguageSwitcher />
          <a className="btn header__cta" href="#contact" onClick={close}>
            {t('nav.contact')}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
