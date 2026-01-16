import React from 'react';
import { Bike, MapPin, Info } from 'lucide-react';

interface OnboardingScreenProps {
  onContinue: () => void;
}

export function OnboardingScreen({ onContinue }: OnboardingScreenProps) {
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Logo/Icon */}
        <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mb-6 shadow-lg">
          <Bike className="w-14 h-14 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-3xl mb-3">UAE Cycling Hub</h1>
        <p className="text-gray-600 mb-12 max-w-sm leading-relaxed">
          Discover the best cycling tracks, connect with local shops, stay informed about regulations, and join exciting events across the Emirates.
        </p>

        {/* Features */}
        <div className="space-y-4 mb-12 max-w-md">
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Explore Tracks</h3>
              <p className="text-sm text-gray-600">
                Find popular cycling routes with detailed maps and safety information
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Bike className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Local Shops</h3>
              <p className="text-sm text-gray-600">
                Connect with bike shops and sponsors in your area
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Stay Safe</h3>
              <p className="text-sm text-gray-600">
                Access UAE cycling regulations and safety guidelines
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 bg-white border-t border-gray-200">
        <button
          onClick={onContinue}
          className="w-full bg-primary text-white py-4 rounded-2xl font-medium hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm mb-3"
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
