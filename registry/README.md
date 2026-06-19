# Registry verification

`index.json` is the canonical repository catalog. `checksums.json` is a deterministic inventory of every file below each canonical `skills/<slug>/` folder. Generate it with `node registry/validate.mjs --write`; validate committed state with `node registry/validate.mjs --check`.

AMTECH Signed Artifact v1 uses Ed25519 over deterministic canonical JSON (`ed25519-canonical-json-v1`). A certificate identifies an owner and subject, then records SHA-256 and SHA3-512 digests for the subject bytes. The same subject/digest model can sign skill archives, arbitrary content, messages, repository updates, and status payloads.

For a signed skill, place `certificate.json` and `certificate.sig` under `registry/skills/<slug>/`. Validation verifies the signature with the committed public key, then checks the owner, skill and version, repository commit, repository path, and both digests of the deterministic canonical package payload. GitHub supplies source evidence and distribution; the domain-controlled AMTECH key is the signing authority. GitHub Actions attestations are not part of core verification.

## Two-phase release

Published packages remain `pending-resign` after canonical bytes change. The website maintainer must copy the canonical packages into `src/lib/skills/source/<slug>`, pin the Phase 1 commit, run `npm run skills:sign`, `npm run skills:check`, and `npm run build`, then deploy. A follow-up repository sync may mirror only certificates that validate against those exact bytes and commit, and then change status to `signed`.

Until both origins complete Phase 2, the packages are **update in progress**, not synchronized or currently verified.
