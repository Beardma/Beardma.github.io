/// <reference types="vite-ssg" />
import { readdirSync } from 'node:fs';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { feed } from './plugins/feed.ts';
import { markdown } from './plugins/markdown.ts';
import { slugFromPath } from './plugins/slug.ts';

const POSTS_DIR = 'src/posts';
const SITE_DESCRIPTION = 'Notes on software, data, and whatever I happen to be building.';
const SITE_TITLE = 'Marshall Beard';
const SITE_URL = 'https://marshallbeard.com';

export default defineConfig({
    plugins: [
        markdown(),
        vue(),
        feed({
            description: SITE_DESCRIPTION,
            siteUrl: SITE_URL,
            title: SITE_TITLE,
        }),
    ],
    ssgOptions: {
        // vite-ssg can only pre-render concrete URLs, never /posts/:slug.
        includedRoutes(paths) {
            const postPaths = readdirSync(POSTS_DIR)
                .filter((file) => {
                    return file.endsWith('.md');
                })
                .map((file) => {
                    return `/posts/${slugFromPath(file)}`;
                });

            return [
                ...paths.filter((path) => {
                    return !path.includes(':');
                }),
                ...postPaths,
            ];
        },
    },
});
