import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   server: {
    port: 5173,
    origin: 'http://localhost:5173',
    cors: true,
  },
  plugins: [
    tailwindcss(),
    react()],
})
