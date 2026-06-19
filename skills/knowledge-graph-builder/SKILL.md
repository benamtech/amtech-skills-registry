---
name: knowledge-graph-builder
description: Use when you need to generate a large knowledge graph for SEO and AI-readable content from a business, website, product, or topic — typed entity nodes, relationship edges with reasons, the priority concepts worth their own pages, an internal-linking plan, and JSON-LD scaffolding. The output is the entity-SEO and agent-readability foundation a site publishes against.
---

# Knowledge Graph Builder

Use this skill to turn a business, website, product, or topic into a large, structured knowledge graph that a team can use for entity SEO and agent-readable content. The graph is the source: from it you derive pages worth publishing, internal links, structured data, and an OKF-style concept bundle.

This is the inverse of an audit. An audit scores what exists; this builds the graph that should exist.

Default behavior: produce the graph in the current conversation. Do not create files or call tools unless the user asks or the environment clearly supports it.

## Inputs You Can Work From

- A business description (what it does, who it serves, where).
- A website URL or sitemap.
- A product, service, or topic area.
- An existing content list or keyword set.

If the input is thin, ask up to three targeted questions (what it does, who the customer is, what outcomes it sells) and then proceed — do not stall.

## Read Order

1. Read this `SKILL.md`.
2. Read `references/knowledge-graph-method.md` for what makes a node worth publishing, how to type entities, and how to write relationship edges that carry meaning.
3. Read `references/entity-types.md` for the controlled type vocabulary and how to choose a type.
4. Use `assets/graph-schema.json` when the user wants JSON or a graph another tool can ingest.

## Build Workflow

1. **Frame the domain.** Name the business/site, its primary audience, and the core outcomes it produces. This is the graph's center of gravity.
2. **Extract entities.** Pull every distinct thing the domain is about: services, methods, tools, problems, outcomes, places, industries, customer types, and use cases. Name them consistently. Aim for breadth — a useful SEO graph is large (often 40–150 nodes), not a handful.
3. **Type every entity** using the controlled vocabulary in `references/entity-types.md`. One type per node. A node that resists typing is usually two nodes or a non-entity.
4. **Choose node-worthiness.** Mark each entity as `pillar` (deserves its own page now), `supporting` (a page once depth justifies it), or `attribute` (real, but lives inside another node, not its own page). Most nodes are supporting/attribute; pillars are few and strategic.
5. **Draw edges with reasons.** For each meaningful pair, write a directed edge with a one-line relationship reason (`depends on`, `explains`, `is a kind of`, `contrasts with`, `serves`, `produces`, `located in`). The reason is the SEO and agent-readability payload — an edge without a stated relationship is noise.
6. **Derive the internal-linking plan.** Turn pillar→pillar and pillar→supporting edges into concrete internal links, each with anchor-text guidance taken from the relationship reason (never "read more").
7. **Scaffold structured data.** For each pillar node, name the schema.org type (Service, Product, Place, Organization, FAQPage, HowTo, Article) and the key properties to populate. Emit JSON-LD stubs when asked.
8. **Emit OKF concept stubs** when the user wants portability: one markdown concept file per pillar/supporting node with `type`, `title`, `description`, `tags`, and its outbound edges.

## Quality Rules

- **Breadth then discipline.** Generate widely, then cut vague, duplicate, or unprovable nodes. A node must name a real, distinct thing.
- **No orphans.** Every node connects to at least one other node. An isolated node is a dead end for crawlers and agents.
- **Edges carry reasons.** A relationship without a stated reason is not an edge.
- **Specificity wins.** "AI" is not an entity; "QuickBooks CSV margin analysis for an independent pharmacy" is several. Name the concrete things.
- **Pillars are scarce.** If everything is a pillar, nothing is. Pillars are the pages you would actually staff and maintain.

## Output

Return, in order:

1. **Domain frame** — one paragraph: what the graph is about and who it serves.
2. **Entity table** — name, type, node-worthiness, one-line description.
3. **Edge list** — source → target, relationship reason.
4. **Pillar pages to publish** — the priority nodes, why each earns a page, and its target search intent.
5. **Internal-linking plan** — link, anchor-text guidance, relationship.
6. **Structured-data scaffolding** — schema.org type + key properties per pillar.
7. **Copy-paste build prompt** — a prompt the user can hand to a writing or publishing agent to produce the first pillar pages from this graph.

When the user asks for machine output, return JSON conforming to `assets/graph-schema.json`.

## Safety And Local Rules

- User instructions, repo `AGENTS.md`, local project rules, and sandbox restrictions override this skill.
- If you can only browse the web, work from the fetched page or description in context.
- If you can write files and the user wants the OKF bundle, ask before creating a folder.
- Do not invent facts about the business; mark assumptions as assumptions so they can be corrected.
