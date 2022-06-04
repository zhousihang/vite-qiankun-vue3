import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

const options = {
  server: {
    port: 8081,
    cors: true
  },
  plugins: [
    vue(),
    qiankun('demo1', {
      useDevMode: true
    })
  ],
  build: {
    target: 'es2015',
    outDir: '../../dist/demo1'
  }
}

// 打包 - 需要
if (process.env.NODE_ENV === 'production') {
  // @ts-expect-error
  options.base = '/demo1'
}

export default defineConfig(options)
