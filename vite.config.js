import { fileURLToPath, URL } from 'node:url'
import fs from 'fs';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'dev.local',
    port: 8080,
    https: {
      key: fs.readFileSync('./certs/dev.local+4-key.pem'),
      cert: fs.readFileSync('./certs/dev.local+4.pem'),
      //ca: fs.readFileSync('./certs/my-ca.crt')
    },
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:1337',
        changeOrigin: true,
      },
    }
  },
})
