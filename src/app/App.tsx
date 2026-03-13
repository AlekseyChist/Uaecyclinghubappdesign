import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { BottomNav, TabType } from './components/navigation/BottomNav';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { TracksScreen } from './screens/TracksScreen';
import { TrackDetailScreen } from './screens/TrackDetailScreen';
import { ShopsScreen } from './screens/ShopsScreen';
import { RegulationsScreen } from './screens/RegulationsScreen';
import { EventsScreen } from './screens/EventsScreen';
import { EventDetailScreen } from './screens/EventDetailScreen';
import {
  mockEvents,
  mockShops,
  mockRegulations,
} from '../data/mockData';

import { useClubEvents } from '../hooks/useClubEvents';
import { trackService } from '../services/trackService';
import type { Track } from './components/cards/TrackCard';
import type { Event } from './components/cards/EventCard';

type Screen =
  | { type: 'onboarding' }
  | { type: 'main'; tab: TabType }
  | { type: 'track-detail'; trackId: string }
  | { type: 'event-detail'; eventId: string };

// Club configuration - filter tracks by region
const CLUB_REGION = 'Serbia';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>({ type: 'onboarding' });
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoadingTracks, setIsLoadingTracks] = useState(true);
  const [tracksError, setTracksError] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const { clubEvents, isLoading: isLoadingClubEvents, error: clubEventsError, refetch: refetchClubEvents } = useClubEvents();

  useEffect(() => {
    const loadTracks = async () => {
      try {
        setIsLoadingTracks(true);
        setTracksError(null);

        const supabaseTracks = await trackService.getTracks(CLUB_REGION);
        setTracks(supabaseTracks as Track[]);
      } catch (error) {
        console.error('Failed to load tracks from Supabase:', error);
        setTracksError('Failed to load tracks');
      } finally {
        setIsLoadingTracks(false);
      }
    };

    loadTracks();
  }, []);

  const handleOnboardingComplete = () => {
    setCurrentScreen({ type: 'main', tab: 'tracks' });
  };

  const handleTabChange = (tab: TabType) => {
    setCurrentScreen({ type: 'main', tab });
  };

  const handleTrackClick = (trackId: string) => {
    setCurrentScreen({ type: 'track-detail', trackId });
  };

  const handleEventClick = (eventId: string) => {
    setCurrentScreen({ type: 'event-detail', eventId });
  };

  const handleBack = () => {
    if (currentScreen.type === 'track-detail') {
      setCurrentScreen({ type: 'main', tab: 'tracks' });
    } else if (currentScreen.type === 'event-detail') {
      setCurrentScreen({ type: 'main', tab: 'events' });
    }
  };

  const handleFavoriteToggle = (trackId: string) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) => {
        if (track.id === trackId) {
          const isFavorite = !track.isFavorite;
          toast.success(isFavorite ? 'Added to favorites' : 'Removed from favorites');
          return { ...track, isFavorite };
        }
        return track;
      })
    );
  };

  const handleEventSaveToggle = (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === eventId) {
          const isSaved = !event.isSaved;
          toast.success(isSaved ? 'Event saved' : 'Event removed');
          return { ...event, isSaved };
        }
        return event;
      })
    );
  };

  if (currentScreen.type === 'onboarding') {
    return <OnboardingScreen onContinue={handleOnboardingComplete} />;
  }

  if (isLoadingTracks) {
    return <div className="p-4">Loading tracks...</div>;
  }

  if (tracksError) {
    return <div className="p-4">{tracksError}</div>;
  }

  if (currentScreen.type === 'track-detail') {
    const track = tracks.find((t) => t.id === currentScreen.trackId);

    if (!track) {
      return <div>Track not found</div>;
    }

    return (
      <TrackDetailScreen
        track={track}
        onBack={handleBack}
        onFavoriteToggle={() => handleFavoriteToggle(track.id)}
      />
    );
  }

  if (currentScreen.type === 'event-detail') {
    const event = events.find((e) => e.id === currentScreen.eventId)
      || clubEvents.find((e) => e.id === currentScreen.eventId);

    if (!event) {
      return <div>Event not found</div>;
    }

    return (
      <EventDetailScreen
        event={event}
        onBack={handleBack}
        onSaveToggle={() => handleEventSaveToggle(event.id)}
      />
    );
  }

  const activeTab = currentScreen.tab;

  return (
    <div className="h-screen flex flex-col bg-white max-w-md mx-auto">
      <Toaster position="top-center" richColors />
      <div className="flex-1 overflow-hidden">
        {activeTab === 'tracks' && (
          <TracksScreen
            tracks={tracks}
            onTrackClick={handleTrackClick}
            onFavoriteToggle={handleFavoriteToggle}
          />
        )}
        {activeTab === 'shops' && (
          <ShopsScreen shops={mockShops} />
        )}
        {activeTab === 'regulations' && (
          <RegulationsScreen regulations={mockRegulations} />
        )}
        {activeTab === 'events' && (
          <EventsScreen
            events={events}
            clubEvents={clubEvents as Event[]}
            isLoadingClubEvents={isLoadingClubEvents}
            clubEventsError={clubEventsError}
            onEventClick={handleEventClick}
            onRefreshClubEvents={refetchClubEvents}
          />
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}