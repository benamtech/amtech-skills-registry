---
name: amtech-article-publisher
description: Publish supplied article copy into AMTECH's live article system, knowledge graph, OKF bundle, prerendered route, and optional Supabase projection. Use when Codex receives article copy in pasted text, markdown, HTML, XML, JSON, a draft outline, or edited article material and is asked to publish, add, convert, or ship it as a live AMTECH article.
---

# AMTECH Article Publisher

Use this skill to turn supplied article material into a complete live `/articles/<slug>` publish. Do not use it for research-only drafts unless the user explicitly asks to publish.

## Required Local Context

Before editing code, read:

1. `docs/codegraph.md`
2. `docs/ARTICLE_SYSTEM.md`
3. `docs/seo/KNOWLEDGE_GRAPH_SEO_RESEARCH.md`
4. `docs/seo/AMTECH_MASTER_KNOWLEDGE_GRAPH.md`
5. `docs/okf/README.md`
6. `docs/okf/04-validation-and-phase-gates.md`
7. `docs/memory/fast-navigation-and-doc-sync.md`

For OKF/agentic-search articles, also read `docs/okf/07-future-article-notes.md`.

## Publishing Standard

Finish only when all required article-system surfaces are complete:

- Add a React-free `ArticleDefinition` in `src/lib/knowledge/articles/`.
- Export it from `src/lib/knowledge/articles/index.ts`.
- Add a route under `/articles/<slug>` using a thin React wrapper page.
- Add a published `KnowledgeGraphNode` in `src/lib/articleKnowledgeGraph.ts`.
- Encode internal links as graph edges with concrete `reason` text.
- Set `primaryEntity` and `entities` explicitly.
- Cite third-party claims.
- Run `npm run okf:check` to regenerate and validate `public/okf/**`, `public/sitemap.xml`, `public/robots.txt`, and `public/llms.txt`.
- Run `npm run build` to verify the site and prerender the article route.
- Refresh the Supabase projection only when requested or required for the ship path.

Do not say the article is published unless the route, article data, graph node, generated OKF/discovery files, and build validation are complete.

## Workflow

1. **Normalize the input.** Treat the user's supplied copy as authoritative raw material. Preserve headings, lists, tables, prompts, links, and citations from markdown. Extract visible text, headings, tables, links, and citations from HTML. Parse XML/JSON semantically instead of flattening fields into prose. Separate claims, examples, instructions, sources, and desired positioning from mixed notes.
2. **Run the strategy pass.** Decide the short lowercase slug, category, specific audience, primary entity, entities, graph role, search intent, information gain, and next reader action.
3. **Shape the article.** Convert raw copy into AMTECH's answer-first article standard. Add direct-answer framing and decision structure when the source material is vague. Do not pad with generic AI marketing.
4. **Create article data.** Add `src/lib/knowledge/articles/<slug>.ts` with a complete `ArticleDefinition`.
5. **Wire the article.** Export the definition, add the thin page wrapper, add the route, and update the article knowledge graph and relevant topic groups.
6. **Regenerate generated surfaces.** Run OKF generation/validation through `npm run okf:check`. Do not hand-edit `public/okf/**`.
7. **Verify.** Run `npm run typecheck`, `npm run okf:check`, and `npm run build`. Run `npm run lint` when the change touches enough code to justify it or when requested.
8. **Report precisely.** Summarize the slug, route, graph role, changed files, generated OKF/discovery outputs, validation commands, and Supabase projection status.

## Article Strategy Fields

Choose these before writing the `ArticleDefinition`:

- `slug`: short, lowercase, hyphenated, stable.
- `category`: one of `first-action`, `local-condition`, `material-surface`, `compliance`, `comparison`, `field-note`, `strategy`.
- `audience`: specific operator, owner, or technical reader; avoid generic "businesses".
- `primaryEntity`: the main thing the article teaches.
- `entities`: services, problems, industries, places, methods, customers, tools, outcomes, and businesses.
- `graph role`: anchor, tactical prompt guide, comparison, local proof, use-case explainer, technical proof, or standard/spec article.
- `search intent`: the question the page should answer directly.
- `information gain`: what the page says that a generic AI article does not.
- `next action`: what the reader should do after understanding the page.

## Content Shape

Use block types from `src/lib/articles.ts`. Prefer:

- A direct `answer` block near the top.
- At least one `table` block that helps diagnose, compare, or decide.
- Specific `section` blocks with useful distinctions.
- A `callout` warning for common expensive mistakes when relevant.
- A `checklist` for implementation or decision readiness when relevant.
- `prompt` blocks for tactical articles where readers expect copyable prompts.
- FAQs only when the article visibly answers those questions.

Common block shapes:

```ts
{ type: 'answer', body: '...' }
{ type: 'section', id: '...', eyebrow: '...', title: '...', body: ['...'] }
{ type: 'table', id: '...', title: '...', columns: ['...'], rows: [['...']] }
{ type: 'callout', title: '...', body: '...', tone: 'warning' }
{ type: 'checklist', id: '...', title: '...', items: ['...'] }
{ type: 'prompt', id: '...', title: '...', helper: '...', body: '...' }
```

## Knowledge Graph Work

Treat internal links as graph edges. Do not use generic "read more" links.

Choose links that satisfy at least two of these when possible:

- Up to the broad workflow anchor.
- Sideways to a related entity, place, industry, or comparison.
- Down to a practical playbook or prompt guide.
- Forward to a conversion route only when the article naturally creates that next action.

Each link must include a `reason` that names the relationship:

```ts
{
  label: 'Build a Business Brain first',
  href: '/articles/business-brain-free',
  reason: 'Shows the durable context layer an AI Employee or agent-readable knowledge system needs before automation.'
}
```

When adding the node in `src/lib/articleKnowledgeGraph.ts`:

- Use a new stable ID (`E9`, `E10`, etc.) for published articles.
- Set `status: 'published'`.
- Set `href` to `/articles/<slug>`.
- Use `connectsTo` to encode related node IDs, not URLs.
- Keep `description`, `mechanism`, `topic`, and `audience` concrete.
- Add the article to the most relevant `articleTopicGroups`.

If the article introduces a durable new use case, place, industry, or concept family, update `src/lib/knowledge/entities.ts` only when it should become a first-class concept. Do not create ad-hoc concept types without updating `ALLOWED_CONCEPT_TYPES` and the OKF validation rationale.

## File Pattern

Create:

```text
src/lib/knowledge/articles/<slug>.ts
```

Export:

```ts
import type { ArticleDefinition } from '../../articles';

export const article: ArticleDefinition = {
  slug: '<slug>',
  title: '...',
  description: '...',
  dek: '...',
  datePublished: 'YYYY-MM-DD',
  dateModified: 'YYYY-MM-DD',
  authorName: 'AMTECH AI',
  readingTime: 'X min read',
  category: 'strategy',
  audience: '...',
  primaryEntity: { name: '...', type: 'method' },
  entities: [],
  internalLinks: [],
  citations: [],
  faqs: [],
  blocks: [],
};
```

Add it to:

```text
src/lib/knowledge/articles/index.ts
```

Create:

```text
src/pages/articles/<PascalCasePageName>.tsx
```

Use this wrapper pattern:

```tsx
import ArticlePage from '../../components/articles/ArticlePage';
import { useArticleHead } from '../../components/articles/useArticleHead';
import { article } from '../../lib/knowledge/articles/<slug>';

export default function ArticlePageName() {
  useArticleHead(article);
  return <ArticlePage article={article} />;
}
```

Add the route to `src/App.tsx`.

## Citation Rules

Use citations for official platform behavior, laws, regulations, policies, academic research, market statistics, Google/AI Overviews/OKF/schema.org claims, and third-party technical claims.

Prefer primary sources. For technical standards and platform behavior, use official docs when available. Paraphrase and cite; do not overquote. Keep the visible article useful even if the reader never opens the source.

## Generated Surfaces

Never hand-edit `public/okf/**`.

After article and graph edits, run:

```bash
npm run okf:check
npm run build
```

Expected generated or touched surfaces can include:

- `public/okf/articles/<slug>.md`
- `public/okf/articles/index.md`
- `public/okf/index.md`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/llms.txt`

Do not commit `dist/` unless the repo convention changes.

## Supabase Projection

The current architecture is façade-as-source, DB-as-projection. The browser does not write or query the `concepts*` tables.

When the user asks to keep the live Supabase projection current, or when publishing work is intended to ship fully:

1. Run `npm run okf:db:seed-sql`.
2. Apply the emitted SQL through a service-role-safe path.
3. Run `npm run okf:db:verify`.

Never place a service role key in `src/` or any `VITE_*` variable.
