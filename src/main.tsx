import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BannerProvider } from './BannerContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BannerProvider>
      <App />
    </BannerProvider>

  </StrictMode>,
)
