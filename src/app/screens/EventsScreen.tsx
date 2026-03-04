import React, { useState } from 'react';
import { SearchField } from '@/app/components/design-system/SearchField';
import { EventCard, Event } from '@/app/components/cards/EventCard';
import { EmptyState } from '@/app/components/design-system/EmptyState';
import { Calendar, RefreshCw, AlertCircle } from 'lucide-react';

interface EventsScreenProps {
  events: Event[];
  clubEvents: Event[];
  isLoadingClubEvents: boolean;
  clubEventsError: string | null;
  onEventClick: (eventId: string) => void;
  onRefreshClubEvents: () => void;
}

type SourceFilter = 'all' | 'club' | 'community';

export function EventsScreen({
  events,
  clubEvents,
  isLoadingClubEvents,
  clubEventsError,
  onEventClick,
  onRefreshClubEvents,
}: EventsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'this-month'>('upcoming');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  // Merge both event sources
  const allEvents = [
    ...clubEvents,
    ...events.map((e) => ({ ...e, isFromStrava: false })),
  ];

  const filteredEvents = allEvents
    .filter((event) => {
      // Source filter
      if (sourceFilter === 'club' && !event.isFromStrava) return false;
      if (sourceFilter === 'community' && event.isFromStrava) return false;

      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      const eventDate = new Date(event.date);
      const matchesFilter =
        filterType === 'all' ||
        (filterType === 'upcoming' && (eventDate >= now || event.status === 'recurring')) ||
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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl">Events</h1>
            {clubEvents.length > 0 && (
              <button
                onClick={onRefreshClubEvents}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                title="Refresh club events"
              >
                <RefreshCw className={`w-4 h-4 text-gray-600 ${isLoadingClubEvents ? 'animate-spin' : ''}`} />
              </button>
            )}
          </div>

          {/* Source Filter */}
          <div className="flex gap-2 mb-3">
            {(['all', 'club', 'community'] as SourceFilter[]).map((source) => (
              <button
                key={source}
                onClick={() => setSourceFilter(source)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                  sourceFilter === source
                    ? source === 'club'
                      ? 'bg-[#FC4C02] text-white'
                      : 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {source === 'club' && (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>
                )}
                {source === 'all' ? 'All' : source === 'club' ? 'DBB Club' : 'Community'}
              </button>
            ))}
          </div>

          {/* Time Filter */}
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
        {/* Loading state for club events */}
        {isLoadingClubEvents && clubEvents.length === 0 && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl mb-4">
            <RefreshCw className="w-5 h-5 text-[#FC4C02] animate-spin flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700">Loading club events from Strava...</p>
              <p className="text-xs text-gray-500">Fetching latest DBB club events</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {clubEventsError && (
          <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-100 rounded-2xl mb-4">
            <AlertCircle className="w-5 h-5 text-[#FC4C02] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Showing scheduled club events
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Live sync with Strava is temporarily unavailable. Check the club for the latest updates.
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
                  onClick={onRefreshClubEvents}
                  className="text-xs font-medium text-gray-500 underline"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredEvents.length === 0 && !isLoadingClubEvents ? (
          <EmptyState
            icon={Calendar}
            title="No events found"
            description="Try adjusting your search or filter"
          />
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
              <div key={monthYear}>
                <div className="sticky top-[240px] bg-white py-2 mb-3 border-b border-gray-100">
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
