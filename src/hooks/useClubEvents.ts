import { useState, useEffect, useCallback } from 'react';
import { fetchClubEvents, ClubEvent } from '@/services/stravaService';

// Fallback club events shown when Strava API is unavailable
function getFallbackClubEvents(): ClubEvent[] {
  const now = new Date();

  // Generate upcoming Saturday dates for the next 4 weeks
  const getNextSaturday = (weeksFromNow: number): Date => {
    const date = new Date(now);
    const dayOfWeek = date.getDay();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
    date.setDate(date.getDate() + daysUntilSaturday + (weeksFromNow - 1) * 7);
    date.setHours(8, 0, 0, 0);
    return date;
  };

  const getNextSunday = (weeksFromNow: number): Date => {
    const date = getNextSaturday(weeksFromNow);
    date.setDate(date.getDate() + 1);
    date.setHours(8, 0, 0, 0);
    return date;
  };

  return [
    {
      id: 'strava-fallback-1',
      name: 'DBB Saturday Community Ride',
      date: getNextSaturday(1).toISOString().split('T')[0],
      time: '08:00 AM',
      location: 'Belgrade, Serbia',
      type: 'group-ride',
      status: 'upcoming',
      isSaved: false,
      description: 'Weekly Saturday community ride. Check Strava club for the latest route and details.',
      organizer: 'DBB Club',
      activityType: 'Ride',
      isFromStrava: true,
    },
    {
      id: 'strava-fallback-2',
      name: 'DBB Sunday Recovery Ride',
      date: getNextSunday(1).toISOString().split('T')[0],
      time: '09:00 AM',
      location: 'Belgrade, Serbia',
      type: 'group-ride',
      status: 'upcoming',
      isSaved: false,
      description: 'Easy-pace Sunday recovery ride. Check Strava club for details.',
      organizer: 'DBB Club',
      activityType: 'Ride',
      isFromStrava: true,
    },
    {
      id: 'strava-fallback-3',
      name: 'DBB Saturday Community Ride',
      date: getNextSaturday(2).toISOString().split('T')[0],
      time: '08:00 AM',
      location: 'Belgrade, Serbia',
      type: 'group-ride',
      status: 'upcoming',
      isSaved: false,
      description: 'Weekly Saturday community ride. Check Strava club for the latest route and details.',
      organizer: 'DBB Club',
      activityType: 'Ride',
      isFromStrava: true,
    },
    {
      id: 'strava-fallback-4',
      name: 'DBB Saturday Community Ride',
      date: getNextSaturday(3).toISOString().split('T')[0],
      time: '08:00 AM',
      location: 'Belgrade, Serbia',
      type: 'group-ride',
      status: 'upcoming',
      isSaved: false,
      description: 'Weekly Saturday community ride. Check Strava club for the latest route and details.',
      organizer: 'DBB Club',
      activityType: 'Ride',
      isFromStrava: true,
    },
  ];
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
