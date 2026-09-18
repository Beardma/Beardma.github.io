/// <reference types="vite-ssg" />
import { readdirSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { markdown } from './plugins/markdown.ts'
import { slugFromPath } from './plugins/slug.ts'

const POSTS_DIR = 'src/posts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [markdown(), vue()],
  ssgOptions: {
    /*
     * vite-ssg can only pre-render concrete URLs, so the dynamic
     * /posts/:slug record is swapped for one path per markdown file.
     * The catch-all is dropped too — /404 covers it.
     */
    includedRoutes(paths) {
      const postPaths = readdirSync(POSTS_DIR)
        .filter((file) => file.endsWith('.md'))
        .map((file) => `/posts/${slugFromPath(file)}`)

      return [
        ...paths.filter((path) => !path.includes(':')),
        ...postPaths,
      ]
    },
  },
})
