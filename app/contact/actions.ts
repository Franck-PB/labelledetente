'use server'

import { Resend } from 'resend'
import {
  individualContactSchema,
  proContactSchema,
  type FormState,
  ESTABLISHMENT_TYPES,
} from '@/lib/contact-schemas'

/* ============================================================
   Server Actions — Contact Forms — La Belle Détente
   Validates, anti-spam checks, sends email via Resend.
   ============================================================ */

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  return new Resend(key)
}

function getFromAddress(): string {
  return process.env.RESEND_FROM ?? 'La Belle Détente <contact@labelledetente.fr>'
}

function getContactEmail(): string {
  const email = process.env.CONTACT_EMAIL
  if (!email) throw new Error('CONTACT_EMAIL is not set')
  return email
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function checkTimestamp(ts: string): boolean {
  const sent = parseInt(ts, 10)
  if (isNaN(sent)) return false
  const elapsed = (Date.now() - sent) / 1000
  return elapsed >= 3 && elapsed <= 3600
}

const emailStyles = {
  container: 'font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f8f3ea; padding: 0;',
  header: 'background: #2c1e12; padding: 24px 32px;',
  headerText: 'color: #f8f3ea; font-size: 18px; font-style: italic; margin: 0;',
  body: 'padding: 32px;',
  table: 'width: 100%; border-collapse: collapse;',
  labelCell: 'padding: 10px 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #6b5744; white-space: nowrap; border-bottom: 1px solid #e5dbc8; vertical-align: top; width: 160px;',
  valueCell: 'padding: 10px 12px; font-size: 14px; color: #2c1e12; border-bottom: 1px solid #e5dbc8; vertical-align: top;',
  footer: 'padding: 16px 32px; border-top: 1px solid #e5dbc8; font-size: 12px; color: #9a8070; text-align: center;',
}

function buildRow(label: string, value: string): string {
  return `<tr>
    <td style="${emailStyles.labelCell}">${label}</td>
    <td style="${emailStyles.valueCell}">${escapeHtml(value)}</td>
  </tr>`
}

function buildEmailHtml(subject: string, rows: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:16px;background:#ede8e0;">
  <div style="${emailStyles.container}">
    <div style="${emailStyles.header}">
      <p style="${emailStyles.headerText}">La Belle Détente — ${escapeHtml(subject)}</p>
    </div>
    <div style="${emailStyles.body}">
      <table style="${emailStyles.table}">
        ${rows}
      </table>
    </div>
    <div style="${emailStyles.footer}">Message reçu via le formulaire de contact · labelledetente.fr</div>
  </div>
</body>
</html>`
}

/* ---- Individual contact ------------------------------------------ */

export async function submitIndividualContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries())
  const result = individualContactSchema.safeParse(raw)

  if (!result.success) {
    return {
      status: 'error',
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const { name, email, phone, message, address, postalCode, city, _t } = result.data

  if (!checkTimestamp(_t)) {
    return {
      status: 'error',
      message: 'Délai de soumission invalide. Veuillez actualiser la page et réessayer.',
    }
  }

  const rows = [
    buildRow('Nom', name),
    buildRow('Email', email),
    phone ? buildRow('Téléphone', phone) : '',
    address ? buildRow('Adresse', address) : '',
    postalCode && city ? buildRow('Ville', `${postalCode} ${city}`) : postalCode ? buildRow('Code postal', postalCode) : city ? buildRow('Ville', city) : '',
    buildRow('Message', message.replace(/\n/g, '<br>')),
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const resend = getResend()
    await resend.emails.send({
      from: getFromAddress(),
      to: getContactEmail(),
      replyTo: email,
      subject: `[Contact] ${name}`,
      html: buildEmailHtml(`[Contact] ${name}`, rows),
    })
    return { status: 'success' }
  } catch {
    return {
      status: 'error',
      message:
        "Une erreur est survenue lors de l'envoi. Veuillez nous contacter directement par téléphone.",
    }
  }
}

/* ---- Professional contact ---------------------------------------- */

export async function submitProContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries())
  const result = proContactSchema.safeParse(raw)

  if (!result.success) {
    return {
      status: 'error',
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const { name, role, establishment, type, email, phone, message, _t } = result.data

  if (!checkTimestamp(_t)) {
    return {
      status: 'error',
      message: 'Délai de soumission invalide. Veuillez actualiser la page et réessayer.',
    }
  }

  const typeLabel =
    ESTABLISHMENT_TYPES.find((t) => t.value === type)?.label ?? type

  const rows = [
    buildRow('Nom', name),
    buildRow('Poste', role),
    buildRow('Établissement', establishment),
    buildRow('Type', typeLabel),
    buildRow('Email', email),
    buildRow('Téléphone', phone),
    message ? buildRow('Message', message.replace(/\n/g, '<br>')) : '',
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const resend = getResend()
    await resend.emails.send({
      from: getFromAddress(),
      to: getContactEmail(),
      replyTo: email,
      subject: `[Pro] ${establishment} — ${typeLabel}`,
      html: buildEmailHtml(`[Pro] ${establishment}`, rows),
    })
    return { status: 'success' }
  } catch {
    return {
      status: 'error',
      message:
        "Une erreur est survenue lors de l'envoi. Veuillez nous contacter directement par téléphone.",
    }
  }
}
