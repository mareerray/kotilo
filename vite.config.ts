import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: 'Kotilo',
        short_name: 'Kotilo',
        description: 'Keep track of what you own.',
        theme_color: '#98b8a3',
        background_color: '#f7f0e0',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'kotilo-icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'kotilo-icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'kotilo-icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'kotilo-icon-192-maskable.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },

        ],
      },
    }),
  ],
})