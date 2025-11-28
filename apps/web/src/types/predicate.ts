/**
 * Predicate type for INTUITION protocol predicates
 */
export interface Predicate {
  id: string;
  label: string;
  description: string;
  termId: string | null;
  isDefault: boolean;
}
