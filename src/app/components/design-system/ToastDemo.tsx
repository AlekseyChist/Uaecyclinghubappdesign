import React from 'react';
import { toast } from 'sonner';
import { Button } from './Button';
import { Check, X, Info, AlertCircle } from 'lucide-react';

export function ToastDemo() {
  return (
    <div className="space-y-3">
      <h3 className="mb-3">Toast Notifications</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            toast.success('Track saved to favorites', {
              icon: <Check className="w-4 h-4" />,
            })
          }
        >
          Success Toast
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast.error('Failed to load map', {
              icon: <X className="w-4 h-4" />,
            })
          }
        >
          Error Toast
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast.info('Remember to stay hydrated!', {
              icon: <Info className="w-4 h-4" />,
            })
          }
        >
          Info Toast
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast('GPX file downloaded', {
              icon: <AlertCircle className="w-4 h-4" />,
              description: 'Track has been saved to your device',
            })
          }
        >
          Toast with Description
        </Button>
      </div>
    </div>
  );
}
