import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@use "src/styles/_variables.scss" as *;'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}); 