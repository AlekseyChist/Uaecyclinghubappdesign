import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { SearchField } from '@/app/components/design-system/SearchField';
import { BottomSheet, BottomSheetState } from '@/app/components/design-system/BottomSheet';
import { TrackCard, Track } from '@/app/components/cards/TrackCard';
import { EmptyState } from '@/app/components/design-system/EmptyState';
import { Chip } from '@/app/components/design-system/Chip';
import { MapIcon } from 'lucide-react';
import { MapView } from '@/app/components/map/MapView';

interface TracksScreenProps {
  tracks: Track[];
  onTrackClick: (trackId: string) => void;
  onFavoriteToggle: (trackId: string) => void;
}

type DifficultyFilter = 'easy' | 'norm' | 'long' | 'hard' | 'epic';
type SurfaceFilter = 'road' | 'gravel' | 'mixed';
type RideFamilyFilter = 'coffee' | 'dark' | 'sun' | 'plus' | 'misc';
type RouteTypeFilter = 'loop' | 'point_to_point';

const difficultyOptions: { value: DifficultyFilter; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'norm', label: 'Norm' },
  { value: 'long', label: 'Long' },
  { value: 'hard', label: 'Hard' },
  { value: 'epic', label: 'Epic' },
];

const surfaceOptions: { value: SurfaceFilter; label: string }[] = [
  { value: 'road', label: 'Road' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'mixed', label: 'Mixed' },
];

const familyOptions: { value: RideFamilyFilter; label: string }[] = [
  { value: 'coffee', label: 'Coffee' },
  { value: 'dark', label: 'Dark' },
  { value: 'sun', label: 'Sun' },
  { value: 'plus', label: 'Plus' },
  { value: 'misc', label: 'Misc' },
];

const formatOptions: { value: RouteTypeFilter; label: string }[] = [
  { value: 'loop', label: 'Loop ↺' },
  { value: 'point_to_point', label: 'A → B' },
];

export function TracksScreen({ tracks, onTrackClick, onFavoriteToggle }: TracksScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sheetState, setSheetState] = useState<BottomSheetState>('collapsed');
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    difficulty: null as DifficultyFilter | null,
    surface: null as SurfaceFilter | null,
    rideFamily: null as RideFamilyFilter | null,
    routeType: null as RouteTypeFilter | null,
    showFavorites: false,
  });

  const filteredTracks = tracks.filter((track) => {
    const matchesSearch = track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !filters.difficulty || track.difficulty === filters.difficulty;
    const matchesSurface = !filters.surface || track.surface === filters.surface;
    const matchesFamily = !filters.rideFamily || track.rideFamily === filters.rideFamily;
    const matchesType = !filters.routeType || track.routeType === filters.routeType;
    const matchesFavorites = !filters.showFavorites || track.isFavorite;

    return matchesSearch && matchesDifficulty && matchesSurface && matchesFamily && matchesType && matchesFavorites;
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
    filters.rideFamily,
    filters.routeType,
    filters.showFavorites,
  ].filter(Boolean).length;

  return (
    <div className="h-full bg-white relative overflow-hidden">
      {/* Search and Filter Bar - must be above map */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 search-bar-container">
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
              {/* Difficulty */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 w-14 flex-shrink-0">Difficulty:</span>
                {difficultyOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilters({ ...filters, difficulty: filters.difficulty === opt.value ? null : opt.value })}
                  >
                    <Chip
                      variant={opt.value}
                      className={filters.difficulty === opt.value ? 'ring-2 ring-offset-1 ring-primary' : 'opacity-60'}
                    >
                      {opt.label}
                    </Chip>
                  </button>
                ))}
              </div>

              {/* Surface */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 w-14 flex-shrink-0">Surface:</span>
                {surfaceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilters({ ...filters, surface: filters.surface === opt.value ? null : opt.value })}
                  >
                    <Chip
                      variant={opt.value}
                      className={filters.surface === opt.value ? 'ring-2 ring-offset-1 ring-primary' : 'opacity-60'}
                    >
                      {opt.label}
                    </Chip>
                  </button>
                ))}
              </div>

              {/* DBB Ride Family */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 w-14 flex-shrink-0">DBB Ride:</span>
                {familyOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilters({ ...filters, rideFamily: filters.rideFamily === opt.value ? null : opt.value })}
                  >
                    <Chip
                      variant={opt.value}
                      className={filters.rideFamily === opt.value ? 'ring-2 ring-offset-1 ring-primary' : 'opacity-60'}
                    >
                      {opt.label}
                    </Chip>
                  </button>
                ))}
              </div>

              {/* Route Type */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 w-14 flex-shrink-0">Format:</span>
                {formatOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilters({ ...filters, routeType: filters.routeType === opt.value ? null : opt.value })}
                  >
                    <Chip
                      variant={opt.value}
                      className={filters.routeType === opt.value ? 'ring-2 ring-offset-1 ring-primary' : 'opacity-60'}
                    >
                      {opt.label}
                    </Chip>
                  </button>
                ))}
              </div>

              {/* Favorites + Clear */}
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
                    onClick={() => setFilters({
                      difficulty: null,
                      surface: null,
                      rideFamily: null,
                      routeType: null,
                      showFavorites: false,
                    })}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

      {/* Map Area - map-container-wrapper class creates isolated stacking context */}
      <div className="absolute inset-0 overflow-hidden map-container-wrapper">
        <MapView
          tracks={filteredTracks
            .filter(track => track.coordinates)
            .map(track => ({
              id: track.id,
              name: track.name,
              region: track.region,
              difficulty: track.difficulty,
              coordinates: track.coordinates!,
              route: track.route?.map(p => [p.lat, p.lng] as [number, number]),
            }))}
          selectedTrackId={selectedTrackId}
          onTrackSelect={handlePinClick}
          onTrackOpen={onTrackClick}
          showRoutes={true}
        />
      </div>

      {/* Track count overlay */}
      <div className="absolute bottom-32 left-4 right-4 pointer-events-none track-count-overlay">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 inline-flex items-center gap-2 shadow-sm">
          <MapIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">
            {filteredTracks.length} track{filteredTracks.length !== 1 ? 's' : ''}
          </span>
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
