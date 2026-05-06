# LinerSync Pro Agent Instructions

## Repository Lock

Work only in this repository:

- `largentseahawk80-lgtm/linersync-pro`
- Branch: `main`

Do not touch, inspect, clone, patch, compare against, or commit to:

- `largentseahawk80-lgtm/linersync`

That production QC repo is off limits unless the owner explicitly says otherwise in the same task.

## Product Goal

Build LinerSync Pro as a mobile-first Vite + React field app for geosynthetic liner QC / CQA work.

The app is for field use on phones by QC workers, not software developers. Every workflow and code decision should be explained in plain field language when reporting work.

## Current Starter Stack

- Vite
- React
- JavaScript / JSX
- CSS
- Browser localStorage for starter offline storage

Do not add cloud sync, Supabase, authentication, or databases yet unless specifically requested.

## Core Field Workflow

The field workflow should stay simple:

1. Open app on phone.
2. Start or select a project.
3. Capture field logs quickly.
4. Auto-fill constant project/job data when available.
5. Auto-capture date and time.
6. Auto-capture GPS when available.
7. Save locally for offline use.
8. Show latest logs immediately.
9. Allow edit, copy, delete, and lock workflows later.
10. Export clean data later.

## First Build Priority

The first priority is Roll Length Tracking.

Roll records should support:

- Project name
- Area / lagoon / cell
- Roll number
- Material type
- Material thickness
- Original roll length in feet
- Used length in feet
- Remaining length in feet
- Panel number assigned
- Start station or location note
- End station or location note
- GPS latitude
- GPS longitude
- Timestamp
- Field notes
- Status: Active, Used Up, Hold, Damaged, Archived

## Roll Logic Rules

- Roll number is required.
- Original roll length should be entered once.
- Each used length subtracts from remaining roll length.
- Remaining footage must never go below zero in display.
- If used footage is greater than remaining footage, warn the user.
- Allow override only with clear confirmation.
- Same roll can be assigned to multiple panels until used up.
- Warn about duplicate active roll numbers.
- Active rolls should be shown separately from used-up or archived rolls.
- UI must be usable with dirty gloves in the field.

## Record Types To Prepare For

The app should be structured so these records can be supported cleanly:

- Repair
- Seam
- Panel
- Roll
- Wedge Test
- Extrusion Test
- Air Test
- Destructive Test / DT
- Daily Log

## Data Model Direction

Every saved log should eventually include:

- id
- recordType
- projectId or projectName
- createdAt
- updatedAt
- createdDate
- createdTime
- gps
- locked
- deleted flag or delete handling
- version
- payload for the record type

Roll payload should include:

- rollNumber
- originalLengthFt
- usedLengthFt
- remainingLengthFt
- panelNumber
- materialType
- thickness
- status
- notes

## Storage Rules

- Use localStorage for starter storage.
- Use stable storage keys.
- Never erase existing saved field data during normal updates.
- Wrap JSON parsing in try/catch.
- If storage is corrupted, show a safe fallback instead of crashing.

## Export Rules

Prepare exports for:

- JSON
- CSV
- KML later

First build should include JSON and CSV export for roll logs.

## QC Rule Direction

Prepare the app for rule checks later.

Starter rule examples:

- Missing roll number = critical
- Used footage over remaining footage = warning
- Duplicate active roll = warning
- Missing GPS = warning, not blocking
- Missing panel = warning, not blocking
- Negative length = critical

## UI Rules

- Mobile-first.
- Dark theme.
- Large buttons.
- Simple cards.
- Minimal scrolling.
- Dashboard first.
- Latest logs visible immediately.
- Plain field labels, not developer labels.
- Use feet for distances and lengths.
- Use 12-hour time format.
- Use clear red/yellow warnings.
- Do not block the worker unless truly critical.

## Development Safety

Before editing:

1. Inspect the repo.
2. Report files found.
3. Make the smallest safe working change.

After editing, report:

1. Repo touched.
2. Files changed.
3. What each file does.
4. What works now.
5. How the field workflow works.
6. How roll length math works.
7. Warnings built in.
8. Exports built in.
9. What was not touched.
10. Next safest build step.

## Final Report Format

Use this format after each task:

```text
LINERSYNC PRO BUILD REPORT

Repo touched:
Files changed:
What works now:
How the field workflow works:
How roll length tracking works:
Warnings built in:
Exports built in:
What was NOT touched:
Next safest build step:
```
