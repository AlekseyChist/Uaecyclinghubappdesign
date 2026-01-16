import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export function ErrorState({ 
  title = 'Something went wrong', 
  message = 'Please try again later',
  action 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-red-50 p-4 mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-base mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 max-w-sm">{message}</p>
      {action}
    </div>
  );
}
