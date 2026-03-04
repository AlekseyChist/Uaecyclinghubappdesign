import React, { useState } from 'react';
import { SearchField } from '@/app/components/design-system/SearchField';
import { ShopCard, Shop } from '@/app/components/cards/ShopCard';
import { EmptyState } from '@/app/components/design-system/EmptyState';
import { Store } from 'lucide-react';

type ShopTab = 'shops' | 'services' | 'friends';

interface ShopsScreenProps {
  shops: Shop[];
}

export function ShopsScreen({ shops }: ShopsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<ShopTab>('shops');

  const filteredShops = shops.filter((shop) => {
    const matchesTab = shop.tabs.includes(selectedTab);

    const matchesSearch =
      searchQuery === '' ||
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="h-full bg-white overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="p-4">
          {/* Segmented Control */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-4">
            {(['shops', 'services', 'friends'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                  selectedTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                {tab === 'shops' ? 'Shops' : tab === 'services' ? 'Services' : 'Friends'}
              </button>
            ))}
          </div>

          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search shops and services"
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
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
