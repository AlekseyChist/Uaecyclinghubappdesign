import React from 'react';
import { ArrowLeft, Calendar, MapPin, Share2, Bookmark, ExternalLink, Clock, Users } from 'lucide-react';
import { Chip } from '@/app/components/design-system/Chip';
import type { Event } from '@/app/components/cards/EventCard';

interface EventDetailScreenProps {
  event: Event;
  onBack: () => void;
  onSaveToggle: () => void;
}

const typeLabels = {
  race: 'Race',
  granfondo: 'Gran Fondo',
  'group-ride': 'Group Ride',
};

export function EventDetailScreen({ event, onBack, onSaveToggle }: EventDetailScreenProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: `Join me at ${event.name} on ${formatDate(event.date)}`,
        url: window.location.href,
      });
    }
  };

  const handleAddToCalendar = () => {
    // In a real app, this would create a calendar event
    alert('Calendar integration would open here');
  };

  return (
    <div className="h-full bg-white overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onSaveToggle}
              className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <Bookmark
                className={`w-5 h-5 ${event.isSaved ? 'fill-primary text-primary' : 'text-gray-600'}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-blue-500 to-primary h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <Calendar className="w-16 h-16 mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium opacity-90">Event</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Title and Type */}
        <div>
          <h1 className="text-2xl mb-3">{event.name}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <Chip>{typeLabels[event.type]}</Chip>
            {event.status !== 'upcoming' && (
              <Chip variant={event.status === 'sold-out' ? 'default' : 'hard'}>
                {event.status === 'sold-out' ? 'Sold Out' : 'Canceled'}
              </Chip>
            )}
          </div>
        </div>

        {/* Key Info */}
        <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm text-gray-500">Date & Time</div>
              <div className="font-medium">{formatDate(event.date)}</div>
              <div className="text-sm text-gray-600">{event.time}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm text-gray-500">Location</div>
              <div className="font-medium">{event.location}</div>
            </div>
          </div>

          {event.distanceOptions && event.distanceOptions.length > 0 && (
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Distance Options</div>
                <div className="font-medium">{event.distanceOptions.join(', ')}</div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="mb-2">About this event</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Join fellow cyclists for an exciting {typeLabels[event.type].toLowerCase()} through the beautiful landscapes of {event.location}. This event is perfect for riders of all levels looking to challenge themselves and connect with the cycling community.
          </p>
        </div>

        {/* What to Bring */}
        <div>
          <h3 className="mb-2">What to bring</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Valid ID and emergency contact information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Helmet (mandatory), bike lights, and reflective gear</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Water bottles and energy snacks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Basic repair kit (spare tube, pump, multi-tool)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Sunscreen and sunglasses</span>
            </li>
          </ul>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="mb-3">Event Timeline</h3>
          <div className="space-y-3">
            {[
              { time: '05:30 AM', label: 'Registration Opens' },
              { time: '06:00 AM', label: 'Safety Briefing' },
              { time: '06:30 AM', label: 'Event Start' },
              { time: '10:00 AM', label: 'Expected Finish (varies by distance)' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-20 text-sm text-gray-500 font-medium">
                  {item.time}
                </div>
                <div className="flex-1 pb-3 border-b border-gray-100 last:border-0">
                  <div className="text-sm">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCalendar}
            className="w-full bg-primary text-white py-4 rounded-2xl font-medium hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Add to Calendar
          </button>
          <button
            className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-medium hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            onClick={() => window.open('https://example.com', '_blank')}
          >
            <ExternalLink className="w-5 h-5" />
            Open Organizer Site
          </button>
        </div>

        {/* Footer Note */}
        {event.status === 'upcoming' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <p className="text-xs text-emerald-900 leading-relaxed">
              <strong>Registration Open:</strong> Visit the organizer's website to secure your spot. Early registration often includes discounts and guaranteed event swag.
            </p>
          </div>
        )}

        {event.status === 'sold-out' && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>Event Full:</strong> This event has reached capacity. Check the organizer's website for waitlist information or future events.
            </p>
          </div>
        )}

        {event.status === 'canceled' && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-xs text-red-900 leading-relaxed">
              <strong>Event Canceled:</strong> This event has been canceled. Contact the organizer for refund information or rescheduling details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
