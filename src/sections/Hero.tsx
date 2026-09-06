import type { ReactNode } from 'react'
import { ArrowDown, Download, Mail, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcon'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/cn'
import { staggerContainer, transitions } from '@/lib/motion'
import { profile, socials } from '@/data/profile'
import { coreStack } from '@/data/skills'
import { education, experiences } from '@/data/experience'
import { useI18n } from '@/i18n/useI18n'
import { Container } from '@/components/layout/Container'
import { LinkButton } from '@/components/ui/LinkButton'
import { Section } from '@/components/ui/Section'
import { About } from './About'

const HERO_ITEM = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: transitions.smooth },
}

const SOCIAL_ICONS = { github: GithubIcon, linkedin: LinkedinIcon, email: Mail, phone: Phone } as const

/**
 * Première vue.
 *
 * Composition asymétrique : à gauche le bloc typographique qui porte
 * l'identité et le positionnement, à droite une fiche technique qui porte
 * les faits vérifiables — poste actuel, formation, socle technique — et le
 * portrait. Sur mobile, tout se replie dans l'ordre de lecture.
 *
 * Rien d'essentiel n'est porté par l'animation : le contenu est rendu, la
 * séquence d'entrée ne fait qu'ordonner la lecture.
 */
export function Hero() {
  const { t, L, locale } = useI18n()
  const prefersReducedMotion = useReducedMotion()

  const currentRole = experiences.find((experience) => experience.ongoing)
  const currentEducation = education.find((entry) => entry.ongoing)
  const headline = profile.title[locale]

  return (
    <Section id="profil" label={headline} className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-veil pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_72%)]"
      />

      <Container className="relative pt-28 pb-14 lg:pt-32 lg:pb-16">
        <motion.div
          variants={staggerContainer(0.07, 0.05)}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-12"
        >
          {/* ── Bloc typographique ─────────────────────────────────────── */}
          <div className="flex flex-col gap-7 lg:col-span-7">
            <motion.p variants={HERO_ITEM} className="text-ink-2 text-base sm:text-lg">
              {t('hero.intro')} <span className="text-ink font-medium">{profile.fullName}</span>
            </motion.p>

            <motion.h1 variants={HERO_ITEM} className="type-display text-ink text-balance">
              {headline}
            </motion.h1>

            <motion.p variants={HERO_ITEM} className="type-lead text-ink-2 max-w-xl text-pretty">
              {L(profile.positioning)}
            </motion.p>

            <motion.div variants={HERO_ITEM} className="flex flex-wrap items-center gap-3">
              <LinkButton href={profile.cv.href} external>
                <Download aria-hidden="true" className="size-4" strokeWidth={1.75} />
                {t('hero.ctaCv')}
                <span className="sr-only"> ({t('a11y.newTab')})</span>
              </LinkButton>

              <ul className="flex items-center gap-1.5">
                {socials
                  .map((social) => {
                    const Icon = SOCIAL_ICONS[social.id]

                    return (
                      <li key={social.id}>
                        <a
                          href={social.href}
                          {...(social.external
                            ? { target: '_blank', rel: 'noreferrer noopener' }
                            : {})}
                          className={cn(
                            'border-line bg-surface text-ink-2 inline-flex size-11 items-center justify-center rounded-md border',
                            'hover:border-accent-line hover:text-accent transition-colors duration-150',
                          )}
                        >
                          <Icon aria-hidden="true" className="size-[1.125rem]" />
                          <span className="sr-only">
                            {social.handle}
                            {social.external ? ` (${t('a11y.newTab')})` : ''}
                          </span>
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </motion.div>
          </div>

          {/* ── Fiche technique ────────────────────────────────────────── */}
          <motion.aside
            variants={HERO_ITEM}
            aria-label={t('hero.specsTitle')}
            className="lg:col-span-5"
          >
            <div className="border-line bg-surface overflow-hidden rounded-lg border shadow-sm">
              <div className="border-line flex items-center justify-between border-b px-4 py-2.5">
                <span className="label-mono text-ink-3">{t('hero.specsTitle')}</span>
                <span aria-hidden="true" className="label-mono text-accent">
                  tomsikora.dev
                </span>
              </div>

              <div className="flex items-stretch">
                <div className="border-line flex min-w-0 flex-1 flex-col sm:border-r">
                  {currentRole !== undefined && (
                    <SpecRow label={t('hero.specWork')}>
                      <span className="text-ink font-medium">{currentRole.organisation}</span>
                      <span className="text-ink-3 text-[0.8125rem]">
                        {currentRole.location} · {L(currentRole.period)}
                      </span>
                    </SpecRow>
                  )}

                  {currentEducation !== undefined && (
                    <SpecRow label={t('hero.specEducation')}>
                      <span className="text-ink font-medium">{L(currentEducation.degree)}</span>
                      <span className="text-ink-3 text-[0.8125rem]">
                        {currentEducation.institution} · {currentEducation.period}
                      </span>
                    </SpecRow>
                  )}

                  <SpecRow label={t('hero.specStack')} last>
                    <ul className="text-ink flex flex-wrap gap-x-1.5 gap-y-1 font-medium">
                      {coreStack.slice(0, 5).map((skill, index, list) => (
                        <li key={skill.name}>
                          {skill.name}
                          {index < list.length - 1 && (
                            <span aria-hidden="true" className="text-ink-3">
                              {' '}
                              ·
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </SpecRow>
                </div>

                {/* Le portrait n'apparaît qu'à partir du moment où la fiche
                    est assez large pour l'accueillir sans écraser le texte. */}
                <div className="bg-surface-2 relative hidden w-40 shrink-0 overflow-hidden sm:block lg:w-36 xl:w-44">
                  <div aria-hidden="true" className="grid-veil absolute inset-0" />
                  <img
                    src="/img/photo-640.webp"
                    srcSet="/img/photo-640.webp 640w, /img/photo-1086.webp 1086w"
                    sizes="(min-width: 1280px) 11rem, (min-width: 1024px) 9rem, 10rem"
                    width={1086}
                    height={1448}
                    alt={t('hero.portraitAlt')}
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover object-top"
                  />
                  <span
                    aria-hidden="true"
                    className="bg-brand absolute inset-x-0 bottom-0 h-0.5"
                  />
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>

        {prefersReducedMotion !== true && (
          <motion.p
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="label-mono text-ink-3 mt-12 hidden items-center gap-2 lg:flex"
          >
            <ArrowDown className="size-3.5" strokeWidth={1.75} />
            {t('hero.scrollHint')}
          </motion.p>
        )}
      </Container>

      <About />
    </Section>
  )
}

interface SpecRowProps {
  label: string
  children: ReactNode
  last?: boolean
}

function SpecRow({ label, children, last = false }: SpecRowProps) {
  return (
    <div className={cn('flex flex-col gap-1.5 px-4 py-3.5', !last && 'border-line border-b')}>
      <span className="label-mono text-ink-3">{label}</span>
      <div className="flex flex-col gap-0.5 text-sm">{children}</div>
    </div>
  )
}
