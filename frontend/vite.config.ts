import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The portfolio is a single static route; keep the payload small and
    // predictable so the initial paint stays fast on mobile connections.
    target: 'es2022',
    cssCodeSplit: false,
  },
})
