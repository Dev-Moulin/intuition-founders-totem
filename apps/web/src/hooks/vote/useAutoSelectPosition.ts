/**
 * useAutoSelectPosition - Auto-select direction and curve based on user position
 *
 * Extracted from VoteTotemPanel.tsx (~47 lines)
 * Handles:
 * - Auto-select direction to match existing position
 * - Auto-select curve to match existing position
 * - Reset operation mode when no position
 * - Notify parent of position changes
 *
 * @see VoteTotemPanel.tsx
 */

import { useEffect, useRef } from 'react';
import { CURVE_LINEAR, CURVE_PROGRESSIVE, type CurveId } from '../index';

/** Curve availability from useCurveAvailability hook */
interface CurveAvailability {
  linear: boolean;
  progressive: boolean;
}

export interface UseAutoSelectPositionParams {
  /** Whether position data is loading */
  positionLoading: boolean;
  /** Whether user has any position */
  hasAnyPosition: boolean;
  /** User's position direction */
  positionDirection: 'for' | 'against' | null;
  /** User's position curve ID */
  positionCurveId: CurveId | null;
  /** Current vote direction */
  voteDirection: 'for' | 'against' | 'withdraw' | null;
  /** Curve availability rules */
  curveAvailability: CurveAvailability;
  /** Selected totem ID (for dependency tracking) */
  selectedTotemId: string | undefined;
  /** Set vote direction */
  setVoteDirection: (direction: 'for' | 'against' | 'withdraw' | null) => void;
  /** Set selected curve */
  setSelectedCurve: (curve: CurveId | null) => void;
  /** Set operation mode */
  setOperationMode: React.Dispatch<React.SetStateAction<'deposit' | 'redeem'>>;
  /** Callback when user's position is detected */
  onUserPositionDetected?: (position: { direction: 'for' | 'against'; curveId: CurveId } | null) => void;
}

/**
 * Hook for auto-selecting direction and curve based on user position
 */
export function useAutoSelectPosition({
  positionLoading,
  hasAnyPosition,
  positionDirection,
  positionCurveId,
  voteDirection,
  curveAvailability,
  selectedTotemId,
  setVoteDirection,
  setSelectedCurve,
  setOperationMode,
  onUserPositionDetected,
}: UseAutoSelectPositionParams): void {

  // Ref to store callback to avoid re-renders
  const onUserPositionDetectedRef = useRef(onUserPositionDetected);
  useEffect(() => {
    onUserPositionDetectedRef.current = onUserPositionDetected;
  }, [onUserPositionDetected]);

  // Auto-select direction and curve based on user's existing position
  useEffect(() => {
    if (positionLoading) return;

    // Reset to deposit mode if no position on this totem
    if (!hasAnyPosition) {
      setOperationMode(prev => prev === 'redeem' ? 'deposit' : prev);
    }

    if (hasAnyPosition && positionDirection) {
      setVoteDirection(positionDirection);
    }

    if (hasAnyPosition && positionCurveId) {
      setSelectedCurve(positionCurveId);
    }

    // Notify parent of user's position
    const callback = onUserPositionDetectedRef.current;
    if (callback) {
      if (hasAnyPosition && positionDirection && positionCurveId) {
        callback({ direction: positionDirection, curveId: positionCurveId });
      } else {
        callback(null);
      }
    }
  }, [hasAnyPosition, positionDirection, positionCurveId, positionLoading, selectedTotemId, setVoteDirection, setSelectedCurve, setOperationMode]);

  // Auto-select the only available curve when one is blocked (INTUITION rule)
  useEffect(() => {
    if (voteDirection === 'withdraw') return;

    // If only Progressive is available, select it
    if (!curveAvailability.linear && curveAvailability.progressive) {
      setSelectedCurve(CURVE_PROGRESSIVE);
    }
    // If only Linear is available, select it
    else if (curveAvailability.linear && !curveAvailability.progressive) {
      setSelectedCurve(CURVE_LINEAR);
    }
  }, [curveAvailability.linear, curveAvailability.progressive, voteDirection, setSelectedCurve]);
}
