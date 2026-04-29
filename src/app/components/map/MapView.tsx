import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface MapTrack {
  id: string;
  name: string;
  region: string;
  difficulty: 'easy' | 'medium' | 'hard';
  coordinates: { lat: number; lng: number };
  route?: [number, number][]; // Array of [lat, lng] points for the route line
}

interface MapViewProps {
  tracks: MapTrack[];
  selectedTrackIds?: string[];
  onTracksSelect?: (trackIds: string[]) => void;
  onTrackOpen?: (trackId: string) => void;
  center?: [number, number];
  zoom?: number;
  showRoutes?: boolean;
}

// Colors by difficulty
const difficultyColors = {
  easy: '#10b981',    // green
  medium: '#3b82f6',  // blue
  hard: '#ef4444',    // red
};

// Custom marker icons by difficulty with optional route count badge
const createMarkerIcon = (difficulty: 'easy' | 'medium' | 'hard', isSelected: boolean, routeCount?: number) => {
  const color = difficultyColors[difficulty];
  const size = isSelected ? 40 : 32;
  const borderWidth = isSelected ? 4 : 2;

  const badgeHtml = routeCount && routeCount > 1 ? `
    <div style="
      position: absolute;
      top: -6px;
      right: -6px;
      min-width: 20px;
      height: 20px;
      background-color: #ef4444;
      border: 2px solid white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      color: white;
      padding: 0 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      line-height: 1;
    ">${routeCount}</div>
  ` : '';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: ${borderWidth}px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        cursor: pointer;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        </svg>
        ${badgeHtml}
      </div>
    `,
    iconSize: [size + 8, size + 8],
    iconAnchor: [(size + 8) / 2, (size + 8) / 2],
    popupAnchor: [0, -(size + 8) / 2],
  });
};

// Group tracks by proximity of start points (within ~200m)
const PROXIMITY_THRESHOLD = 0.002; // ~200 meters in degrees

interface MarkerGroup {
  position: [number, number];
  tracks: MapTrack[];
  primaryDifficulty: 'easy' | 'medium' | 'hard';
}

function groupTracksByStartPoint(tracks: MapTrack[]): MarkerGroup[] {
  const groups: MarkerGroup[] = [];

  const getStartPosition = (track: MapTrack): [number, number] => {
    if (track.route && track.route.length > 0) {
      return track.route[0];
    }
    return [track.coordinates.lat, track.coordinates.lng];
  };

  for (const track of tracks) {
    const pos = getStartPosition(track);
    let addedToGroup = false;

    for (const group of groups) {
      const dlat = Math.abs(group.position[0] - pos[0]);
      const dlng = Math.abs(group.position[1] - pos[1]);
      if (dlat < PROXIMITY_THRESHOLD && dlng < PROXIMITY_THRESHOLD) {
        group.tracks.push(track);
        addedToGroup = true;
        break;
      }
    }

    if (!addedToGroup) {
      groups.push({
        position: pos,
        tracks: [track],
        primaryDifficulty: track.difficulty,
      });
    }
  }

  // Set primary difficulty to the hardest in the group
  const difficultyRank = { easy: 0, medium: 1, hard: 2 };
  for (const group of groups) {
    group.primaryDifficulty = group.tracks.reduce((hardest, t) =>
      difficultyRank[t.difficulty] > difficultyRank[hardest] ? t.difficulty : hardest,
      group.tracks[0].difficulty
    );
  }

  return groups;
}

// Pixel-space distance from click point to a polyline. Used to find ALL routes
// near the click, not just the one Leaflet flagged as topmost.
const NEARBY_POLYLINE_THRESHOLD_PX = 12;

function pointToSegmentDistance(p: L.Point, a: L.Point, b: L.Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

function polylineMinDistance(route: [number, number][], clickPoint: L.Point, map: L.Map): number {
  if (route.length < 2) return Infinity;
  let min = Infinity;
  for (let i = 0; i < route.length - 1; i++) {
    const a = map.latLngToContainerPoint(route[i]);
    const b = map.latLngToContainerPoint(route[i + 1]);
    const d = pointToSegmentDistance(clickPoint, a, b);
    if (d < min) min = d;
  }
  return min;
}

function collectNearbyTrackIds(
  tracks: MapTrack[],
  clickPoint: L.Point,
  map: L.Map,
  thresholdPx: number,
): string[] {
  const hits: string[] = [];
  for (const track of tracks) {
    if (!track.route || track.route.length < 2) continue;
    if (polylineMinDistance(track.route, clickPoint, map) <= thresholdPx) {
      hits.push(track.id);
    }
  }
  return hits;
}

// Component to handle map interactions
function MapController({
  selectedTrackIds,
  tracks,
  showRoutes
}: {
  selectedTrackIds: string[];
  tracks: MapTrack[];
  showRoutes?: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    // Only auto-fit on single-track selection. Multi-track means overlapping
    // routes that already share the visible viewport, so re-zooming would jump
    // to one of them and lose the others.
    if (selectedTrackIds.length !== 1) return;
    const track = tracks.find(t => t.id === selectedTrackIds[0]);
    if (!track) return;

    if (showRoutes && track.route && track.route.length > 0) {
      const bounds = L.latLngBounds(track.route.map(p => [p[0], p[1]] as [number, number]));
      map.fitBounds(bounds, { padding: [50, 50], duration: 0.5 });
    } else {
      map.flyTo([track.coordinates.lat, track.coordinates.lng], 12, {
        duration: 0.5,
      });
    }
  }, [selectedTrackIds, tracks, map, showRoutes]);

  return null;
}

// Polylines extracted into their own component so the click handler can call
// useMap() and convert lat/lng routes to container-pixel space for proximity
// detection across all overlapping routes.
function RouteLines({
  tracks,
  selectedTrackIds,
  onTracksSelect,
}: {
  tracks: MapTrack[];
  selectedTrackIds: string[];
  onTracksSelect?: (trackIds: string[]) => void;
}) {
  const map = useMap();

  return (
    <>
      {tracks.map((track) => {
        if (!track.route || track.route.length === 0) return null;
        const isSelected = selectedTrackIds.includes(track.id);
        return (
          <Polyline
            key={`route-${track.id}`}
            positions={track.route}
            pathOptions={{
              color: difficultyColors[track.difficulty],
              weight: isSelected ? 5 : 3,
              opacity: isSelected ? 1 : 0.7,
              lineCap: 'round',
              lineJoin: 'round',
            }}
            eventHandlers={{
              click: (e) => {
                const hits = new Set(
                  collectNearbyTrackIds(tracks, e.containerPoint, map, NEARBY_POLYLINE_THRESHOLD_PX)
                );
                // Always include the polyline Leaflet itself flagged as hit, in
                // case it sits just outside the threshold (e.g. tap registered
                // on its hit-box but not within 12px of its rendered line).
                hits.add(track.id);
                onTracksSelect?.(Array.from(hits));
              },
            }}
          />
        );
      })}
    </>
  );
}

export function MapView({
  tracks,
  selectedTrackIds = [],
  onTracksSelect,
  onTrackOpen,
  center = [44.0165, 21.0059], // Serbia center (near Kragujevac)
  zoom = 7,
  showRoutes = true
}: MapViewProps) {
  const markerGroups = groupTracksByStartPoint(tracks);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController
        selectedTrackIds={selectedTrackIds}
        tracks={tracks}
        showRoutes={showRoutes}
      />

      {/* Render route polylines (extracted so click handler can read map pixel coords) */}
      {showRoutes && (
        <RouteLines
          tracks={tracks}
          selectedTrackIds={selectedTrackIds}
          onTracksSelect={onTracksSelect}
        />
      )}

      {/* Render grouped markers with count badges */}
      {markerGroups.map((group, groupIdx) => {
        const isGroupSelected = group.tracks.some(t => selectedTrackIds.includes(t.id));
        const count = group.tracks.length;

        return (
          <Marker
            key={`group-${groupIdx}`}
            position={group.position}
            icon={createMarkerIcon(group.primaryDifficulty, isGroupSelected, count)}
            eventHandlers={{
              click: () => {
                // Marker click selects exactly one track at a time:
                // - single-track group: that track
                // - multi-track group: cycle through one-by-one to keep parity with
                //   prior behavior (popup already shows the full list)
                if (count === 1) {
                  onTracksSelect?.([group.tracks[0].id]);
                } else {
                  const currentSingleId = selectedTrackIds.length === 1 ? selectedTrackIds[0] : null;
                  const currentIdx = group.tracks.findIndex(t => t.id === currentSingleId);
                  const nextIdx = (currentIdx + 1) % count;
                  onTracksSelect?.([group.tracks[nextIdx].id]);
                }
              },
            }}
          >
            <Popup>
              <div className="p-2 min-w-[160px]">
                {group.tracks.length === 1 ? (
                  <>
                    <h3 className="font-medium text-sm mb-1">{group.tracks[0].name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{group.tracks[0].region}</p>
                    {onTrackOpen && (
                      <button
                        onClick={() => onTrackOpen(group.tracks[0].id)}
                        className="w-full bg-emerald-500 text-white text-xs py-1.5 px-3 rounded-lg font-medium hover:bg-emerald-600"
                      >
                        View Details
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="font-medium text-sm mb-2">{count} routes from here</h3>
                    <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
                      {group.tracks.map(track => (
                        <div
                          key={track.id}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            onTracksSelect?.([track.id]);
                          }}
                        >
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: difficultyColors[track.difficulty] }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{track.name}</p>
                          </div>
                          {onTrackOpen && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onTrackOpen(track.id);
                              }}
                              className="text-emerald-500 text-xs font-medium flex-shrink-0"
                            >
                              Open
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
