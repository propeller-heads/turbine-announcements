import { readFileSync } from "node:fs";

const LINK_ALLOWLIST = /^https:\/\/([a-z0-9-]+\.)?turbine\.exchange(\/|$)/;
const errors = [];

const feed = JSON.parse(readFileSync("announcements.json", "utf8"));
if (typeof feed !== "object" || feed === null || Array.isArray(feed)) {
    console.error("announcements.json must be an object { alert?, updates }");
    process.exit(1);
}

const checkLink = (link, at) => {
    if (link !== undefined && !LINK_ALLOWLIST.test(link)) {
        errors.push(`${at}: link must point to a turbine.exchange domain`);
    }
};

if (feed.alert != null) {
    for (const field of ["id", "text"]) {
        if (typeof feed.alert[field] !== "string" || !feed.alert[field]) {
            errors.push(`alert: missing required field "${field}"`);
        }
    }
    checkLink(feed.alert.link, "alert");
}

if (!Array.isArray(feed.updates)) {
    errors.push('"updates" must be an array');
} else {
    feed.updates.forEach((u, i) => {
        const at = `updates[${i}] (${u.title ?? "untitled"})`;
        for (const field of ["date", "title", "body"]) {
            if (typeof u[field] !== "string" || !u[field]) {
                errors.push(`${at}: missing required field "${field}"`);
            }
        }
        if (u.date !== undefined && Number.isNaN(Date.parse(u.date))) {
            errors.push(`${at}: "date" is not a valid date`);
        }
        checkLink(u.link, at);
    });
}

if (errors.length > 0) {
    errors.forEach((e) => console.error(`✗ ${e}`));
    process.exit(1);
}
console.log(
    `✓ valid: ${feed.alert ? "1 alert" : "no alert"}, ${feed.updates.length} update(s)`
);
