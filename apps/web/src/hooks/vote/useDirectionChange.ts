/**
 * useDirectionChange - Direction change management
 *
 * When user wants to change vote direction but has positions on both curves,
 * they must choose which curve to redeem first.
 *
 * Provides:
 * - Direction change info (positions to redeem on each curve)
 * - Pending redeem info after user chooses a curve
 *
 * @see VoteTotemPanel.tsx, DirectionChangeAlert.tsx
 */

import { useMemo, useState } from 'react';
import { formatEther } from 'viem';
import { truncateAmount } from '../../utils/formatters';
import { CURVE_LINEAR, type CurveId } from '../index';
import type { CurveAvailability } from './useCurveAvailability';

/** Position info for a single curve */
interface CurvePosition {
  shares: bigint;
  formatted: string;
  hasPosition: boolean;
}

/** Info about direction change when both curves are blocked */
export interface DirectionChangeInfo {
  linear: CurvePosition;
  progressive: CurvePosition;
  currentDirectionLabel: string;
  targetDirectionLabel: string;
}

/** Info about pending redeem after curve choice */
export interface PendingRedeemInfo {
  curveId: CurveId;
  curveLabel: string;
  shares: bigint;
  formatted: string;
  redeemDirection: string;
  newDirection: string;
}

export interface UseDirectionChangeParams {
  /** Curve availability info */
  curveAvailability: CurveAvailability;
  /** Current vote direction */
  voteDirection: 'for' | 'against' | 'withdraw' | null;
  /** FOR shares on Linear curve */
  forSharesLinear: bigint;
  /** FOR shares on Progressive curve */
  forSharesProgressive: bigint;
  /** AGAINST shares on Linear curve */
  againstSharesLinear: bigint;
  /** AGAINST shares on Progressive curve */
  againstSharesProgressive: bigint;
}

export interface UseDirectionChangeResult {
  /** Info about positions when both curves are blocked (before user choice) */
  directionChangeInfo: DirectionChangeInfo | null;
  /** Info about pending redeem (after user chose a curve) */
  pendingRedeemInfo: PendingRedeemInfo | null;
  /** Curve chosen for pending redeem */
  pendingRedeemCurve: CurveId | null;
  /** Set the curve for pending redeem */
  setPendingRedeemCurve: (curve: CurveId | null) => void;
  /** Handle curve choice for direction change */
  handleDirectionChangeCurveChoice: (curveId: CurveId, setSelectedCurve: (curve: CurveId) => void) => void;
}

/**
 * Hook for managing direction change flow
 */
export function useDirectionChange({
  curveAvailability,
  voteDirection,
  forSharesLinear,
  forSharesProgressive,
  againstSharesLinear,
  againstSharesProgressive,
}: UseDirectionChangeParams): UseDirectionChangeResult {
  // Track pending redeem curve when user wants to change direction
  const [pendingRedeemCurve, setPendingRedeemCurve] = useState<CurveId | null>(null);

  // Calculate positions to redeem for each curve when both curves are blocked
  // This is shown inline (not in a popup) between Direction and Curve sections
  const directionChangeInfo = useMemo((): DirectionChangeInfo | null => {
    // Only show when both curves are blocked AND user hasn't chosen one yet
    if (!curveAvailability.allBlocked || !voteDirection || voteDirection === 'withdraw') return null;

    // Get the opposite direction's positions (what we need to redeem)
    const linearPosition = voteDirection === 'against'
      ? { shares: forSharesLinear, formatted: forSharesLinear > 0n ? truncateAmount(formatEther(forSharesLinear)) : '0', hasPosition: forSharesLinear > 0n }
      : { shares: againstSharesLinear, formatted: againstSharesLinear > 0n ? truncateAmount(formatEther(againstSharesLinear)) : '0', hasPosition: againstSharesLinear > 0n };

    const progressivePosition = voteDirection === 'against'
      ? { shares: forSharesProgressive, formatted: forSharesProgressive > 0n ? truncateAmount(formatEther(forSharesProgressive)) : '0', hasPosition: forSharesProgressive > 0n }
      : { shares: againstSharesProgressive, formatted: againstSharesProgressive > 0n ? truncateAmount(formatEther(againstSharesProgressive)) : '0', hasPosition: againstSharesProgressive > 0n };

    const currentDirectionLabel = voteDirection === 'against' ? 'Support' : 'Oppose';
    const targetDirectionLabel = voteDirection === 'against' ? 'Oppose' : 'Support';

    return {
      linear: linearPosition,
      progressive: progressivePosition,
      currentDirectionLabel,
      targetDirectionLabel,
    };
  }, [curveAvailability.allBlocked, voteDirection, forSharesLinear, forSharesProgressive, againstSharesLinear, againstSharesProgressive]);

  // Calculate pending redeem info for display (after user chose a curve)
  const pendingRedeemInfo = useMemo((): PendingRedeemInfo | null => {
    if (!pendingRedeemCurve || !voteDirection) return null;

    // Get the shares that will be redeemed (opposite direction on the chosen curve)
    const isRedeemingFor = voteDirection === 'against'; // If we're going to Oppose, we redeem For
    const shares = pendingRedeemCurve === CURVE_LINEAR
      ? (isRedeemingFor ? forSharesLinear : againstSharesLinear)
      : (isRedeemingFor ? forSharesProgressive : againstSharesProgressive);

    if (shares <= 0n) return null;

    return {
      curveId: pendingRedeemCurve,
      curveLabel: pendingRedeemCurve === CURVE_LINEAR ? 'Linear' : 'Progressive',
      shares,
      formatted: truncateAmount(formatEther(shares)),
      redeemDirection: isRedeemingFor ? 'Support' : 'Oppose',
      newDirection: voteDirection === 'for' ? 'Support' : 'Oppose',
    };
  }, [pendingRedeemCurve, voteDirection, forSharesLinear, forSharesProgressive, againstSharesLinear, againstSharesProgressive]);

  // Handle curve choice when both curves are blocked (inline section)
  // Does NOT execute redeem - just selects curve and stores pending redeem info
  // The actual redeem will be executed by the cart when processing the vote
  const handleDirectionChangeCurveChoice = (curveId: CurveId, setSelectedCurve: (curve: CurveId) => void) => {
    if (!directionChangeInfo) return;

    const position = curveId === CURVE_LINEAR ? directionChangeInfo.linear : directionChangeInfo.progressive;
    if (!position.hasPosition) return;

    // Set curve selection and track which curve needs redeem
    setSelectedCurve(curveId);
    setPendingRedeemCurve(curveId);
  };

  return {
    directionChangeInfo,
    pendingRedeemInfo,
    pendingRedeemCurve,
    setPendingRedeemCurve,
    handleDirectionChangeCurveChoice,
  };
}
