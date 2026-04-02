import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/apex-pack-tracker/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icon-192.png', 'icon-512.png'],
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
      },
      manifest: {
        name: 'APEX Pack Tracker',
        short_name: 'PackTracker',
        description: 'Apex Legends パック管理 & アイテムチェッカー',
        theme_color: '#f2f2ee',
        background_color: '#f2f2ee',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/apex-pack-tracker/',
        start_url: '/apex-pack-tracker/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
