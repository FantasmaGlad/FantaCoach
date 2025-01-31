import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ajouté pour corriger Netlify
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});