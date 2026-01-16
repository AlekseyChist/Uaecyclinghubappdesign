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
  easy: '#10b981',
  medium: '#f59e0b',
  hard: '#ef4444',
};

// Custom marker icons by difficulty
const createMarkerIcon = (difficulty: 'easy' | 'medium' | 'hard', isSelected: boolean) => {
  const color = difficultyColors[difficulty];
  const size = isSelected ? 40 : 32;
  const borderWidth = isSelected ? 4 : 2;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
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
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

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
  center = [24.4539, 54.3773], // UAE center (Abu Dhabi)
  zoom = 7,
  showRoutes = true
}: MapViewProps) {
  // Use route start point for marker position if available
  const getMarkerPosition = (track: MapTrack): [number, number] => {
    if (track.route && track.route.length > 0) {
      return track.route[0];
    }
    return [track.coordinates.lat, track.coordinates.lng];
  };
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

      {/* Render markers */}
      {tracks.map((track) => (
        <Marker
          key={track.id}
          position={getMarkerPosition(track)}
          icon={createMarkerIcon(track.difficulty, selectedTrackId === track.id)}
          eventHandlers={{
            click: () => onTrackSelect?.(track.id),
          }}
        >
          <Popup>
            <div className="p-2 min-w-[140px]">
              <h3 className="font-medium text-sm mb-1">{track.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{track.region}</p>
              {onTrackOpen && (
                <button
                  onClick={() => onTrackOpen(track.id)}
                  className="w-full bg-emerald-500 text-white text-xs py-1.5 px-3 rounded-lg font-medium hover:bg-emerald-600"
                >
                  View Details
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
