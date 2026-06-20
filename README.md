# AMTECH Agent Skills

Free, source-visible agent skills from AMTECH. Audit content for AI-readability, build a knowledge graph for SEO, run the operational skills that ship inside an AMTECH AI Employee, and inspect AMTECH's own article workflow skills.

**This git repository is the install source. The website is the view layer.** Published skills are materialized into human pages, manifests, file indexes, archives, and integrity hashes at **https://amtechai.com/skills/**, generated from these exact folders. The repo gives you the canonical source and a permanent, commit-pinned reference; the site gives agents and crawlers many ways to discover and verify the published packages.

> One source, many projections. A skill is not a single file or a single marketplace listing — it is a canonical package projected into the surface each consumer needs: a human page, raw `SKILL.md`, a manifest with hashes, a downloadable archive, an OKF concept node, and this git source tree. Find any one and you can climb to the whole package.

## Skills

### Agent tools (standalone, run in-context from one URL)

| Skill | What it does | Website discovery |
| --- | --- | --- |
| [`okf-audit`](skills/okf-audit) | Audit an article, site, draft, sitemap, `llms.txt`, or OKF bundle for AI-readable knowledge quality. Returns a score, findings, and a remediation prompt. | [Live page](https://amtechai.com/skills/okf-audit) · [Manifest](https://amtechai.com/skills/okf-audit/manifest.json) · **signed & verified** |
| [`knowledge-graph-builder`](skills/knowledge-graph-builder) | Turn a business, site, or topic into a large knowledge graph for SEO: typed entities, relationships with reasons, pillar pages to publish, an internal-linking plan, and JSON-LD scaffolding. | [Live page](https://amtechai.com/skills/knowledge-graph-builder) · [Manifest](https://amtechai.com/skills/knowledge-graph-builder/manifest.json) · **signed & verified** |

### AI Employee operational skills (templates)

These ship inside a deployed AMTECH AI Employee. They are **templates**: `{{PLACEHOLDERS}}` (agent name, supervisor, workloads) are filled at provisioning, and they assume a working directory with `./brain/` (durable context) and `./output/` (work product). Read them to see how an AI Employee actually operates; instantiate them through provisioning, not by hand.

| Skill | What it does | Website discovery |
| --- | --- | --- |
| [`daily-checkin`](skills/daily-checkin) | Scheduled morning/midday check-ins: surface what's worth the owner's attention, offer the highest-value work, stay silent when there's nothing useful to say. | [Skills hub](https://amtechai.com/skills) — **repository-only** |
| [`estimate`](skills/estimate) | Create, price, and send an estimate or quote for a job. | [Skills hub](https://amtechai.com/skills) — **repository-only** |
| [`invoice`](skills/invoice) | Build and send an invoice for completed work. | [Skills hub](https://amtechai.com/skills) — **repository-only** |

### AMTECH content workflow skills

These packages are shared for inspection, reuse, and adaptation, but they reference files and conventions in the main AMTECH website repository.

They are currently repo-only packages; do not assume a corresponding `amtechai.com/skills/*` page exists until the website registry publishes one.

| Skill | What it does | Portability and discovery |
| --- | --- | --- |
| [`amtech-article-research-writer`](skills/amtech-article-research-writer) | Research, plan, and draft information-gain, knowledge-graph-aware AMTECH articles. | AMTECH-oriented; [skills hub](https://amtechai.com/skills) — **repository-only**. |
| [`amtech-article-publisher`](skills/amtech-article-publisher) | Publish supplied copy into AMTECH's React article system, knowledge graph, OKF outputs, routes, and optional Supabase projection. | **Internal-first**; [skills hub](https://amtechai.com/skills) — **repository-only**. |

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
$skill-installer install https://github.com/benamtech/amtech-skills-registry/tree/main/skills/okf-audit
```

**3. Codex plugin marketplace — install the bundle.** Add this repo as a marketplace and install the `amtech-free-skills` plugin:

```
codex plugin marketplace add benamtech/amtech-skills-registry --ref main
```

Then open `/plugins` and install `amtech-free-skills` from the AMTECH marketplace.

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
plugins/amtech-free-skills/skills/          generated copies of the two published skills
registry/checksums.json                     deterministic SHA-256 and SHA3-512 file inventory
registry/validate.mjs                       generator and fail-closed validation entrypoint
LICENSE                                      MIT
```

## Release synchronization

Changing either website-published `SKILL.md` changes its signed subject digest, which resets the package to `pending-resign` until the website re-signs and the certificate is mirrored back. Both current packages are **signed & verified**: their `amtech-signed-artifact/v2` certificates verify here against the mirrored authority key, and the cross-repo `sourcePackage` digest recomputes from `skills/<slug>/` (so the same certificate verifies on the website and in this repository). See [`registry/README.md`](registry/README.md) for the Phase 2 website signing and follow-up certificate sync.
