/*
 * Shared so the markdown plugin and vite.config.ts cannot drift apart on what
 * a post's URL is.
 */
export function slugFromPath(filePath: string): string {
    return filePath
        .replace(/^.*[/\\]/, '')
        .replace(/^\d{4}-\d{2}-\d{2}-/, '')
        .replace(/\.md$/, '');
}
