---
name: amtech-article-research-writer
description: Research, plan, and draft AMTECH-standard articles from topics, pasted notes, markdown, HTML, XML, JSON, source links, repo docs, or rough positioning. Use when Codex needs to create information-gain article drafts, multi-article plans, research packets, or AMTECH-style knowledge-graph/OKF-aware content that should synthesize unique insights, map audience levels, cite sources, propose graph relationships, and produce a polished markdown draft before publishing to the live article system.
---

# AMTECH Article Research Writer

Use this skill to create a reviewable markdown article draft, not a live `/articles` publish, unless the user explicitly asks to publish.

## Core Rule

Write for information gain. The article must make a useful distinction, solve a real problem, connect entities, and leave the reader with an action they can take. Do not produce generic AI/SEO content.

## Required Local Context

Read these before drafting:

1. `docs/memory/status-2026-06-18--2254.md`
2. `docs/skills/amtech-article-publisher/SKILL.md`
3. `docs/ARTICLE_SYSTEM.md`
4. `docs/seo/KNOWLEDGE_GRAPH_SEO_RESEARCH.md`
5. `docs/okf/07-future-article-notes.md` for OKF/agentic-search topics
6. `docs/codegraph.md` when the article should reference AMTECH's implementation or repo architecture

If the topic is current, technical, academic, legal, financial, or platform-specific, browse and cite primary/current sources.

## Workflow

1. **Normalize the input.** Extract the useful claims, examples, sources, desired positioning, audience hints, and unresolved questions from any pasted text or file format.
2. **Place the article in the knowledge system.** Decide whether it is a beginner explainer, tactical prompt guide, comparison, technical proof, standard/spec piece, or flagship theory article. Identify where it sits relative to existing AMTECH articles, OKF surfaces, codegraph/docs, and future graph nodes.
3. **Choose the audience level.** Avoid generic "business owners" unless the article is truly broad. Prefer precise audiences: founders, operators, technical marketers, SEO strategists, agency owners, content operators, AI builders, local service operators, etc.
4. **Build the research packet.** Combine local AMTECH docs with external sources. Use primary sources and academic papers when possible; include casual/industry sources only when they add market framing.
5. **Find the unique insight.** State what this article says that existing explainers do not. For AMTECH, this often means "OKF is a portable projection, not the whole system" or "one canonical model can generate many discovery surfaces."
6. **Plan graph relationships.** Define primary entity, related entities, proposed internal links with reasons, external citations, and candidate graph role.
7. **Write the draft in markdown.** Include a validity check, article body, FAQ candidates, research appendix, and candidate `ArticleDefinition` metadata.
8. **Stop before live publish.** Do not edit `src/lib/knowledge/articles/*`, `src/App.tsx`, `src/lib/articleKnowledgeGraph.ts`, or generated OKF outputs unless the user explicitly asks to publish.

## Output Location

Write drafts to:

```text
docs/article-drafts/<slug>.md
```

Use lowercase hyphenated slugs. Include draft status at the top.

## Draft Shape

Use this order:

1. Draft metadata: title, date, status, proposed slug/category/audience.
2. Validity check before publishing.
3. Proposed graph role.
4. Proposed entities.
5. Proposed internal links with relationship reasons.
6. Proposed external citations.
7. Article body.
8. FAQ draft.
9. Research appendix with local and external references.
10. Candidate `ArticleDefinition` metadata.

See `references/draft-template.md` for the reusable skeleton.

## Synthesis Standards

Use the ladder:

- **Beginner explainer:** simple vocabulary, strong analogy, immediate action.
- **Tactical article:** copyable prompts, checklists, examples, concrete payoff.
- **Advanced/LinkedIn-style article:** deeper thesis, sharper market framing, still plain and useful.
- **Flagship standard article:** original synthesis across AMTECH implementation, research, graph theory, search behavior, and agent workflows.

For multi-article plans, map each article to a different awareness level. Do not cram every insight into the first piece.

## AMTECH Tone

Keep the charm simple: direct, practical, confident, specific. Use short sentences when explaining new concepts. Avoid academic fog, hype, and vendor-speak. Make the advanced idea feel usable.

## Reference Files

- `references/research-workflow.md`: deeper procedure for source gathering, synthesis, audience laddering, and graph placement.
- `references/draft-template.md`: markdown skeleton for draft articles.
