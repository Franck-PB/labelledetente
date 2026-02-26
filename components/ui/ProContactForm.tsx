'use client'

import { useActionState, useRef } from 'react'
import { FormField } from './FormField'
import { Button } from './Button'
import { Eyebrow, Heading, Body } from './Typography'
import { submitProContact } from '@/app/contact/actions'
import { ESTABLISHMENT_TYPES } from '@/lib/contact-schemas'
import type { FormState } from '@/lib/contact-schemas'

/* ============================================================
   ProContactForm — La Belle Détente
   Contact form for professional partnership inquiries.
   Uses React 19 useActionState + Server Action.
   Anti-spam: honeypot (_hp) + submit timestamp (_t).
   ============================================================ */

const initialState: FormState = { status: 'idle' }

const ProContactForm = () => {
  const [state, action, isPending] = useActionState(submitProContact, initialState)
  const tsRef = useRef(String(Date.now()))

  if (state.status === 'success') {
    return (
      <div className="py-12 text-center">
        <Eyebrow className="mb-4">Demande reçue</Eyebrow>
        <Heading level={3} italic className="mb-4">
          Merci pour votre intérêt.
        </Heading>
        <Body muted>
          Nous étudions votre demande de partenariat et vous recontactons sous 48h
          pour discuter de votre projet.
        </Body>
      </div>
    )
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      {/* Hidden timestamp for anti-spam */}
      <input type="hidden" name="_t" value={tsRef.current} />

      {/* Honeypot */}
      <div
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      >
        <FormField label="Ne pas remplir" name="_hp" type="text" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Nom du contact"
          name="name"
          type="text"
          required
          placeholder="Prénom Nom"
          error={state.fieldErrors?.name?.[0]}
        />
        <FormField
          label="Poste / Fonction"
          name="role"
          type="text"
          required
          placeholder="Directrice, Responsable bien-être…"
          error={state.fieldErrors?.role?.[0]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Nom de l'établissement"
          name="establishment"
          type="text"
          required
          placeholder="Hôtel Belvédère, Résidence Les Arcs…"
          error={state.fieldErrors?.establishment?.[0]}
        />
        <FormField
          label="Type d'établissement"
          name="type"
          type="select"
          required
          placeholder="Sélectionner…"
          options={[...ESTABLISHMENT_TYPES]}
          error={state.fieldErrors?.type?.[0]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Email"
          name="email"
          type="email"
          required
          placeholder="contact@etablissement.fr"
          error={state.fieldErrors?.email?.[0]}
        />
        <FormField
          label="Téléphone"
          name="phone"
          type="tel"
          required
          placeholder="04 79 00 00 00"
          error={state.fieldErrors?.phone?.[0]}
        />
      </div>

      <FormField
        label="Message (facultatif)"
        name="message"
        type="textarea"
        rows={4}
        placeholder="Décrivez votre projet, vos besoins, la période envisagée…"
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
          {isPending ? 'Envoi en cours…' : 'Envoyer la demande'}
        </Button>
      </div>
    </form>
  )
}

ProContactForm.displayName = 'ProContactForm'

export { ProContactForm }
