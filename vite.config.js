import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // CRITICAL: This 'base' property tells Vite that the app lives in a sub-folder.
  // Without this, the built index.html will look for assets at the root domain.
  base: '/faeria-sanctuary/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Ensures clean builds every time
    emptyOutDir: true,
  }
})