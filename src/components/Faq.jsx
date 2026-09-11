import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { Reveal } from './Reveal.jsx';

export function Faq() {
  const { t, dict } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{t('faq.kicker')}</p>
          <h2 className="section-title">{t('faq.title')}</h2>
        </Reveal>
        <div className="faq__list">
          {dict.faq.items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            return (
              <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    {item.q}
                    <span className="faq__icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                <div className="faq__panel" id={panelId}>
                  <div className="faq__panel-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
