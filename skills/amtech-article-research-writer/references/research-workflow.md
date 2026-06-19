# Research And Synthesis Workflow

Use this when the article needs deeper planning than a simple draft.

## 1. Source Layers

Collect sources in this order:

1. Local AMTECH source of truth: `docs/codegraph.md`, `docs/skills/amtech-article-publisher/SKILL.md`, `docs/okf/*.md`, `docs/seo/*.md`, current article drafts, and live article data when relevant.
2. Primary platform docs: Google Search Central, Google Cloud, schema.org, Supabase, OpenAI, etc.
3. Academic papers: knowledge graphs, virtual KGs, materialized graph views, graph projection/homomorphism, generative engine optimization, citation behavior.
4. Industry/casual sources: useful only for market framing, language, and examples.

For each source, capture the job it does in the article: definition, authority, contrast, proof, implementation detail, market timing, or caveat.

## 2. Audience Ladder

Before writing, choose the level:

| Level | Reader | Article job |
| --- | --- | --- |
| Intro | Smart but new to the concept | Give vocabulary and first action. |
| Practical | Builder/operator with a task | Give a checklist, prompt, or workflow. |
| Strategic | Founder, marketer, SEO lead, AI builder | Explain why the shift matters and what to do next. |
| Flagship | Advanced audience | Propose a new standard or mental model with evidence. |

If one topic has multiple audiences, split into a multi-article ladder instead of overloading one article.

## 3. Information-Gain Test

An AMTECH article should pass at least two:

- It gives a sharper distinction than common articles.
- It turns theory into a usable workflow.
- It reveals an implementation lesson from AMTECH's build.
- It connects platform changes to practical business action.
- It defines entities and relationships others leave vague.
- It includes a prompt, checklist, or diagnostic table readers can use.
- It cites sources competitors are unlikely to synthesize together.

Reject or reframe the article if the best version is just "what is X?" without a useful next move.

## 4. Graph Placement

Define:

- Primary entity.
- 5-10 related entities.
- Graph role: anchor, explainer, tactical guide, technical proof, comparison, local proof, standard/spec, or bridge article.
- Internal links and why each relationship exists.
- External citations as trust edges.
- Candidate node ID/status only if likely to publish later.

For OKF/agentic-search topics, remember the AMTECH thesis:

> OKF is the portable projection. The advantage is the validated entity graph that can generate OKF, queryable DB rows, prerendered HTML, JSON-LD, sitemap, robots, llms.txt, and human UX from one canonical model.

## 5. Writing Pattern

Use:

1. Hook: name the problem or timely shift.
2. Direct answer: define the concept in plain English.
3. Concrete example: show the reader what it looks like.
4. Distinction: explain what most people misunderstand.
5. Framework/table: give them a way to decide or act.
6. AMTECH insight: show the deeper implementation or graph lesson.
7. Practical next move: prompt, checklist, first file, first graph, first validation.
8. Caveat: what not to do.
9. FAQ: answer visible follow-up questions.

## 6. Quality Bar

The draft should be:

- Easy enough for a smart non-specialist to start.
- Interesting enough for a technical reader to share.
- Concrete enough that an agent can extract entities and relationships.
- Source-backed where it discusses current platforms, standards, or research.
- Useful even if the reader never becomes an AMTECH customer.
