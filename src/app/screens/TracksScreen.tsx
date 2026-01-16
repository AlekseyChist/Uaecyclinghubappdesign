import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { SearchField } from '@/app/components/design-system/SearchField';
import { BottomSheet, BottomSheetState } from '@/app/components/design-system/BottomSheet';
import { TrackCard, Track } from '@/app/components/cards/TrackCard';
import { EmptyState } from '@/app/components/design-system/EmptyState';
import { Chip } from '@/app/components/design-system/Chip';
import { MapIcon } from 'lucide-react';
import { MapView } from '@/app/components/map/MapView';
import { getRouteForTrack } from '@/data/gpxRouteData';

interface TracksScreenProps {
  tracks: Track[];
  onTrackClick: (trackId: string) => void;
  onFavoriteToggle: (trackId: string) => void;
}

export function TracksScreen({ tracks, onTrackClick, onFavoriteToggle }: TracksScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sheetState, setSheetState] = useState<BottomSheetState>('collapsed');
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    difficulty: null as 'easy' | 'medium' | 'hard' | null,
    surface: null as 'road' | 'gravel' | 'mixed' | null,
    region: null as string | null,
    showFavorites: false,
  });

  const filteredTracks = tracks.filter((track) => {
    const matchesSearch = track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !filters.difficulty || track.difficulty === filters.difficulty;
    const matchesSurface = !filters.surface || track.surface === filters.surface;
    const matchesRegion = !filters.region || track.region === filters.region;
    const matchesFavorites = !filters.showFavorites || track.isFavorite;
    
    return matchesSearch && matchesDifficulty && matchesSurface && matchesRegion && matchesFavorites;
  });

  const handlePinClick = (trackId: string) => {
    setSelectedTrackId(trackId);
    setSheetState('half');
  };

  const handleTrackCardClick = (trackId: string) => {
    onTrackClick(trackId);
  };

  const activeFiltersCount = [
    filters.difficulty,
    filters.surface,
    filters.region,
    filters.showFavorites,
  ].filter(Boolean).length;

  return (
    <div className="h-full bg-white">
      {/* Map Area */}
      <div className="relative h-full bg-gradient-to-br from-blue-50 via-gray-50 to-emerald-50">
        {/* Search and Filter Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="flex gap-2">
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search tracks"
              className="flex-1"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter Chips */}
          {showFilters && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500">Difficulty:</span>
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setFilters({ ...filters, difficulty: filters.difficulty === diff ? null : diff })}
                  >
                    <Chip
                      variant={diff}
                      className={filters.difficulty === diff ? 'ring-2 ring-offset-2 ring-primary' : 'opacity-60'}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </Chip>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500">Surface:</span>
                {(['road', 'gravel', 'mixed'] as const).map((surf) => (
                  <button
                    key={surf}
                    onClick={() => setFilters({ ...filters, surface: filters.surface === surf ? null : surf })}
                  >
                    <Chip
                      variant={surf}
                      className={filters.surface === surf ? 'ring-2 ring-offset-2 ring-primary' : 'opacity-60'}
                    >
                      {surf.charAt(0).toUpperCase() + surf.slice(1)}
                    </Chip>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilters({ ...filters, showFavorites: !filters.showFavorites })}
                  className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                    filters.showFavorites
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  Favorites Only
                </button>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => setFilters({ difficulty: null, surface: null, region: null, showFavorites: false })}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Real Map with Leaflet */}
        <div className="absolute inset-0">
          <MapView
            tracks={filteredTracks
              .filter(track => track.coordinates)
              .map(track => ({
                id: track.id,
                name: track.name,
                region: track.region,
                difficulty: track.difficulty,
                coordinates: track.coordinates!,
                route: getRouteForTrack(track.id), // GPX route data
              }))}
            selectedTrackId={selectedTrackId}
            onTrackSelect={handlePinClick}
            onTrackOpen={onTrackClick}
            showRoutes={true}
          />
        </div>

        {/* Track count overlay */}
        <div className="absolute bottom-32 left-4 right-4 z-20 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 inline-flex items-center gap-2 shadow-sm">
            <MapIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">
              {filteredTracks.length} track{filteredTracks.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet state={sheetState} onStateChange={setSheetState}>
        <div className="mb-3">
          <h3 className="font-medium mb-1">
            {filteredTracks.length} track{filteredTracks.length !== 1 ? 's' : ''} found
          </h3>
          <p className="text-sm text-gray-500">Tap a pin on the map to preview</p>
        </div>

        {filteredTracks.length === 0 ? (
          <EmptyState
            icon={MapIcon}
            title="No tracks found"
            description="Try adjusting your filters or search query"
          />
        ) : (
          <div className="space-y-3">
            {filteredTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onClick={() => handleTrackCardClick(track.id)}
                onFavoriteToggle={() => onFavoriteToggle(track.id)}
              />
            ))}
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
