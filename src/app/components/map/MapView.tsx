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
  selectedTrackId?: string | null;
  onTrackSelect?: (trackId: string) => void;
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

// Component to handle map interactions
function MapController({
  selectedTrackId,
  tracks,
  showRoutes
}: {
  selectedTrackId?: string | null;
  tracks: MapTrack[];
  showRoutes?: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedTrackId) {
      const track = tracks.find(t => t.id === selectedTrackId);
      if (track) {
        // If track has a route, fit bounds to the route
        if (showRoutes && track.route && track.route.length > 0) {
          const bounds = L.latLngBounds(track.route.map(p => [p[0], p[1]] as [number, number]));
          map.fitBounds(bounds, { padding: [50, 50], duration: 0.5 });
        } else {
          map.flyTo([track.coordinates.lat, track.coordinates.lng], 12, {
            duration: 0.5,
          });
        }
      }
    }
  }, [selectedTrackId, tracks, map, showRoutes]);

  return null;
}

export function MapView({
  tracks,
  selectedTrackId,
  onTrackSelect,
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
        selectedTrackId={selectedTrackId}
        tracks={tracks}
        showRoutes={showRoutes}
      />

      {/* Render route polylines */}
      {showRoutes && tracks.map((track) => (
        track.route && track.route.length > 0 && (
          <Polyline
            key={`route-${track.id}`}
            positions={track.route}
            pathOptions={{
              color: difficultyColors[track.difficulty],
              weight: selectedTrackId === track.id ? 5 : 3,
              opacity: selectedTrackId === track.id ? 1 : 0.7,
              lineCap: 'round',
              lineJoin: 'round',
            }}
            eventHandlers={{
              click: () => onTrackSelect?.(track.id),
            }}
          />
        )
      ))}

      {/* Render grouped markers with count badges */}
      {markerGroups.map((group, groupIdx) => {
        const isGroupSelected = group.tracks.some(t => t.id === selectedTrackId);
        const count = group.tracks.length;

        return (
          <Marker
            key={`group-${groupIdx}`}
            position={group.position}
            icon={createMarkerIcon(group.primaryDifficulty, isGroupSelected, count)}
            eventHandlers={{
              click: () => {
                // Select first track in group, or cycle through if already selected
                if (count === 1) {
                  onTrackSelect?.(group.tracks[0].id);
                } else {
                  const currentIdx = group.tracks.findIndex(t => t.id === selectedTrackId);
                  const nextIdx = (currentIdx + 1) % count;
                  onTrackSelect?.(group.tracks[nextIdx].id);
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
                            onTrackSelect?.(track.id);
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
