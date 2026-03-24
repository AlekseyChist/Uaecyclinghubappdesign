import React from 'react';
import { MapPin as MapPinIcon } from 'lucide-react';

type Difficulty = 'easy' | 'norm' | 'long' | 'hard' | 'epic';

interface MapPinProps {
  selected?: boolean;
  onClick?: () => void;
  difficulty?: Difficulty;
}

const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-emerald-500',
  norm: 'bg-sky-500',
  long: 'bg-orange-500',
  hard: 'bg-red-500',
  epic: 'bg-fuchsia-500',
};

export function MapPin({ selected = false, onClick, difficulty = 'norm' }: MapPinProps) {
  return (
    <button
      onClick={onClick}
      className={`relative transition-all ${selected ? 'scale-125' : 'scale-100 hover:scale-110'}`}
    >
      <div
        className={`w-8 h-8 rounded-full ${difficultyColors[difficulty]} flex items-center justify-center shadow-lg ${
          selected ? 'ring-4 ring-white ring-offset-2' : ''
        }`}
      >
        <MapPinIcon className="w-5 h-5 text-white" fill="white" />
      </div>
      {selected && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-2 h-2 bg-white rounded-full shadow-md" />
      )}
    </button>
  );
}
