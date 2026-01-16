import React from 'react';
import { Map, Store, BookOpen, Calendar } from 'lucide-react';

export type TabType = 'tracks' | 'shops' | 'regulations' | 'events';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'tracks' as TabType, label: 'Tracks', icon: Map },
  { id: 'shops' as TabType, label: 'Shops', icon: Store },
  { id: 'regulations' as TabType, label: 'Rules', icon: BookOpen },
  { id: 'events' as TabType, label: 'Events', icon: Calendar },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom bottom-nav-container">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-primary/10' : ''}`} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
