# Loderole landing

Landing institucional de Loderole: software a medida, del relevamiento a la implementación y el mantenimiento. Idiomas: inglés (default) y español.

## Levantar en local

```bash
cp .env.example .env
npm install
npm run dev
```

El dev server corre en [http://localhost:5175](http://localhost:5175).

### Formulario de contacto

El formulario POST a `VITE_MAILER_URL` (el mismo mailer de Frassi / ARG Aircraft), con `site=loderole`.

En el mailer, agregar el sitio si todavía no está:

```
SITES=frassi,inspector,loderole
LODEROLE_TO_EMAIL=info@loderole.com
LODEROLE_FROM_NAME=Loderole
LODEROLE_ORIGINS=http://localhost:5175
```

y sumar `http://localhost:5175` a `ALLOWED_ORIGINS`. Ver `mailer/.env.example`.

### WhatsApp

Completar `VITE_WHATSAPP_NUMBER` en `.env` (solo dígitos, con código de país, ej. `54911…`). El mensaje predefinido vive en los locales i18n.

## Theming (colores y tipografías)

Editar **un solo archivo**: `src/theme.js`.

- `colors.primary` — botones y acentos (default violeta)
- `colors.secondary` — tinta / superficies oscuras
- `fonts.heading` — títulos
- `fonts.body` — textos
- `fonts.brand` — wordmark **Loderole** (Gloock; no cambiar si se quiere preservar la marca)

Los componentes leen solo variables CSS (`--color-primary`, `--font-heading`, etc.). No hace falta tocar JSX para retematizar.

Las fuentes de Google se cargan en `index.html`. Si cambiás heading/body, actualizá también ese `<link>`. El wordmark sigue usando Gloock.

## i18n

- Locales: `src/i18n/locales/en.json` y `src/i18n/locales/es.json`
- Registro: objeto `locales` en `src/i18n/I18nProvider.jsx`
- Default: `en`. Persistencia: `localStorage` (`loderole.locale`) y `?lang=es`
- Para un tercer idioma: copiar un JSON, agregarlo a `locales`, y el selector lo muestra

Nombres de marca que no se traducen: Loderole, Planey, Frassi, ARG Aircraft, Stripe.

## Build

```bash
npm run build
npm run preview
```

El `dist/` es estático (Netlify, Cloudflare Pages, Nginx, etc.). Configurar `VITE_SITE_URL` al dominio real antes del build para Open Graph y `hreflang`.
