import { useI18n } from '../i18n/I18nProvider.jsx';
import { site } from '../site.js';
import { Reveal } from './Reveal.jsx';

export function Projects() {
  const { t, dict } = useI18n();
  const items = dict.projects.items;

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{t('projects.kicker')}</p>
          <h2 className="section-title">{t('projects.title')}</h2>
        </Reveal>
        <div className="projects__list">
          {items.map((item) => {
            const meta = site.projects.find((project) => project.id === item.id);
            return (
              <article className="project" key={item.id}>
                <Reveal>
                  <p className="project__meta">
                    {item.client} · {t('projects.industryLabel')} {item.industry}
                  </p>
                  <h3>{item.name}</h3>
                  <p className="project__desc">{item.description}</p>
                  <ul className="project__highlights">
                    {item.highlights.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <a className="btn" href={meta?.url} target="_blank" rel="noreferrer">
                    {t('projects.visit')}
                  </a>
                </Reveal>
                <Reveal delay={80}>
                  <div className="browser">
                    <div className="browser__bar" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                    <img src={meta?.image} alt={item.imageAlt} loading="lazy" />
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
