/**
 * Withdraw-related types
 */

/**
 * Withdraw status states
 */
export type WithdrawStatus =
  | 'idle'
  | 'calculating'
  | 'withdrawing'
  | 'success'
  | 'error';

/**
 * Withdraw error with details
 */
export interface WithdrawError {
  code: string;
  message: string;
}

/**
 * Preview of withdrawal amounts
 */
export interface WithdrawPreview {
  shares: bigint;
  estimatedAssets: bigint;
  formattedAssets: string;
  exitFeePercent: number;
}
