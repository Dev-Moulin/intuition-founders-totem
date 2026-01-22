/**
 * useAllUserPositions - Build list of all user positions for withdraw panel
 *
 * Extracted from VoteTotemPanel.tsx allUserPositions useMemo (~47 lines)
 * Builds the complete list of positions (Support/Oppose x Linear/Progressive)
 * for the WithdrawOnlyPanel component.
 *
 * @see VoteTotemPanel.tsx, WithdrawOnlyPanel.tsx
 */

import { useMemo } from 'react';
import type { Hex } from 'viem';
import type { CurveId } from '../index';

/** Single position info for withdraw panel */
export interface UserPositionInfo {
  direction: 'for' | 'against';
  curveId: CurveId;
  shares: bigint;
  termId: Hex;
}

/** Proactive claim info with term IDs */
export interface ClaimInfoForPositions {
  termId: string;
  counterTermId: string;
}

export interface UseAllUserPositionsParams {
  /** Proactive claim info (null if triple doesn't exist) */
  proactiveClaimInfo: ClaimInfoForPositions | null;
  /** Support shares on Linear curve */
  forSharesLinear: bigint;
  /** Support shares on Progressive curve */
  forSharesProgressive: bigint;
  /** Oppose shares on Linear curve */
  againstSharesLinear: bigint;
  /** Oppose shares on Progressive curve */
  againstSharesProgressive: bigint;
}

export interface UseAllUserPositionsResult {
  /** List of all user positions with shares > 0 */
  allUserPositions: UserPositionInfo[];
}

/**
 * Hook for building the complete list of user positions
 */
export function useAllUserPositions({
  proactiveClaimInfo,
  forSharesLinear,
  forSharesProgressive,
  againstSharesLinear,
  againstSharesProgressive,
}: UseAllUserPositionsParams): UseAllUserPositionsResult {

  const allUserPositions = useMemo((): UserPositionInfo[] => {
    if (!proactiveClaimInfo) return [];

    const positions: UserPositionInfo[] = [];

    // Support Linear
    if (forSharesLinear > 0n) {
      positions.push({
        direction: 'for',
        curveId: 1,
        shares: forSharesLinear,
        termId: proactiveClaimInfo.termId as Hex,
      });
    }

    // Support Progressive
    if (forSharesProgressive > 0n) {
      positions.push({
        direction: 'for',
        curveId: 2,
        shares: forSharesProgressive,
        termId: proactiveClaimInfo.termId as Hex,
      });
    }

    // Oppose Linear
    if (againstSharesLinear > 0n) {
      positions.push({
        direction: 'against',
        curveId: 1,
        shares: againstSharesLinear,
        termId: proactiveClaimInfo.counterTermId as Hex,
      });
    }

    // Oppose Progressive
    if (againstSharesProgressive > 0n) {
      positions.push({
        direction: 'against',
        curveId: 2,
        shares: againstSharesProgressive,
        termId: proactiveClaimInfo.counterTermId as Hex,
      });
    }

    return positions;
  }, [proactiveClaimInfo, forSharesLinear, forSharesProgressive, againstSharesLinear, againstSharesProgressive]);

  return { allUserPositions };
}
