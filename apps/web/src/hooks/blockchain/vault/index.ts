/**
 * Vault Operations Module
 *
 * Hooks pour les opérations sur les vaults INTUITION:
 * - Vote (FOR/AGAINST)
 * - Withdraw (retrait TRUST)
 * - Preview (simulation dépôt/retrait)
 * - Position (lecture position user)
 */

// Vote
export {
  useVote,
  type CurveId,
  type VoteOptions,
  type UseVoteResult,
  CURVE_LINEAR,
  CURVE_PROGRESSIVE,
} from './useVote';

// Withdraw
export {
  useWithdraw,
  estimateWithdrawAmount,
  type UseWithdrawResult,
} from './useWithdraw';

// Preview Deposit
export {
  usePreviewDeposit,
  type DepositPreview,
  type UsePreviewDepositResult,
} from './usePreviewDeposit';

// Preview Redeem
export {
  usePreviewRedeem,
  type RedeemPreview,
  type UsePreviewRedeemResult,
} from './usePreviewRedeem';

// Position from Contract
export {
  usePositionFromContract,
  usePositionBothSides,
} from './usePositionFromContract';
