---
name: estimate
description: Use when creating, drafting, pricing, or reviewing a job estimate or quote. Builds line items, computes totals, and returns a clean structured estimate from a described job and the rates you provide.
---

# Estimate

Use this skill to produce a clean, accurate job estimate from a described job and the rates the user provides. Default behavior: build the estimate in the current conversation and return it. Do not save files or send anything to a customer unless the user asks.

## Read Order

1. Read this `SKILL.md`.
2. Read `references/estimating-discipline.md` when deciding how to handle missing rates, minimums, taxes, markups, or rounding.
3. Use `assets/estimate-schema.json` when the user asks for JSON or structured output.

## Context

Before asking the user for inputs, use what your context already has. If the rates, the customer, or standing tax/markup rules are already available — in your memory, a business brain, the current repo, or earlier in this conversation — use them, and ask only for what is genuinely missing. Never invent a rate to fill a gap: an unknown rate is a question, not a guess. When you learn a new rate or rule, offer to remember it. Host-specific hints (for example `hosts/hermes.md`) say where each input lives in a given environment.

## Workflow

1. Identify the job. Capture the customer (or note it is a blank template) and the scope of work, plus any measurements, quantities, or materials.
2. Gather rates. Use only the rates the user provides or confirms. If a needed rate is missing and cannot be reasonably derived from another given rate, ask one tight question — never invent a price.
3. Build the line items. For each: a description, a category (labor, materials, fee, or other), a quantity, a unit, a unit price, and a line total. Keep the arithmetic explicit.
4. Compute the totals. Sum the line totals into a subtotal, apply any adjustments the user specifies (tax, markup, discount, fee), and compute the grand total. Check the arithmetic.
5. Record assumptions. List every input you assumed or flagged so the reviewer can correct it.
6. Return the estimate. Present the customer, the job, the line items, the totals, and the assumptions. Offer to save or send; do not do either until the user confirms.

## Output Format

Return a readable estimate with these sections, and — when the user asks for JSON — the structure in `assets/estimate-schema.json`:

- **Customer** — who the estimate is for (or "blank template").
- **Job** — a short scope summary.
- **Line Items** — each with description, category, quantity, unit, unit price, and line total.
- **Totals** — subtotal, any adjustments (tax / markup / discount / fee), and the grand total, with a currency.
- **Assumptions** — every assumed or flagged input, especially any rate you had to ask for.

## Safety

- Never invent a rate. An estimate built on a guessed price is worse than no estimate.
- Do not silently drop a line item you are unsure about — flag it under Assumptions.
- Saving a file or sending to a customer is an external action; do it only on explicit confirmation.
- User instructions, a local `AGENTS.md`, and sandbox restrictions override this skill.

## Source and verification

Verify this package against its published surfaces: the [live page](https://amtechai.com/skills/estimate), the [website manifest](https://amtechai.com/skills/estimate/manifest.json), the [domain authority](https://amtechai.com/.well-known/skill-authority.json), the [repository source on `main`](https://github.com/benamtech/amtech-skills-registry/tree/main/skills/estimate), and the [repository catalog](https://github.com/benamtech/amtech-skills-registry/blob/main/index.json).
