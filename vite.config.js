import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    '_VUE_PROD_HYDRATION_MISMATCH_DETAILS_': false // Atur flag ini ke true jika Anda ingin lebih banyak detail dalam produksi
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://samatif.000webhostapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});