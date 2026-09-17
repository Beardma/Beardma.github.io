import { 
    marked 
} from 'marked';

export interface Post {
  date: string
  description: string
  html: string
  slug: string
  tags: string[]
  title: string
};

// eager + ?raw => every .md file's text is inlined into the bundle at build time
const files = import.meta.glob('./posts/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

function parseFrontmatter(raw: string): { 
    body: string;
    data: Record<string, string | string[]>; 
} {
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);

    if (!match) {
        return { 
            body: raw,
            data: {}, 
        }
    }

    const data: Record<string, string | string[]> = {}

    for (const line of match[1].split(/\r?\n/)) {
        const i = line.indexOf(':');

        if (i === -1) {
            continue;
        }

        const key = line.slice(0, i).trim();
        const rawValue = line.slice(i + 1).trim();

        if (rawValue.startsWith('[')) {
            data[key] = rawValue
                .slice(1, -1)
                .split(',')
                .map((s) => s.trim().replace(/^["']|["']$/g, ''))
                .filter(Boolean);
        } 
        else {
            data[key] = rawValue.replace(/^["']|["']$/g, '');
        }
    }

    return { 
        body: raw.slice(match[0].length),
        data, 
    }
}

export const posts: Post[] = Object.entries(files)
    .map(([path, raw]) => {
        const { body, data } = parseFrontmatter(raw)
        // ./posts/2026-09-17-hello-world.md -> hello-world
        const slug = path.replace(/^.*\/(?:\d{4}-\d{2}-\d{2}-)?/, '').replace(/\.md$/, '')

        return {
            date: (data.date as string) ?? '',
            description: (data.description as string) ?? '',
            html: marked.parse(body, { async: false }) as string,
            slug,
            tags: (data.tags as string[]) ?? [],
            title: (data.title as string) ?? slug,
        }
    })
    .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
    return posts.find((p) => {
        return p.slug === slug
    });
}