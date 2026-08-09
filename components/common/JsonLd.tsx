import { siteConfig } from '@/constants/site'

/** JSON-LD for SoftwareApplication — improves rich results eligibility */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows, macOS, Linux',
    description: siteConfig.description,
    url: siteConfig.url,
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        name: 'Free',
      },
      {
        '@type': 'Offer',
        price: '29',
        priceCurrency: 'USD',
        name: 'Pro',
        billingIncrement: 'P1Y',
        description: '7-day free trial',
      },
      {
        '@type': 'Offer',
        price: '59',
        priceCurrency: 'USD',
        name: 'Premium',
        billingIncrement: 'P1Y',
        description: '7-day free trial',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '12840',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
