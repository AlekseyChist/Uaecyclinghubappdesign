import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Download, Navigation, MapPin, Clock, TrendingUp, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { Chip } from '@/app/components/design-system/Chip';
import { MiniMapPreview } from '@/app/components/map/MiniMapPreview';
import type { TrackDetail } from '@/data/mockData';
import { gpxRoutes, gpxToTrackMapping, getRouteForTrack } from '@/data/gpxRouteData';

interface TrackDetailScreenProps {
  track: TrackDetail;
  onBack: () => void;
  onFavoriteToggle: () => void;
}

export function TrackDetailScreen({ track, onBack, onFavoriteToggle }: TrackDetailScreenProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: track.name,
        text: `Check out ${track.name} - ${track.distance}km cycling track in ${track.region}`,
        url: window.location.href,
      });
    }
  };

  // Find GPX file for this track
  const gpxKey = Object.entries(gpxToTrackMapping).find(([_, id]) => id === track.id)?.[0];
  const gpxData = gpxKey ? gpxRoutes[gpxKey] : null;

  // Get route points for the mini map
  const routePoints = getRouteForTrack(track.id);

  // Get start point coordinates
  const startPoint = gpxData?.startPoint || (routePoints && routePoints.length > 0
    ? { lat: routePoints[0][0], lng: routePoints[0][1] }
    : track.coordinates);

  // Handle navigation to start point
  const handleNavigateToStart = () => {
    if (!startPoint) return;

    const { lat, lng } = startPoint;

    // Detect if on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Detect if on Android
    const isAndroid = /Android/.test(navigator.userAgent);

    let navigationUrl: string;

    if (isIOS) {
      // Apple Maps URL for iOS
      navigationUrl = `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
    } else if (isAndroid) {
      // Google Maps URL for Android (opens in app if installed)
      navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    } else {
      // Default to Google Maps for desktop/other
      navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    }

    // Open navigation in a new tab/app
    window.open(navigationUrl, '_blank');
  };

  const handleDownloadGpx = async () => {
    if (gpxData) {
      try {
        // Encode filename for URL (handles spaces and special chars)
        const encodedFileName = encodeURIComponent(gpxData.fileName);
        const response = await fetch(`/gpx/${encodedFileName}`);

        if (!response.ok) throw new Error('Download failed');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = gpxData.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('GPX download error:', error);
        alert('Failed to download GPX file');
      }
    }
  };

  return (
    <div className="h-full bg-white overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onFavoriteToggle}
              className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${track.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="relative aspect-[16/10] bg-gray-100">
        {track.photos && track.photos.length > 0 ? (
          <>
            <img
              src={track.photos[currentPhotoIndex]}
              alt={track.name}
              className="w-full h-full object-cover"
            />
            {track.photos.length > 1 && (
              <>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {track.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === currentPhotoIndex
                          ? 'bg-white w-6'
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  {currentPhotoIndex + 1} / {track.photos.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-gray-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Title and Region */}
        <div>
          <h1 className="text-2xl mb-2">{track.name}</h1>
          <div className="flex items-center gap-1 text-gray-500 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{track.region}</span>
          </div>
          <div className="flex items-center gap-2">
            <Chip variant={track.difficulty}>
              {track.difficulty.charAt(0).toUpperCase() + track.difficulty.slice(1)}
            </Chip>
            <Chip variant={track.surface}>
              {track.surface.charAt(0).toUpperCase() + track.surface.slice(1)}
            </Chip>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-2xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Distance</div>
            <div className="font-semibold">{track.distance}km</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Elevation
            </div>
            <div className="font-semibold">{track.elevation}m</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              Time
            </div>
            <div className="font-semibold text-sm">{track.estimatedTime}</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Difficulty</div>
            <div className="font-semibold text-sm capitalize">{track.difficulty}</div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="mb-2">About this route</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{track.description}</p>
        </div>

        {/* Safety Notes */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-amber-900 mb-1">Safety Notes</h4>
              <p className="text-sm text-amber-800 leading-relaxed">{track.safetyNotes}</p>
            </div>
          </div>
        </div>

        {/* Mini Map Section */}
        <div>
          <h3 className="mb-3">Route Preview</h3>
          {routePoints && routePoints.length > 0 ? (
            <MiniMapPreview
              route={routePoints}
              difficulty={track.difficulty}
            />
          ) : (
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl h-48 relative overflow-hidden border border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Route preview not available</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleDownloadGpx}
            disabled={!gpxData}
            className={`w-full py-4 rounded-2xl font-medium active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
              gpxData
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Download className="w-5 h-5" />
            {gpxData ? 'Download GPX' : 'GPX Not Available'}
          </button>
          <button
            onClick={handleNavigateToStart}
            disabled={!startPoint}
            className={`w-full py-4 rounded-2xl font-medium active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
              startPoint
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Navigation className="w-5 h-5" />
            Navigate to Start
          </button>
        </div>

        {/* Footer Note */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-xs text-orange-900 leading-relaxed">
            <strong>DBB Savet:</strong> Uvek proverite vremensku prognozu pre vožnje. U planinskim oblastima budite spremni na nagle promene vremena. Nosite kacigu i obavestite nekoga o svojoj ruti.
          </p>
        </div>
      </div>
    </div>
  );
}
