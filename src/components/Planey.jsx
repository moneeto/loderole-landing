import { useI18n } from '../i18n/I18nProvider.jsx';
import { Reveal } from './Reveal.jsx';

export function Planey() {
  const { t } = useI18n();

  return (
    <section className="section planey" id="planey">
      <div className="wrap planey__inner">
        <Reveal>
          <p className="kicker">{t('planey.kicker')}</p>
          <span className="planey__badge">{t('planey.badge')}</span>
          <p className="planey__name wordmark">{t('planey.name')}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="planey__title">{t('planey.title')}</h2>
          <p>{t('planey.body')}</p>
          {/* <a className="btn btn--inverse" href="#contact">
            {t('planey.cta')}
          </a> */}
        </Reveal>
      </div>
    </section>
  );
}
