import React from 'react';
import { ArrowLeft, ExternalLink, MapPin, Phone, Store as StoreIcon } from 'lucide-react';
import type { Shop } from '@/app/components/cards/ShopCard';

interface ShopDetailScreenProps {
  shop: Shop;
  onBack: () => void;
}

export function ShopDetailScreen({ shop, onBack }: ShopDetailScreenProps) {
  return (
    <div className="h-full bg-white overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center p-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Logo/Hero */}
      <div className="bg-gray-50 p-8 flex items-center justify-center">
        <div className="w-32 h-32 bg-white rounded-3xl shadow-sm flex items-center justify-center overflow-hidden">
          {shop.logo ? (
            <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
          ) : (
            <StoreIcon className="w-16 h-16 text-gray-300" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Basic Info */}
        <div className="text-center">
          <h1 className="text-2xl mb-1">{shop.name}</h1>
          <p className="text-sm text-gray-500">{shop.category}</p>
        </div>

        {/* Description */}
        <div>
          <h3 className="mb-2">About</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{shop.description}</p>
        </div>

        {/* Contact Information */}
        {shop.location && (
          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="mb-3">Location</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">{shop.location}</span>
              </div>
            </div>
          </div>
        )}

        {/* Business Hours Placeholder */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <h3 className="mb-3">Hours</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Saturday - Thursday</span>
              <span>9:00 AM - 8:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Friday</span>
              <span>4:00 PM - 10:00 PM</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Hours may vary</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {shop.website && (
            <button
              onClick={() => window.open(shop.website, '_blank')}
              className="w-full bg-primary text-white py-4 rounded-2xl font-medium hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Visit Website
            </button>
          )}
          
          {shop.location && (
            <button className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-medium hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              Open in Maps
            </button>
          )}

          <button className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-medium hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            Call
          </button>
        </div>
      </div>
    </div>
  );
}
