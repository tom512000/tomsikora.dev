import { ArrowUp } from 'lucide-react'
import { GithubIcon } from '@/components/ui/BrandIcon'
import { useI18n } from '@/i18n/useI18n'
import { Container } from './Container'

const SOURCE_URL = 'https://github.com/tom512000/tomsikora.dev'

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-line bg-surface-2 border-t">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="text-ink text-sm font-medium">{t('footer.rights', { year })}</p>
          <p className="text-ink-3 text-[0.8125rem]">{t('footer.builtWith')}</p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="border-line bg-surface text-ink-2 hover:border-accent-line hover:text-accent inline-flex min-h-10 items-center gap-2 rounded-md border px-3 transition-colors duration-150"
          >
            <GithubIcon className="size-4" />
            <span className="label-mono">{t('footer.sourceCode')}</span>
            <span className="sr-only"> ({t('a11y.newTab')})</span>
          </a>

          <a
            href="#profil"
            aria-label={t('a11y.backToTop')}
            className="border-line bg-surface text-ink-2 hover:border-accent-line hover:text-accent inline-flex size-10 items-center justify-center rounded-md border transition-colors duration-150"
          >
            <ArrowUp aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </a>
        </div>
      </Container>
    </footer>
  )
}
