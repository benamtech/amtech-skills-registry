# Knowledge Graph Method (for SEO and agent-readability)

The goal is a graph that makes a site legible to two readers at once: search systems that rank entities and relationships, and AI agents that traverse links to build context. The same structure serves both.

## Why a graph beats a page list

A page list answers "what content exists." A graph answers "what things exist and how they relate." Search systems (entity search, AI Overviews, query fan-out) and agents both reward the second. A site that names its entities consistently and links them with stated relationships is traversable; a site of isolated pages is not.

## What makes a node worth its own page

A node earns its own page when it satisfies at least two of these:

- **Distinct search intent.** Someone looks for exactly this thing, not a parent of it.
- **Standalone definition.** It can be explained on its own without collapsing into a neighbor.
- **Inbound demand.** Other nodes naturally need to link to it to be understood.
- **Information gain.** A page about it would say something a generic article would not.

If a node fails most of these, it is a `supporting` node (publish later) or an `attribute` (a property of another node, not a page). This is the discipline that keeps a large graph from becoming thin-content sprawl.

## Pillar / supporting / attribute

- **Pillar** — a page you would staff and maintain; the load-bearing entities of the domain. Few.
- **Supporting** — real and page-worthy once depth justifies it; the long tail that links up to pillars.
- **Attribute** — a genuine entity that lives *inside* another node (a feature, a spec, a sub-step). Named in the graph, not given a URL.

## Edges are the product

An internal link that says "here is another page" wastes the relationship. An edge that says *how* two things relate is the SEO and agent signal. Use a small, consistent set of relationship verbs:

| Relationship | Use when |
| --- | --- |
| `depends on` | A needs B to function or make sense. |
| `explains` | A defines or teaches B. |
| `is a kind of` | A is a specialization of B (taxonomy). |
| `part of` | A is a component of B (composition). |
| `contrasts with` | A is the comparison/alternative to B. |
| `serves` | A is used by / for customer or industry B. |
| `produces` | A yields outcome B. |
| `located in` | A operates in place B. |

The relationship reason becomes the anchor-text guidance for the internal link and the prose that an agent reads to understand the connection. Write it as a sentence, not a label.

## Internal-linking plan

From the edges, derive concrete links:

- **Up** — supporting nodes link up to their pillar.
- **Sideways** — pillars link to related pillars they contrast with or depend on.
- **Down** — pillars link down to the supporting nodes and use cases that prove them.

Anchor text comes from the relationship reason. Never "click here" or "read more."

## Structured data per pillar

Each pillar maps to a schema.org type:

- A service → `Service` (+ `areaServed`, `provider`).
- A product → `Product`.
- A location → `Place` / `LocalBusiness`.
- A how-to → `HowTo`. A Q&A cluster → `FAQPage`. An explainer → `Article`.

The JSON-LD makes the entity and its relationships explicit in the first-fetch surface, which is exactly what agents and entity search consume.

## Common failure modes

- **Vague nodes.** "Marketing," "AI," "solutions" — not entities. Split or cut.
- **Orphan nodes.** No edges in or out. Either connect or remove.
- **Edge soup.** Everything links to everything with no reasons. Fewer edges, each with a stated relationship.
- **Pillar inflation.** Forty pillars means none are pillars. Pick the load-bearing few.
- **One-page collapse.** Cramming the whole graph onto one page. The point is many connected nodes, not one long article.
