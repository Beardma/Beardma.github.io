# marshallbeard.com

A blog built with Vite, Vue 3 and TypeScript, pre-rendered to static HTML and
served from GitHub Pages.

## Running locally

```bash
npm install
npm run dev
```

`npm run build` type-checks, pre-renders every route and writes `dist/`.
`npm run preview` serves that build.

## Writing a post

Add a markdown file to `src/posts/`, named `YYYY-MM-DD-slug.md`:

```markdown
---
title: A Post
date: 2026-09-18
description: One line for the index page and the RSS feed.
tags: [vue, typescript]
---

Body copy. Fenced code blocks are syntax highlighted.
```

The date prefix is stripped from the filename to form the URL, so the example
above is served at `/posts/slug`. Nothing needs registering — pushing to `main`
builds and deploys automatically.

## How it fits together

`plugins/markdown.ts` compiles each post at build time: frontmatter is parsed,
markdown is rendered, and code blocks are highlighted with Shiki. Only HTML
reaches the browser, so no markdown parser or highlighter ships to visitors.

`plugins/feed.ts` reuses those compiled posts to emit `/feed.xml` with full
post content.

`vite-ssg` pre-renders every route to real HTML, including `404.html`, which
GitHub Pages serves for unmatched URLs.

Themes resolve through CSS `light-dark()` and `color-scheme`; the header toggle
only sets `data-theme` on `<html>` and remembers it in `localStorage`.
