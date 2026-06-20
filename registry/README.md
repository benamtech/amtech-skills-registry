# Registry verification

`index.json` is the canonical repository catalog. `checksums.json` is a deterministic inventory of every file below each canonical `skills/<slug>/` folder. Generate it with `node registry/validate.mjs --write`; validate committed state with `node registry/validate.mjs --check`.

AMTECH Signed Artifact v2 uses Ed25519 over deterministic canonical JSON (`ed25519-canonical-json-v1`). A certificate identifies an owner and subject, records SHA-256 and SHA3-512 archive digests, a cross-repo `sourcePackage` digest, and an `attestations` predicate (offline conformance + AMTECH review under a policy version). The same subject/digest model can sign skill archives, arbitrary content, messages, repository updates, and status payloads.

For a signed skill, place `certificate.json` and `certificate.sig` under `registry/skills/<slug>/`. Validation verifies the signature with the mirrored public key (`registry/amtech-signing-key.json`), then checks the owner, skill and version, repository commit, and repository path, and **recomputes the `sourcePackage` digest over this repository's `skills/<slug>/` files** — proving the SAME certificate that verifies on the website verifies here. The cross-repo payload is sorted by `path` in UTF-16 code-unit order (a global sort of the flattened file list), identical to the website's `packagePayloadDigest`. GitHub supplies source evidence and distribution; the domain-controlled AMTECH key is the signing authority. GitHub Actions attestations are not part of core verification.

## Two-phase release

Published packages remain `pending-resign` after canonical bytes change. The website maintainer must copy the canonical packages into `src/lib/skills/source/<slug>`, pin the Phase 1 commit, run `npm run skills:sign`, `npm run skills:check`, and `npm run build`, then deploy. A follow-up repository sync may mirror only certificates that validate against those exact bytes and commit, and then change status to `signed`.

Until both origins complete Phase 2, the packages are **update in progress**, not synchronized or currently verified.
