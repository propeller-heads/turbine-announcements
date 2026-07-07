# Turbine Announcements

This file controls what users see in [app.turbine.exchange](https://app.turbine.exchange):
a small popup on the swap page, and the full list on the `/updates` page.

**Merging a change here publishes it.** Users see it within ~10 minutes. No deploy needed.

## How to warn about a contract change (or maintenance)

Fill in the `alert` at the top of `announcements.json`:

```json
"alert": {
    "id": "2026-07-contract-upgrade",
    "title": "New contracts coming",
    "text": "We're deploying new contracts on July 20, 14:00 UTC. Open orders will be cancelled — funds are safe."
}
```

- Every user gets a popup with this until they close it. It also sits at the top of `/updates` under "Upcoming".
- When the event is over, set `"alert": null`.
- Fixing a typo? Keep the `id` the same, or everyone who closed the popup will see it again.
- Want everyone to see it again on purpose? Give it a new `id`.

## How to announce something you shipped

Add one line to the top of the `updates` list:

```json
{ "date": "2026-07-07", "title": "The $1M cap is gone", "body": "There's no maximum swap size anymore." }
```

- Users who haven't seen it get one "New updates" popup.
- On `/updates` it shows under "New" for 14 days, then moves to "Past updates" by itself.
- That's it — you never edit or delete it again.

## Good to know

- `link` is optional on anything, but only `https://…turbine.exchange` links work — others are ignored.
- Text only, no formatting.
- A check runs on every PR and blocks typos in the file. Even if something bad slips through,
  the app skips broken entries instead of breaking.
