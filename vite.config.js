import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // The 'base' property is essential for sub-folder deployments like /faeria-sanctuary/
  base: '/faeria-sanctuary/src/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensures the build is clean for the gh-pages deployment
    emptyOutDir: true,
  }
})