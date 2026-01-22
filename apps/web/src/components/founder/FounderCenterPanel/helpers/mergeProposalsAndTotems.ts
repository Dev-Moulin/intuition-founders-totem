/**
 * mergeProposalsAndTotems - Merge proposals with votes and OFC totems
 *
 * Extracted from FounderCenterPanel.tsx
 * Combines proposals (with vote data) and totems (from OFC config) into unified list
 *
 * @see FounderCenterPanel.tsx
 */

/** Unified totem type for display */
export interface DisplayTotem {
  id: string;
  label: string;
  image?: string;
  category?: string;
  hasVotes: boolean;
  netScore: bigint;
  forVotes: string;
  againstVotes: string;
}

/** Proposal with validated triple data (from filterValidTriples) */
export interface ValidProposal {
  object: {
    term_id: string;
    label: string;
    image?: string;
  };
  votes?: {
    netVotes?: string;
    forVotes?: string;
    againstVotes?: string;
  } | null;
}

/** OFC totem data */
export interface OFCTotem {
  id: string;
  label: string;
  image?: string;
  category?: string;
}

/**
 * Merge proposals (with votes) and OFC totems (may not have votes)
 *
 * @param proposals - Valid proposals with vote data
 * @param ofcTotems - OFC totems from config
 * @returns Sorted list of display totems
 */
export function mergeProposalsAndTotems(
  proposals: ValidProposal[],
  ofcTotems: OFCTotem[]
): DisplayTotem[] {
  const totemMap = new Map<string, DisplayTotem>();

  // First, add all valid proposals (totems with votes for this founder)
  // validProposals is already filtered by filterValidTriples - object is guaranteed non-null
  proposals.forEach((proposal) => {
    // Use object.term_id as the unique identifier (object_id is not returned by GraphQL)
    const id = proposal.object.term_id;
    const netScore = BigInt(proposal.votes?.netVotes || '0');

    const forVotes = proposal.votes?.forVotes || '0';
    const againstVotes = proposal.votes?.againstVotes || '0';

    if (totemMap.has(id)) {
      // Aggregate votes if same totem appears multiple times
      const existing = totemMap.get(id)!;
      existing.netScore += netScore;
      existing.forVotes = (BigInt(existing.forVotes) + BigInt(forVotes)).toString();
      existing.againstVotes = (BigInt(existing.againstVotes) + BigInt(againstVotes)).toString();
    } else {
      totemMap.set(id, {
        id,
        label: proposal.object.label,
        image: proposal.object.image,
        hasVotes: true,
        netScore,
        forVotes,
        againstVotes,
      });
    }
  });

  // Then, add OFC totems that don't have votes yet
  ofcTotems.forEach((totem) => {
    if (!totemMap.has(totem.id)) {
      totemMap.set(totem.id, {
        id: totem.id,
        label: totem.label,
        image: totem.image,
        category: totem.category,
        hasVotes: false,
        netScore: 0n,
        forVotes: '0',
        againstVotes: '0',
      });
    } else {
      // Add category info to existing totem
      const existing = totemMap.get(totem.id)!;
      existing.category = totem.category;
    }
  });

  // Sort: totems with votes first (by net score), then totems without votes (alphabetically)
  return Array.from(totemMap.values()).sort((a, b) => {
    if (a.hasVotes && !b.hasVotes) return -1;
    if (!a.hasVotes && b.hasVotes) return 1;
    if (a.hasVotes && b.hasVotes) {
      return b.netScore > a.netScore ? 1 : b.netScore < a.netScore ? -1 : 0;
    }
    return a.label.localeCompare(b.label);
  });
}
