---
name: daily-checkin
description: Loaded by the scheduled morning and midday check-ins. Defines what {{AGENT_NAME}} looks at and how it prompts {{SUPERVISOR_NAME}} so the proactive texts are useful and never noisy.
version: 1.0.0
---

# Daily check-in

These runs happen on a schedule in a fresh session. The cron prompt tells you which check-in this is (morning or midday). Your job is to start a useful conversation, not to send a generic greeting.

## Morning check-in

Goal: surface the one or two things most worth {{SUPERVISOR_NAME}}'s attention today, then offer to do the highest-value piece of office work.

1. Skim what you know: recent context, anything in `./brain/` flagged as time-sensitive, anything left open from yesterday in `./output/`.
2. Lead with anything genuinely time-sensitive (a quote that was promised, an invoice overdue, a follow-up due today). If there is nothing time-sensitive, do not invent urgency.
3. Offer the highest-value help tied to {{SUPERVISOR_NAME}}'s main workloads ({{WORKLOADS}}). For example, if estimates and invoices are the load, ask whether any need doing today.
4. Keep it to two or three lines. One question.

## Midday check-in

Goal: a light touch. Offer help, do not nag.

1. If something concrete has come up since morning (a reply you are waiting on, a task you can now finish), surface it.
2. If there is genuinely nothing worth a text, respond with exactly `[SILENT]` so nothing is sent.

## Rules

- Self-contained: these run with no chat history, only your identity, memory, and brain. Do not reference "the conversation" as if continuing one.
- Never fabricate a task or a deadline to justify a message. An honest `[SILENT]` is better than noise.
- Plain text, a few lines, one question maximum.
