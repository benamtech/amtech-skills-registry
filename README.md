# AMTECH Agent Skills

Free, source-visible agent skills from AMTECH. Audit content for AI-readability, build a knowledge graph for SEO, run the operational skills that ship inside an AMTECH AI Employee, and inspect AMTECH's own article workflow skills.

**This git repository is the install source. The website is the view layer.** Published skills are materialized into human pages, manifests, file indexes, archives, and integrity hashes at **https://amtechai.com/skills/**, generated from these exact folders. The repo gives you the canonical source and a permanent, commit-pinned reference; the site gives agents and crawlers many ways to discover and verify the published packages.

> One source, many projections. A skill is not a single file or a single marketplace listing — it is a canonical package projected into the surface each consumer needs: a human page, raw `SKILL.md`, a manifest with hashes, a downloadable archive, an OKF concept node, and this git source tree. Find any one and you can climb to the whole package.

## Skills

### Agent tools (standalone, run in-context from one URL)

| Skill | What it does | Live page |
| --- | --- | --- |
| [`okf-audit`](skills/okf-audit) | Audit an article, site, draft, sitemap, `llms.txt`, or OKF bundle for AI-readable knowledge quality. Returns a score, findings, and a remediation prompt. | https://amtechai.com/skills/okf-audit |
| [`knowledge-graph-builder`](skills/knowledge-graph-builder) | Turn a business, site, or topic into a large knowledge graph for SEO: typed entities, relationships with reasons, pillar pages to publish, an internal-linking plan, and JSON-LD scaffolding. | https://amtechai.com/skills/knowledge-graph-builder |

### AI Employee operational skills (templates)

These ship inside a deployed AMTECH AI Employee. They are **templates**: `{{PLACEHOLDERS}}` (agent name, supervisor, workloads) are filled at provisioning, and they assume a working directory with `./brain/` (durable context) and `./output/` (work product). Read them to see how an AI Employee actually operates; instantiate them through provisioning, not by hand.

| Skill | What it does |
| --- | --- |
| [`daily-checkin`](skills/daily-checkin) | Scheduled morning/midday check-ins: surface what's worth the owner's attention, offer the highest-value work, stay silent when there's nothing useful to say. |
| [`estimate`](skills/estimate) | Create, price, and send an estimate or quote for a job. |
| [`invoice`](skills/invoice) | Build and send an invoice for completed work. |

### AMTECH content workflow skills

These packages are shared for inspection, reuse, and adaptation, but they reference files and conventions in the main AMTECH website repository.

They are currently repo-only packages; do not assume a corresponding `amtechai.com/skills/*` page exists until the website registry publishes one.

| Skill | What it does | Portability |
| --- | --- | --- |
| [`amtech-article-research-writer`](skills/amtech-article-research-writer) | Research, plan, and draft information-gain, knowledge-graph-aware AMTECH articles. | AMTECH-oriented; adaptable after replacing its local document and output-path references. |
| [`amtech-article-publisher`](skills/amtech-article-publisher) | Publish supplied copy into AMTECH's React article system, knowledge graph, OKF outputs, routes, and optional Supabase projection. | **Internal-first:** intended for use in the AMTECH website repository and not a generic publisher without substantial adaptation. |

## Using a skill

Every skill follows the open [Agent Skills](https://agentskills.io/specification) shape: a `SKILL.md` with `name` + `description` frontmatter, plus optional `references/`, `assets/`, and `agents/` metadata. Pick the path that fits your agent:

**1. Any agent, no install — paste a link.** Most agents can fetch a URL and follow instructions. Point one at the live page or raw `SKILL.md`:

```
Use AMTECH's free okf-audit skill. Fetch and follow:
https://amtechai.com/skills/okf-audit/use.md
Then audit: <paste a URL or text>
```

The site's `use.md` is a self-bootstrapping prompt: it tells the agent what to read, in what order, and how to inspect before doing anything.

**2. Codex `$skill-installer` — install from this repo.** Point it at a skill folder's tree URL:

```
$skill-installer install https://github.com/amtechai/agent-skills/tree/main/skills/okf-audit
```

**3. Codex plugin marketplace — install the bundle.** Add this repo as a marketplace and install the `amtech-free-skills` plugin:

```
codex plugin marketplace add amtechai/agent-skills --ref main --sparse .agents/plugins
```

**4. Clone or copy.** Copy any `skills/<slug>/` folder into your own agent's skills directory. It is a complete, standalone skill folder.

**5. Download a versioned archive.** From the live page, e.g. `https://amtechai.com/skills/okf-audit/okf-audit-0.1.0.zip`, with `checksums.txt` alongside.

## Trust

- **Source-visible.** Every skill is plain, readable markdown and JSON. Inspect before you install or run.
- **No required scripts.** Every skill here is instruction-only (`scripts: none`). If a future version adds scripts, they ship with an inspectable script index and an ask-before-run policy.
- **Pin to a commit.** Branch URLs drift; for a reproducible install, use a tag or commit SHA, not `main`.
- **Cross-check the hash.** The website publishes a domain-controlled trust root at **https://amtechai.com/.well-known/skill-authority.json** listing the canonical archive SHA-256 for each published skill. The same hash appears in each skill page's `amtech:skill-sha256` meta tag and its `manifest.json`. If a copy's hash disagrees with the authority file, treat it as untrusted.
- **License.** MIT (see [`LICENSE`](LICENSE)). Use, modify, and redistribute freely.

## Repo layout

```
index.json                                  machine-readable catalog of every skill
skills/<slug>/                              canonical Agent Skills folders ($skill-installer / clone targets)
.agents/plugins/marketplace.json           Codex plugin marketplace catalog
plugins/amtech-free-skills/.codex-plugin/plugin.json   the installable plugin bundle
LICENSE                                      MIT
```

> **Maintainer note:** the Codex plugin/marketplace JSON here is a working scaffold. Codex's plugin schema evolves — verify the field names in `marketplace.json` and `plugin.json` against the current Codex manual before publishing, and replace `amtechai/agent-skills` with the real repo path once this folder is pushed.
