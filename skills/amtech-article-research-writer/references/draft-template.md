# AMTECH Article Draft Template

Use this structure for `docs/article-drafts/<slug>.md`. Do not wrap the whole draft in a code fence.

## Header

```md
# Draft: [Title]

Draft date: YYYY-MM-DD
Draft status: not yet published to `/articles`
Proposed slug: `[slug]`
Proposed category: `[first-action|local-condition|material-surface|compliance|comparison|field-note|strategy]`
Proposed audience: [specific audience]
```

## Validity Check

```md
## Validity Check Before Publishing

### Article Requirement Fit

| Requirement | Draft plan |
| --- | --- |
| Direct answer near the top | ... |
| Diagnostic or decision framework | ... |
| Specific useful distinctions | ... |
| What not to do | ... |
| DIY/internal threshold vs expert threshold | ... |
| Internal links with reasons | ... |
| External citations | ... |
| FAQ candidates | ... |
| Schema compatibility | ... |
```

## Graph Metadata

```md
### Proposed Graph Role

Role: [anchor / explainer / tactical guide / technical proof / standard-spec / bridge]

Primary entity:

- `[entity]`, type: `[business|service|problem|industry|place|method|customer|tool|outcome]`

Related entities:

- `[entity]`, type: `[type]`
```

```ts
{
  id: 'E_NEXT',
  title: '...',
  slug: '...',
  href: '/articles/...',
  type: 'EXISTING',
  typeLabel: '...',
  status: 'published',
  uc: '...',
  mechanism: '...',
  audience: '...',
  topic: '...',
  description: '...',
  connectsTo: []
}
```

## Link And Source Plan

```md
### Proposed Internal Links

| Link | Reason |
| --- | --- |
| `/articles/...` | ... |

### Proposed External Sources

1. Source - URL

### Publication Notes

If this moves from draft to live article:

1. Convert body into `ArticleDefinition`.
2. Add route and wrapper page.
3. Add/update graph node.
4. Run `npm run okf:check`, `npm run typecheck`, and `npm run build`.
```

## Article Body

```md
---

# [Article Title]

[Hook and direct answer.]

## [Section]

[Body.]

## [Decision Table / Diagnostic]

| ... | ... |
| --- | --- |
| ... | ... |

## [Concrete Example]

[Example.]

## [What Not To Do]

[Warning.]

## [First Action / Prompt / Checklist]
```

```text
[Prompt or checklist]
```

```md
## FAQ Draft

### [Question]

[Answer.]
```

## Research Appendix

```md
---

## Research Appendix

### External Research And Platform References

- [Source summary and URL]

### AMTECH Internal References

- `[local path]` - [why it matters]

### Candidate ArticleDefinition Metadata
```

```ts
{
  slug: '...',
  title: '...',
  description: '...',
  dek: '...',
  datePublished: 'YYYY-MM-DD',
  dateModified: 'YYYY-MM-DD',
  authorName: 'AMTECH AI',
  readingTime: '...',
  category: 'strategy',
  audience: '...',
  primaryEntity: { name: '...', type: 'method' },
  entities: []
}
```
