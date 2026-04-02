import React, { useState } from 'react';
import { SearchField } from '@/app/components/design-system/SearchField';
import { EventCard, Event } from '@/app/components/cards/EventCard';
import { EmptyState } from '@/app/components/design-system/EmptyState';
import { Calendar } from 'lucide-react';

interface EventsScreenProps {
  events: Event[];
  onEventClick: (eventId: string) => void;
}

export function EventsScreen({ events, onEventClick }: EventsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'this-month'>('upcoming');

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      const eventDate = new Date(event.date);
      const matchesFilter =
        filterType === 'all' ||
        (filterType === 'upcoming' && eventDate >= now) ||
        (filterType === 'this-month' &&
          eventDate.getMonth() === thisMonth &&
          eventDate.getFullYear() === thisYear);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Group events by month
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div className="h-full bg-white overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-2xl mb-4">Events</h1>

          {/* Filter Chips */}
          <div className="flex gap-2 mb-4">
            {['upcoming', 'this-month', 'all'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as typeof filterType)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  filterType === type
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'upcoming'
                  ? 'Upcoming'
                  : type === 'this-month'
                  ? 'This Month'
                  : 'All Events'}
              </button>
            ))}
          </div>

          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search events"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {filteredEvents.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No events found"
            description="Try adjusting your search or filter"
          />
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
              <div key={monthYear}>
                <div className="sticky top-[180px] bg-white py-2 mb-3 border-b border-gray-100">
                  <h3 className="text-sm text-gray-500">{monthYear}</h3>
                </div>
                <div className="space-y-3">
                  {monthEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => onEventClick(event.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
