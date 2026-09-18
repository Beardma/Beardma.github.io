export interface Post {
    date: string;
    description: string;
    html: string;
    slug: string;
    tags: string[];
    title: string;
};

// each .md is compiled to HTML at build time by plugins/markdown.ts,
// so no markdown parser or syntax highlighter ships to the browser
const files = import.meta.glob('./posts/*.md', {
    eager: true,
    import: 'default',
}) as Record<string, Omit<Post, 'slug'>>;

export const posts: Post[] = Object.entries(files)
    .map(([path, post]) => {
        // ./posts/2026-09-17-hello-world.md -> hello-world
        const slug = path.replace(/^.*\/(?:\d{4}-\d{2}-\d{2}-)?/, '').replace(/\.md$/, '');

        return {
            ...post,
            slug,
            title: post.title || slug,
        };
    })
    .sort((a, b) => {
        return b.date.localeCompare(a.date);
    });

export function getPost(slug: string): Post | undefined {
    return posts.find((p) => {
        return p.slug === slug;
    });
}
