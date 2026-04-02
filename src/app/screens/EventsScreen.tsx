import React, { useState } from 'react';
import { SearchField } from '@/app/components/design-system/SearchField';
import { EventCard, Event } from '@/app/components/cards/EventCard';
import { EmptyState } from '@/app/components/design-system/EmptyState';
import { Calendar, RefreshCw, AlertCircle } from 'lucide-react';

interface EventsScreenProps {
  events: Event[];
  isLoadingEvents: boolean;
  eventsError: string | null;
  onEventClick: (eventId: string) => void;
  onRefreshEvents: () => void;
}

export function EventsScreen({
  events,
  isLoadingEvents,
  eventsError,
  onEventClick,
  onRefreshEvents,
}: EventsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'this-month'>('upcoming');

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Compare date strings to avoid timezone issues
      const eventDate = new Date(event.date);
      const matchesFilter =
        filterType === 'all' ||
        (filterType === 'upcoming' && event.date >= todayStr) ||
        (filterType === 'this-month' &&
          eventDate.getMonth() === thisMonth &&
          eventDate.getFullYear() === thisYear);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl">Events</h1>
            <button
              onClick={onRefreshEvents}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              title="Refresh events"
            >
              <RefreshCw className={`w-4 h-4 text-gray-600 ${isLoadingEvents ? 'animate-spin' : ''}`} />
            </button>
          </div>

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
        {/* Loading state */}
        {isLoadingEvents && events.length === 0 && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl mb-4">
            <RefreshCw className="w-5 h-5 text-[#FC4C02] animate-spin flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700">Loading events from Strava...</p>
              <p className="text-xs text-gray-500">Fetching latest DBB club events</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {eventsError && (
          <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-100 rounded-2xl mb-4">
            <AlertCircle className="w-5 h-5 text-[#FC4C02] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Showing scheduled club events
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Live sync with Strava is temporarily unavailable.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href="https://www.strava.com/clubs/dbb-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#FC4C02] underline"
                >
                  Open DBB Club on Strava
                </a>
                <button
                  onClick={onRefreshEvents}
                  className="text-xs font-medium text-gray-500 underline"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredEvents.length === 0 && !isLoadingEvents ? (
          <EmptyState
            icon={Calendar}
            title="No events found"
            description="Try adjusting your search or filter"
          />
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
              <div key={monthYear}>
                <div className="sticky top-[220px] bg-white py-2 mb-3 border-b border-gray-100">
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
