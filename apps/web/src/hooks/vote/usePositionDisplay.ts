/**
 * usePositionDisplay - Calculate position display values
 *
 * Extracted from VoteTotemPanel.tsx (~45 lines)
 * Calculates:
 * - selectedCombinationPosition: current position for selected direction+curve
 * - pendingCartAmount: pending amount in cart for current selection
 *
 * @see VoteTotemPanel.tsx, CurrentPositionCard.tsx
 */

import { useMemo } from 'react';
import { formatEther } from 'viem';
import { truncateAmount } from '../../utils/formatters';
import { CURVE_LINEAR, type CurveId } from '../index';

/** Cart item structure for matching */
interface CartItem {
  totemId: string | null;
  direction: 'for' | 'against';
  curveId: CurveId;
  amount: bigint;
}

/** Cart structure */
interface Cart {
  items: CartItem[];
}

/** Position combination result */
export interface SelectedCombinationPosition {
  shares: bigint;
  formatted: string;
  hasPosition: boolean;
}

/** Pending cart amount result */
export interface PendingCartAmount {
  amount: bigint;
  formatted: string;
  hasPending: boolean;
}

export interface UsePositionDisplayParams {
  /** Current vote direction */
  voteDirection: 'for' | 'against' | 'withdraw' | null;
  /** Selected curve */
  selectedCurve: CurveId | null;
  /** Selected totem ID */
  selectedTotemId: string | undefined;
  /** Cart state */
  cart: Cart | null;
  /** Support shares on Linear curve */
  forSharesLinear: bigint;
  /** Support shares on Progressive curve */
  forSharesProgressive: bigint;
  /** Oppose shares on Linear curve */
  againstSharesLinear: bigint;
  /** Oppose shares on Progressive curve */
  againstSharesProgressive: bigint;
}

export interface UsePositionDisplayResult {
  /** Position for selected direction+curve combination */
  selectedCombinationPosition: SelectedCombinationPosition;
  /** Pending amount in cart for current selection */
  pendingCartAmount: PendingCartAmount;
}

/**
 * Hook for calculating position display values
 */
export function usePositionDisplay({
  voteDirection,
  selectedCurve,
  selectedTotemId,
  cart,
  forSharesLinear,
  forSharesProgressive,
  againstSharesLinear,
  againstSharesProgressive,
}: UsePositionDisplayParams): UsePositionDisplayResult {

  // Calculate position for the selected direction+curve combination
  const selectedCombinationPosition = useMemo((): SelectedCombinationPosition => {
    if (!voteDirection || voteDirection === 'withdraw' || !selectedCurve) {
      return { shares: 0n, formatted: '0', hasPosition: false };
    }

    let shares: bigint;
    if (voteDirection === 'for') {
      shares = selectedCurve === CURVE_LINEAR ? forSharesLinear : forSharesProgressive;
    } else {
      shares = selectedCurve === CURVE_LINEAR ? againstSharesLinear : againstSharesProgressive;
    }

    return {
      shares,
      formatted: shares > 0n ? truncateAmount(formatEther(shares)) : '0',
      hasPosition: shares > 0n,
    };
  }, [voteDirection, selectedCurve, forSharesLinear, forSharesProgressive, againstSharesLinear, againstSharesProgressive]);

  // Calculate pending amount in cart for current selection
  const pendingCartAmount = useMemo((): PendingCartAmount => {
    if (!cart || !selectedTotemId || !voteDirection || voteDirection === 'withdraw' || !selectedCurve) {
      return { amount: 0n, formatted: '0', hasPending: false };
    }

    // Find cart item matching current selection
    const direction = voteDirection as 'for' | 'against';
    const matchingItem = cart.items.find(
      item =>
        item.totemId === selectedTotemId &&
        item.direction === direction &&
        item.curveId === selectedCurve
    );

    if (!matchingItem) {
      return { amount: 0n, formatted: '0', hasPending: false };
    }

    return {
      amount: matchingItem.amount,
      formatted: truncateAmount(formatEther(matchingItem.amount)),
      hasPending: true,
    };
  }, [cart, selectedTotemId, voteDirection, selectedCurve]);

  return {
    selectedCombinationPosition,
    pendingCartAmount,
  };
}
