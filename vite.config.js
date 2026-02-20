import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // CRITICAL: The 'base' must match your GitHub repository name
  // This tells Vite to serve the app from the /faeria-sanctuary/ subfolder
  base: '/faeria-sanctuary/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  }
})