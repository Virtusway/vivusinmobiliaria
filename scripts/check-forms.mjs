import assert from 'node:assert/strict';

const base = process.env.FORMS_TEST_URL ?? 'http://localhost:4321';
const headers = { Accept: 'application/json', Origin: new URL(base).origin };
const successPaths = { es: '/gracias/', en: '/en/thanks/', ca: '/ca/gracies/' };
for (const variant of ['contactForm', 'tabForm', 'rrhhForm']) {
  for (const locale of ['es', 'en', 'ca']) {
    const body = { 'form-name': `${variant}-${locale}`, locale };
    const response = await fetch(new URL('/api/contact/', base), {
      method: 'POST', headers, body: new URLSearchParams(body),
    });
    assert.equal(response.status, 400, `${variant}-${locale} must reject missing required fields`);
    assert.match(response.headers.get('content-type') ?? '', /application\/json/);
    assert.equal(typeof (await response.json()).message, 'string');

    // Exercise success responses safely without sending external email.
    const honeypot = await fetch(new URL('/api/contact/', base), {
      method: 'POST', headers, body: new URLSearchParams({ ...body, 'bot-field': 'bot' }),
    });
    assert.equal(honeypot.status, 200);
    assert.equal((await honeypot.json()).redirect, successPaths[locale]);

    const native = await fetch(new URL('/api/contact/', base), {
      method: 'POST', redirect: 'manual',
      headers: { Origin: headers.Origin },
      body: new URLSearchParams({ ...body, 'bot-field': 'bot' }),
    });
    assert.equal(native.status, 303);
    assert.equal(native.headers.get('location'), successPaths[locale]);
  }
}
console.info('All nine form/language combinations pass API validation, honeypot and native redirect checks. No external email sent.');
