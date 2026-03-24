import React from 'react';
import { Heart, MapPin, RotateCw, ArrowRight } from 'lucide-react';
import { Chip } from '@/app/components/design-system/Chip';

export interface Track {
  id: string;
  name: string;
  region: string;
  distance: number;
  elevation: number;
  difficulty: 'easy' | 'norm' | 'long' | 'hard' | 'epic';
  surface: 'road' | 'gravel' | 'mixed';
  rideFamily?: 'coffee' | 'dark' | 'sun' | 'plus' | 'misc' | null;
  routeType?: 'loop' | 'point_to_point' | null;
  thumbnail: string;
  isFavorite?: boolean;
  coordinates?: { lat: number; lng: number } | null;
  // Detail fields (populated from Supabase)
  description?: string | null;
  safetyNotes?: string | null;
  estimatedTime?: string | null;
  photos?: string[];
  startPoint?: { lat: number; lng: number } | null;
  endPoint?: { lat: number; lng: number } | null;
  gpxFileName?: string | null;
  route?: Array<{ lat: number; lng: number }>;
}

const difficultyLabels: Record<string, string> = {
  easy: 'Easy',
  norm: 'Norm',
  long: 'Long',
  hard: 'Hard',
  epic: 'Epic',
};

const familyLabels: Record<string, string> = {
  coffee: 'Coffee',
  dark: 'Dark',
  sun: 'Sun',
  plus: 'Plus',
  misc: 'Misc',
};

interface TrackCardProps {
  track: Track;
  onClick?: () => void;
  onFavoriteToggle?: () => void;
}

export function TrackCard({ track, onClick, onFavoriteToggle }: TrackCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl p-3 flex gap-3 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
    >
      <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
        {track.thumbnail ? (
          <img
            src={track.thumbnail}
            alt={track.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <MapPin className="w-8 h-8" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-medium truncate">{track.name}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle?.();
            }}
            className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Heart
              className="w-5 h-5"
              fill={track.isFavorite ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{track.region}</span>
          {track.routeType && (
            <span className="flex items-center gap-0.5 ml-1 text-xs text-gray-400">
              {track.routeType === 'loop' ? (
                <><RotateCw className="w-3 h-3" /> Loop</>
              ) : (
                <><ArrowRight className="w-3 h-3" /> A→B</>
              )}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <Chip variant={track.difficulty} size="sm">
            {difficultyLabels[track.difficulty] || track.difficulty}
          </Chip>
          <Chip variant={track.surface} size="sm">
            {track.surface.charAt(0).toUpperCase() + track.surface.slice(1)}
          </Chip>
          {track.rideFamily && (
            <Chip variant={track.rideFamily} size="sm">
              {familyLabels[track.rideFamily] || track.rideFamily}
            </Chip>
          )}
          <span className="text-xs text-gray-500">{track.distance}km</span>
          <span className="text-xs text-gray-500">↑{track.elevation}m</span>
        </div>
      </div>
    </div>
  );
}
