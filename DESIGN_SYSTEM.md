# UAE Cycling Hub - Design System Documentation

## Overview

UAE Cycling Hub is a mobile-first cycling companion app for the United Arab Emirates, featuring a clean, minimalistic design with functional UI patterns optimized for Android users.

## Design Principles

1. **Simple & Functional** - Clear hierarchy, minimal decoration
2. **Fast** - Optimized interactions, smooth animations
3. **Minimalistic** - White backgrounds, subtle borders, soft shadows
4. **Accessible** - Strong contrast ratios, readable typography
5. **Mobile-First** - Designed for touch, optimized for one-handed use

## Visual Style

### Color Palette

- **Primary**: `#0066ff` - Used for CTAs, active states, and key interactions
- **Foreground**: `#1a1a1a` - Main text color
- **Background**: `#ffffff` - Clean white background
- **Secondary**: `#f5f5f5` - Subtle backgrounds
- **Muted**: `#6b7280` - Secondary text
- **Border**: `rgba(0, 0, 0, 0.08)` - Subtle dividers
- **Destructive**: `#ef4444` - Errors and warnings

### Difficulty Colors
- **Easy**: `#10b981` (Green)
- **Medium**: `#f59e0b` (Amber)
- **Hard**: `#ef4444` (Red)

### Surface Colors
- **Road**: `#3b82f6` (Blue)
- **Gravel**: `#8b5cf6` (Purple)
- **Mixed**: `#6366f1` (Indigo)

### Typography

- **Font Family**: System font stack (San Francisco on iOS, Roboto on Android)
- **Base Size**: 16px
- **Scale**:
  - H1: 24px / 1.5 / Medium (500)
  - H2: 20px / 1.5 / Medium (500)
  - H3: 18px / 1.5 / Medium (500)
  - H4: 16px / 1.5 / Medium (500)
  - Body: 16px / 1.5 / Regular (400)
  - Small: 14px / 1.5 / Regular (400)
  - Caption: 12px / 1.5 / Regular (400)

### Spacing System (8pt Grid)

- **Level 1**: 8px
- **Level 2**: 16px
- **Level 3**: 24px
- **Level 4**: 32px
- **Level 5**: 40px
- **Level 6**: 48px

### Corner Radius

- **Standard**: 16px (`rounded-2xl`) - Buttons, cards, inputs
- **Small**: 12px (`rounded-xl`) - Chips, small elements
- **Large**: 20px (`rounded-3xl`) - Hero sections
- **Full**: 9999px (`rounded-full`) - Pills, avatars, icon buttons

### Shadows

- **Subtle**: `border border-gray-200` - Most cards
- **Medium**: `shadow-md` - Hover states, modals
- **Large**: `shadow-lg` - Map pins, floating elements
- **Inset**: `shadow-[0_-4px_24px_rgba(0,0,0,0.08)]` - Bottom sheet

## Components

### Buttons

**Variants:**
- Primary - Main actions
- Secondary - Alternative actions
- Tertiary - Low-emphasis actions
- Destructive - Delete/cancel actions

**States:**
- Default
- Hover
- Active (pressed)
- Disabled
- Loading

**Sizes:**
- Small (sm): 12px rounded, compact padding
- Medium (md): 16px rounded, standard padding
- Large (lg): 16px rounded, generous padding

### Chips

Used for tags, categories, and filters.

**Types:**
- Difficulty (easy, medium, hard)
- Surface (road, gravel, mixed)
- Default (general purpose)

**Sizes:**
- Small (sm): 8px vertical, 12px horizontal
- Medium (md): 12px vertical, 16px horizontal

### Cards

**Track Card:**
- Thumbnail (80x80px, rounded-xl)
- Title, region, stats
- Difficulty & surface chips
- Favorite toggle

**Event Card:**
- Date badge (fixed width)
- Title, time, location
- Type chip & distance options
- Status indicators

**Shop Card:**
- Logo/icon (64x64px)
- Name, category, description
- Location & website link

### Search Field

- 16px rounded corners
- Light gray background
- Left icon (search)
- Right icon (clear - shown when typing)
- Focus ring in primary color

### Bottom Sheet

**States:**
- Collapsed: 120px
- Half: 50vh
- Full: calc(100vh - 80px)

**Features:**
- Drag handle
- Smooth transitions
- Touch/mouse dragging
- Snap to states

### Map Pins

- 32x32px circular markers
- Color-coded by difficulty
- Selected state with ring
- Hover scale animation

### Bottom Navigation

4 tabs:
1. Tracks (Map icon)
2. Shops (Store icon)
3. Regulations (BookOpen icon)
4. Events (Calendar icon)

**States:**
- Active: Primary color fill
- Inactive: Gray

## Screens

### 1. Onboarding
- Welcome screen with app features
- Primary CTA: "Get Started"
- Gradient background

### 2. Tracks Tab
- Full-screen map view
- Search + filter bar
- Interactive map pins
- Draggable bottom sheet with track list
- Track detail screen with photos, stats, GPX download

### 3. Shops/Sponsors Tab
- Segmented control (All / Shops / Sponsors)
- Search field
- List of shop cards
- Detail screen with contact info

### 4. Regulations Tab
- Search field
- Expandable accordion sections
- Bookmark functionality
- Grouped by category

### 5. Events Tab
- Filter chips (Upcoming / This Month / All)
- Search field
- Chronological list with month headers
- Status badges (Upcoming, Sold Out, Canceled)
- Detail screen with timeline

## Interactions

### Touch Targets
- Minimum: 44x44px
- Preferred: 48x48px

### Animations
- Button press: `scale-[0.98]`
- Transitions: 300ms ease-out
- Skeleton loading states

### Feedback
- Visual hover states
- Active/pressed states
- Loading indicators
- Toast notifications (via Sonner)

## Accessibility

- WCAG 2.1 AA contrast ratios
- Semantic HTML
- Keyboard navigation support
- Screen reader friendly labels
- Touch-friendly tap targets

## Platform Considerations

### Android
- Material Design influenced patterns
- Bottom navigation (Android standard)
- Floating action buttons where appropriate
- Ripple effects on touch

### iOS Compatibility
- Platform-neutral design
- System font support
- Safe area insets
- Swipe gestures

## File Structure

```
/src
  /app
    /components
      /cards - TrackCard, EventCard, ShopCard
      /design-system - Reusable UI components
      /navigation - BottomNav
    /screens - Main app screens
  /data - Mock data and types
  /styles - Theme, fonts, global styles
```

## Usage Examples

See `/src/app/components/design-system/DesignSystemShowcase.tsx` for a comprehensive showcase of all design system components.

## Best Practices

1. **Consistency**: Use design system components throughout
2. **Spacing**: Adhere to 8pt spacing system
3. **Colors**: Use semantic color tokens
4. **Touch**: Ensure 44px minimum tap targets
5. **Performance**: Lazy load images, optimize renders
6. **Accessibility**: Test with screen readers, keyboard navigation
