import React, { useState } from 'react';
import { SearchField } from '@/app/components/design-system/SearchField';
import { ShopCard, Shop } from '@/app/components/cards/ShopCard';
import { EmptyState } from '@/app/components/design-system/EmptyState';
import { Store } from 'lucide-react';

interface ShopsScreenProps {
  shops: Shop[];
  onShopClick: (shopId: string) => void;
}

export function ShopsScreen({ shops, onShopClick }: ShopsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'shop' | 'sponsor'>('all');

  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'shop' && shop.category.toLowerCase().includes('shop')) ||
      (selectedType === 'sponsor' && shop.category.toLowerCase().includes('sponsor'));

    return matchesSearch && matchesType;
  });

  return (
    <div className="h-full bg-white overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-2xl mb-4">Shops & Sponsors</h1>
          
          {/* Segmented Control */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-4">
            {['all', 'shop', 'sponsor'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type as typeof selectedType)}
                className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                  selectedType === type
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                {type === 'all' ? 'All' : type === 'shop' ? 'Bike Shops' : 'Sponsors'}
              </button>
            ))}
          </div>

          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search shops and sponsors"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {filteredShops.length === 0 ? (
          <EmptyState
            icon={Store}
            title="No results found"
            description="Try adjusting your search or filter"
          />
        ) : (
          <div className="space-y-3">
            {filteredShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                onClick={() => onShopClick(shop.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
