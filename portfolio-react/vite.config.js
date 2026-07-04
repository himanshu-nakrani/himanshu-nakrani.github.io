import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const normalized = id.split(path.sep).join('/')
            if (
              normalized.includes('react/index.js') ||
              normalized.includes('react/jsx-runtime') ||
              normalized.includes('react-dom/') ||
              normalized.includes('scheduler/') ||
              normalized.includes('react-router/') ||
              normalized.includes('react-router-dom/') ||
              normalized.includes('@remix-run/router/')
            ) {
              return 'react-vendor'
            }
            if (normalized.includes('/node_modules/lucide-react/')) return 'icons'
          }
        },
      },
    },
  },
  test: {
    environment: 'node',
  },
})
