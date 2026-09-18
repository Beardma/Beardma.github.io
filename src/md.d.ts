declare module '*.md' {
    const post: {
        date: string;
        description: string;
        html: string;
        tags: string[];
        title: string;
    };

    export default post;
}
