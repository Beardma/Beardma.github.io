import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { markdown } from './plugins/markdown.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [markdown(), vue()],
})
