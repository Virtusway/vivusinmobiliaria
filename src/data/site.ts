import type { Locale, MigratedRoute } from './routes';

export const localeConfig: Record<
  Locale,
  {
    htmlLang: string;
    label: string;
    homePath: string;
    nav: Array<{ label: string; href: string }>;
    footerLinks: Array<{ label: string; href: string; rel?: string }>;
    footerEmail: string;
    buyerLabel: string;
    contactLabel: string;
    buyerHref: string;
  }
> = {
  es: {
    htmlLang: 'es-ES',
    label: 'Español',
    homePath: '/',
    nav: [
      { label: 'Conócenos', href: '/conocenos/' },
      { label: 'Emprendedores', href: '/emprendedores/' },
      { label: 'Estilo de Vida', href: '/guia-de-inversion-y-estilo-de-vida/' },
      { label: 'Servicios', href: '/servicios-inmobiliarios-360/' },
    ],
    footerLinks: [
      { label: 'Política de cookies', href: '/politica-de-cookies/' },
      { label: 'Aviso legal', href: '/aviso-legal/' },
      { label: 'Política de privacidad', href: '/politica-de-privacidad/', rel: 'privacy-policy' },
      { label: 'Accesibilidad', href: '/accesibilidad/' },
    ],
    footerEmail: 'info@vivusinmobiliaria.com',
    buyerLabel: 'Agente Comprador',
    contactLabel: 'Contáctanos',
    buyerHref: '/landing/',
  },
  en: {
    htmlLang: 'en-US',
    label: 'English',
    homePath: '/en/',
    nav: [
      { label: 'About Us', href: '/en/about-us/' },
      { label: 'Entrepreneurs', href: '/en/entrepreneurs/' },
      { label: 'Lifestyle', href: '/en/investment-and-lifestyle-guide/' },
      { label: 'Services', href: '/en/360o-real-estate-services/' },
    ],
    footerLinks: [
      { label: 'Cookies policy', href: '/en/cookies-policy/' },
      { label: 'Legal warning', href: '/en/legal-warning/' },
      { label: 'Privacy policy', href: '/en/privacy-policy/', rel: 'privacy-policy' },
      { label: 'Accesibilidad', href: '/en/accesibilidad/' },
    ],
    footerEmail: 'crm@vivusinmobiliaria.com',
    buyerLabel: 'Buyer Agent',
    contactLabel: 'Contact us',
    buyerHref: '/en/landing-en/',
  },
  ca: {
    htmlLang: 'ca',
    label: 'Valencià',
    homePath: '/ca/',
    nav: [
      { label: 'Coneix-nos', href: '/ca/coneix-nos/' },
      { label: 'Emprenedors', href: '/ca/emprenedors/' },
      { label: 'Estil de Vida', href: '/ca/guia-dinversio-i-estil-de-vida/' },
      { label: 'Serveis', href: '/ca/serveis-immobiliaris-360/' },
    ],
    footerLinks: [
      { label: 'Política de cookies', href: '/ca/politica-de-cookies-2/' },
      { label: 'Avís legal', href: '/ca/avis-legal/' },
      { label: 'Política de privacitat', href: '/ca/politica-de-privacitat/', rel: 'privacy-policy' },
      { label: 'Accesibilidad', href: '/en/accesibilidad/' },
    ],
    footerEmail: 'info@vivusinmobiliaria.com',
    buyerLabel: 'Agent Comprador',
    contactLabel: "Contacta'ns",
    buyerHref: '/ca/landing-ca/',
  },
};

export const contactInfo = {
  phoneLabel: '+34 604 812 244',
  whatsappHref: 'https://wa.me/34604812244',
  instagramHref: 'https://www.instagram.com/vivusinmobiliaria/',
};

export function alternateHref(route: MigratedRoute, locale: Locale) {
  return route.alternates[locale] ?? localeConfig[locale].homePath;
}
