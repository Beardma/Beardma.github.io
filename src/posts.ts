export interface Post {
    date: string;
    description: string;
    html: string;
    slug: string;
    tags: string[];
    title: string;
}

// Compiled by plugins/markdown.ts, so no parser or highlighter ships to the browser.
const files = import.meta.glob('./posts/*.md', {
    eager: true,
    import: 'default',
}) as Record<string, Post>;

export const posts: Post[] = Object.values(files).sort((a, b) => {
    return b.date.localeCompare(a.date);
});

export function getPost(slug: string): Post | undefined {
    return posts.find((post) => {
        return post.slug === slug;
    });
}
