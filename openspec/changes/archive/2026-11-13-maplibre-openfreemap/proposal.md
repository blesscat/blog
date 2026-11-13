# Proposal

## Why

The keyless raster tiles now return API-key placeholders, making every activity map unreadable. Restore the existing map experience with a keyless vector basemap.

## What Changes

- Replace the map engine and basemap with dynamically bundled MapLibre GL JS and OpenFreeMap dark style.
- Preserve activity map markers, tooltips, routes, filters, controls, and detail interactions while releasing collapsed mini-map resources.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This restores the existing `editorial-journal` activity feature preservation requirement without changing its behavior.

## Impact

Activity map scripts, map styling and dependencies change. Map assets are served by OpenFreeMap; the stale unreferenced public build remains outside this change.
