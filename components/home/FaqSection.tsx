'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/constants/content'
import { useTranslation } from '@/i18n/useTranslation'

export function FaqSection() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="faq">
      <SectionHeading
        eyebrow={t('faq.eyebrow')}
        title={t('faq.title')}
        description={t('faq.description')}
        className="mb-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card"
      >
        <Accordion type="single" collapsible defaultValue="item-0" className="px-5 sm:px-7">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.qKey} value={`item-${i}`}>
              <AccordionTrigger className="text-[15px] hover:text-primary">
                {t(faq.qKey)}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed">
                {t(faq.aKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </SectionWrapper>
  )
}
