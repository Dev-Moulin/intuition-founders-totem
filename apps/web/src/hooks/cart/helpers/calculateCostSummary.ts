/**
 * Calculate Cost Summary - Pure function for cart cost calculations
 *
 * Extracted from useVoteCart.ts
 * Calculates total deposits, withdrawable amounts, fees, and net cost
 *
 * @see useVoteCart.ts
 */

import type { VoteCartItem, VoteCartCostSummary } from '../../../types/voteCart';
import type { ProtocolConfig } from '../../../types/protocol';

/**
 * Calculate cost summary for a list of cart items
 *
 * @param items - Cart items to calculate costs for
 * @param config - Protocol configuration (fees, costs)
 * @returns Cost summary with totals and fees
 */
export function calculateCostSummary(
  items: VoteCartItem[],
  config: ProtocolConfig
): VoteCartCostSummary {
  let totalDeposits = 0n;
  let totalWithdrawable = 0n;
  let atomCreationCosts = 0n;
  let tripleCreationCosts = 0n;
  let withdrawCount = 0;
  let newTotemCount = 0;
  let newTripleCount = 0;

  for (const item of items) {
    totalDeposits += item.amount;

    if (item.needsWithdraw && item.currentPosition) {
      // Approximate withdrawable amount (actual uses previewRedeem)
      // Apply exit fee (e.g., 7%)
      const exitFeePercent = BigInt(config.exitFee);
      const feeDenominator = BigInt(config.feeDenominator);
      const grossWithdrawable = item.currentPosition.shares;
      const feeAmount = (grossWithdrawable * exitFeePercent) / feeDenominator;
      totalWithdrawable += grossWithdrawable - feeAmount;
      withdrawCount++;
    }

    // isNewTotem means the triple doesn't exist yet (needs createTriples)
    // This costs tripleCost (~0.001) which is taken from the user's amount
    if (item.isNewTotem) {
      tripleCreationCosts += BigInt(config.tripleCost);
      newTripleCount++;

      // If also creating a new atom (newTotemData exists), add atom cost
      if (item.newTotemData) {
        atomCreationCosts += BigInt(config.atomCost);
        newTotemCount++;
      }
    }
  }

  // Calculate entry fees on the effective deposit (after triple costs)
  // The tripleCreationCosts are taken from user's amount before deposit
  const effectiveDeposits = totalDeposits > tripleCreationCosts
    ? totalDeposits - tripleCreationCosts
    : 0n;
  const entryFeePercent = BigInt(config.entryFee);
  const feeDenominator = BigInt(config.feeDenominator);
  const estimatedEntryFees = (effectiveDeposits * entryFeePercent) / feeDenominator;

  // Net cost = deposits + entry fees + atom costs - withdrawable
  // Note: tripleCreationCosts are already included in totalDeposits (taken from user's amount)
  const netCost =
    totalDeposits + estimatedEntryFees + atomCreationCosts - totalWithdrawable;

  return {
    totalDeposits,
    totalWithdrawable,
    estimatedEntryFees,
    atomCreationCosts,
    tripleCreationCosts,
    netCost,
    withdrawCount,
    newTotemCount,
    newTripleCount,
  };
}
