import React from 'react';

export type ChipVariant = 'easy' | 'medium' | 'hard' | 'road' | 'gravel' | 'mixed' | 'default';
export type ChipSize = 'sm' | 'md';

interface ChipProps {
  variant?: ChipVariant;
  size?: ChipSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ChipVariant, string> = {
  easy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  hard: 'bg-red-50 text-red-700 border-red-200',
  road: 'bg-blue-50 text-blue-700 border-blue-200',
  gravel: 'bg-purple-50 text-purple-700 border-purple-200',
  mixed: 'bg-indigo-50 text-indigo-700 border-indigo-200',
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
