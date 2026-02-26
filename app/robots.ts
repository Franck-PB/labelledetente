import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/reservation/', '/mentions-legales', '/politique-confidentialite'],
      },
    ],
    sitemap: 'https://labelledetente.fr/sitemap.xml',
  }
}
