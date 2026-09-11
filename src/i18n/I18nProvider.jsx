import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './locales/en.json';
import es from './locales/es.json';
import { site } from '../site.js';

const STORAGE_KEY = 'loderole.locale';
const DEFAULT_LOCALE = 'en';

export const locales = {
  en,
  es,
};

export const localeList = Object.keys(locales);

function readStoredLocale() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('lang');
  if (fromQuery && locales[fromQuery]) return fromQuery;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && locales[stored]) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
}

function lookup(dict, path) {
  return path.split('.').reduce((node, key) => {
    if (node == null) return undefined;
    return node[key];
  }, dict);
}

function setMeta(attr, key, value) {
  if (!value) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setHreflang() {
  const links = {
    en: `${site.siteUrl}/`,
    es: `${site.siteUrl}/?lang=es`,
    'x-default': `${site.siteUrl}/`,
  };
  Object.entries(links).forEach(([lang, href]) => {
    let el = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
    if (!el) {
      el = document.createElement('link');
      el.rel = 'alternate';
      el.hreflang = lang;
      document.head.appendChild(el);
    }
    el.href = href;
  });
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale);

  const setLocale = useCallback((next) => {
    if (!locales[next]) return;
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    if (next === DEFAULT_LOCALE) url.searchParams.delete('lang');
    else url.searchParams.set('lang', next);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const dict = locales[locale] || locales[DEFAULT_LOCALE];

  const t = useCallback(
    (path) => {
      const value = lookup(dict, path);
      if (value === undefined) return path;
      return value;
    },
    [dict]
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = lookup(dict, 'meta.title') || 'Loderole';
    setMeta('name', 'description', lookup(dict, 'meta.description'));
    setMeta('property', 'og:title', lookup(dict, 'meta.ogTitle'));
    setMeta('property', 'og:description', lookup(dict, 'meta.ogDescription'));
    setMeta('property', 'og:image', `${site.siteUrl}/og.svg`);
    setMeta('property', 'og:url', locale === 'es' ? `${site.siteUrl}/?lang=es` : `${site.siteUrl}/`);
    setMeta('property', 'og:locale', locale === 'es' ? 'es_ES' : 'en_US');
    setMeta('name', 'twitter:title', lookup(dict, 'meta.ogTitle'));
    setMeta('name', 'twitter:description', lookup(dict, 'meta.ogDescription'));
    setHreflang();
  }, [dict, locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t, dict, localeList }),
    [locale, setLocale, t, dict]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
