import Link from 'next/link'
import { Logo } from '@/components/common/Logo'
import { Container } from '@/components/common/Container'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/constants/site'

const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Trust', href: '#trust' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Download', href: '#download' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/70 bg-surface/50">
      <Container className="section-padding-sm">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground text-pretty">
              {siteConfig.description}
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              Windows · macOS · Linux
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:flex-wrap">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="opacity-80">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  )
}
