import { localeList, useI18n } from '../i18n/I18nProvider.jsx';

export function LanguageSwitcher({ id }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="lang" role="group" aria-label={t('lang.switchTo')}>
      {localeList.map((code, index) => (
        <span key={code}>
          {index > 0 ? <span aria-hidden="true"> / </span> : null}
          <button
            type="button"
            id={index === 0 ? id : undefined}
            className="lang__btn"
            aria-pressed={locale === code}
            onClick={() => setLocale(code)}
          >
            {t(`lang.${code}`)}
          </button>
        </span>
      ))}
    </div>
  );
}
