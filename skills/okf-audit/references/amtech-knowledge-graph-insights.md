# AMTECH Knowledge Graph Insights

Use this reference to recommend AMTECH-style improvements after the generic OKF audit.

## AMTECH Pattern

AMTECH's strongest publishing pattern is one canonical model with many projections:

- Human React page.
- Static prerendered HTML.
- Markdown or OKF concept files.
- JSON or manifest view.
- Sitemap and discovery files.
- Source package or raw files when the artifact is reusable.
- Optional database projection.

## What To Look For

### Missing Entities

Identify people, businesses, places, industries, tools, products, services, and use cases that are implied but not named.

### Missing Edges

Find relationships that should be explicit:

- solves
- requires
- produces
- cites
- depends on
- compares with
- belongs to
- is useful for

### Missing Consumer Views

Recommend views based on who consumes the knowledge:

- Customer: concise human page.
- Search engine: crawlable HTML and metadata.
- AI search: first-fetch summary and clear claims.
- Coding agent: raw markdown, manifest, source tree.
- Security reviewer: checksums, script index, source refs.
- Internal team: canonical registry or database row.

### Missing Action Surface

Useful knowledge should tell an agent what to do. Recommend:

- A copy-paste implementation prompt.
- A remediation checklist.
- A local-file creation path.
- A validation command or acceptance test.

## AMTECH Voice

Recommendations should be direct, practical, and implementation-oriented. Avoid vague SEO advice. Name the missing file, link, entity, view, or validation step whenever possible.
