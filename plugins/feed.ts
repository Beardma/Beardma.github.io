import type {
    Plugin,
} from 'vite';
import {
    collectedPosts,
} from './markdown.ts';

export interface FeedOptions {
    description: string;
    fileName?: string;
    siteUrl: string;
    title: string;
}

// A CDATA section ends at the first ']]>', so a literal one has to be split.
function cdata(value: string): string {
    return `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

function escapeXml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export function feed(options: FeedOptions): Plugin {
    const fileName = options.fileName ?? 'feed.xml';
    const site = options.siteUrl.replace(/\/$/, '');

    let isSsrBuild = false;

    return {
        apply: 'build',

        configResolved(config) {
            isSsrBuild = Boolean(config.build.ssr);
        },

        generateBundle() {
            // vite-ssg builds twice; the feed belongs only in the client output.
            if (isSsrBuild) {
                return;
            }

            const posts = collectedPosts().sort((a, b) => {
                return b.date.localeCompare(a.date);
            });
            const items = posts.map((post) => {
                const url = `${site}/posts/${post.slug}`;

                return [
                    '    <item>',
                    `      <title>${escapeXml(post.title)}</title>`,
                    `      <link>${escapeXml(url)}</link>`,
                    `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
                    `      <pubDate>${toRfc822(post.date)}</pubDate>`,
                    `      <description>${escapeXml(post.description)}</description>`,
                    `      <content:encoded>${cdata(post.html)}</content:encoded>`,
                    '    </item>',
                ].join('\n');
            });
            const xml = [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<rss version="2.0"',
                '     xmlns:atom="http://www.w3.org/2005/Atom"',
                '     xmlns:content="http://purl.org/rss/1.0/modules/content/">',
                '  <channel>',
                `    <title>${escapeXml(options.title)}</title>`,
                `    <link>${escapeXml(site)}/</link>`,
                `    <description>${escapeXml(options.description)}</description>`,
                '    <language>en-us</language>',
                `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
                `    <atom:link href="${escapeXml(`${site}/${fileName}`)}" rel="self" type="application/rss+xml"/>`,
                ...items,
                '  </channel>',
                '</rss>',
                '',
            ].join('\n');

            this.emitFile({
                fileName,
                source: xml,
                type: 'asset',
            });
        },

        name: 'blog-feed',
    };
}

function toRfc822(date: string): string {
    const parsed = new Date(`${date}T00:00:00Z`);

    if (Number.isNaN(parsed.getTime())) {
        return new Date().toUTCString();
    }

    return parsed.toUTCString();
}
