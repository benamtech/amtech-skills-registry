# OKF Audit Rubric

Use this rubric to score articles, sites, drafts, markdown bundles, and OKF-like knowledge packages.

## Scoring

Score each category from 0 to 5.

- 0: absent or actively misleading.
- 1: present only as vague prose.
- 2: partially present but not usable by an agent without interpretation.
- 3: usable with gaps.
- 4: strong and mostly complete.
- 5: excellent, explicit, and easy for agents and humans to verify.

## Categories

### 1. First-Fetch Clarity

The exact URL a user shares should tell an AI what the page is, what task it supports, and what to do next.

Strong signals:

- Clear title and H1.
- The opening paragraph names the task and audience.
- If it is a tool/skill, visible agent instructions appear near the top.
- Critical links are in body text, not hidden behind scripts.

### 2. Concept Packaging

The content should identify the core concept, related concepts, and practical scope.

Strong signals:

- One page or markdown file maps to one durable concept.
- Frontmatter or metadata names title, description, type, tags, updated date, and source URL.
- Definitions are stable enough to cite.
- The page makes clear what is in scope and out of scope.

### 3. Entity And Relationship Coverage

The content should expose the people, places, industries, tools, use cases, and decisions it relates to.

Strong signals:

- Explicit links to related concepts.
- Entity names are consistent.
- Relationships explain why two concepts connect.
- No important orphan concepts.

### 4. Source And Citation Quality

Claims should be traceable.

Strong signals:

- External sources are linked near the claims they support.
- Internal sources and source-of-truth files are named.
- Dates are concrete.
- Generated or inferred claims are labeled.

### 5. Materialized Views

Different consumers need different surfaces.

Strong signals:

- Human HTML page.
- Markdown or text view.
- JSON manifest or structured data.
- Sitemap and discovery links.
- Raw files or source package when relevant.
- Download/archive/checksum when the content is a reusable package.

### 6. Agent Execution Readiness

An AI should be able to act from the content.

Strong signals:

- The workflow is imperative and ordered.
- Inputs and outputs are explicit.
- Optional references are routed by use case.
- Failure modes and permission boundaries are stated.
- The page includes a copy-paste remediation prompt or action prompt.

## Overall Interpretation

- 26-30: agent-native and strong.
- 20-25: usable with targeted fixes.
- 14-19: promising but incomplete.
- 8-13: human-readable but weak for agents.
- 0-7: not agent-ready.
