export type FormVariant = 'contactForm' | 'tabForm' | 'rrhhForm';

export const formMessages = {
  es: {
    pending: 'Enviando...',
    success: 'Hemos recibido tu mensaje.',
    failed: 'No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.',
    invalid: 'Revisa los campos obligatorios y acepta los términos y condiciones.',
    back: 'Volver al formulario',
    successPath: '/gracias/',
  },
  en: {
    pending: 'Sending...',
    success: 'We have received your message.',
    failed: 'Your message could not be sent. Please try again in a few minutes.',
    invalid: 'Check the required fields and accept the terms and conditions.',
    back: 'Return to the form',
    successPath: '/en/thanks/',
  },
  ca: {
    pending: 'Enviant...',
    success: 'Hem rebut el teu missatge.',
    failed: 'No s’ha pogut enviar el missatge. Torna-ho a provar d’aquí a uns minuts.',
    invalid: 'Revisa els camps obligatoris i accepta els termes i condicions.',
    back: 'Torna al formulari',
    successPath: '/ca/gracies/',
  },
};
