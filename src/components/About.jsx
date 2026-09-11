import { useI18n } from '../i18n/I18nProvider.jsx';
import { useCountUp } from '../hooks/useCountUp.js';
import { useReveal } from '../hooks/useReveal.js';
import { Reveal } from './Reveal.jsx';

function Stat({ value, suffix, label, enabled }) {
  const n = useCountUp(value, { enabled });
  return (
    <div className="stat">
      <div className="stat__value">
        {n}
        {suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export function About() {
  const { t, dict } = useI18n();
  const { ref, visible } = useReveal();

  return (
    <section className="section" id="about">
      <div className="wrap about__grid">
        <div>
          <Reveal>
            <p className="kicker">{t('about.kicker')}</p>
            <h2 className="section-title">{t('about.title')}</h2>
            <p className="about__body">{t('about.body')}</p>
          </Reveal>
          <div className="about__steps">
            <p className="kicker">{t('about.stepsLabel')}</p>
            {dict.about.steps.map((step, index) => (
              <Reveal key={step.title} className="about__step" delay={index * 50}>
                <span className="solution__index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div ref={ref} className="stats">
          {dict.about.stats.map((stat) => (
            <Stat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              enabled={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
