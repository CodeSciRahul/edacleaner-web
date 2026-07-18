import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { DashboardPreview } from '@/components/home/DashboardPreview'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { HowItWorksSection } from '@/components/home/HowItWorksSection'
import { MidCtaStrip } from '@/components/home/MidCtaStrip'
import { ComparisonSection } from '@/components/home/ComparisonSection'
import { PricingSection } from '@/components/home/PricingSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { TrustSection } from '@/components/home/TrustSection'
import { FaqSection } from '@/components/home/FaqSection'
import { FinalCtaSection } from '@/components/home/FinalCtaSection'
import { DownloadSection } from '@/components/home/DownloadSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <DashboardPreview />
      <FeaturesSection />
      <HowItWorksSection />
      <MidCtaStrip />
      <ComparisonSection />
      <PricingSection />
      <TestimonialsSection />
      <TrustSection />
      <FaqSection />
      <FinalCtaSection />
      <DownloadSection />
    </>
  )
}
