import { useI18n } from '../i18n/I18nProvider.jsx';
import { Reveal } from './Reveal.jsx';

export function Clients() {
  const { t } = useI18n();
  const names = ['Frassi Aviation', 'Frassi Tours', 'ARG Aircraft'];
  const loop = [...names, ...names, ...names, ...names];

  return (
    <section className="clients" id="clients" aria-labelledby="clients-title">
      <div className="clients__head">
        <Reveal>
          <p className="kicker">{t('clients.kicker')}</p>
          <h2 id="clients-title" className="clients__title font-heading">
            {t('clients.title')}
          </h2>
        </Reveal>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {loop.map((name, index) => (
            <span className="marquee__item" key={`${name}-${index}`}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
