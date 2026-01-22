/**
 * useCurveAvailability - INTUITION protocol curve availability rules
 *
 * INTUITION Rules:
 * - Une seule direction à la fois (Support OU Oppose, pas les deux)
 * - Si tu as Support (sur n'importe quelle courbe) → tu ne peux PAS faire Oppose
 * - Si tu as Oppose (sur n'importe quelle courbe) → tu ne peux PAS faire Support
 * - Pour changer de direction → tu dois d'abord retirer (redeem) TOUTES tes positions
 * - Tu peux avoir Support Linear + Support Progressive (même direction = OK)
 * - Tu peux avoir Oppose Linear + Oppose Progressive (même direction = OK)
 *
 * @see VoteTotemPanel.tsx
 */

import { useMemo } from 'react';
import type { VoteCart } from '../../types/voteCart';

/** Curve availability result with blocking reason */
export interface CurveAvailability {
  /** Whether Linear curve is available */
  linear: boolean;
  /** Whether Progressive curve is available */
  progressive: boolean;
  /** Reason why curves are blocked (if any) */
  blockedReason: string | null;
  /** Whether ALL curves are blocked */
  allBlocked: boolean;
}

export interface UseCurveAvailabilityParams {
  /** Current vote direction */
  voteDirection: 'for' | 'against' | 'withdraw' | null;
  /** Has FOR position on Linear curve */
  hasForPositionLinear: boolean;
  /** Has FOR position on Progressive curve */
  hasForPositionProgressive: boolean;
  /** Has AGAINST position on Linear curve */
  hasAgainstPositionLinear: boolean;
  /** Has AGAINST position on Progressive curve */
  hasAgainstPositionProgressive: boolean;
  /** Vote cart (to check pending votes) */
  cart: VoteCart | null;
  /** Selected totem ID */
  selectedTotemId: string | undefined;
}

/**
 * Hook for computing curve availability based on INTUITION protocol rules
 */
export function useCurveAvailability({
  voteDirection,
  hasForPositionLinear,
  hasForPositionProgressive,
  hasAgainstPositionLinear,
  hasAgainstPositionProgressive,
  cart,
  selectedTotemId,
}: UseCurveAvailabilityParams): CurveAvailability {
  return useMemo(() => {
    const direction = voteDirection === 'for' ? 'support' : voteDirection === 'against' ? 'oppose' : null;

    // No blocking for withdraw mode or if no direction selected
    if (!direction || voteDirection === 'withdraw') {
      return { linear: true, progressive: true, blockedReason: null, allBlocked: false };
    }

    // Check if user has ANY position in the opposite direction (on ANY curve)
    const hasAnyForPosition = hasForPositionLinear || hasForPositionProgressive;
    const hasAnyAgainstPosition = hasAgainstPositionLinear || hasAgainstPositionProgressive;

    // If I want Support, block ALL curves if I have ANY Oppose position
    // If I want Oppose, block ALL curves if I have ANY Support position
    const blockedByOppositePosition = direction === 'support' ? hasAnyAgainstPosition : hasAnyForPosition;

    // Also check cart items for this totem - same logic
    let blockedByCart = false;
    if (cart && selectedTotemId) {
      const cartItemsForTotem = cart.items.filter(item => item.totemId === selectedTotemId);
      for (const item of cartItemsForTotem) {
        const itemIsSupport = item.direction === 'for';
        const itemIsOppose = item.direction === 'against';

        // If I want Support, check if cart has ANY Oppose
        // If I want Oppose, check if cart has ANY Support
        if (direction === 'support' && itemIsOppose) {
          blockedByCart = true;
          break;
        } else if (direction === 'oppose' && itemIsSupport) {
          blockedByCart = true;
          break;
        }
      }
    }

    const allBlocked = blockedByOppositePosition || blockedByCart;

    // Build blocked reason message
    let blockedReason: string | null = null;
    if (allBlocked) {
      const oppositeDirection = direction === 'support' ? 'Oppose' : 'Support';
      const currentDirection = direction === 'support' ? 'Support' : 'Oppose';
      const source = blockedByCart ? ' (panier inclus)' : '';

      // List which curves have opposite positions
      const curves: string[] = [];
      if (direction === 'support') {
        if (hasAgainstPositionLinear) curves.push('Linear');
        if (hasAgainstPositionProgressive) curves.push('Progressive');
      } else {
        if (hasForPositionLinear) curves.push('Linear');
        if (hasForPositionProgressive) curves.push('Progressive');
      }

      if (curves.length > 0) {
        blockedReason = `Position ${oppositeDirection} existante (${curves.join(' + ')})${source}. Retirez d'abord pour pouvoir ${currentDirection}.`;
      } else if (blockedByCart) {
        blockedReason = `Vote ${oppositeDirection} dans le panier. ${currentDirection} impossible sur le même totem.`;
      }
    }

    return {
      linear: !allBlocked,
      progressive: !allBlocked,
      blockedReason,
      allBlocked,
    };
  }, [voteDirection, hasForPositionLinear, hasForPositionProgressive, hasAgainstPositionLinear, hasAgainstPositionProgressive, cart, selectedTotemId]);
}
