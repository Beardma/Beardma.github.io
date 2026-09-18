declare module '*.md' {
    const post: {
        date: string;
        description: string;
        html: string;
        slug: string;
        tags: string[];
        title: string;
    };

    export default post;
}
