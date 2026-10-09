import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The Express quote server runs on this port during development.
const API_PORT = Number(process.env.PORT ?? 3001);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Forward /api requests to the Express server so the frontend can use relative URLs.
    proxy: {
      '/api': `http://localhost:${API_PORT}`,
    },
  },
});
