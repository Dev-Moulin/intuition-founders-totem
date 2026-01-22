/**
 * aggregateUserPositions - Aggregate user votes by totem
 *
 * Extracted from FounderCenterPanel.tsx
 * Groups votes by totem and calculates trust/shares by curve and direction
 *
 * @see FounderCenterPanel.tsx
 */

import type { UserPositionData } from '../TotemCard';

/** Vote data required for aggregation */
export interface VoteForAggregation {
  term?: {
    object?: {
      term_id?: string;
    };
  };
  assets_after_fees: string;
  shares: string;
  curveId: number;
  isPositive: boolean;
}

/**
 * Aggregate user votes by totem ID
 *
 * @param votes - User votes to aggregate
 * @returns Map of totem ID to aggregated position data
 */
export function aggregateUserPositions(
  votes: VoteForAggregation[] | null | undefined
): Map<string, UserPositionData> {
  if (!votes || votes.length === 0) {
    return new Map<string, UserPositionData>();
  }

  const map = new Map<string, UserPositionData>();

  for (const vote of votes) {
    const totemId = vote.term?.object?.term_id;
    if (!totemId) continue;

    const existing = map.get(totemId) || {
      trust: 0n,
      shares: 0n,
      linearTrust: 0n,
      progressiveTrust: 0n,
      linearSupport: 0n,
      linearOppose: 0n,
      progressiveSupport: 0n,
      progressiveOppose: 0n,
    };

    const voteAssets = BigInt(vote.assets_after_fees);
    existing.trust += voteAssets;
    existing.shares += BigInt(vote.shares);

    // Track by curve: 1 = Linear, 2 = Progressive
    if (vote.curveId === 1) {
      existing.linearTrust += voteAssets;
      if (vote.isPositive) {
        existing.linearSupport += voteAssets;
      } else {
        existing.linearOppose += voteAssets;
      }
    } else if (vote.curveId === 2) {
      existing.progressiveTrust += voteAssets;
      if (vote.isPositive) {
        existing.progressiveSupport += voteAssets;
      } else {
        existing.progressiveOppose += voteAssets;
      }
    }

    map.set(totemId, existing);
  }

  return map;
}
