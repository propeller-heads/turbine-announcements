import { readFileSync } from "node:fs";

const LINK_ALLOWLIST = /^https:\/\/([a-z0-9-]+\.)?turbine\.exchange(\/|$)/;
const KNOWN_FIELDS = new Set(["id", "title", "body", "link", "startsAt", "endsAt"]);

const notes = JSON.parse(readFileSync("announcements.json", "utf8"));
const errors = [];

if (!Array.isArray(notes)) {
    console.error("announcements.json must be a JSON array");
    process.exit(1);
}

const ids = new Set();
notes.forEach((note, i) => {
    const at = `note[${i}] (${note.id ?? "no id"})`;
    for (const field of ["id", "title", "body", "startsAt"]) {
        if (typeof note[field] !== "string" || note[field].length === 0) {
            errors.push(`${at}: missing required field "${field}"`);
        }
    }
    if (note.id) {
        if (ids.has(note.id)) errors.push(`${at}: duplicate id`);
        ids.add(note.id);
    }
    for (const field of ["startsAt", "endsAt"]) {
        if (note[field] !== undefined && Number.isNaN(Date.parse(note[field]))) {
            errors.push(`${at}: "${field}" is not a valid ISO date`);
        }
    }
    if (note.link !== undefined && !LINK_ALLOWLIST.test(note.link)) {
        errors.push(`${at}: link must point to a turbine.exchange domain`);
    }
    for (const key of Object.keys(note)) {
        if (!KNOWN_FIELDS.has(key)) errors.push(`${at}: unknown field "${key}"`);
    }
});

if (errors.length > 0) {
    errors.forEach((e) => console.error(`✗ ${e}`));
    process.exit(1);
}
console.log(`✓ ${notes.length} announcement(s) valid`);
