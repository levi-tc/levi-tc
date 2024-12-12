import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
    build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Ensure assets use absolute paths
        assetFileNames: (assetInfo) => {
          const info = (assetInfo.name || '').split('.')
          const extType = info[info.length - 1]
          return `assets/${info[0]}.[hash].${extType}`
        },
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      }
    }
  },
})
