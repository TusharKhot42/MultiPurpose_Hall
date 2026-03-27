import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Automatically use root path '/' on Vercel, otherwise use the repo name for GitHub pages
  base: process.env.VERCEL ? '/' : '/MultiPurpose_Hall/',
})
