import { z } from 'zod'

/* ============================================================
   Contact Form Schemas — La Belle Détente
   Validates individual and professional inquiry form data.
   Anti-spam: honeypot (_hp) + timestamp (_t).
   ============================================================ */

export const ESTABLISHMENT_TYPES = [
  { value: 'hotel', label: 'Hôtel' },
  { value: 'residence', label: 'Résidence de vacances' },
  { value: 'ehpad', label: 'EHPAD / Maison de retraite' },
  { value: 'other', label: 'Autre établissement' },
] as const

export type EstablishmentType = (typeof ESTABLISHMENT_TYPES)[number]['value']

export const individualContactSchema = z.object({
  name: z.string().min(2, 'Veuillez indiquer votre nom (min. 2 caractères)'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().max(20, 'Numéro trop long').optional().or(z.literal('')),
  address: z.string().max(200, 'Adresse trop longue').optional().or(z.literal('')),
  postalCode: z.string().max(10, 'Code postal invalide').optional().or(z.literal('')),
  city: z.string().max(100, 'Ville trop longue').optional().or(z.literal('')),
  message: z
    .string()
    .min(10, 'Votre message doit faire au moins 10 caractères')
    .max(1000, 'Message trop long (max. 1000 caractères)'),
  _hp: z.string().max(0, 'Formulaire invalide'),
  _t: z.string(),
})

export const proContactSchema = z.object({
  name: z.string().min(2, 'Veuillez indiquer votre nom (min. 2 caractères)'),
  role: z.string().min(1, 'Veuillez indiquer votre poste'),
  establishment: z.string().min(1, "Veuillez indiquer le nom de l'établissement"),
  type: z.enum(['hotel', 'residence', 'ehpad', 'other'] as const, {
    error: "Veuillez sélectionner le type d'établissement",
  }),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone requis (min. 8 caractères)'),
  message: z
    .string()
    .max(1000, 'Message trop long (max. 1000 caractères)')
    .optional()
    .or(z.literal('')),
  _hp: z.string().max(0, 'Formulaire invalide'),
  _t: z.string(),
})

export type FormState = {
  status: 'idle' | 'success' | 'error'
  fieldErrors?: Record<string, string[]>
  message?: string
}
