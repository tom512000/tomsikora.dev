import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Polices auto-hébergées : deux familles variables, découpées par
// unicode-range. Le navigateur ne télécharge que le sous-ensemble latin,
// soit ~52 Ko pour l'ensemble de la typographie du site.
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'

import '@/styles/index.css'

import { App } from './App'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { LocaleProvider } from '@/i18n/LocaleProvider'

const container = document.getElementById('root')

if (container === null) {
  throw new Error('Élément racine #root introuvable dans index.html.')
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
)
