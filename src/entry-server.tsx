import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { LanguageProvider } from './lib/i18n'

// Used at build time by scripts/prerender.mjs to write the page's HTML into
// dist/index.html. Renders the Polish page; main.tsx hydrates it.
export function render() {
  return renderToString(
    <StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </StrictMode>,
  )
}
