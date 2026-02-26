import type { MetadataRoute } from 'next'
import { getAllExperiences } from '@/lib/services'

const BASE_URL = 'https://labelledetente.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const experiences = getAllExperiences()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/prestations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/professionnels`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/zones`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // /prestations/[id] — one entry per experience
  const experienceRoutes: MetadataRoute.Sitemap = experiences.map((exp) => ({
    url: `${BASE_URL}/prestations/${exp.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  // Excluded from sitemap:
  // /reservation/* (noindex per PRD — indexBookingPage: false)
  // /mentions-legales, /politique-confidentialite (legal, no SEO value)

  return [...staticRoutes, ...experienceRoutes]
}
