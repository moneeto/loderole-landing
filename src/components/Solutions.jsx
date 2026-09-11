import { useI18n } from '../i18n/I18nProvider.jsx';
import { Reveal } from './Reveal.jsx';

function Icon({ d }) {
  return (
    <svg className="solution__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const ICONS = [
  'M4 7h16M4 12h16M4 17h10',
  'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  'M3 8h18v10H3zM3 10h18',
  'M4 6h16v12H4zM8 6v12',
  'M12 4v10m0 4h.01',
];

export function Solutions() {
  const { t, dict } = useI18n();
  const items = dict.solutions.items;

  return (
    <section className="section" id="solutions">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{t('solutions.kicker')}</p>
          <h2 className="section-title">{t('solutions.title')}</h2>
        </Reveal>
        <div className="solutions__list">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 60} className="solution">
              <span className="solution__index">
                {String(index + 1).padStart(2, '0')}
                <Icon d={ICONS[index]} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
