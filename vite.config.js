import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // for using `describe`, `it`, `expect`, etc. without importing
    setupFiles: './src/setupTests.js',
  },
})
