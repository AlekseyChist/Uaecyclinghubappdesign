import React, { useState, useRef, useEffect } from 'react';
import { GripHorizontal } from 'lucide-react';

export type BottomSheetState = 'collapsed' | 'half' | 'full';

interface BottomSheetProps {
  children: React.ReactNode;
  state?: BottomSheetState;
  onStateChange?: (state: BottomSheetState) => void;
  // Optional ref to an element above the sheet (e.g. search bar). When provided,
  // the sheet's `full` state and drag bounds adapt to that element's actual height
  // via ResizeObserver — so expanding filters never hides the drag handle.
  topAnchorRef?: React.RefObject<HTMLElement | null>;
}

// Bottom nav is ~60px tall; sheet sits above it
const BOTTOM_NAV_HEIGHT = 60;

// Fallback used when no topAnchorRef is provided (or it has not attached yet).
const DEFAULT_TOP_BOUNDARY = 80;

// Collapsed peek height adapts to viewport: tall enough on small phones to show
// handle + summary + first card, but capped on tall screens (tablets/desktop).
const COLLAPSED_HEIGHT = 'clamp(180px, 22vh, 240px)';
const COLLAPSED_MIN_PX = 180;

export function BottomSheet({ children, state = 'collapsed', onStateChange, topAnchorRef }: BottomSheetProps) {
  const [currentState, setCurrentState] = useState<BottomSheetState>(state);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(COLLAPSED_MIN_PX);
  const [topBoundary, setTopBoundary] = useState(DEFAULT_TOP_BOUNDARY);
  const sheetRef = useRef<HTMLDivElement>(null);

  const stateHeights: Record<BottomSheetState, string> = {
    collapsed: COLLAPSED_HEIGHT,
    half: '50vh',
    full: `calc(100vh - ${BOTTOM_NAV_HEIGHT + topBoundary}px)`,
  };

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  // Track the top anchor element's height (e.g. search bar with collapsible filters).
  // ResizeObserver fires whenever its layout changes, keeping `topBoundary` accurate.
  useEffect(() => {
    const el = topAnchorRef?.current;
    if (!el) return;

    const update = () => setTopBoundary(el.getBoundingClientRect().height);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [topAnchorRef]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
  };

  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging || !sheetRef.current) return;

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = startY - clientY;
    const newHeight = currentHeight + deltaY;

    if (newHeight >= COLLAPSED_MIN_PX && newHeight <= window.innerHeight - BOTTOM_NAV_HEIGHT - topBoundary) {
      setCurrentHeight(newHeight);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    let newState: BottomSheetState = 'collapsed';
    
    if (currentHeight < 200) {
      newState = 'collapsed';
      setCurrentHeight(COLLAPSED_MIN_PX);
    } else if (currentHeight < window.innerHeight * 0.7) {
      newState = 'half';
      setCurrentHeight(window.innerHeight * 0.5);
    } else {
      newState = 'full';
      setCurrentHeight(window.innerHeight - BOTTOM_NAV_HEIGHT - topBoundary);
    }

    setCurrentState(newState);
    onStateChange?.(newState);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);

      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging, startY, currentHeight, topBoundary]);

  return (
    <div
      ref={sheetRef}
      className="fixed left-0 right-0 bg-white rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out bottom-sheet-container"
      style={{
        bottom: `${BOTTOM_NAV_HEIGHT}px`,
        height: isDragging ? `${currentHeight}px` : stateHeights[currentState],
      }}
    >
      <div
        className="w-full py-3 cursor-grab active:cursor-grabbing flex justify-center items-center"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <GripHorizontal className="w-8 h-1.5 text-gray-300" />
      </div>
      <div className="h-[calc(100%-36px)] overflow-y-auto px-4 pb-4">
        {children}
      </div>
    </div>
  );
}
