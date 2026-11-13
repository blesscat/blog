import 'maplibre-gl/dist/maplibre-gl.css'
import type { LngLatLike, Map as MapLibreMap, Marker } from 'maplibre-gl'

const STYLE_URL = 'https://tiles.openfreemap.org/styles/dark'
let maplibrePromise: Promise<typeof import('maplibre-gl')> | undefined

export function loadMapLibre() {
  maplibrePromise ??= import('maplibre-gl')
  return maplibrePromise
}

export async function createMap(container: HTMLElement, mobileTwoFingerDrag = false) {
  const maplibre = await loadMapLibre()
  const isMobile = window.matchMedia('(max-width: 768px)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const map = new maplibre.Map({
    container,
    style: STYLE_URL,
    center: [0, 0],
    zoom: 1,
    scrollZoom: false,
    cooperativeGestures: mobileTwoFingerDrag && isMobile,
    attributionControl: false,
  })
  map.addControl(new maplibre.NavigationControl({ showCompass: false }), 'top-left')
  map.addControl(new maplibre.AttributionControl({ compact: false }), 'bottom-right')

  return { map, maplibre }
}

export function fitMarkers(map: MapLibreMap, markers: Marker[], paddingRatio: number) {
  if (!markers.length) return
  const positions = markers.map(marker => marker.getLngLat())
  const west = Math.min(...positions.map(point => point.lng))
  const east = Math.max(...positions.map(point => point.lng))
  const south = Math.min(...positions.map(point => point.lat))
  const north = Math.max(...positions.map(point => point.lat))
  const padding = Math.max(20, Math.min(map.getContainer().clientWidth, map.getContainer().clientHeight) * paddingRatio)
  const maxZoom = west === east && south === north ? 15 : 19
  map.fitBounds([[west, south], [east, north]], { padding, maxZoom, duration: 0 })
}

export function addHoverPopup(map: MapLibreMap, maplibre: typeof import('maplibre-gl'), element: HTMLElement, coordinates: LngLatLike, html: string, className: string, label: string) {
  const popup = new maplibre.Popup({ closeButton: false, closeOnClick: false, offset: 12, className })
    .setLngLat(coordinates)
    .setHTML(html)
  element.tabIndex = 0
  element.setAttribute('aria-label', label)
  element.addEventListener('mouseenter', () => popup.addTo(map))
  element.addEventListener('mouseleave', () => {
    if (document.activeElement !== element) popup.remove()
  })
  element.addEventListener('focus', () => popup.addTo(map))
  element.addEventListener('blur', () => {
    if (!element.matches(':hover')) popup.remove()
  })
}
