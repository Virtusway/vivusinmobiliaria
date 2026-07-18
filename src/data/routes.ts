export const SITE_URL = 'https://vivusinmobiliaria.com';

export const locales = ['es', 'en', 'ca'] as const;
export type Locale = (typeof locales)[number];

export type MigratedRoute = {
  locale: Locale;
  path: string;
  sourceUrl: string;
  title: string;
  description: string;
  alternates: Partial<Record<Locale, string>>;
  bodyClass: string;
  contentFile: string;
  group: string;
  noindex?: boolean;
};

export const migratedRoutes = [
  {
    "locale": "es",
    "path": "/",
    "sourceUrl": "https://vivusinmobiliaria.com/",
    "title": "Vivus - Inmobiliaria",
    "description": "Agencia inmobiliaria en la Comunidad Valenciana. Te ayudamos a comprar, vender o alquilar tu vivienda con un servicio integral y de confianza.",
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
    "path": "/conocenos/",
    "sourceUrl": "https://vivusinmobiliaria.com/conocenos/",
    "title": "Conócenos - Vivus",
    "description": "Somos una agencia de intermediación inmobiliaria que trabaja para maximizar los resultados al comprar, vender o alquilar tu propiedad.",
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
    "description": "Trabajamos de forma holística y coordinada para ofrecerte un servicio inmobiliario integral, de principio a fin.",
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
    "description": "Empresas de confianza para el mantenimiento y mejora de tu vivienda, recomendadas por Vivus Inmobiliaria.",
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
    "description": "Únete al equipo de Vivus y desarrolla tu carrera profesional en el sector inmobiliario.",
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
    "description": "Contacta con Vivus Inmobiliaria. Resolvemos tus dudas sobre comprar, vender o alquilar tu vivienda.",
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
    "description": "Propiedades en Canet d'En Berenguer y Puerto de Sagunto. Descubre las oportunidades inmobiliarias de la costa valenciana.",
    "alternates": {
      "es": "/landing/",
      "en": "/en/landing-en/",
      "ca": "/ca/landing-ca/"
    },
    "bodyClass": "",
    "contentFile": "es-landing.html",
    "group": "landing",
    "noindex": true
  },
  {
    "locale": "es",
    "path": "/politica-de-cookies/",
    "sourceUrl": "https://vivusinmobiliaria.com/politica-de-cookies/",
    "title": "Política de cookies - Vivus",
    "description": "Política de cookies de Vivus Inmobiliaria: qué cookies utilizamos y cómo puedes gestionarlas.",
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
    "description": "Aviso legal de Vivus Inmobiliaria: información legal y condiciones de uso del sitio web.",
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
    "description": "Política de privacidad de Vivus Inmobiliaria: cómo tratamos y protegemos tus datos personales.",
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
    "title": "Vivus - Real Estate",
    "description": "Real estate agency in the Valencian Community. We help you buy, sell or rent your home with a comprehensive, trustworthy service.",
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
    "path": "/en/about-us/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/about-us/",
    "title": "About Us - Vivus",
    "description": "We are a real estate intermediation agency working to maximise the results you get when buying, selling or renting.",
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
    "description": "We work holistically and in a coordinated way to offer you a comprehensive real estate service.",
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
    "description": "Trusted companies for the upkeep and improvement of your home, recommended by Vivus Real Estate.",
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
    "description": "Join the Vivus team and grow your professional career in the real estate sector.",
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
    "description": "Get in touch with Vivus Real Estate. We answer your questions about buying, selling or renting your home.",
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
    "description": "Properties in Canet d'En Berenguer and Puerto de Sagunto. Discover real estate opportunities on the Valencian coast.",
    "alternates": {
      "es": "/landing/",
      "en": "/en/landing-en/",
      "ca": "/ca/landing-ca/"
    },
    "bodyClass": "",
    "contentFile": "en-landing-en.html",
    "group": "landing",
    "noindex": true
  },
  {
    "locale": "en",
    "path": "/en/cookies-policy/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/cookies-policy/",
    "title": "Cookies policy - Vivus",
    "description": "Vivus Real Estate cookies policy: which cookies we use and how you can manage them.",
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
    "description": "Vivus Real Estate privacy policy: how we process and protect your personal data.",
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
    "description": "Vivus Real Estate legal notice: legal information and terms of use for this website.",
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
    "title": "Vivus - Immobiliària",
    "description": "Agència immobiliària a la Comunitat Valenciana. T'ajudem a comprar, vendre o llogar el teu habitatge amb un servei integral i de confiança.",
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
    "path": "/ca/coneix-nos/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/coneix-nos/",
    "title": "Coneix-nos - Vivus",
    "description": "Som una agència d'intermediació immobiliària que treballa per maximitzar els resultats en comprar, vendre o llogar la teva propietat.",
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
    "description": "Treballem de forma holística i coordinada per oferir-te un servei immobiliari integral.",
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
    "description": "Empreses de confiança per al manteniment i la millora del teu habitatge, recomanades per Vivus Immobiliària.",
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
    "description": "Uneix-te a l'equip de Vivus i desenvolupa la teva carrera professional en el sector immobiliari.",
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
    "description": "Contacta amb Vivus Immobiliària. Resolem els teus dubtes sobre comprar, vendre o llogar el teu habitatge.",
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
    "description": "Propietats a Canet d'En Berenguer i el Port de Sagunt. Descobreix les oportunitats immobiliàries de la costa valenciana.",
    "alternates": {
      "es": "/landing/",
      "en": "/en/landing-en/",
      "ca": "/ca/landing-ca/"
    },
    "bodyClass": "",
    "contentFile": "ca-landing-ca.html",
    "group": "landing",
    "noindex": true
  },
  {
    "locale": "ca",
    "path": "/ca/politica-de-cookies-2/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/politica-de-cookies-2/",
    "title": "Política de cookies - Vivus",
    "description": "Política de cookies de Vivus Immobiliària: quines cookies utilitzem i com les pots gestionar.",
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
    "description": "Política de privacitat de Vivus Immobiliària: com tractem i protegim les teves dades personals.",
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
    "description": "Avís legal de Vivus Immobiliària: informació legal i condicions d'ús del lloc web.",
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
    "path": "/guia-de-inversion-y-estilo-de-vida/",
    "sourceUrl": "https://vivusinmobiliaria.com/guia-de-inversion-y-estilo-de-vida/",
    "title": "Guía de Inversión y Estilo de Vida - Vivus",
    "description": "Guía de inversión y estilo de vida en el corredor costero: calidad de vida y oportunidades para invertir.",
    "alternates": {
      "es": "/guia-de-inversion-y-estilo-de-vida/",
      "en": "/en/investment-and-lifestyle-guide/",
      "ca": "/ca/guia-dinversio-i-estil-de-vida/"
    },
    "bodyClass": "",
    "contentFile": "es-guia-de-inversion-y-estilo-de-vida.html",
    "group": "lifestyle-guide"
  },
  {
    "locale": "es",
    "path": "/servicios-inmobiliarios-360/",
    "sourceUrl": "https://vivusinmobiliaria.com/servicios-inmobiliarios-360/",
    "title": "Servicios Inmobiliarios 360º - Vivus",
    "description": "Servicios inmobiliarios 360º: acompañamos todo el proceso de compraventa para que tu éxito sea nuestra meta.",
    "alternates": {
      "es": "/servicios-inmobiliarios-360/",
      "en": "/en/360o-real-estate-services/",
      "ca": "/ca/serveis-immobiliaris-360/"
    },
    "bodyClass": "",
    "contentFile": "es-servicios-inmobiliarios-360.html",
    "group": "services-360"
  },
  {
    "locale": "es",
    "path": "/accesibilidad/",
    "sourceUrl": "https://vivusinmobiliaria.com/accesibilidad/",
    "title": "Accesibilidad - Vivus",
    "description": "Declaración de accesibilidad web",
    "alternates": {
      "es": "/accesibilidad/",
      "en": "/en/accesibilidad/"
    },
    "bodyClass": "",
    "contentFile": "es-accesibilidad.html",
    "group": "accessibility"
  },
  {
    "locale": "en",
    "path": "/en/investment-and-lifestyle-guide/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/investment-and-lifestyle-guide/",
    "title": "Investment and Lifestyle Guide - Vivus",
    "description": "Investment and lifestyle guide to the coastal corridor: quality of life and opportunities to invest.",
    "alternates": {
      "es": "/guia-de-inversion-y-estilo-de-vida/",
      "en": "/en/investment-and-lifestyle-guide/",
      "ca": "/ca/guia-dinversio-i-estil-de-vida/"
    },
    "bodyClass": "",
    "contentFile": "en-investment-and-lifestyle-guide.html",
    "group": "lifestyle-guide"
  },
  {
    "locale": "en",
    "path": "/en/360o-real-estate-services/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/360o-real-estate-services/",
    "title": "360º Real Estate Services - Vivus",
    "description": "360º real estate services: we support the whole buying and selling process because your success is our goal.",
    "alternates": {
      "es": "/servicios-inmobiliarios-360/",
      "en": "/en/360o-real-estate-services/",
      "ca": "/ca/serveis-immobiliaris-360/"
    },
    "bodyClass": "",
    "contentFile": "en-360o-real-estate-services.html",
    "group": "services-360"
  },
  {
    "locale": "en",
    "path": "/en/accesibilidad/",
    "sourceUrl": "https://vivusinmobiliaria.com/en/accesibilidad/",
    "title": "Accesibilidad - Vivus",
    "description": "Web accessibility statement",
    "alternates": {
      "es": "/accesibilidad/",
      "en": "/en/accesibilidad/"
    },
    "bodyClass": "",
    "contentFile": "en-accesibilidad.html",
    "group": "accessibility"
  },
  {
    "locale": "ca",
    "path": "/ca/guia-dinversio-i-estil-de-vida/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/guia-dinversio-i-estil-de-vida/",
    "title": "Guia d'Inversió i Estil de Vida - Vivus",
    "description": "Guia d'inversió i estil de vida al corredor costaner: qualitat de vida i oportunitats per invertir.",
    "alternates": {
      "es": "/guia-de-inversion-y-estilo-de-vida/",
      "en": "/en/investment-and-lifestyle-guide/",
      "ca": "/ca/guia-dinversio-i-estil-de-vida/"
    },
    "bodyClass": "",
    "contentFile": "ca-guia-dinversio-i-estil-de-vida.html",
    "group": "lifestyle-guide"
  },
  {
    "locale": "ca",
    "path": "/ca/serveis-immobiliaris-360/",
    "sourceUrl": "https://vivusinmobiliaria.com/ca/serveis-immobiliaris-360/",
    "title": "Serveis Immobiliaris 360 º - Vivus",
    "description": "Serveis immobiliaris 360º: acompanyem tot el procés de compravenda perquè el teu èxit sigui la nostra meta.",
    "alternates": {
      "es": "/servicios-inmobiliarios-360/",
      "en": "/en/360o-real-estate-services/",
      "ca": "/ca/serveis-immobiliaris-360/"
    },
    "bodyClass": "",
    "contentFile": "ca-serveis-immobiliaris-360.html",
    "group": "services-360"
  },
  {
    "locale": "es",
    "path": "/gracias/",
    "sourceUrl": "",
    "title": "Gracias - Vivus",
    "description": "Mensaje enviado correctamente.",
    "alternates": {
      "es": "/gracias/",
      "en": "/en/thanks/",
      "ca": "/ca/gracies/"
    },
    "bodyClass": "",
    "contentFile": "es-gracias.html",
    "group": "thanks",
    "noindex": true
  },
  {
    "locale": "en",
    "path": "/en/thanks/",
    "sourceUrl": "",
    "title": "Thanks - Vivus",
    "description": "Message sent successfully.",
    "alternates": {
      "es": "/gracias/",
      "en": "/en/thanks/",
      "ca": "/ca/gracies/"
    },
    "bodyClass": "",
    "contentFile": "en-thanks.html",
    "group": "thanks",
    "noindex": true
  },
  {
    "locale": "ca",
    "path": "/ca/gracies/",
    "sourceUrl": "",
    "title": "Gràcies - Vivus",
    "description": "Missatge enviat correctament.",
    "alternates": {
      "es": "/gracias/",
      "en": "/en/thanks/",
      "ca": "/ca/gracies/"
    },
    "bodyClass": "",
    "contentFile": "ca-gracies.html",
    "group": "thanks",
    "noindex": true
  }
] as const satisfies readonly MigratedRoute[];

export function normalizePath(pathname: string) {
  if (pathname === '') return '/';
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return clean.endsWith('/') ? clean : `${clean}/`;
}

export function routeForPath(pathname: string) {
  const path = normalizePath(pathname);
  return migratedRoutes.find((route) => route.path === path);
}
