import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/linked-banner-generator/', // ✅ Required for GitHub Pages
  plugins: [react()],
})
