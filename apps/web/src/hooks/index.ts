/**
 * Export all custom hooks
 */

// GraphQL hooks for proposals
export {
  useFounderProposals,
  useUserProposals,
  useProposalLimit,
  sortProposalsByVotes,
  getWinningProposal,
  formatVoteAmount,
} from './useFounderProposals';

// GraphQL hook for all proposals (grouped by founder)
export { useAllProposals, type FounderWithTotem } from './useAllProposals';

// GraphQL hook for totem details
export { useTotemDetails, type TotemDetails } from './useTotemDetails';

// GraphQL hooks for votes
export {
  useUserVotes,
  useUserVotesDetailed,
  useUserPosition,
  getTotalVotedAmount,
  filterVotesByType,
  groupVotesByTerm,
  formatTotalVotes,
  hasVotedOnTerm,
  getUserVoteDirection,
  type VoteWithDetails,
} from './useUserVotes';
