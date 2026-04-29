import React, { useRef, useState } from 'react';
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

export function TracksScreen({ tracks, onTrackClick, onFavoriteToggle }: TracksScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sheetState, setSheetState] = useState<BottomSheetState>('collapsed');
  const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  
  type RideType = 'coffee' | 'dark' | 'sun' | 'plus' | 'misc';

  const [filters, setFilters] = useState({
    difficulty: null as 'easy' | 'medium' | 'hard' | null,
    surface: null as 'road' | 'gravel' | null,
    rideType: null as RideType | null,
    region: null as string | null,
    showFavorites: false,
  });

  const getRideType = (name: string): RideType => {
    const n = name.toUpperCase();
    if (n.includes('DBB CR') || n.includes('COFFEE')) return 'coffee';
    if (n.includes('DBB DOD') || n.includes('DBB DOR') || n.includes('DARK')) return 'dark';
    if (n.includes('DBB SUN')) return 'sun';
    if (n.includes('DBB+')) return 'plus';
    return 'misc';
  };

  const filteredTracks = tracks.filter((track) => {
    const matchesSearch = track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !filters.difficulty || track.difficulty === filters.difficulty;
    const matchesSurface = !filters.surface || track.surface === filters.surface;
    const matchesRideType = !filters.rideType || getRideType(track.name) === filters.rideType;
    const matchesRegion = !filters.region || track.region === filters.region;
    const matchesFavorites = !filters.showFavorites || track.isFavorite;

    return matchesSearch && matchesDifficulty && matchesSurface && matchesRideType && matchesRegion && matchesFavorites;
  });

  // MapView calls this for both marker clicks (single-track array) and polyline
  // clicks (array of all overlapping tracks within the click hit-radius).
  const handleTracksSelect = (ids: string[]) => {
    setSelectedTrackIds(ids);
    setSheetState('half');
  };

  // Dragging the sheet down to collapsed is the way back to the full list —
  // matches "no Show all button" UX while still letting the user dismiss the selection.
  const handleSheetStateChange = (next: BottomSheetState) => {
    setSheetState(next);
    if (next === 'collapsed') {
      setSelectedTrackIds([]);
    }
  };

  const handleTrackCardClick = (trackId: string) => {
    onTrackClick(trackId);
  };

  // Selection narrowed to tracks still passing current filters — if the user
  // toggles a filter after selecting and the selection drops out, the UI falls
  // back to the full filtered list instead of showing a stale empty state.
  const selectedTracks = selectedTrackIds.length
    ? filteredTracks.filter((t) => selectedTrackIds.includes(t.id))
    : [];
  const sheetTracks = selectedTracks.length ? selectedTracks : filteredTracks;

  const activeFiltersCount = [
    filters.difficulty,
    filters.surface,
    filters.rideType,
    filters.region,
    filters.showFavorites,
  ].filter(Boolean).length;

  return (
    <div className="h-full bg-white relative overflow-hidden">
      {/* Search and Filter Bar - must be above map */}
      <div ref={searchBarRef} className="absolute top-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 search-bar-container">
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
                {(['road', 'gravel'] as const).map((surf) => (
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
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500">Ride:</span>
                {([
                  ['coffee', 'Coffee'],
                  ['dark', 'Dark'],
                  ['sun', 'Sun'],
                  ['plus', 'Plus'],
                  ['misc', 'Misc'],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilters({ ...filters, rideType: filters.rideType === key ? null : key })}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                      filters.rideType === key
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-200 opacity-60'
                    }`}
                  >
                    {label}
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
                    onClick={() => setFilters({ difficulty: null, surface: null, rideType: null, region: null, showFavorites: false })}
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
          selectedTrackIds={selectedTrackIds}
          onTracksSelect={handleTracksSelect}
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
      <BottomSheet state={sheetState} onStateChange={handleSheetStateChange} topAnchorRef={searchBarRef}>
        <div className="mb-3">
          {selectedTracks.length === 1 ? (
            <>
              <h3 className="font-medium mb-1 truncate">{selectedTracks[0].name}</h3>
              <p className="text-sm text-gray-500">Drag down to see all tracks</p>
            </>
          ) : selectedTracks.length > 1 ? (
            <>
              <h3 className="font-medium mb-1">
                {selectedTracks.length} tracks at this point
              </h3>
              <p className="text-sm text-gray-500">Drag down to see all tracks</p>
            </>
          ) : (
            <>
              <h3 className="font-medium mb-1">
                {filteredTracks.length} track{filteredTracks.length !== 1 ? 's' : ''} found
              </h3>
              <p className="text-sm text-gray-500">Select a track to preview</p>
            </>
          )}
        </div>

        {sheetTracks.length === 0 ? (
          <EmptyState
            icon={MapIcon}
            title="No tracks found"
            description="Try adjusting your filters or search query"
          />
        ) : (
          <div className="space-y-3">
            {sheetTracks.map((track) => (
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
