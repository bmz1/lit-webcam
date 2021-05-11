import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: '/src/lit-webcam.js',
      formats: ['es'],
    },
  },
});
