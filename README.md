# Turbine Announcements

User-facing notes shown in [app.turbine.exchange](https://app.turbine.exchange): a toast on the
swap page while a note is active, and the full history on `/announcements`. The app fetches
`announcements.json` from this repo every few minutes — **merging here is publishing**. No deploy.

## Post a note

1. Edit `announcements.json` (GitHub web UI is fine — press `.` or the pencil icon).
2. Add an entry (template below), open a PR, get one approval, merge.
3. Live for all users within ~5–10 minutes (raw CDN cache + app refetch).

```json
{
    "id": "2026-07-20-contract-upgrade",
    "title": "Contract upgrade July 20",
    "body": "Orders will be cancelled during the upgrade. Funds are safe.",
    "link": "https://docs.turbine.exchange/",
    "startsAt": "2026-07-18T10:00:00Z",
    "endsAt": "2026-07-22T12:00:00Z"
}
```

## Fields

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | Stable unique slug (`YYYY-MM-DD-topic`). Dismissals key on it — keep it unchanged when editing text; changing it re-shows the toast to everyone. |
| `title` | yes | Card/toast heading. |
| `body` | yes | Plain text (no markdown/HTML). |
| `link` | no | "Learn more" target. Only `https://*.turbine.exchange` links render. |
| `startsAt` | yes | ISO timestamp. Before it: listed under **Upcoming** (no toast). After it: **New** — toast on the swap page + badge on `/announcements`. |
| `endsAt` | no | When the toast phase stops. Defaults to 14 days after `startsAt`. The note then moves to **Earlier** and stays in the history. |

## Rules

- A note travels Upcoming → New → Earlier from its dates alone — never edit a note to "retire" it.
- Among simultaneously active notes, **file order decides which gets the toast**; put the most important first.
- To announce a deploy: set `startsAt` a day or two *before* it and `endsAt` a day or two *after*,
  so users are informed before and after the event.
- Prune entries older than ~90 days occasionally; it's cosmetic, nothing depends on it.
- CI validates every PR (`scripts/validate.mjs`) — a malformed entry can't merge, and the app
  additionally drops invalid entries rather than breaking.
