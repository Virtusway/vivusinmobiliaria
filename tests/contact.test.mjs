import assert from 'node:assert/strict';
import test from 'node:test';
import nodemailer from 'nodemailer';
import { handleContactRequest } from '../src/lib/contact.ts';

function submission({ variant = 'contactForm', locale = 'es', changes = {}, json = true } = {}) {
  const prefix = variant.toLowerCase();
  const form = new FormData();
  for (const [key, value] of Object.entries({
    'form-name': `${variant}-${locale}`,
    locale,
    source_page: locale === 'es' ? '/contacto/' : `/${locale}/`,
    subject: 'Want to sell',
    [`${prefix}[name]`]: 'Test contact',
    [`${prefix}[email]`]: 'CONTACT@example.com',
    [`${prefix}[phone]`]: '600123456',
    [`${prefix}[terms]`]: 'Agree',
    [`${prefix}[age]`]: '35',
    [`${prefix}[location]`]: 'Sagunto',
    [`${prefix}[message]`]: '<script>alert("test")</script>\nA message',
    ...changes,
  }))
    form.set(key, value);
  return new Request('https://vivusinmobiliaria.com/api/contact/', {
    method: 'POST',
    headers: json ? { Accept: 'application/json' } : {},
    body: form,
  });
}

const successPaths = { es: '/gracias/', en: '/en/thanks/', ca: '/ca/gracies/' };
for (const variant of ['contactForm', 'tabForm', 'rrhhForm']) {
  for (const locale of ['es', 'en', 'ca']) {
    test(`${variant}-${locale} sends its fields before returning a localized success`, async () => {
      const sent = [];
      const transport = nodemailer.createTransport({ streamTransport: true, buffer: true });
      const response = await handleContactRequest({
        request: submission({ variant, locale }),
        sendMail: async (email) => {
          const result = await transport.sendMail({
            ...email,
            from: 'sender@example.com',
            to: 'crm@virtusway.com',
          });
          assert.ok(Buffer.isBuffer(result.message));
          assert.match(result.message.toString(), /Reply-To: contact@example.com/);
          assert.match(result.message.toString(), /Content-Type: text\/plain/);
          sent.push(email);
        },
      });
      assert.equal(sent.length, 1);
      assert.equal(sent[0].subject, '[Vivus] Want to sell');
      assert.ok(sent[0].text.includes(`Formulario: ${variant}-${locale}`));
      assert.ok(sent[0].text.includes('A message'));
      if (variant === 'rrhhForm') {
        assert.ok(sent[0].text.includes('Edad: 35'));
        assert.ok(sent[0].text.includes('Población: Sagunto'));
      }
      assert.equal(response.status, 200);
      assert.equal((await response.json()).redirect, successPaths[locale]);
    });
  }
}

for (const [label, changes] of [
  ['missing name', { 'contactform[name]': '' }],
  ['invalid email', { 'contactform[email]': 'invalid' }],
  ['missing phone', { 'contactform[phone]': '' }],
  ['unchecked terms', { 'contactform[terms]': '' }],
  ['unknown form', { 'form-name': 'unknown-es' }],
  ['unknown locale', { locale: 'unknown' }],
  ['subject header injection', { subject: 'Hello\r\nBcc: other@example.com' }],
  ['oversized message', { 'contactform[message]': 'a'.repeat(10001) }],
]) {
  test(`${label} is rejected without sending email`, async () => {
    const response = await handleContactRequest({
      request: submission({ changes }),
      sendMail: async () => assert.fail('Invalid submissions must not send email'),
    });
    assert.equal(response.status, 400);
    assert.equal((await response.json()).redirect, undefined);
  });
}

test('recruitment requires age and location', async () => {
  for (const field of ['age', 'location']) {
    const response = await handleContactRequest({
      request: submission({ variant: 'rrhhForm', changes: { [`rrhhform[${field}]`]: '' } }),
      sendMail: async () => assert.fail('Incomplete recruitment must not send email'),
    });
    assert.equal(response.status, 400);
  }
});

test('SMTP failure does not claim success or redirect', async () => {
  const response = await handleContactRequest({
    request: submission({ locale: 'en' }),
    sendMail: async () => {
      throw new Error('SMTP rejected');
    },
  });
  assert.equal(response.status, 500);
  const payload = await response.json();
  assert.match(payload.message, /could not be sent/);
  assert.equal(payload.redirect, undefined);
});

test('honeypot returns success without sending email', async () => {
  const response = await handleContactRequest({
    request: submission({ changes: { 'bot-field': 'bot' } }),
    sendMail: async () => assert.fail('Honeypots must not send email'),
  });
  assert.equal(response.status, 200);
});

test('native submissions redirect only after email sends', async () => {
  for (const locale of ['es', 'en', 'ca']) {
    let sent = false;
    const response = await handleContactRequest({
      request: submission({ locale, json: false }),
      sendMail: async () => {
        sent = true;
      },
    });
    assert.equal(sent, true);
    assert.equal(response.status, 303);
    assert.equal(response.headers.get('location'), successPaths[locale]);
  }
});

test('native SMTP errors render an error page instead of a thank-you page', async () => {
  const response = await handleContactRequest({
    request: submission({ json: false }),
    sendMail: async () => {
      throw new Error('SMTP unavailable');
    },
  });
  assert.equal(response.status, 500);
  assert.equal(response.headers.get('location'), null);
  assert.match(await response.text(), /No se pudo enviar/);
});

test('malformed bodies fail without sending email', async () => {
  const response = await handleContactRequest({
    request: new Request('https://vivusinmobiliaria.com/api/contact/', {
      method: 'POST',
      body: 'not form data',
    }),
    sendMail: async () => assert.fail('Malformed requests must not send email'),
  });
  assert.equal(response.status, 400);
});
