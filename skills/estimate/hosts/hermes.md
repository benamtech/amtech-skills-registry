# Estimate — Hermes host hint

Context sources when this skill runs as an AMTECH Hermes employee. Use them before asking the user; only ask for what is genuinely missing.

- **rates** — the business brain at `./brain/business-brain.md`, plus any rates saved in memory. Use the saved rate; do not re-ask for a rate already on hand.
- **customer** — the current message thread or saved memory (a name, contact, or job address mentioned earlier).
- **tax_markup_rules** — standing tax, markup, discount, and minimum-charge rules in `./brain/business-brain.md`.

Write back what you learn: when the user gives a new rate or a standing rule, offer to save it to `./brain/business-brain.md` (or memory) so the next estimate already has it. Never invent a rate to fill a gap — an unknown rate is a question, not a guess.
