export const prerender = false;

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const botField = data.get('bot-field');
  if (botField) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const nome = data.get('nome')?.toString().trim() ?? '';
  const email = data.get('email')?.toString().trim() ?? '';
  const telefone = data.get('telefone')?.toString().trim() ?? '';
  const mensagem = data.get('mensagem')?.toString().trim() ?? '';
  const privacidade = data.get('privacidade')?.toString() ?? '';

  if (!nome || !email || !telefone || !mensagem || privacidade !== 'aceito') {
    return new Response(JSON.stringify({ ok: false, error: 'Campos obrigatórios ausentes.' }), {
      status: 400,
    });
  }

  const transporter = nodemailer.createTransport({
    host: import.meta.env.SMTP_HOST,
    port: Number(import.meta.env.SMTP_PORT ?? 587),
    secure: import.meta.env.SMTP_SECURE === 'true',
    auth: {
      user: import.meta.env.SMTP_USER,
      pass: import.meta.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: import.meta.env.SMTP_FROM,
      to: import.meta.env.CONTACT_EMAIL ?? 'comercial@sixtech.com.br',
      replyTo: `${nome} <${email}>`,
      subject: `Novo contato via site — ${nome}`,
      text: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\n\nMensagem:\n${mensagem}`,
      html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <hr>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, '<br>')}</p>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('[api/contato] Erro ao enviar e-mail:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'Falha ao enviar e-mail. Tente novamente.' }),
      { status: 500 }
    );
  }
};

export const ALL: APIRoute = () =>
  new Response(null, { status: 405, headers: { Allow: 'POST' } });
