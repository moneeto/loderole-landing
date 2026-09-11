const digits = (value) => String(value || '').replace(/\D/g, '');

export const site = {
  brand: 'Loderole',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'info@loderole.com',
  whatsapp: digits(import.meta.env.VITE_WHATSAPP_NUMBER),
  siteUrl: (import.meta.env.VITE_SITE_URL || 'http://localhost:5175').replace(/\/$/, ''),
  mailerUrl: import.meta.env.VITE_MAILER_URL || 'http://localhost:3001/api/send',
  mailerKey: import.meta.env.VITE_MAILER_API_KEY || '',
  mailerSite: 'loderole',
  social: {
    linkedin: import.meta.env.VITE_LINKEDIN_URL || '',
    github: import.meta.env.VITE_GITHUB_URL || '',
  },
  projects: [
    {
      id: 'tours',
      url: 'https://www.frassitours.com/',
      image: '/mockups/tours.svg',
    },
    {
      id: 'erp',
      url: 'https://backoffice.frassiaviation.com/',
      image: '/mockups/erp.svg',
    },
    {
      id: 'aviation',
      url: 'https://frassiaviation.com/',
      image: '/mockups/aviation.svg',
    },
    {
      id: 'arg',
      url: 'http://argaircraft.com/',
      image: '/mockups/arg.svg',
    },
  ],
};

export function whatsappUrl(message) {
  const text = encodeURIComponent(message || '');
  if (!site.whatsapp) {
    return `https://wa.me/?text=${text}`;
  }
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}
