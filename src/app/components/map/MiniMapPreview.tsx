import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MiniMapPreviewProps {
  route: [number, number][];
  difficulty: 'easy' | 'medium' | 'hard';
  className?: string;
}

// Colors by difficulty
const difficultyColors = {
  easy: '#10b981',
  medium: '#f59e0b',
  hard: '#ef4444',
};

// Custom start marker
const createStartIcon = () => {
  return L.divIcon({
    className: 'custom-start-marker',
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #10b981;
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 10px;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        START
      </div>
    `,
    iconSize: [50, 24],
    iconAnchor: [25, 12],
  });
};

// Custom finish marker
const createFinishIcon = () => {
  return L.divIcon({
    className: 'custom-finish-marker',
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ef4444;
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 10px;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        FINISH
      </div>
    `,
    iconSize: [50, 24],
    iconAnchor: [25, 12],
  });
};

// Component to fit bounds to the route
function FitBounds({ route }: { route: [number, number][] }) {
  const map = useMap();

  React.useEffect(() => {
    if (route && route.length > 0) {
      const bounds = L.latLngBounds(route);
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [route, map]);

  return null;
}

export function MiniMapPreview({ route, difficulty, className = '' }: MiniMapPreviewProps) {
  if (!route || route.length === 0) {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl h-48 relative overflow-hidden border border-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-400">
          <p className="text-sm">Route preview not available</p>
        </div>
      </div>
    );
  }

  const startPoint = route[0];
  const endPoint = route[route.length - 1];
  const center: [number, number] = [
    (startPoint[0] + endPoint[0]) / 2,
    (startPoint[1] + endPoint[1]) / 2,
  ];

  return (
    <div className={`rounded-2xl overflow-hidden border border-gray-200 ${className}`} style={{ height: '192px' }}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds route={route} />

        {/* Route polyline */}
        <Polyline
          positions={route}
          pathOptions={{
            color: difficultyColors[difficulty],
            weight: 4,
            opacity: 0.9,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />

        {/* Start marker */}
        <Marker
          position={startPoint}
          icon={createStartIcon()}
        />

        {/* Finish marker */}
        <Marker
          position={endPoint}
          icon={createFinishIcon()}
        />
      </MapContainer>
    </div>
  );
}
