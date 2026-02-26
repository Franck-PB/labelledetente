/**
 * lib/services.ts
 *
 * Business layer for massage experiences.
 * Pages never import services_v2.json directly — use these helpers.
 *
 * Responsibilities:
 * - Typed access to all experiences
 * - Duration helpers
 * - Price helpers (min/max, recommended)
 * - Booking slug resolution (delegates to lib/config)
 */

import rawData from '@/content/services_v2.json'
import { getCalUrl, getCalLink } from './config'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Duration {
  id: string
  label: string
  price: number
  recommended?: boolean
}

export interface Experience {
  id: string
  name: string
  tagline: string
  emotionalHook: string
  idealFor: string[]
  flow: string[]
  durations: Duration[]
  /** Chemin vers l'image du soin, défini dans content/services_v2.json */
  imageSrc?: string
}

// ─── Internal data ────────────────────────────────────────────────────────────

const experiences: Experience[] = rawData.experiences as Experience[]

// ─── Accessors ───────────────────────────────────────────────────────────────

/**
 * Returns all experiences.
 */
export function getAllExperiences(): Experience[] {
  return experiences
}

/**
 * Returns a single experience by ID.
 * Returns null if not found (never throws).
 */
export function getExperienceById(id: string): Experience | null {
  return experiences.find((e) => e.id === id) ?? null
}

/**
 * Returns all durations for a given experience ID.
 * Returns empty array if experience not found.
 */
export function getDurationsByExperienceId(experienceId: string): Duration[] {
  return getExperienceById(experienceId)?.durations ?? []
}

/**
 * Returns a single duration by its own ID (e.g. "summit60").
 * Searches across all experiences.
 */
export function getDurationById(durationId: string): Duration | null {
  for (const exp of experiences) {
    const duration = exp.durations.find((d) => d.id === durationId)
    if (duration) return duration
  }
  return null
}

/**
 * Returns the experience that owns a given duration ID.
 */
export function getExperienceByDurationId(durationId: string): Experience | null {
  return experiences.find((e) => e.durations.some((d) => d.id === durationId)) ?? null
}

// ─── Price helpers ────────────────────────────────────────────────────────────

/**
 * Returns the lowest price across all durations of an experience.
 */
export function getMinPrice(experienceId: string): number | null {
  const durations = getDurationsByExperienceId(experienceId)
  if (durations.length === 0) return null
  return Math.min(...durations.map((d) => d.price))
}

/**
 * Returns the recommended duration for an experience.
 * Falls back to the first duration if none is marked recommended.
 */
export function getRecommendedDuration(experienceId: string): Duration | null {
  const durations = getDurationsByExperienceId(experienceId)
  if (durations.length === 0) return null
  return durations.find((d) => d.recommended) ?? durations[0]
}

// ─── Booking resolution ───────────────────────────────────────────────────────

/**
 * Returns the Cal.com full URL for a given duration ID.
 * Used for direct links and anchor fallbacks.
 *
 * @param durationId - e.g. "summit60"
 */
export function getBookingUrl(durationId: string): string {
  return getCalUrl(durationId)
}

/**
 * Returns the Cal.com calLink string ("username/event-slug") for a given duration ID.
 * Used with the CalEmbed component.
 *
 * @param durationId - e.g. "summit60"
 */
export function getBookingCalLink(durationId: string): string {
  return getCalLink(durationId)
}

/**
 * Returns a booking URL for the recommended duration of an experience.
 * Useful for direct "Réserver" CTAs on experience cards.
 */
export function getDefaultBookingUrl(experienceId: string): string {
  const duration = getRecommendedDuration(experienceId)
  if (!duration) return '/reservation'
  return getCalUrl(duration.id)
}
