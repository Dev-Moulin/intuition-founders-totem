/**
 * useResizableDivider - Hook for draggable resizable divider
 *
 * Extracted from FounderCenterPanel.tsx
 * Handles mouse drag events to resize a section height
 *
 * @see FounderCenterPanel.tsx
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseResizableDividerOptions {
  /** Initial height (null = auto-initialize) */
  initialHeight?: number | null;
  /** Minimum height in pixels */
  minHeight?: number;
  /** Maximum height in pixels (or null for dynamic) */
  maxHeight?: number | null;
  /** Overhead space to subtract from container (charts, footers, margins) */
  overhead?: number;
  /** Minimum height for the other section */
  otherSectionMinHeight?: number;
}

export interface UseResizableDividerResult {
  /** Current height of the section */
  height: number | null;
  /** Set height manually */
  setHeight: (height: number | null) => void;
  /** Whether currently dragging */
  isDragging: boolean;
  /** Ref to attach to the container element */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Mouse down handler for the divider */
  handleMouseDown: (e: React.MouseEvent) => void;
}

/**
 * Hook for handling a resizable divider between two sections
 *
 * @param options - Configuration options
 * @returns Divider state and handlers
 *
 * @example
 * ```tsx
 * const { height, isDragging, containerRef, handleMouseDown } = useResizableDivider({
 *   minHeight: 60,
 *   overhead: 248,
 *   otherSectionMinHeight: 100,
 * });
 *
 * return (
 *   <div ref={containerRef}>
 *     <section style={{ height: height ?? 150 }}>...</section>
 *     <div onMouseDown={handleMouseDown}>Drag handle</div>
 *     <section>...</section>
 *   </div>
 * );
 * ```
 */
export function useResizableDivider(
  options: UseResizableDividerOptions = {}
): UseResizableDividerResult {
  const {
    initialHeight = null,
    minHeight = 60,
    maxHeight = null,
    overhead = 248,
    otherSectionMinHeight = 100,
  } = options;

  const [height, setHeight] = useState<number | null>(initialHeight);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Store initial values when drag starts to use delta-based resizing (prevents jump)
  const dragStartRef = useRef<{ mouseY: number; height: number } | null>(null);

  // Initialize height to ~50% of available space on first render
  // Use requestAnimationFrame to avoid forced reflow (getBoundingClientRect)
  useEffect(() => {
    if (height === null && containerRef.current) {
      const container = containerRef.current;
      // Defer measurement to next animation frame to avoid layout thrashing
      const rafId = requestAnimationFrame(() => {
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const availableSpace = containerRect.height - overhead;
        // Split 50/50 between sections
        const calculatedHeight = Math.max(minHeight, availableSpace / 2);
        setHeight(calculatedHeight);
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [height, overhead, minHeight]);

  // Handle resize drag - store initial position for delta calculation
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      // Store initial mouse Y and current height to calculate delta during drag
      dragStartRef.current = {
        mouseY: e.clientY,
        height: height ?? 150,
      };
      setIsDragging(true);
    },
    [height]
  );

  useEffect(() => {
    if (!isDragging || !dragStartRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !dragStartRef.current) return;

      // Use cached container height to avoid repeated getBoundingClientRect calls during drag
      const containerRect = containerRef.current.getBoundingClientRect();

      // Delta-based resize: calculate how much mouse moved since drag started
      const deltaY = e.clientY - dragStartRef.current.mouseY;
      const newHeight = dragStartRef.current.height + deltaY;

      // Calculate max height dynamically: container height - overhead - other section minimum
      const dynamicMaxHeight =
        maxHeight ?? containerRect.height - overhead - otherSectionMinHeight;

      // Clamp between min and max
      const clampedHeight = Math.max(minHeight, Math.min(dynamicMaxHeight, newHeight));
      setHeight(clampedHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minHeight, maxHeight, overhead, otherSectionMinHeight]);

  return {
    height,
    setHeight,
    isDragging,
    containerRef,
    handleMouseDown,
  };
}
