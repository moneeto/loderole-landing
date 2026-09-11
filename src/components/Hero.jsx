import { useI18n } from '../i18n/I18nProvider.jsx';
import { Reveal } from './Reveal.jsx';

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" id="home" aria-labelledby="hero-wordmark">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__inner">
        <Reveal>
          <p className="hero__eyebrow">{t('hero.eyebrow')}</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 id="hero-wordmark" className="hero__wordmark wordmark">
            {t('hero.wordmark')}
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="hero__headline font-heading">{t('hero.headline')}</p>
        </Reveal>
        <Reveal delay={200}>
          <p className="hero__sub">{t('hero.sub')}</p>
        </Reveal>
        <Reveal delay={260}>
          <div className="hero__actions">
            <a className="btn" href="#contact">
              {t('hero.cta')}
            </a>
            <a className="btn btn--ghost" href="#projects">
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
