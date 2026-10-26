import { formMessages, type FormVariant } from '../data/forms.ts';

export type ContactEmail = {
  replyTo: string;
  subject: string;
  text: string;
};

function readField(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

export async function handleContactRequest({
  request,
  sendMail,
}: {
  request: Request;
  sendMail: (email: ContactEmail) => Promise<void>;
}): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ message: formMessages.es.invalid }, { status: 400 });
  }

  const requestedLocale = readField(form, 'locale');
  const locale = requestedLocale === 'en' || requestedLocale === 'ca' ? requestedLocale : 'es';
  const copy = formMessages[locale];
  const acceptsJson = request.headers.get('accept')?.includes('application/json');
  const respond = (message: string, status: number) => {
    const headers = { 'Cache-Control': 'no-store' };
    if (acceptsJson) {
      return Response.json(
        { message, ...(status < 400 ? { redirect: copy.successPath } : {}) },
        { status, headers },
      );
    }
    if (status < 400) {
      return new Response(null, {
        status: 303,
        headers: { ...headers, Location: copy.successPath },
      });
    }
    const home = locale === 'es' ? '/' : `/${locale}/`;
    return new Response(
      `<!doctype html><html lang="${locale}"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${message}</title><body><p>${message}</p><a href="${home}">${copy.back}</a></body></html>`,
      { status, headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } },
    );
  };

  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return respond(copy.invalid, 403);

  // Match the reference site's honeypot behavior without sending email.
  if (readField(form, 'bot-field')) return respond(copy.success, 200);

  const formName = readField(form, 'form-name');
  let variant: FormVariant;
  if (formName === `contactForm-${locale}`) variant = 'contactForm';
  else if (formName === `tabForm-${locale}`) variant = 'tabForm';
  else if (formName === `rrhhForm-${locale}`) variant = 'rrhhForm';
  else return respond(copy.invalid, 400);
  if (requestedLocale !== locale) return respond(copy.invalid, 400);

  const prefix = variant.toLowerCase();
  const name = readField(form, `${prefix}[name]`);
  const email = readField(form, `${prefix}[email]`).toLowerCase();
  const phone = readField(form, `${prefix}[phone]`);
  const terms = readField(form, `${prefix}[terms]`);
  const age = readField(form, `${prefix}[age]`);
  const location = readField(form, `${prefix}[location]`);
  const message = readField(form, `${prefix}[message]`);
  const subject = readField(form, 'subject');
  const source = readField(form, 'source_page');

  if (
    !name ||
    name.length > 200 ||
    !phone ||
    phone.length > 60 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    terms !== 'Agree' ||
    (variant === 'rrhhForm' && (!age || !location)) ||
    age.length > 20 ||
    location.length > 200 ||
    message.length > 10000 ||
    subject.length > 200 ||
    /[\r\n]/.test(subject) ||
    !source.startsWith('/') ||
    source.startsWith('//') ||
    source.length > 2048 ||
    /[\r\n]/.test(source)
  )
    return respond(copy.invalid, 400);

  const text = [
    `Formulario: ${formName}`,
    `Idioma: ${locale}`,
    `Página: ${source}`,
    `Asunto: ${subject}`,
    '',
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Teléfono: ${phone}`,
    ...(variant === 'rrhhForm' ? [`Edad: ${age}`, `Población: ${location}`] : []),
    'Términos y condiciones: aceptados',
    '',
    `Mensaje:\n${message}`,
  ].join('\n');

  try {
    await sendMail({
      replyTo: email,
      subject: `[Vivus] ${subject || (variant === 'rrhhForm' ? 'Nuevo contacto de emprendedores' : 'Nuevo contacto web')}`,
      text,
    });
    return respond(copy.success, 200);
  } catch (error) {
    // Do not log submitted personal data or SMTP credentials.
    console.error('Contact email delivery failed.', {
      form: formName,
      error: error instanceof Error ? error.name : 'UnknownError',
    });
    return respond(copy.failed, 500);
  }
}
