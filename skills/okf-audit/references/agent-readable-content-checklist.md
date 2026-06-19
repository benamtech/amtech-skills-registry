# Agent-Readable Content Checklist

Use this when reviewing whether a page or package can be consumed by AI systems that may only fetch the exact URL the user provides.

## First-Fetch HTML

- The exact URL includes the essential instructions in static HTML.
- The title and meta description name the task, not only the brand.
- The first visible section tells an AI what to do next.
- Links to markdown, JSON, and source files are plain anchors.
- The page works without JavaScript for core content.

## Markdown Views

- A short bootstrap markdown file exists.
- The bootstrap says how to use the resource in context.
- The canonical workflow is available as markdown.
- Long references are split and routed by need.

## Machine-Readable Views

- A manifest lists all files, roles, hashes, URLs, and load policies.
- Structured data identifies the page as a creative work, tool, software application, or dataset when appropriate.
- Checksums are available for archives and raw files.
- Archives expand to a predictable folder.

## Discovery Surfaces

- Sitemap includes public human pages.
- `llms.txt` or equivalent links to the skill catalog.
- Internal links point from related articles or docs to the skill.
- The page can be found from site navigation or a logical hub.

## Trust And Execution

- Scripts are listed separately from references and assets.
- Script purpose, language, permissions, and run policy are explicit.
- Install paths are optional.
- Local instructions and user instructions are given precedence.
