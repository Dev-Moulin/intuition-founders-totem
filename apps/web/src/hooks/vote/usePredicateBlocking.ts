/**
 * usePredicateBlocking - Cross-predicate blocking logic
 *
 * Manages the rule: user cannot have votes with different predicates on the same totem.
 * If user has votes with "has totem" → "embodies" is blocked (and vice versa).
 *
 * Provides:
 * - Votes grouped by predicate for the selected totem
 * - Function to check if a predicate is blocked
 * - Function to get votes that need redeem when switching predicates
 *
 * @see VoteTotemPanel.tsx
 */

import { useMemo } from 'react';
import { truncateAmount } from '../../utils/formatters';
import type { UserVoteWithDetails } from '../data/useUserVotesForFounder';

/** Votes grouped by predicate label */
export type VotesByPredicate = Record<string, UserVoteWithDetails[]>;

/** Info about votes to redeem when switching predicates */
export interface PredicateRedeemInfo {
  /** Votes to redeem */
  votes: UserVoteWithDetails[];
  /** Label of the predicate being redeemed */
  otherPredicateLabel: string;
  /** Total amount to redeem (formatted) */
  totalToRedeem: string;
}

export interface UsePredicateBlockingParams {
  /** Selected totem ID */
  selectedTotemId: string | undefined;
  /** User's votes for this founder */
  userVotesForFounder: UserVoteWithDetails[];
}

export interface UsePredicateBlockingResult {
  /** Votes grouped by predicate for this totem */
  votesOnTotemByPredicate: VotesByPredicate;
  /** Check if a predicate is blocked */
  isPredicateBlocked: (predicateLabel: string) => boolean;
  /** Get votes to redeem when switching to a blocked predicate */
  getVotesToRedeem: (targetPredicateLabel: string) => PredicateRedeemInfo;
}

/**
 * Hook for managing cross-predicate blocking rules
 */
export function usePredicateBlocking({
  selectedTotemId,
  userVotesForFounder,
}: UsePredicateBlockingParams): UsePredicateBlockingResult {
  // Cross-predicate detection: group votes by predicate for this totem
  // This is computed BEFORE any predicate selection to enable proper blocking
  const votesOnTotemByPredicate = useMemo((): VotesByPredicate => {
    const result: VotesByPredicate = {
      'has totem': [],
      'embodies': [],
    };

    if (!selectedTotemId || !userVotesForFounder.length) {
      return result;
    }

    // Find all votes on this totem
    const votesOnTotem = userVotesForFounder.filter(
      v => v.term?.object?.term_id === selectedTotemId
    );

    // Group by predicate
    for (const vote of votesOnTotem) {
      const predicateLabel = vote.term?.predicate?.label;
      if (predicateLabel && result[predicateLabel] !== undefined) {
        result[predicateLabel].push(vote);
      }
    }

    return result;
  }, [selectedTotemId, userVotesForFounder]);

  // Check if a predicate is blocked (user has votes with the OTHER predicate on this totem)
  const isPredicateBlocked = (predicateLabel: string): boolean => {
    const otherPredicate = predicateLabel === 'has totem' ? 'embodies' : 'has totem';
    return (votesOnTotemByPredicate[otherPredicate]?.length ?? 0) > 0;
  };

  // Get votes to redeem when switching to a blocked predicate
  const getVotesToRedeem = (targetPredicateLabel: string): PredicateRedeemInfo => {
    const otherPredicate = targetPredicateLabel === 'has totem' ? 'embodies' : 'has totem';
    const votes = votesOnTotemByPredicate[otherPredicate] || [];
    const total = votes.reduce((sum, v) => sum + parseFloat(v.formattedAmount), 0);
    return {
      votes,
      otherPredicateLabel: otherPredicate,
      totalToRedeem: truncateAmount(total),
    };
  };

  return {
    votesOnTotemByPredicate,
    isPredicateBlocked,
    getVotesToRedeem,
  };
}
