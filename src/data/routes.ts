export const SITE_URL = 'https://vivusinmobiliaria.com';

export const locales = ['es', 'en', 'ca'] as const;
export type Locale = (typeof locales)[number];

export type MigratedRoute = {
  locale: Locale;
  path: string;
  sourceUrl: string;
  title: string;
  description: string;
  canonicalPath: string;
  alternates: Partial<Record<Locale, string>>;
  bodyClass: string;
  contentFile: string;
  group: string;
};

export const migratedRoutes = [
  {
    "locale": "es",
    "path": "/",
    "sourceUrl": "https://vivusinmobiliaria.com/",
    "title": "Vivus - Inmobiliaria",
    "description": "Inmobiliaria",
    "canonicalPath": "/",
    "alternates": {
      "es": "/",
      "en": "/en/",
      "ca": "/ca/"
    },
    "bodyClass": "home",
    "contentFile": "es-root.html",
    "group": "front"
  },
  {
    "locale": "es",
    "path": "/inicio/",
    "sourceUrl": "https://vivusinmobiliaria.com/inicio/",
    "title": "Inicio - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/inicio/",
    "alternates": {
      "es": "/inicio/",
      "en": "/en/home/",
      "ca": "/ca/inici/"
    },
    "bodyClass": "home",
    "contentFile": "es-inicio.html",
    "group": "home"
  },
  {
    "locale": "es",
    "path": "/conocenos/",
    "sourceUrl": "https://vivusinmobiliaria.com/conocenos/",
    "title": "Conócenos - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/conocenos/",
    "alternates": {
      "es": "/conocenos/",
      "en": "/en/about-us/",
      "ca": "/ca/coneix-nos/"
    },
    "bodyClass": "",
    "contentFile": "es-conocenos.html",
    "group": "about"
  },
  {
    "locale": "es",
    "path": "/servicios/",
    "sourceUrl": "https://vivusinmobiliaria.com/servicios/",
    "title": "Servicios - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/servicios/",
    "alternates": {
      "es": "/servicios/",
      "en": "/en/services/",
      "ca": "/ca/serveis/"
    },
    "bodyClass": "",
    "contentFile": "es-servicios.html",
    "group": "services"
  },
  {
    "locale": "es",
    "path": "/confiamos-en/",
    "sourceUrl": "https://vivusinmobiliaria.com/confiamos-en/",
    "title": "Confiamos en - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/confiamos-en/",
    "alternates": {
      "es": "/confiamos-en/",
      "en": "/en/we-trust/",
      "ca": "/ca/confiem-en/"
    },
    "bodyClass": "",
    "contentFile": "es-confiamos-en.html",
    "group": "trust"
  },
  {
    "locale": "es",
    "path": "/emprendedores/",
    "sourceUrl": "https://vivusinmobiliaria.com/emprendedores/",
    "title": "Emprendedores - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/emprendedores/",
    "alternates": {
      "es": "/emprendedores/",
      "en": "/en/entrepreneurs/",
      "ca": "/ca/emprenedors/"
    },
    "bodyClass": "",
    "contentFile": "es-emprendedores.html",
    "group": "entrepreneurs"
  },
  {
    "locale": "es",
    "path": "/contacto/",
    "sourceUrl": "https://vivusinmobiliaria.com/contacto/",
    "title": "Contacto - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/contacto/",
    "alternates": {
      "es": "/contacto/",
      "en": "/en/contact/",
      "ca": "/ca/contacte/"
    },
    "bodyClass": "",
    "contentFile": "es-contacto.html",
    "group": "contact"
  },
  {
    "locale": "es",
    "path": "/landing/",
    "sourceUrl": "https://vivusinmobiliaria.com/landing/",
    "title": "Landing - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/landing/",
    "alternates": {
      "es": "/landing/",
      "en": "/en/landing-en/",
      "ca": "/ca/landing-ca/"
    },
    "bodyClass": "",
    "contentFile": "es-landing.html",
    "group": "landing"
  },
  {
    "locale": "es",
    "path": "/politica-de-cookies/",
    "sourceUrl": "https://vivusinmobiliaria.com/politica-de-cookies/",
    "title": "Política de cookies - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/politica-de-cookies/",
    "alternates": {
      "es": "/politica-de-cookies/",
      "en": "/en/cookies-policy/",
      "ca": "/ca/politica-de-cookies-2/"
    },
    "bodyClass": "",
    "contentFile": "es-politica-de-cookies.html",
    "group": "cookies"
  },
  {
    "locale": "es",
    "path": "/aviso-legal/",
    "sourceUrl": "https://vivusinmobiliaria.com/aviso-legal/",
    "title": "Aviso legal - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/aviso-legal/",
    "alternates": {
      "es": "/aviso-legal/",
      "en": "/en/legal-warning/",
      "ca": "/ca/avis-legal/"
    },
    "bodyClass": "",
    "contentFile": "es-aviso-legal.html",
    "group": "legal"
  },
  {
    "locale": "es",
    "path": "/politica-de-privacidad/",
    "sourceUrl": "https://vivusinmobiliaria.com/politica-de-privacidad/",
    "title": "Política de privacidad - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/politica-de-privacidad/",
    "alternates": {
      "es": "/politica-de-privacidad/",
      "en": "/en/privacy-policy/",
      "ca": "/ca/politica-de-privacitat/"
    },
    "bodyClass": "",
    "contentFile": "es-politica-de-privacidad.html",
    "group": "privacy"
  },
  {
    "locale": "en",
    "path": "/en/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/",
    "title": "Vivus - Inmobiliaria",
    "description": "Inmobiliaria",
    "canonicalPath": "/en/",
    "alternates": {
      "es": "/",
      "en": "/en/",
      "ca": "/ca/"
    },
    "bodyClass": "home",
    "contentFile": "en-root.html",
    "group": "front"
  },
  {
    "locale": "en",
    "path": "/en/home/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/home/",
    "title": "Home - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/en/home/",
    "alternates": {
      "es": "/inicio/",
      "en": "/en/home/",
      "ca": "/ca/inici/"
    },
    "bodyClass": "home",
    "contentFile": "en-home.html",
    "group": "home"
  },
  {
    "locale": "en",
    "path": "/en/about-us/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/about-us/",
    "title": "About Us - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/en/about-us/",
    "alternates": {
      "es": "/conocenos/",
      "en": "/en/about-us/",
      "ca": "/ca/coneix-nos/"
    },
    "bodyClass": "",
    "contentFile": "en-about-us.html",
    "group": "about"
  },
  {
    "locale": "en",
    "path": "/en/services/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/services/",
    "title": "Services - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/en/services/",
    "alternates": {
      "es": "/servicios/",
      "en": "/en/services/",
      "ca": "/ca/serveis/"
    },
    "bodyClass": "",
    "contentFile": "en-services.html",
    "group": "services"
  },
  {
    "locale": "en",
    "path": "/en/we-trust/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/we-trust/",
    "title": "We trust - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/en/we-trust/",
    "alternates": {
      "es": "/confiamos-en/",
      "en": "/en/we-trust/",
      "ca": "/ca/confiem-en/"
    },
    "bodyClass": "",
    "contentFile": "en-we-trust.html",
    "group": "trust"
  },
  {
    "locale": "en",
    "path": "/en/entrepreneurs/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/entrepreneurs/",
    "title": "Entrepreneurs - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/en/entrepreneurs/",
    "alternates": {
      "es": "/emprendedores/",
      "en": "/en/entrepreneurs/",
      "ca": "/ca/emprenedors/"
    },
    "bodyClass": "",
    "contentFile": "en-entrepreneurs.html",
    "group": "entrepreneurs"
  },
  {
    "locale": "en",
    "path": "/en/contact/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/contact/",
    "title": "Contact - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/en/contact/",
    "alternates": {
      "es": "/contacto/",
      "en": "/en/contact/",
      "ca": "/ca/contacte/"
    },
    "bodyClass": "",
    "contentFile": "en-contact.html",
    "group": "contact"
  },
  {
    "locale": "en",
    "path": "/en/landing-en/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/landing-en/",
    "title": "Landing EN - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/en/landing-en/",
    "alternates": {
      "es": "/landing/",
      "en": "/en/landing-en/",
      "ca": "/ca/landing-ca/"
    },
    "bodyClass": "",
    "contentFile": "en-landing-en.html",
    "group": "landing"
  },
  {
    "locale": "en",
    "path": "/en/cookies-policy/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/cookies-policy/",
    "title": "Cookies policy - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/en/cookies-policy/",
    "alternates": {
      "es": "/politica-de-cookies/",
      "en": "/en/cookies-policy/",
      "ca": "/ca/politica-de-cookies-2/"
    },
    "bodyClass": "",
    "contentFile": "en-cookies-policy.html",
    "group": "cookies"
  },
  {
    "locale": "en",
    "path": "/en/privacy-policy/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/privacy-policy/",
    "title": "Privacy policy - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/en/privacy-policy/",
    "alternates": {
      "es": "/politica-de-privacidad/",
      "en": "/en/privacy-policy/",
      "ca": "/ca/politica-de-privacitat/"
    },
    "bodyClass": "",
    "contentFile": "en-privacy-policy.html",
    "group": "privacy"
  },
  {
    "locale": "en",
    "path": "/en/legal-warning/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/legal-warning/",
    "title": "Legal warning - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/en/legal-warning/",
    "alternates": {
      "es": "/aviso-legal/",
      "en": "/en/legal-warning/",
      "ca": "/ca/avis-legal/"
    },
    "bodyClass": "",
    "contentFile": "en-legal-warning.html",
    "group": "legal"
  },
  {
    "locale": "ca",
    "path": "/ca/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/",
    "title": "Vivus - Inmobiliaria",
    "description": "Inmobiliaria",
    "canonicalPath": "/ca/",
    "alternates": {
      "es": "/",
      "en": "/en/",
      "ca": "/ca/"
    },
    "bodyClass": "home",
    "contentFile": "ca-root.html",
    "group": "front"
  },
  {
    "locale": "ca",
    "path": "/ca/inici/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/inici/",
    "title": "Inici - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/ca/inici/",
    "alternates": {
      "es": "/inicio/",
      "en": "/en/home/",
      "ca": "/ca/inici/"
    },
    "bodyClass": "home",
    "contentFile": "ca-inici.html",
    "group": "home"
  },
  {
    "locale": "ca",
    "path": "/ca/coneix-nos/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/coneix-nos/",
    "title": "Coneix-nos - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/ca/coneix-nos/",
    "alternates": {
      "es": "/conocenos/",
      "en": "/en/about-us/",
      "ca": "/ca/coneix-nos/"
    },
    "bodyClass": "",
    "contentFile": "ca-coneix-nos.html",
    "group": "about"
  },
  {
    "locale": "ca",
    "path": "/ca/serveis/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/serveis/",
    "title": "Serveis - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/ca/serveis/",
    "alternates": {
      "es": "/servicios/",
      "en": "/en/services/",
      "ca": "/ca/serveis/"
    },
    "bodyClass": "",
    "contentFile": "ca-serveis.html",
    "group": "services"
  },
  {
    "locale": "ca",
    "path": "/ca/confiem-en/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/confiem-en/",
    "title": "Confiem en - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/ca/confiem-en/",
    "alternates": {
      "es": "/confiamos-en/",
      "en": "/en/we-trust/",
      "ca": "/ca/confiem-en/"
    },
    "bodyClass": "",
    "contentFile": "ca-confiem-en.html",
    "group": "trust"
  },
  {
    "locale": "ca",
    "path": "/ca/emprenedors/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/emprenedors/",
    "title": "Emprenedors - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/ca/emprenedors/",
    "alternates": {
      "es": "/emprendedores/",
      "en": "/en/entrepreneurs/",
      "ca": "/ca/emprenedors/"
    },
    "bodyClass": "",
    "contentFile": "ca-emprenedors.html",
    "group": "entrepreneurs"
  },
  {
    "locale": "ca",
    "path": "/ca/contacte/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/contacte/",
    "title": "Contacte - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/ca/contacte/",
    "alternates": {
      "es": "/contacto/",
      "en": "/en/contact/",
      "ca": "/ca/contacte/"
    },
    "bodyClass": "",
    "contentFile": "ca-contacte.html",
    "group": "contact"
  },
  {
    "locale": "ca",
    "path": "/ca/landing-ca/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/landing-ca/",
    "title": "Landing CA - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/ca/landing-ca/",
    "alternates": {
      "es": "/landing/",
      "en": "/en/landing-en/",
      "ca": "/ca/landing-ca/"
    },
    "bodyClass": "",
    "contentFile": "ca-landing-ca.html",
    "group": "landing"
  },
  {
    "locale": "ca",
    "path": "/ca/politica-de-cookies-2/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/politica-de-cookies-2/",
    "title": "Política de cookies - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/ca/politica-de-cookies-2/",
    "alternates": {
      "es": "/politica-de-cookies/",
      "en": "/en/cookies-policy/",
      "ca": "/ca/politica-de-cookies-2/"
    },
    "bodyClass": "",
    "contentFile": "ca-politica-de-cookies-2.html",
    "group": "cookies"
  },
  {
    "locale": "ca",
    "path": "/ca/politica-de-privacitat/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/politica-de-privacitat/",
    "title": "Política de privacitat - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/ca/politica-de-privacitat/",
    "alternates": {
      "es": "/politica-de-privacidad/",
      "en": "/en/privacy-policy/",
      "ca": "/ca/politica-de-privacitat/"
    },
    "bodyClass": "",
    "contentFile": "ca-politica-de-privacitat.html",
    "group": "privacy"
  },
  {
    "locale": "ca",
    "path": "/ca/avis-legal/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/avis-legal/",
    "title": "Avís legal - Vivus",
    "description": "Inmobiliaria",
    "canonicalPath": "/ca/avis-legal/",
    "alternates": {
      "es": "/aviso-legal/",
      "en": "/en/legal-warning/",
      "ca": "/ca/avis-legal/"
    },
    "bodyClass": "",
    "contentFile": "ca-avis-legal.html",
    "group": "legal"
  },
  {
    "locale": "es",
    "path": "/gracias/",
    "sourceUrl": "",
    "title": "Gracias - Vivus",
    "description": "Mensaje enviado correctamente.",
    "canonicalPath": "/gracias/",
    "alternates": {
      "es": "/gracias/",
      "en": "/en/thanks/",
      "ca": "/ca/gracies/"
    },
    "bodyClass": "",
    "contentFile": "es-gracias.html",
    "group": "thanks"
  },
  {
    "locale": "en",
    "path": "/en/thanks/",
    "sourceUrl": "",
    "title": "Thanks - Vivus",
    "description": "Message sent successfully.",
    "canonicalPath": "/en/thanks/",
    "alternates": {
      "es": "/gracias/",
      "en": "/en/thanks/",
      "ca": "/ca/gracies/"
    },
    "bodyClass": "",
    "contentFile": "en-thanks.html",
    "group": "thanks"
  },
  {
    "locale": "ca",
    "path": "/ca/gracies/",
    "sourceUrl": "",
    "title": "Gràcies - Vivus",
    "description": "Missatge enviat correctament.",
    "canonicalPath": "/ca/gracies/",
    "alternates": {
      "es": "/gracias/",
      "en": "/en/thanks/",
      "ca": "/ca/gracies/"
    },
    "bodyClass": "",
    "contentFile": "ca-gracies.html",
    "group": "thanks"
  }
] as const satisfies readonly MigratedRoute[];

export const routedPages = migratedRoutes;

export function normalizePath(pathname: string) {
  if (pathname === '') return '/';
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return clean.endsWith('/') ? clean : `${clean}/`;
}

export function routeForPath(pathname: string) {
  const path = normalizePath(pathname);
  return migratedRoutes.find((route) => route.path === path);
}
