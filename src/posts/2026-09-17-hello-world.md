---
title: TEST
date: 2026-09-17
description: Test post.
tags: [meta, vue]
---

## Why I built this
Cause I need to prove my mental might against Stephen Barstys
## Syntax highlighting

Fenced blocks are highlighted at build time:

```ts
interface Post {
    date: string;
    slug: string;
    title: string;
}

export function getPost(slug: string): Post | undefined {
    return posts.find((p) => p.slug === slug);
}
```

```bash
npm run build && git push
```

A block with no language tag stays plain:

```
just some text
```
