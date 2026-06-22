---
name: okf-audit
description: Use when auditing an article, website, draft, sitemap, llms.txt file, markdown bundle, or OKF bundle for AI-readable knowledge quality, OKF-style concept packaging, entity coverage, citations, internal links, materialized views, and AMTECH knowledge graph improvements.
---

# OKF Audit

Use this skill to audit content for agent-readable knowledge quality. The user may provide a URL, pasted text, article draft, sitemap, `llms.txt`, markdown bundle, or OKF bundle.

Default behavior: use the skill in the current conversation. Do not install or create files unless the user asks or the environment clearly requires it.

## Read Order

1. Read this `SKILL.md`.
2. Read `references/okf-audit-rubric.md` when scoring or explaining findings.
3. Read `references/agent-readable-content-checklist.md` when reviewing first-fetch HTML, snippets, markdown views, manifests, or discovery files.
4. Read `references/amtech-knowledge-graph-insights.md` when recommending AMTECH-style entity graph or materialized-view improvements.
5. Use `assets/report-schema.json` only when the user asks for JSON or structured output.

## Audit Workflow

1. Identify the submitted surface: article, whole website, draft text, sitemap, OKF bundle, skill package, or mixed input.
2. Summarize what the content is trying to teach or enable.
3. Check whether the first fetched surface gives an AI enough context to act without hunting through adjacent files.
4. Extract core concepts, entities, relationships, audience, tasks, citations, and intended actions.
5. Score the content against the rubric.
6. Identify missing materialized views: HTML, markdown, JSON, manifest, sitemap, `llms.txt`, raw source, archive, API endpoint, or hosted tool.
7. Recommend concrete fixes in priority order.
8. End with a copy-paste remediation prompt the user can give to an implementation agent.

## Output Format

Return:

```markdown
## Summary

## Score
- Overall:
- OKF/agent-readability:
- Entity graph:
- Discovery/rendering:
- Trust/source quality:

## Findings

## Missing Concepts And Edges

## Materialized View Opportunities

## Priority Fixes

## Copy-Paste Remediation Prompt
```

If the user asks for JSON, follow `assets/report-schema.json`.

## Safety And Local Rules

- User instructions, repo `AGENTS.md`, local project rules, and sandbox restrictions override this skill.
- If you can only browse the web, use the fetched skill text in context.
- If you can write files and the user wants reuse, ask before creating a local skill folder.
- If scripts are added in a future version, inspect them and ask before running them.
- Do not claim a site is OKF-compliant unless the required machine-readable files and relationships are actually present.

## Source and verification

Verify this package against its published surfaces: the [live page](https://amtechai.com/skills/okf-audit), the [website manifest](https://amtechai.com/skills/okf-audit/manifest.json), the [domain authority](https://amtechai.com/.well-known/skill-authority.json), the [repository source on `main`](https://github.com/benamtech/amtech-skills-registry/tree/main/skills/okf-audit), and the [repository catalog](https://github.com/benamtech/amtech-skills-registry/blob/main/index.json).
