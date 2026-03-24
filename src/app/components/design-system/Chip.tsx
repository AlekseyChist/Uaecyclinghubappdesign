import React from 'react';

export type ChipVariant =
  | 'easy' | 'norm' | 'long' | 'hard' | 'epic'
  | 'road' | 'gravel' | 'mixed'
  | 'coffee' | 'dark' | 'sun' | 'plus' | 'misc'
  | 'loop' | 'point_to_point'
  | 'default';

export type ChipSize = 'sm' | 'md';

interface ChipProps {
  variant?: ChipVariant;
  size?: ChipSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ChipVariant, string> = {
  // Difficulty
  easy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  norm: 'bg-sky-50 text-sky-700 border-sky-200',
  long: 'bg-orange-50 text-orange-700 border-orange-200',
  hard: 'bg-red-50 text-red-700 border-red-200',
  epic: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
  // Surface
  road: 'bg-blue-50 text-blue-700 border-blue-200',
  gravel: 'bg-purple-50 text-purple-700 border-purple-200',
  mixed: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  // Route category (DBB Ride)
  coffee: 'bg-amber-50 text-amber-700 border-amber-200',
  dark: 'bg-slate-100 text-slate-700 border-slate-300',
  sun: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  plus: 'bg-teal-50 text-teal-700 border-teal-200',
  misc: 'bg-gray-50 text-gray-600 border-gray-200',
  // Route format
  loop: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  point_to_point: 'bg-pink-50 text-pink-700 border-pink-200',
  // Default
  default: 'bg-gray-50 text-gray-700 border-gray-200',
};

const sizeStyles: Record<ChipSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Chip({ variant = 'default', size = 'sm', children, className = '' }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
