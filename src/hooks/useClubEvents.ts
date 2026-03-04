import { useState, useEffect, useCallback } from 'react';
import { fetchClubEvents, ClubEvent } from '@/services/stravaService';

// Fallback club events shown when Strava API is unavailable
// These are the recurring DBB club events from Strava
function getFallbackClubEvents(): ClubEvent[] {
  const now = new Date();

  // Find the next occurrence of a given weekday (0=Sun, 1=Mon, ..., 6=Sat)
  const getNextWeekday = (weekday: number, weeksFromNow = 0): Date => {
    const date = new Date(now);
    const diff = (weekday - date.getDay() + 7) % 7 || 7;
    date.setDate(date.getDate() + diff + weeksFromNow * 7);
    return date;
  };

  const formatDate = (d: Date): string => d.toISOString().split('T')[0];

  // Filter out past events
  return [
    // DBB Dark-On-Draft — every Thursday 6:00 PM
    ...[0, 1, 2, 3].map((w) => {
      const d = getNextWeekday(4, w); // Thursday
      return {
        id: `strava-fallback-dod-${w}`,
        name: 'DBB Dark-On-Draft',
        date: formatDate(d),
        time: '06:00 PM',
        location: 'Belgrade, Serbia',
        type: 'group-ride' as const,
        status: 'upcoming' as const,
        isSaved: false,
        description: 'Evening workout ride. Check Strava club for the latest route and meeting point.',
        organizer: 'DBB Club',
        activityType: 'Ride',
        isFromStrava: true,
      };
    }),
    // DBB Coffee Ride — every Saturday 9:30 AM
    ...[0, 1, 2, 3].map((w) => {
      const d = getNextWeekday(6, w); // Saturday
      return {
        id: `strava-fallback-cr-${w}`,
        name: 'DBB Coffee Ride',
        date: formatDate(d),
        time: '09:30 AM',
        location: 'Žorža Klemansoa 27V, Belgrade, Serbia',
        type: 'group-ride' as const,
        status: 'upcoming' as const,
        isSaved: false,
        description: 'Social weekend coffee ride. Check Strava club for the latest route and details.',
        organizer: 'DBB Club',
        activityType: 'Ride',
        isFromStrava: true,
      };
    }),
    // DBB Rekafary Ride — Wednesday 8:00 AM (recurring)
    ...[0, 1, 2, 3].map((w) => {
      const d = getNextWeekday(3, w); // Wednesday
      return {
        id: `strava-fallback-rek-${w}`,
        name: 'DBB Rekafary Ride',
        date: formatDate(d),
        time: '08:00 AM',
        location: 'Savsko pristanište, Belgrade, Serbia',
        type: 'group-ride' as const,
        status: 'upcoming' as const,
        isSaved: false,
        description: 'Social morning ride. Check Strava club for the latest route and details.',
        organizer: 'DBB Club',
        activityType: 'Ride',
        isFromStrava: true,
      };
    }),
    // DBB Burekfast Club — Tuesday 7:00 AM (recurring)
    ...[0, 1, 2, 3].map((w) => {
      const d = getNextWeekday(2, w); // Tuesday
      return {
        id: `strava-fallback-bf-${w}`,
        name: 'DBB Burekfast Club',
        date: formatDate(d),
        time: '07:00 AM',
        location: 'Gundulićev venac, Belgrade, Serbia',
        type: 'granfondo' as const,
        status: 'upcoming' as const,
        isSaved: false,
        description: 'Workout morning ride. Check Strava club for the latest route and details.',
        organizer: 'DBB Club',
        activityType: 'Ride',
        isFromStrava: true,
      };
    }),
  ]
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

interface UseClubEventsResult {
  clubEvents: ClubEvent[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useClubEvents(): UseClubEventsResult {
  const [clubEvents, setClubEvents] = useState<ClubEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const events = await fetchClubEvents();
      setClubEvents(events);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load club events';
      setError(message);
      console.error('Error fetching club events:', err);
      // Use fallback events so the UI isn't empty
      setClubEvents(getFallbackClubEvents());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { clubEvents, isLoading, error, refetch: fetchEvents };
}
