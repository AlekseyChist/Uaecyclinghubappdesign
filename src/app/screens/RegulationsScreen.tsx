import React, { useState } from 'react';
import { SearchField } from '@/app/components/design-system/SearchField';
import { EmptyState } from '@/app/components/design-system/EmptyState';
import { ChevronDown, Bookmark, BookOpen } from 'lucide-react';

interface RegulationItem {
  id: string;
  title: string;
  content: string;
}

interface RegulationCategory {
  id: string;
  category: string;
  items: RegulationItem[];
}

interface RegulationsScreenProps {
  regulations: RegulationCategory[];
}

export function RegulationsScreen({ regulations }: RegulationsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const toggleBookmark = (id: string) => {
    const newBookmarked = new Set(bookmarkedIds);
    if (newBookmarked.has(id)) {
      newBookmarked.delete(id);
    } else {
      newBookmarked.add(id);
    }
    setBookmarkedIds(newBookmarked);
  };

  const filteredRegulations = regulations
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className="h-full bg-white overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-2xl mb-4">Regulations & Safety</h1>
          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search rules and guidelines"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {filteredRegulations.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No results found"
            description="Try adjusting your search query"
          />
        ) : (
          <div className="space-y-6">
            {filteredRegulations.map((category) => (
              <div key={category.id}>
                <h3 className="mb-3 text-gray-900">{category.category}</h3>
                <div className="space-y-2">
                  {category.items.map((item) => {
                    const isExpanded = expandedIds.has(item.id);
                    const isBookmarked = bookmarkedIds.has(item.id);

                    return (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => toggleExpanded(item.id)}
                          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium pr-2">{item.title}</span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(item.id);
                              }}
                              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Bookmark
                                className={`w-4 h-4 ${
                                  isBookmarked
                                    ? 'fill-primary text-primary'
                                    : 'text-gray-400'
                                }`}
                              />
                            </button>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-400 transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-4 pb-4 pt-1">
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-xs text-blue-900 leading-relaxed">
            <strong>Important:</strong> These guidelines are for general reference. Always check local regulations and road conditions before your ride. When in doubt, prioritize safety.
          </p>
        </div>
      </div>
    </div>
  );
}
