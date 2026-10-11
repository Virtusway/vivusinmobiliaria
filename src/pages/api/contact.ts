import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import nodemailer from 'nodemailer';
import { handleContactRequest } from '../../lib/contact';

export const prerender = false;

export const POST: APIRoute = ({ request }) => handleContactRequest({
  request,
  sendMail: async (email) => {
    const user = getSecret('EMAIL_USER');
    const pass = getSecret('EMAIL_PASS');
    if (!user || !pass) throw new Error('Missing email configuration');

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
    const result = await transporter.sendMail({
      ...email,
      from: { name: 'Vivus Inmobiliaria', address: user },
      to: getSecret('EMAIL_TO') || 'crm@virtusway.com',
    });
    if (!result.accepted.length || result.rejected.length) {
      throw new Error('Email recipient rejected');
    }
  },
});
