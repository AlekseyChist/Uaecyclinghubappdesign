import React from 'react';
import { Bike, MapPin, Info } from 'lucide-react';

interface OnboardingScreenProps {
  onContinue: () => void;
}

export function OnboardingScreen({ onContinue }: OnboardingScreenProps) {
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center px-6 text-center py-8">
          {/* Logo/Icon */}
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-4 shadow-lg">
            <Bike className="w-12 h-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-2xl mb-2">UAE Cycling Hub</h1>
          <p className="text-gray-600 mb-8 max-w-sm leading-relaxed text-sm">
            Discover the best cycling tracks, connect with local shops, stay informed about regulations, and join exciting events across the Emirates.
          </p>

          {/* Features */}
          <div className="space-y-3 mb-8 max-w-md w-full">
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium mb-0.5 text-sm">Explore Tracks</h3>
                <p className="text-xs text-gray-600">
                  Find popular cycling routes with detailed maps and safety information
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Bike className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium mb-0.5 text-sm">Local Shops</h3>
                <p className="text-xs text-gray-600">
                  Connect with bike shops and sponsors in your area
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium mb-0.5 text-sm">Stay Safe</h3>
                <p className="text-xs text-gray-600">
                  Access UAE cycling regulations and safety guidelines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA - Fixed at bottom */}
      <div className="p-4 bg-white border-t border-gray-200">
        <button
          onClick={onContinue}
          className="w-full bg-primary text-white py-3.5 rounded-2xl font-medium hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm mb-2"
        >
          Get Started
        </button>
        <p className="text-xs text-gray-500 text-center">
          By continuing, you agree to safe cycling practices and UAE traffic regulations
        </p>
      </div>
    </div>
  );
}
