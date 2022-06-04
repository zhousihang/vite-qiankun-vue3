import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    '@': resolve(__dirname, 'src')
  },
  plugins: [
    vue()
  ],
  server: {
    proxy: { // 代理
      '/demo1-images': 'http://localhost:8081',
      '/demo2-images': 'http://localhost:8082'
    }
  },
  build: {
    outDir: '../dist', // 打包地址
    rollupOptions: {
      output: {
        chunkFileNames: 'common/js/[name]-[hash].js',
        entryFileNames: 'common/js/[name]-[hash].js',
        assetFileNames: 'common/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
