/**
 * Information about an existing claim (triple) on INTUITION
 * Used when a claim already exists and user can vote on it
 */
export interface ExistingClaimInfo {
  termId: string;
  subjectLabel: string;
  predicateLabel: string;
  objectLabel: string;
  forVotes?: string;
  againstVotes?: string;
}
