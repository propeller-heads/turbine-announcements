# Turbine Announcements

Feeds the toast on [app.turbine.exchange](https://app.turbine.exchange)'s swap page and the
`/updates` page. **Merging here is publishing** — live for all users in ~5–10 minutes, no deploy.

## Two things you can do

### 1. Warn about contract changes

Set the `alert`. It toasts to every user until they dismiss it. Delete it when the event is over.

```json
"alert": {
    "id": "2026-07-contract-upgrade",
    "text": "We're deploying new contracts on July 20, 14:00 UTC. Open orders will be cancelled — funds are safe."
}
```

Keep the `id` stable while editing the text (dismissals key on it). Change the id if you need
everyone to see it again. No contract changes coming? `"alert": null`.

### 2. Announce an update

Prepend an entry to `updates`. Users who haven't seen it get a "New updates" toast once; the full
list lives on `/updates`. Entries are permanent history — add and forget.

```json
{ "date": "2026-07-07", "title": "The $1M cap is gone", "body": "There's no maximum swap size anymore." }
```

`link` is optional on both and only renders for `https://*.turbine.exchange` URLs. Bodies are
plain text. CI validates every change; the app also drops anything malformed rather than breaking.
