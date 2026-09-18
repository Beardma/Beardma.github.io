import { 
    marked,
} from 'marked';
import { 
    createHighlighter,
    type Highlighter,
} from 'shiki';
import type { 
    Plugin,
} from 'vite';
import { 
    slugFromPath,
} from './slug.ts';

// grammars loaded at build time only — none of this ships to the browser
const LANGS = [
    'bash',
    'css',
    'csharp',
    'diff',
    'go',
    'html',
    'java',
    'json',
    'python',
    'rust',
    'scss',
    'sql',
    'ts',
    'tsx',
    'vue',
    'yaml',
];

const THEMES = {
    dark: 'github-dark',
    light: 'github-light',
} as const;

export interface PostData {
    date: string;
    description: string;
    html: string;
    slug: string;
    tags: string[];
    title: string;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function parseFrontmatter(raw: string): { 
    body: string;
    data: Record<string, string | string[]>; 
} {
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);

    if (!match) {
        return { 
            body: raw,
            data: {}, 
        };
    }

    const data: Record<string, string | string[]> = {};

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
                .map((s) => {
                    return s.trim().replace(/^["']|["']$/g, '');
                })
                .filter(Boolean);
        } 
        else {
            data[key] = rawValue.replace(/^["']|["']$/g, '');
        }
    }

    return { 
        body: raw.slice(match[0].length),
        data, 
    };
}

/*
 * Populated as each .md is transformed, so the feed plugin can reuse the
 * already-compiled posts instead of parsing the directory a second time.
 */
const compiled = new Map<string, PostData>();

export function collectedPosts(): PostData[] {
    return [...compiled.values()];
}

export function markdown(): Plugin {
    let highlighter: Highlighter | undefined;

    return {
        name: 'blog-markdown',

        async buildStart() {
            highlighter = await createHighlighter({
                langs: LANGS,
                themes: [THEMES.dark, THEMES.light],
            });

            marked.use({
                renderer: {
                    code({ lang, text }) {
                        const loaded = highlighter!.getLoadedLanguages();

                        // unknown or missing language -> plain, escaped block
                        if (!lang || !loaded.includes(lang)) {
                            return `<pre class="shiki-plain"><code>${escapeHtml(text)}</code></pre>`;
                        }

                        return highlighter!.codeToHtml(text, {
                            lang,
                            themes: THEMES,
                        });
                    },
                },
            });
        },

        transform(code, id) {
            const path = id.split('?')[0];

            if (!path.endsWith('.md')) {
                return null;
            }

            const { body, data } = parseFrontmatter(code);
            const slug = slugFromPath(path);
            const post: PostData = {
                date: (data.date as string) ?? '',
                description: (data.description as string) ?? '',
                html: marked.parse(body, { async: false }) as string,
                slug,
                tags: (data.tags as string[]) ?? [],
                title: (data.title as string) || slug,
            };

            compiled.set(post.slug, post);

            return {
                code: `export default ${JSON.stringify(post)};`,
                map: null,
            };
        },
    };
}
