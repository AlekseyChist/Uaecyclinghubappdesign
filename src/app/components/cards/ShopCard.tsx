import React from 'react';
import { ExternalLink, Phone, Store } from 'lucide-react';

export interface Shop {
  id: string;
  name: string;
  category: string;
  description: string;
  location?: string;
  link: string;
  linkLabel: string;
  logo?: string;
  tabs: ('shops' | 'services')[];
  isPersonal?: boolean;
}

interface ShopCardProps {
  shop: Shop;
}

function openLink(link: string) {
  if (link.startsWith('tel:')) {
    window.location.href = link;
  } else {
    window.open(link, '_blank');
  }
}

export function ShopCard({ shop }: ShopCardProps) {
  const isPhone = shop.link.startsWith('tel:');

  return (
    <div
      onClick={() => openLink(shop.link)}
      className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
    >
      <div className="flex gap-4">
        <div
          className={`flex-shrink-0 w-16 h-16 bg-gray-50 flex items-center justify-center overflow-hidden ${
            shop.isPersonal ? 'rounded-full' : 'rounded-xl'
          }`}
        >
          {shop.logo ? (
            <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
          ) : (
            <Store className="w-8 h-8 text-gray-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <h3 className="font-medium">{shop.name}</h3>
            <p className="text-xs text-gray-500">{shop.category}</p>
          </div>

          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {shop.description}
          </p>

          <div className="flex items-center gap-1 text-xs text-gray-400">
            {shop.location && (
              <span>{shop.location}</span>
            )}
            {shop.location && <span>·</span>}
            {isPhone ? (
              <Phone className="w-3 h-3 inline-block" />
            ) : (
              <ExternalLink className="w-3 h-3 inline-block" />
            )}
            <span>{shop.linkLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
