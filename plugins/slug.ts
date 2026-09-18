/*
 * Single source of truth for turning a post filename into its URL slug.
 * Used by the markdown plugin (to stamp the slug onto each post) and by
 * vite.config.ts (to tell vite-ssg which /posts/* routes to pre-render).
 *
 *   src/posts/2026-09-17-hello-world.md  ->  hello-world
 */
export function slugFromPath(filePath: string): string {
    return filePath
        .replace(/^.*[/\\]/, '')
        .replace(/^\d{4}-\d{2}-\d{2}-/, '')
        .replace(/\.md$/, '');
}
