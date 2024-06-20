import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  define: {
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false,
    '__VUE_OPTIONS_API__': true,  // Enable Vue 2 style options API
    '__VUE_PROD_DEVTOOLS__': false  // Disable devtools in production
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://ghostwhite-hummingbird-779835.hostingersite.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
});
