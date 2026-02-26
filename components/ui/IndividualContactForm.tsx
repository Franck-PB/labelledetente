'use client'

import { useActionState, useRef } from 'react'
import { FormField } from './FormField'
import { Button } from './Button'
import { Eyebrow, Heading, Body } from './Typography'
import { submitIndividualContact } from '@/app/contact/actions'
import type { FormState } from '@/lib/contact-schemas'

/* ============================================================
   IndividualContactForm — La Belle Détente
   Contact form for individual (non-professional) inquiries.
   Uses React 19 useActionState + Server Action.
   Anti-spam: honeypot (_hp) + submit timestamp (_t).
   ============================================================ */

const initialState: FormState = { status: 'idle' }

const IndividualContactForm = () => {
  const [state, action, isPending] = useActionState(submitIndividualContact, initialState)
  // Set once at render time — no useEffect needed
  const tsRef = useRef(String(Date.now()))

  if (state.status === 'success') {
    return (
      <div className="py-12 text-center">
        <Eyebrow className="mb-4">Message envoyé</Eyebrow>
        <Heading level={3} italic className="mb-4">
          Merci, nous avons bien reçu votre message.
        </Heading>
        <Body muted>
          Nous vous répondrons dans les meilleurs délais, généralement sous 24h.
        </Body>
      </div>
    )
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      {/* Hidden timestamp for anti-spam */}
      <input type="hidden" name="_t" value={tsRef.current} />

      {/* Honeypot — hidden from users, visible to bots */}
      <div
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      >
        <FormField label="Ne pas remplir" name="_hp" type="text" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Nom"
          name="name"
          type="text"
          required
          placeholder="Votre nom"
          error={state.fieldErrors?.name?.[0]}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          required
          placeholder="votre@email.fr"
          error={state.fieldErrors?.email?.[0]}
        />
      </div>

      <FormField
        label="Téléphone"
        name="phone"
        type="tel"
        placeholder="06 12 34 56 78"
        error={state.fieldErrors?.phone?.[0]}
      />

      <FormField
        label="Adresse"
        name="address"
        type="text"
        placeholder="15 rue des Alpes"
        error={state.fieldErrors?.address?.[0]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Code postal"
          name="postalCode"
          type="text"
          placeholder="73000"
          error={state.fieldErrors?.postalCode?.[0]}
        />
        <FormField
          label="Ville"
          name="city"
          type="text"
          placeholder="Chambéry"
          error={state.fieldErrors?.city?.[0]}
        />
      </div>

      <FormField
        label="Message"
        name="message"
        type="textarea"
        required
        rows={5}
        placeholder="Décrivez votre demande…"
        error={state.fieldErrors?.message?.[0]}
      />

      {state.status === 'error' && state.message && (
        <div role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-[var(--radius-md)] px-4 py-3">
          {state.message}
        </div>
      )}

      <div className="flex justify-end pt-2">
        <Button
          variant="primary"
          size="lg"
          disabled={isPending}
          type="submit"
        >
          {isPending ? 'Envoi en cours…' : 'Envoyer'}
        </Button>
      </div>
    </form>
  )
}

IndividualContactForm.displayName = 'IndividualContactForm'

export { IndividualContactForm }
