import { useState, useEffect, useCallback } from 'react';
import { fetchClubEvents, ClubEvent } from '@/services/stravaService';

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
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { clubEvents, isLoading, error, refetch: fetchEvents };
}
