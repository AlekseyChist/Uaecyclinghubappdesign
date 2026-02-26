import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Rule } from '@/data/mockData';

interface RegulationsScreenProps {
  rules: Rule[];
}

export function RegulationsScreen({ rules }: RegulationsScreenProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  return (
    <div className="h-full bg-white overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="p-4">
          <h1 className="text-2xl mb-1">The Rules</h1>
          <p className="text-sm text-gray-500">Applied to all public rides.</p>
        </div>
      </div>

      {/* Rules */}
      <div className="p-4 space-y-3">
        {rules.map((rule, index) => {
          const isExpanded = expandedIds.has(rule.id);

          return (
            <div
              key={rule.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleExpanded(rule.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium pr-2">
                  RULE #{index + 1} // {rule.title}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {rule.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center pt-4 pb-2">
          Now you're ready to come to our rides in Belgrade — or to the tours & camps
        </p>
      </div>
    </div>
  );
}
