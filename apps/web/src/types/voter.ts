/**
 * Voter-related types
 */

/**
 * Voter information for a totem
 */
export interface TotemVoter {
  address: string;
  amount: string;
  formattedAmount: string;
  isFor: boolean;
  createdAt: string;
  transactionHash: string;
}
