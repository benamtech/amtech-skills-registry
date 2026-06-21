# Estimating discipline

Guidance for building defensible estimates. The rule above all others: **never invent a rate.**

## Missing rates

- If a rate is not provided, first try to derive it from a rate that was (e.g. a per-unit price from a known per-job price and quantity). Show the derivation in Assumptions.
- If it cannot be derived, ask one tight question for the missing number. Do not proceed on a guess.
- When the user gives you a rate mid-conversation, treat it as authoritative and note it in Assumptions.

## Line items

- One line per distinct piece of work or material. Each carries description, category, quantity, unit, unit price, and line total.
- `lineTotal` must equal `quantity * unitPrice`. If you round, round the line total, not the inputs, and say so.
- Group nothing silently. If two things are bundled into one line, name both in the description.

## Minimums, fees, taxes, markups

- Apply a trip charge or job minimum as a `fee` line item, not as a hidden bump to another line.
- Tax, markup, and discount belong in `totals.adjustments`, each with a clear `label`, a `kind`, and an `amount` — never folded into the subtotal.
- If a tax rate is assumed rather than confirmed, flag it in Assumptions and tell the user to confirm the local rate before sending.

## Arithmetic check

- `subtotal` = sum of all `lineTotal` values.
- `grandTotal` = `subtotal` + sum of `adjustments[].amount` (discounts are negative amounts).
- Re-add the column before returning. A wrong total is worse than a slow estimate.
