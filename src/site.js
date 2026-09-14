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
      images: [
        '/loderole-images/tours-1.png',
        '/loderole-images/tours-2.png',
        '/loderole-images/tours-3.png',
        '/loderole-images/tours-4.png',
      ],
    },
    {
      id: 'erp',
      url: 'https://backoffice.frassiaviation.com/',
      images: [
        '/loderole-images/frassibackoffice-1.png',
        '/loderole-images/frassibackoffice-2.png',
        '/loderole-images/frassibackoffice-3.png',
      ],
    },
    {
      id: 'aviation',
      url: 'https://frassiaviation.com/',
      images: [
        '/loderole-images/mantenimiento-1.png',
        '/loderole-images/mantenimiento-2.png',
        '/loderole-images/mantenimiento-3.png',
      ],
    },
    {
      id: 'arg',
      url: 'http://argaircraft.com/',
      images: [
        '/loderole-images/argaircraft-1.png',
        '/loderole-images/argaircraft-2.png',
        '/loderole-images/argaircraft-3.png',
      ],
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
