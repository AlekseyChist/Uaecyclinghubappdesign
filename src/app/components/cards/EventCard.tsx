import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Chip } from '@/app/components/design-system/Chip';

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  type: 'race' | 'granfondo' | 'group-ride';
  distanceOptions?: string[];
  status: 'upcoming' | 'sold-out' | 'canceled';
  isSaved?: boolean;
}

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

const typeLabels = {
  race: 'Race',
  granfondo: 'Gran Fondo',
  'group-ride': 'Group Ride',
};

const statusStyles = {
  upcoming: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'sold-out': 'bg-gray-50 text-gray-700 border-gray-200',
  canceled: 'bg-red-50 text-red-700 border-red-200',
};

export function EventCard({ event, onClick }: EventCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    };
  };

  const { day, month } = formatDate(event.date);

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-14 h-14 bg-primary/5 rounded-xl flex flex-col items-center justify-center border border-primary/10">
          <div className="text-xs font-medium text-primary">{month}</div>
          <div className="text-xl font-semibold text-primary">{day}</div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-medium">{event.name}</h3>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Chip size="sm">{typeLabels[event.type]}</Chip>
            {event.distanceOptions && (
              <span className="text-xs text-gray-500">
                {event.distanceOptions.join(' / ')}
              </span>
            )}
            {event.status !== 'upcoming' && (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs ${statusStyles[event.status]}`}
              >
                {event.status === 'sold-out' ? 'Sold Out' : 'Canceled'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
