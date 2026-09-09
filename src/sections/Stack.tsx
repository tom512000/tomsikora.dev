import { cn } from '@/lib/cn'
import type { Skill, SkillGroupId } from '@/lib/types'
import { coreStack, skillCount, skillGroups } from '@/data/skills'
import { useI18n } from '@/i18n/useI18n'
import { Container } from '@/components/layout/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'

const GROUP_KEYS = {
  languages: 'stack.groupLanguages',
  frameworks: 'stack.groupFrameworks',
  databases: 'stack.groupDatabases',
  tools: 'stack.groupTools',
  other: 'stack.groupOther',
} as const satisfies Record<SkillGroupId, string>

/**
 * Section stack.
 *
 * Le portfolio d'origine alignait soixante-huit logos de même taille :
 * aucune hiérarchie, donc aucune lecture. Ici, le socle principal — les
 * entrées que Tom avait lui-même marquées « Favoris » — occupe le premier
 * plan, et le reste devient une liste compacte, consultable sans dominer la
 * page. Aucune jauge de niveau : un pourcentage sur une techno ne veut rien
 * dire.
 */
export function Stack() {
  const { t } = useI18n()
  const secondaryCount = skillCount - coreStack.length

  return (
    <Section id="stack" label={t('stack.title')} className="border-line bg-surface-2 border-y">
      <Container className="flex flex-col gap-10 py-18 lg:gap-14 lg:py-24">
        <SectionHeader
          index={3}
          eyebrow={t('stack.eyebrow')}
          title={t('stack.title')}
          lead={t('stack.lead')}
        />

        {/* ── Socle principal ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <Reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="label-mono text-accent">{t('stack.coreTitle')}</h3>
            <p className="text-ink-3 text-[0.8125rem]">{t('stack.coreHint')}</p>
          </Reveal>

          <RevealGroup
            as="ul"
            stagger={0.035}
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
          >
            {coreStack.map((skill) => (
              <RevealItem as="li" key={skill.name}>
                <SkillTile skill={skill} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* ── Reste de la boîte à outils ───────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <Reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="label-mono text-ink-3">{t('stack.restTitle')}</h3>
            <p className="text-ink-3 text-[0.8125rem]">
              {t('stack.restHint', { count: secondaryCount })}
            </p>
          </Reveal>

          <div className="border-line border-t">
            {skillGroups.map((group) => {
              const rest = group.skills.filter((skill) => skill.core !== true)
              if (rest.length === 0) return null

              return (
                <Reveal
                  key={group.id}
                  className="border-line grid gap-3 border-b py-5 md:grid-cols-[12rem_1fr] md:gap-8"
                >
                  <h4 className="label-mono text-ink-2 pt-2">{t(GROUP_KEYS[group.id])}</h4>
                  <ul className="flex flex-wrap gap-1.5">
                    {rest.map((skill) => (
                      <li key={skill.name}>
                        <SkillChip skill={skill} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** Tuile du socle principal : logo lisible, nom en clair, accent assumé. */
function SkillTile({ skill }: { skill: Skill }) {
  const { t } = useI18n()

  return (
    <a
      href={skill.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'border-accent-line bg-surface group flex min-h-16 items-center gap-3 rounded-md border px-3 py-3',
        'hover:bg-accent-soft transition-colors duration-150',
      )}
    >
      <SkillLogo skill={skill} className="size-7" />
      <span className="text-ink min-w-0 truncate text-sm font-medium">{skill.name}</span>
      <span className="sr-only"> ({t('a11y.newTab')})</span>
    </a>
  )
}

/** Chip secondaire : présent, consultable, mais qui ne tire pas l'œil. */
function SkillChip({ skill }: { skill: Skill }) {
  const { t } = useI18n()

  return (
    <a
      href={skill.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'border-line bg-surface text-ink-2 group inline-flex min-h-10 items-center gap-2 rounded-sm border px-2.5 py-1.5',
        'hover:border-line-strong hover:text-ink transition-colors duration-150',
      )}
    >
      <SkillLogo
        skill={skill}
        className="size-4 opacity-80 transition-opacity duration-150 group-hover:opacity-100"
      />
      <span className="text-[0.8125rem]">{skill.name}</span>
      <span className="sr-only"> ({t('a11y.newTab')})</span>
    </a>
  )
}

/**
 * Logo d'une technologie.
 *
 * Les marques monochromes — GitHub, Symfony, Next.js, Three.js, shadcn/ui… —
 * sont dessinées en noir : telles quelles, elles disparaissent sur le fond du
 * thème sombre. Elles sont donc inversées en sombre, ce qui donne exactement
 * la variante claire prévue par ces marques et préserve les évidements, là où
 * un masque teinté aplatirait le glyphe en silhouette pleine.
 *
 * Les logos colorés ne sont jamais touchés : l'inversion détruirait leur
 * couleur de marque.
 */
function SkillLogo({ skill, className }: { skill: Skill; className?: string }) {
  return (
    <img
      src={`/img/logos/${skill.logo}.webp`}
      alt=""
      width={96}
      height={96}
      loading="lazy"
      decoding="async"
      className={cn('shrink-0 object-contain', skill.mono === true && 'dark:invert', className)}
    />
  )
}
