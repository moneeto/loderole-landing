import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      {dir === 'prev' ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}

export function ProjectCarousel({ images = [], alt }) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 5000);
    return () => window.clearInterval(id);
  }, [count, paused]);

  if (!count) return null;

  const go = (step) => {
    setIndex((current) => (current + step + count) % count);
  };

  return (
    <div
      className="browser"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="browser__bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="carousel">
        <div className="carousel__track" style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}>
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === index ? alt : ''}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
        {count > 1 ? (
          <>
            <button
              type="button"
              className="carousel__nav carousel__nav--prev"
              aria-label={t('projects.prev')}
              onClick={() => go(-1)}
            >
              <Chevron dir="prev" />
            </button>
            <button
              type="button"
              className="carousel__nav carousel__nav--next"
              aria-label={t('projects.next')}
              onClick={() => go(1)}
            >
              <Chevron dir="next" />
            </button>
            <p className="carousel__count" aria-live="polite">
              {index + 1} / {count}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
