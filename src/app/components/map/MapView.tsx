import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface MapTrack {
  id: string;
  name: string;
  region: string;
  difficulty: 'easy' | 'medium' | 'hard';
  coordinates: { lat: number; lng: number };
}

interface MapViewProps {
  tracks: MapTrack[];
  selectedTrackId?: string | null;
  onTrackSelect?: (trackId: string) => void;
  center?: [number, number];
  zoom?: number;
}

// Custom marker icons by difficulty
const createMarkerIcon = (difficulty: 'easy' | 'medium' | 'hard', isSelected: boolean) => {
  const colors = {
    easy: '#10b981',
    medium: '#f59e0b',
    hard: '#ef4444',
  };

  const color = colors[difficulty];
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
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

// Component to handle map center changes
function MapController({ center, selectedTrackId, tracks }: {
  center?: [number, number];
  selectedTrackId?: string | null;
  tracks: MapTrack[];
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedTrackId) {
      const track = tracks.find(t => t.id === selectedTrackId);
      if (track) {
        map.flyTo([track.coordinates.lat, track.coordinates.lng], 12, {
          duration: 0.5,
        });
      }
    }
  }, [selectedTrackId, tracks, map]);

  return null;
}

export function MapView({
  tracks,
  selectedTrackId,
  onTrackSelect,
  center = [24.4539, 54.3773], // UAE center (Abu Dhabi)
  zoom = 7
}: MapViewProps) {
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

      <MapController center={center} selectedTrackId={selectedTrackId} tracks={tracks} />

      {tracks.map((track) => (
        <Marker
          key={track.id}
          position={[track.coordinates.lat, track.coordinates.lng]}
          icon={createMarkerIcon(track.difficulty, selectedTrackId === track.id)}
          eventHandlers={{
            click: () => onTrackSelect?.(track.id),
          }}
        >
          <Popup>
            <div className="p-1">
              <h3 className="font-medium text-sm">{track.name}</h3>
              <p className="text-xs text-gray-500">{track.region}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
