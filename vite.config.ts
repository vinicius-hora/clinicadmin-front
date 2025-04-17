import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // permite usar @/types, @/service, etc
    },
    extensions: ['.js', '.ts', '.vue', '.json'] // resolve sem precisar escrever extensão
  }
})
