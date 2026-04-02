import React from 'react';
import { ExternalLink, Store } from 'lucide-react';

export interface Shop {
  id: string;
  name: string;
  category: string;
  description: string;
  location?: string;
  website?: string;
  logo?: string;
}

interface ShopCardProps {
  shop: Shop;
  onClick?: () => void;
}

export function ShopCard({ shop, onClick }: ShopCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
          {shop.logo ? (
            <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
          ) : (
            <Store className="w-8 h-8 text-gray-400" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-medium">{shop.name}</h3>
              <p className="text-xs text-gray-500">{shop.category}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {shop.description}
          </p>
          
          {shop.location && (
            <p className="text-xs text-gray-500 mb-2">{shop.location}</p>
          )}
          
          {shop.website && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(shop.website, '_blank');
              }}
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Visit Website
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
