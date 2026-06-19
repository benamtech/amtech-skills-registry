---
name: invoice
description: Use when {{SUPERVISOR_NAME}} asks to create, draft, or send an invoice for completed work. Covers pulling the job detail, building the invoice, and producing a file ready to send.
version: 1.0.0
---

# Invoice

Produce a clean invoice for completed work and save it as a file. Do not send it to a customer without explicit confirmation.

## Procedure

1. Identify the job and customer. If there is a matching estimate in `./output/estimates/`, start from it so the invoice reflects what was quoted, and note any agreed changes.
2. Confirm what was actually done versus quoted. If scope changed, capture the change and the reason.
3. Build the line items the same way as an estimate: quantity, unit, unit price, line total. Apply tax or fees per `./brain/business-brain.md`.
4. Add invoice essentials: an invoice number, the issue date, payment terms, and how to pay. Pull these from the brain; if terms are not recorded, ask once and record them.
5. Save to `./output/invoices/` as a dated, named file.
6. Report the customer, the job, the amount due, and the due date. Offer to send. Do not send until {{SUPERVISOR_NAME}} confirms.

## Pitfalls

- An invoice is a request for money. Accuracy matters more than on an estimate, not less. Re-check the total.
- Do not reuse an invoice number. Read the last one used from `./output/invoices/` and increment.
- Sending is external. Confirmation gate, every time.

## Verification

- Invoice number is unique and sequential.
- Amount due, due date, and payment method are present.
- Line items reconcile against the estimate or the recorded scope change.
- File saved under `./output/invoices/`.
