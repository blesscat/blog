# Design

## Context

See the proposal. Activity pages already rely on a shared preservation requirement and use geographic data expressed as latitude and longitude.

## Goals / Non-Goals

**Goals:** Preserve the existing controls and interactions while restoring readable maps and managing mini-map WebGL resources.

**Non-Goals:** Change activity data, redesign interactions, or clean up the unreferenced public build.

## Decisions

- Load MapLibre dynamically through a shared map module; use its bundled CSS and a single OpenFreeMap dark style and attribution configuration. A CDN map library or the broken raster tiles are not used.
- Convert coordinates to longitude, latitude at the map boundary and retain HTML markers and hover popups. Fit bounds around the same data and retain mobile gesture and wheel settings.
- Add mini-map routes as GeoJSON below the first symbol layer discovered at runtime. Remove collapsed maps and recreate them on demand to release WebGL contexts.

## Risks / Trade-offs

- Coordinate reversal or fit differences can move markers → check known data and all maps in a browser.
- The vector style is darker than the previous basemap → assess legibility in the site theme.
- Asynchronous map creation can race a collapse → prevent creation for closed panels.
