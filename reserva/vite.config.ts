import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base は相対パスにして、どのサブディレクトリに置いても動くようにする
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
