import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}
