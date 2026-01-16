import React, { useState, useRef, useEffect } from 'react';
import { GripHorizontal } from 'lucide-react';

export type BottomSheetState = 'collapsed' | 'half' | 'full';

interface BottomSheetProps {
  children: React.ReactNode;
  state?: BottomSheetState;
  onStateChange?: (state: BottomSheetState) => void;
}

const stateHeights: Record<BottomSheetState, string> = {
  collapsed: '120px',
  half: '50vh',
  full: 'calc(100vh - 80px)',
};

export function BottomSheet({ children, state = 'collapsed', onStateChange }: BottomSheetProps) {
  const [currentState, setCurrentState] = useState<BottomSheetState>(state);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(120);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

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

    if (newHeight >= 120 && newHeight <= window.innerHeight - 80) {
      setCurrentHeight(newHeight);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    let newState: BottomSheetState = 'collapsed';
    
    if (currentHeight < 200) {
      newState = 'collapsed';
      setCurrentHeight(120);
    } else if (currentHeight < window.innerHeight * 0.7) {
      newState = 'half';
      setCurrentHeight(window.innerHeight * 0.5);
    } else {
      newState = 'full';
      setCurrentHeight(window.innerHeight - 80);
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
  }, [isDragging, startY, currentHeight]);

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out z-40"
      style={{
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
      <div className="h-[calc(100%-48px)] overflow-y-auto px-4 pb-4">
        {children}
      </div>
    </div>
  );
}
