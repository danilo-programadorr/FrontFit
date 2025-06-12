import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  }
});
