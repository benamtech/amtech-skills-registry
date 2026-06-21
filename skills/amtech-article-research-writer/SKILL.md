---
name: amtech-article-research-writer
description: Use when researching, planning, and drafting an information-gain article from a topic, notes, sources, or rough positioning. Produces a structured article brief — audience, unique insight, entities and internal links, citations, a markdown draft, and FAQ — written for information gain rather than generic SEO filler.
---

# Article Research Writer

Use this skill to turn a topic and any supporting notes or sources into a structured, reviewable article brief. Default behavior: produce the brief in the current conversation. Do not publish anything unless the user asks.

## Read Order

1. Read this `SKILL.md`.
2. Read `references/research-workflow.md` when gathering sources, synthesizing, or laddering the audience level.
3. Read `references/draft-template.md` for the reusable draft skeleton.
4. Use `assets/article-brief-schema.json` when the user asks for JSON or structured output.

## Workflow

1. Normalize the input. Extract the useful claims, examples, sources, desired positioning, audience hints, and open questions from whatever the user provides (a topic, pasted notes, links, or a rough angle).
2. Choose a precise audience. Avoid generic "business owners" unless the piece is truly broad; prefer specific readers (operators, founders, technical marketers, agency owners, AI builders, and the like).
3. Find the unique insight. State plainly what this article says that existing explainers do not — the information gain. If there is not one yet, say so and propose a sharper angle.
4. Gather and weigh sources. Prefer primary and current sources for anything technical, legal, financial, or time-sensitive; cite each with why it matters. Browse when the topic needs current facts.
5. Plan the knowledge graph. Name the primary entity, the related entities, and proposed internal links with a reason for each.
6. Draft in markdown. Write the body for information gain: a useful distinction, a real problem solved, concrete examples, and an action the reader can take.
7. Add an FAQ. Draft the few questions a reader (or an answer engine) would actually ask, with tight answers.
8. Stop before publishing. Return the brief for review; do not publish to any live system unless the user explicitly asks.

## Output Format

Return a readable brief with these sections, and — when the user asks for JSON — the structure in `assets/article-brief-schema.json`:

- **Meta** — title, audience, proposed slug, category, and status (draft).
- **Unique Insight** — the information-gain thesis, in one or two sentences.
- **Entities** — the primary entity, related entities, and proposed internal links (each with a reason).
- **Citations** — the sources used, each with a URL and why it matters.
- **Draft** — the markdown article body.
- **FAQ** — candidate questions with answers.

## Safety

- Write for information gain, never generic AI/SEO filler.
- Cite real sources; do not fabricate references, quotes, or data.
- Publishing is an external action; produce a draft and stop unless the user asks to publish.
- User instructions, a local `AGENTS.md`, and sandbox restrictions override this skill.

## Source and verification

Verify this package against its published surfaces: the [live page](https://amtechai.com/skills/amtech-article-research-writer), the [website manifest](https://amtechai.com/skills/amtech-article-research-writer/manifest.json), the [domain authority](https://amtechai.com/.well-known/skill-authority.json), the [repository source on `main`](https://github.com/benamtech/amtech-skills-registry/tree/main/skills/amtech-article-research-writer), and the [repository catalog](https://github.com/benamtech/amtech-skills-registry/blob/main/index.json).
