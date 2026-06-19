#!/usr/bin/env node

import { createHash, createPublicKey, verify as verifySignature } from "node:crypto";
import { existsSync, readdirSync, readFileSync, rmSync, mkdirSync, copyFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const mode = process.argv[2] ?? "--check";
if (!["--check", "--write"].includes(mode)) throw new Error("usage: node registry/validate.mjs [--check|--write]");
const errors = [];
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const catalog = readJson("index.json");
const canonical = (value) => value === null || typeof value !== "object"
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? `[${value.map(canonical).join(",")}]`
    : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
const digest = (algorithm, bytes) => createHash(algorithm).update(bytes).digest("hex");
const filesUnder = (base) => {
  const out = [];
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).forEach((entry) => {
    if (entry.name === ".git") return;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.isFile()) out.push(path);
  });
  walk(base);
  return out;
};
const packagePayload = (skillPath) => Buffer.from(canonical(filesUnder(skillPath).map((path) => {
  const bytes = readFileSync(path);
  return { path: relative(skillPath, path).split("\\").join("/"), size: bytes.length, contentBase64: bytes.toString("base64") };
})));

const skillDirs = readdirSync(join(root, "skills"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
const catalogSlugs = catalog.skills.map((skill) => skill.slug).sort();
if (JSON.stringify(skillDirs) !== JSON.stringify(catalogSlugs)) errors.push("index coverage differs from canonical skills/* directories");
if (catalog.repository !== "https://github.com/benamtech/amtech-skills-registry") errors.push("repository metadata is stale");
if (catalog.site !== "https://amtechai.com/skills" || catalog.authority !== "https://amtechai.com/.well-known/skill-authority.json") errors.push("site or authority metadata is stale");
if (catalog.verification?.method !== "ed25519-canonical-json-v1" || JSON.stringify(catalog.verification?.digestAlgorithms) !== JSON.stringify(["SHA-256", "SHA3-512"])) errors.push("verification metadata is stale");
for (const path of filesUnder(root).filter((path) => path.endsWith(".json"))) {
  try { JSON.parse(readFileSync(path, "utf8")); } catch (error) { errors.push(`${relative(root, path)}: invalid JSON (${error.message})`); }
}
for (const path of filesUnder(root)) {
  const text = readFileSync(path, "utf8");
  if (/-----BEGIN (?:ENCRYPTED )?PRIVATE KEY-----/.test(text)) errors.push(`${relative(root, path)}: private key material is forbidden`);
}

const readme = readFileSync(join(root, "README.md"), "utf8");
for (const skill of catalog.skills) {
  if (skill.path !== `skills/${skill.slug}`) errors.push(`${skill.slug}: repository-relative path is invalid`);
  const skillText = readFileSync(join(root, skill.path, "SKILL.md"), "utf8");
  const name = skillText.match(/^---\s*\n[\s\S]*?^name:\s*([^\n]+)$/m)?.[1]?.trim();
  if (name !== skill.slug) errors.push(`${skill.slug}: frontmatter name is ${name ?? "missing"}`);
  if (!readme.includes(`](skills/${skill.slug})`)) errors.push(`${skill.slug}: README repository link missing`);
  if (skill.publishedOnWebsite) {
    if (!skill.canonicalUrl || !skill.manifestUrl || skill.verification?.signed !== true) errors.push(`${skill.slug}: published metadata incomplete`);
    for (const url of [skill.canonicalUrl, skill.manifestUrl, catalog.authority, `https://github.com/benamtech/amtech-skills-registry/tree/main/${skill.path}`, "https://github.com/benamtech/amtech-skills-registry/blob/main/index.json"]) {
      if (!skillText.includes(url)) errors.push(`${skill.slug}: SKILL.md is missing ${url}`);
    }
    if (!readme.includes(skill.canonicalUrl) || !readme.includes(skill.manifestUrl)) errors.push(`${skill.slug}: reciprocal README website links missing`);
  } else {
    if (skill.publishedOnWebsite !== false) errors.push(`${skill.slug}: repo-only status must be explicit`);
    const readmeRow = readme.split("\n").find((line) => line.includes(`](skills/${skill.slug})`)) ?? "";
    if (!readmeRow.includes("repository-only") || !readmeRow.includes("https://amtechai.com/skills")) errors.push(`${skill.slug}: repo-only README declaration missing`);
  }
}

const checksums = {
  format: "amtech-registry-checksums-v1",
  digestAlgorithms: ["SHA-256", "SHA3-512"],
  skills: Object.fromEntries(catalogSlugs.map((slug) => {
    const base = join(root, "skills", slug);
    return [slug, filesUnder(base).map((path) => {
      const bytes = readFileSync(path);
      return { path: relative(root, path).split("\\").join("/"), size: bytes.length, sha256: digest("sha256", bytes), sha3_512: digest("sha3-512", bytes) };
    })];
  }))
};
const checksumsText = `${JSON.stringify(checksums, null, 2)}\n`;

const pluginRoot = join(root, "plugins/amtech-free-skills");
const bundled = ["knowledge-graph-builder", "okf-audit"];
const syncPlugin = () => {
  const target = join(pluginRoot, "skills");
  rmSync(target, { recursive: true, force: true });
  for (const slug of bundled) for (const source of filesUnder(join(root, "skills", slug))) {
    const destination = join(target, slug, relative(join(root, "skills", slug), source));
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(source, destination);
  }
};
if (mode === "--write") {
  mkdirSync(join(root, "registry"), { recursive: true });
  writeFileSync(join(root, "registry/checksums.json"), checksumsText);
  syncPlugin();
} else {
  if (!existsSync(join(root, "registry/checksums.json")) || readFileSync(join(root, "registry/checksums.json"), "utf8") !== checksumsText) errors.push("registry/checksums.json is stale; run --write");
  const actualBundle = existsSync(join(pluginRoot, "skills")) ? readdirSync(join(pluginRoot, "skills"), { withFileTypes: true }).filter((x) => x.isDirectory()).map((x) => x.name).sort() : [];
  if (JSON.stringify(actualBundle) !== JSON.stringify(bundled)) errors.push("plugin must bundle exactly knowledge-graph-builder and okf-audit");
  for (const slug of bundled) for (const source of filesUnder(join(root, "skills", slug))) {
    const copy = join(pluginRoot, "skills", slug, relative(join(root, "skills", slug), source));
    if (!existsSync(copy) || !readFileSync(copy).equals(readFileSync(source))) errors.push(`plugin copy drift: ${slug}/${relative(join(root, "skills", slug), source)}`);
  }
}

const marketplace = readJson(".agents/plugins/marketplace.json");
const manifest = readJson("plugins/amtech-free-skills/.codex-plugin/plugin.json");
if (!marketplace.name || !marketplace.interface?.displayName || marketplace.plugins?.length !== 1 || marketplace.plugins[0]?.source?.path !== "./plugins/amtech-free-skills") errors.push("marketplace structure is invalid");
if (marketplace.plugins?.[0]?.policy?.installation !== "AVAILABLE" || marketplace.plugins?.[0]?.policy?.authentication !== "ON_INSTALL") errors.push("marketplace policy is invalid");
if (manifest.name !== "amtech-free-skills" || !/^\d+\.\d+\.\d+$/.test(manifest.version) || manifest.skills !== "./skills/" || !manifest.author?.name || !manifest.interface?.displayName) errors.push("plugin manifest is invalid");
if (Array.isArray(manifest.skills) || String(manifest.skills).includes("..")) errors.push("plugin skills path escapes plugin root");

const keyMeta = readJson("registry/amtech-signing-key.json");
for (const skill of catalog.skills.filter((item) => item.publishedOnWebsite)) {
  const certDir = join(root, "registry/skills", skill.slug);
  if (skill.verification.status === "pending-resign") {
    if (existsSync(join(certDir, "certificate.json")) || existsSync(join(certDir, "certificate.sig"))) errors.push(`${skill.slug}: stale certificate present while pending-resign`);
    continue;
  }
  if (skill.verification.status !== "signed") { errors.push(`${skill.slug}: invalid certificate status`); continue; }
  if (!keyMeta.publicKeyBase64 || !keyMeta.keyId) { errors.push(`${skill.slug}: signed status requires mirrored public key metadata`); continue; }
  try {
    const certificate = JSON.parse(readFileSync(join(certDir, "certificate.json"), "utf8"));
    const signature = Buffer.from(readFileSync(join(certDir, "certificate.sig"), "utf8").trim(), "base64");
    const rawKey = Buffer.from(keyMeta.publicKeyBase64, "base64");
    const spki = rawKey.length === 32 ? Buffer.concat([Buffer.from("302a300506032b6570032100", "hex"), rawKey]) : rawKey;
    if (!verifySignature(null, Buffer.from(canonical(certificate)), createPublicKey({ key: spki, format: "der", type: "spki" }), signature)) throw new Error("signature mismatch");
    const subject = certificate.subject ?? {};
    const payload = packagePayload(join(root, skill.path));
    if (certificate.owner !== keyMeta.owner || subject.name !== skill.slug || subject.version !== skill.version || subject.repository !== catalog.repository || subject.path !== skill.path || !/^[0-9a-f]{40}$/.test(subject.commit ?? "")) throw new Error("certificate identity fields mismatch");
    if (subject.digests?.["SHA-256"] !== digest("sha256", payload) || subject.digests?.["SHA3-512"] !== digest("sha3-512", payload)) throw new Error("certificate subject digests mismatch");
    for (const path of filesUnder(join(root, skill.path))) {
      const repositoryPath = relative(root, path).split("\\").join("/");
      const committed = execFileSync("git", ["show", `${subject.commit}:${repositoryPath}`], { cwd: root, encoding: "buffer" });
      if (!committed.equals(readFileSync(path))) throw new Error(`pinned commit differs at ${repositoryPath}`);
    }
  } catch (error) { errors.push(`${skill.slug}: ${error.message}`); }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(mode === "--write" ? "Generated checksums and plugin copies." : "Registry validation passed.");
