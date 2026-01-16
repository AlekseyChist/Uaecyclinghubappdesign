import React from 'react';
import { Button } from './Button';
import { Chip } from './Chip';
import { SearchField } from './SearchField';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { MapPin } from './MapPin';
import { Download, Heart, Search } from 'lucide-react';

export function DesignSystemShowcase() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-3xl mb-2">UAE Cycling Hub</h1>
        <p className="text-gray-600">Design System & UI Kit</p>
      </div>

      {/* Colors */}
      <section>
        <h2 className="text-xl mb-4">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="h-20 bg-primary rounded-2xl mb-2" />
            <p className="text-sm font-medium">Primary</p>
            <p className="text-xs text-gray-500">#0066ff</p>
          </div>
          <div>
            <div className="h-20 bg-gray-900 rounded-2xl mb-2" />
            <p className="text-sm font-medium">Foreground</p>
            <p className="text-xs text-gray-500">#1a1a1a</p>
          </div>
          <div>
            <div className="h-20 bg-gray-100 rounded-2xl mb-2 border border-gray-200" />
            <p className="text-sm font-medium">Background</p>
            <p className="text-xs text-gray-500">#f5f5f5</p>
          </div>
          <div>
            <div className="h-20 bg-red-500 rounded-2xl mb-2" />
            <p className="text-sm font-medium">Destructive</p>
            <p className="text-xs text-gray-500">#ef4444</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-xl mb-4">Typography</h2>
        <div className="space-y-3">
          <h1>Heading 1 - Large Title</h1>
          <h2>Heading 2 - Section Title</h2>
          <h3>Heading 3 - Subsection</h3>
          <h4>Heading 4 - Card Title</h4>
          <p className="text-base">Body text - Regular paragraph content</p>
          <p className="text-sm text-gray-600">Small text - Secondary information</p>
          <p className="text-xs text-gray-500">Caption - Metadata and labels</p>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-xl mb-4">Spacing System (8pt)</h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <div key={level} className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-500">Level {level}</div>
              <div
                className="bg-primary/20 h-8"
                style={{ width: `${level * 8}px` }}
              />
              <div className="text-sm text-gray-600">{level * 8}px</div>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-xl mb-4">Buttons</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="tertiary">Tertiary Button</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" icon={<Download />}>With Icon</Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>
      </section>

      {/* Chips */}
      <section>
        <h2 className="text-xl mb-4">Chips</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-2">Difficulty</p>
            <div className="flex flex-wrap gap-2">
              <Chip variant="easy">Easy</Chip>
              <Chip variant="medium">Medium</Chip>
              <Chip variant="hard">Hard</Chip>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Surface</p>
            <div className="flex flex-wrap gap-2">
              <Chip variant="road">Road</Chip>
              <Chip variant="gravel">Gravel</Chip>
              <Chip variant="mixed">Mixed</Chip>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Sizes</p>
            <div className="flex flex-wrap gap-2 items-center">
              <Chip size="sm">Small Chip</Chip>
              <Chip size="md">Medium Chip</Chip>
            </div>
          </div>
        </div>
      </section>

      {/* Search Field */}
      <section>
        <h2 className="text-xl mb-4">Search Field</h2>
        <SearchField
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search tracks, events, shops..."
        />
      </section>

      {/* Map Pins */}
      <section>
        <h2 className="text-xl mb-4">Map Pins</h2>
        <div className="flex flex-wrap gap-8 items-end">
          <div className="text-center">
            <MapPin difficulty="easy" />
            <p className="text-xs text-gray-500 mt-2">Easy</p>
          </div>
          <div className="text-center">
            <MapPin difficulty="medium" />
            <p className="text-xs text-gray-500 mt-2">Medium</p>
          </div>
          <div className="text-center">
            <MapPin difficulty="hard" />
            <p className="text-xs text-gray-500 mt-2">Hard</p>
          </div>
          <div className="text-center">
            <MapPin difficulty="medium" selected />
            <p className="text-xs text-gray-500 mt-2">Selected</p>
          </div>
        </div>
      </section>

      {/* States */}
      <section>
        <h2 className="text-xl mb-4">States</h2>
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-2xl">
            <EmptyState
              icon={Search}
              title="No results found"
              description="Try adjusting your search or filters"
              action={<Button variant="secondary" size="sm">Clear Filters</Button>}
            />
          </div>
          <div className="border border-gray-200 rounded-2xl">
            <LoadingState message="Loading tracks..." />
          </div>
          <div className="border border-gray-200 rounded-2xl">
            <ErrorState
              title="Map failed to load"
              message="Please check your connection and try again"
              action={<Button variant="secondary" size="sm">Retry</Button>}
            />
          </div>
        </div>
      </section>

      {/* Corner Radius */}
      <section>
        <h2 className="text-xl mb-4">Corner Radius (16px)</h2>
        <div className="flex flex-wrap gap-4">
          <div className="w-32 h-32 bg-primary/10 border-2 border-primary rounded-2xl flex items-center justify-center">
            <p className="text-sm text-center">16px<br/>rounded-2xl</p>
          </div>
          <div className="w-32 h-32 bg-primary/10 border-2 border-primary rounded-xl flex items-center justify-center">
            <p className="text-sm text-center">12px<br/>rounded-xl</p>
          </div>
          <div className="w-32 h-32 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center">
            <p className="text-sm text-center">Full<br/>rounded-full</p>
          </div>
        </div>
      </section>

      {/* Shadows */}
      <section>
        <h2 className="text-xl mb-4">Shadows</h2>
        <div className="flex flex-wrap gap-6">
          <div className="w-32 h-32 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
            <p className="text-sm text-center">Subtle<br/>Border</p>
          </div>
          <div className="w-32 h-32 bg-white rounded-2xl shadow-md flex items-center justify-center">
            <p className="text-sm text-center">Medium<br/>Shadow</p>
          </div>
          <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <p className="text-sm text-center">Large<br/>Shadow</p>
          </div>
        </div>
      </section>
    </div>
  );
}
