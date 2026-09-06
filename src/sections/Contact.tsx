import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  Phone,
  type LucideProps,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcon'
import { cn } from '@/lib/cn'
import type { Social, SocialId } from '@/lib/types'
import type { TranslationKey } from '@/i18n/dictionaries'
import { profile, socials } from '@/data/profile'
import { useI18n } from '@/i18n/useI18n'
import { Container } from '@/components/layout/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { LinkButton } from '@/components/ui/LinkButton'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'

type IconComponent = ComponentType<Pick<LucideProps, 'className'>>

const SOCIAL_META: Record<SocialId, { icon: IconComponent; labelKey: TranslationKey }> = {
  email: { icon: Mail, labelKey: 'contact.emailLabel' },
  phone: { icon: Phone, labelKey: 'contact.phoneLabel' },
  github: { icon: GithubIcon, labelKey: 'contact.githubLabel' },
  linkedin: { icon: LinkedinIcon, labelKey: 'contact.linkedinLabel' },
}

export function Contact() {
  const { t } = useI18n()

  return (
    <Section id="contact" label={t('contact.title')}>
      <Container className="flex flex-col gap-10 py-18 lg:gap-14 lg:py-24">
        <SectionHeader
          index={6}
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          lead={t('contact.lead')}
          aside={<AvailabilityBadge />}
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <RevealGroup
            as="ul"
            stagger={0.05}
            className="border-line bg-surface divide-line divide-y overflow-hidden rounded-lg border lg:col-span-7"
          >
            {socials.map((social) => (
              <RevealItem as="li" key={social.id}>
                <ContactRow social={social} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal
            delay={0.1}
            className="border-line bg-surface flex flex-col justify-between gap-6 rounded-lg border p-6 lg:col-span-5"
          >
            <div className="flex flex-col gap-2">
              <h3 className="label-mono text-accent">{t('contact.cvTitle')}</h3>
              <p className="type-body text-ink-2">{t('contact.cvHint')}</p>
            </div>

            <LinkButton
              href={profile.cv.href}
              variant="primary"
              external
              className="w-full sm:w-auto sm:self-start"
            >
              <Download aria-hidden="true" className="size-4" strokeWidth={1.75} />
              {t('contact.cvAction')}
              <span className="sr-only"> ({t('a11y.newTab')})</span>
            </LinkButton>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

function ContactRow({ social }: { social: Social }) {
  const { t } = useI18n()
  const meta = SOCIAL_META[social.id]
  const Icon = meta.icon

  return (
    <div className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
      <Icon className="text-ink-3 size-4 shrink-0" />

      <span className="label-mono text-ink-3 hidden w-20 shrink-0 sm:block">
        {t(meta.labelKey)}
      </span>

      <a
        href={social.href}
        {...(social.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        className="text-ink hover:text-accent min-w-0 flex-1 truncate text-sm font-medium transition-colors duration-150"
      >
        {social.handle}
        {social.external && (
          <>
            <ArrowUpRight
              aria-hidden="true"
              className="ml-0.5 inline size-3.5 align-[-2px]"
              strokeWidth={1.75}
            />
            <span className="sr-only"> ({t('a11y.newTab')})</span>
          </>
        )}
      </a>

      {social.id === 'email' && <CopyEmailButton value={social.handle} />}
    </div>
  )
}

/**
 * Copie de l'adresse e-mail.
 *
 * Le retour visuel est doublé d'un `role="status"` : au lecteur d'écran,
 * « Copié » est annoncé au lieu d'un simple changement d'icône.
 */
function CopyEmailButton({ value }: { value: string }) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return

    const timer = window.setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [copied])

  const onCopy = () => {
    void navigator.clipboard.writeText(value).then(
      () => {
        setCopied(true)
      },
      () => {
        // Presse-papiers indisponible : l'adresse reste sélectionnable et le
        // lien mailto fonctionne, il n'y a rien à signaler à l'utilisateur.
      },
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        aria-label={t('contact.copyEmail')}
        className={cn(
          'border-line text-ink-2 inline-flex size-9 shrink-0 items-center justify-center rounded-sm border',
          'hover:border-accent-line hover:text-accent transition-colors duration-150',
        )}
      >
        {copied ? (
          <Check aria-hidden="true" className="text-accent size-4" strokeWidth={2} />
        ) : (
          <Copy aria-hidden="true" className="size-4" strokeWidth={1.75} />
        )}
      </button>

      <span role="status" className="sr-only">
        {copied ? t('contact.copied') : ''}
      </span>
    </>
  )
}
