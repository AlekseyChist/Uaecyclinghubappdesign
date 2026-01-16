import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { BottomNav, TabType } from '@/app/components/navigation/BottomNav';
import { OnboardingScreen } from '@/app/screens/OnboardingScreen';
import { TracksScreen } from '@/app/screens/TracksScreen';
import { TrackDetailScreen } from '@/app/screens/TrackDetailScreen';
import { ShopsScreen } from '@/app/screens/ShopsScreen';
import { ShopDetailScreen } from '@/app/screens/ShopDetailScreen';
import { RegulationsScreen } from '@/app/screens/RegulationsScreen';
import { EventsScreen } from '@/app/screens/EventsScreen';
import { EventDetailScreen } from '@/app/screens/EventDetailScreen';
import {
  mockTracks,
  mockEvents,
  mockShops,
  mockRegulations,
  mockTrackDetails,
} from '@/data/mockData';
import type { Track } from '@/app/components/cards/TrackCard';
import type { Event } from '@/app/components/cards/EventCard';
import type { Shop } from '@/app/components/cards/ShopCard';

type Screen =
  | { type: 'onboarding' }
  | { type: 'main'; tab: TabType }
  | { type: 'track-detail'; trackId: string }
  | { type: 'shop-detail'; shopId: string }
  | { type: 'event-detail'; eventId: string };

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>({ type: 'onboarding' });
  const [tracks, setTracks] = useState<Track[]>(mockTracks);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [shops] = useState<Shop[]>(mockShops);

  const handleOnboardingComplete = () => {
    setCurrentScreen({ type: 'main', tab: 'tracks' });
  };

  const handleTabChange = (tab: TabType) => {
    setCurrentScreen({ type: 'main', tab });
  };

  const handleTrackClick = (trackId: string) => {
    setCurrentScreen({ type: 'track-detail', trackId });
  };

  const handleShopClick = (shopId: string) => {
    setCurrentScreen({ type: 'shop-detail', shopId });
  };

  const handleEventClick = (eventId: string) => {
    setCurrentScreen({ type: 'event-detail', eventId });
  };

  const handleBack = () => {
    if (currentScreen.type === 'track-detail') {
      setCurrentScreen({ type: 'main', tab: 'tracks' });
    } else if (currentScreen.type === 'shop-detail') {
      setCurrentScreen({ type: 'main', tab: 'shops' });
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

  // Render onboarding
  if (currentScreen.type === 'onboarding') {
    return <OnboardingScreen onContinue={handleOnboardingComplete} />;
  }

  // Render track detail
  if (currentScreen.type === 'track-detail') {
    const track = tracks.find((t) => t.id === currentScreen.trackId);
    const trackDetail = mockTrackDetails[currentScreen.trackId];
    
    if (!track || !trackDetail) {
      return <div>Track not found</div>;
    }

    return (
      <TrackDetailScreen
        track={{ ...trackDetail, isFavorite: track.isFavorite }}
        onBack={handleBack}
        onFavoriteToggle={() => handleFavoriteToggle(track.id)}
      />
    );
  }

  // Render shop detail
  if (currentScreen.type === 'shop-detail') {
    const shop = shops.find((s) => s.id === currentScreen.shopId);
    
    if (!shop) {
      return <div>Shop not found</div>;
    }

    return <ShopDetailScreen shop={shop} onBack={handleBack} />;
  }

  // Render event detail
  if (currentScreen.type === 'event-detail') {
    const event = events.find((e) => e.id === currentScreen.eventId);
    
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

  // Render main app with tabs
  const activeTab = currentScreen.tab;

  return (
    <div className="h-screen flex flex-col bg-white max-w-md mx-auto">
      <Toaster position="top-center" richColors />
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'tracks' && (
          <TracksScreen
            tracks={tracks}
            onTrackClick={handleTrackClick}
            onFavoriteToggle={handleFavoriteToggle}
          />
        )}
        {activeTab === 'shops' && (
          <ShopsScreen shops={shops} onShopClick={handleShopClick} />
        )}
        {activeTab === 'regulations' && (
          <RegulationsScreen regulations={mockRegulations} />
        )}
        {activeTab === 'events' && (
          <EventsScreen events={events} onEventClick={handleEventClick} />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}