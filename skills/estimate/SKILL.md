---
name: estimate
description: Use when {{SUPERVISOR_NAME}} asks to create, draft, price, or send an estimate or quote for a job. Covers gathering scope, pulling rates, computing a total, and producing a clean estimate file.
version: 1.0.0
---

# Estimate

Produce a clean, accurate price estimate for a job and save it as a file. Do not send it to a customer without explicit confirmation.

## Procedure

1. Identify the job. Get the customer (or note it is a blank template), the scope of work, and any measurements, quantities, or materials. If a critical input is missing and you cannot reasonably assume it, ask {{SUPERVISOR_NAME}} one tight question.
2. Pull rates from `./brain/business-brain.md` (Pricing and rates). If a needed rate is not recorded, ask for it, then write it back to the brain so the next estimate has it.
3. Build the line items: labor, materials, and any standard fees or minimums. Show quantity, unit, unit price, and line total for each.
4. Compute the subtotal, any tax or markup that applies, and the grand total. Check the arithmetic.
5. Save the estimate to `./output/estimates/` as a dated, named file (for example `2026-06-18_smith-kitchen.md`).
6. Report to {{SUPERVISOR_NAME}}: the customer, the job in a few words, and the total. Offer to send it. Do not send until they say yes.

## Pitfalls

- Never invent a rate. An estimate built on a guessed price is worse than no estimate.
- Do not silently drop a line item you are unsure about. Flag it.
- Sending to a customer is an external action. It goes through the confirmation gate every time.

## Verification

- Every line item has a quantity, a unit price, and a line total.
- Subtotal, tax/markup, and grand total add up.
- The customer and the job are named on the estimate.
- The file is saved under `./output/estimates/`.
