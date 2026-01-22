/**
 * Validate Cart - Pure function for cart validation
 *
 * Extracted from useVoteCart.ts
 * Validates cart items against protocol requirements
 *
 * @see useVoteCart.ts
 */

import { formatEther } from 'viem';
import type { VoteCartItem } from '../../../types/voteCart';
import type { ProtocolConfig } from '../../../types/protocol';
import { truncateAmount } from '../../../utils/formatters';

/** Validation result */
export interface CartValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate cart items against protocol requirements
 *
 * @param items - Cart items to validate (or null if cart not initialized)
 * @param config - Protocol configuration (or null if not loaded)
 * @returns Validation result with errors
 */
export function validateCart(
  items: VoteCartItem[] | null,
  config: ProtocolConfig | null
): CartValidationResult {
  const errors: string[] = [];

  if (items === null) {
    errors.push('Panier non initialisé');
    return { isValid: false, errors };
  }

  if (items.length === 0) {
    errors.push('Le panier est vide');
    return { isValid: false, errors };
  }

  if (!config) {
    errors.push('Configuration du protocole non chargée');
    return { isValid: false, errors };
  }

  const minDepositWei = BigInt(config.minDeposit);
  const tripleCostWei = BigInt(config.tripleCost);

  // Small tolerance for protocol's non-round tripleCost (e.g., 0.001000000002 instead of 0.001)
  // This allows "0.0020" to pass validation even if exact minimum is "0.002000000002"
  const tolerance = 100000000000n; // 0.0000001 TRUST - covers any rounding dust

  for (const item of items) {
    // For new totems, minimum = tripleCost + minDeposit
    // For existing totems, minimum = minDeposit
    const minRequired = item.isNewTotem
      ? tripleCostWei + minDepositWei
      : minDepositWei;

    if (item.amount + tolerance < minRequired) {
      const missing = minRequired - item.amount;
      const missingValue = parseFloat(formatEther(missing));
      // Show clean truncated minimum for display
      const minRequiredFloat = parseFloat(formatEther(minRequired));
      const minRequiredFormatted = truncateAmount(minRequiredFloat);

      if (missingValue < 0.0001) {
        // Very small difference - show the minimum required instead
        errors.push(
          `"${item.totemName}" : minimum requis ${minRequiredFormatted} TRUST`
        );
      } else {
        const missingFormatted = truncateAmount(missingValue);
        errors.push(
          `"${item.totemName}" : il manque ${missingFormatted} TRUST`
        );
      }
    }

    if (item.amount <= 0n) {
      errors.push(`${item.totemName}: montant invalide`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
