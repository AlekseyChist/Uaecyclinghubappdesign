import React from 'react';
import { Bike, MapPin, Info } from 'lucide-react';

interface OnboardingScreenProps {
  onContinue: () => void;
}

export function OnboardingScreen({ onContinue }: OnboardingScreenProps) {
  return (
    <div className="h-full bg-gradient-to-br from-orange-50 via-white to-amber-50 flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center px-6 text-center py-8">
          {/* Logo/Icon */}
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-4 shadow-lg">
            <Bike className="w-12 h-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-2xl mb-2">DBB</h1>
          <p className="text-gray-600 mb-8 max-w-sm leading-relaxed text-sm">
            Otkrijte najbolje biciklističke staze, povežite se sa lokalnim prodavnicama, budite informisani o propisima i pridružite se uzbudljivim događajima širom Srbije.
          </p>

          {/* Features */}
          <div className="space-y-3 mb-8 max-w-md w-full">
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium mb-0.5 text-sm">Istražite Staze</h3>
                <p className="text-xs text-gray-600">
                  Pronađite popularne biciklističke rute sa detaljnim mapama i informacijama o bezbednosti
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Bike className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium mb-0.5 text-sm">Lokalne Prodavnice</h3>
                <p className="text-xs text-gray-600">
                  Povežite se sa bike shopovima i sponzorima u vašem okruženju
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium mb-0.5 text-sm">Budite Bezbedni</h3>
                <p className="text-xs text-gray-600">
                  Pristupite saobraćajnim propisima i bezbednosnim smernicama za bicikliste
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
          Započni
        </button>
        <p className="text-xs text-gray-500 text-center">
          Nastavljanjem se slažete sa bezbednim biciklističkim praksama i saobraćajnim propisima
        </p>
      </div>
    </div>
  );
}
