import { useQuery } from '@apollo/client';
import foundersData from '../../../../packages/shared/src/data/founders.json';
import type { FounderData } from '../components/FounderCard';
import { GET_ATOMS_BY_LABELS } from '../lib/graphql/queries';

interface AtomResult {
  term_id: string;
  label: string;
}

interface QueryResult {
  atoms: AtomResult[];
}

/**
 * Hook to get founders data enriched with their INTUITION atom IDs
 *
 * This hook:
 * 1. Loads founders from the static JSON file
 * 2. Queries INTUITION GraphQL to get their atom IDs
 * 3. Returns founders with atomId populated
 */
export function useFoundersWithAtomIds() {
  const founders = foundersData as FounderData[];
  const founderNames = founders.map((f) => f.name);

  const { data, loading, error } = useQuery<QueryResult>(GET_ATOMS_BY_LABELS, {
    variables: { labels: founderNames },
    fetchPolicy: 'cache-first',
  });

  // Create a map of name -> atomId
  const atomIdMap = new Map<string, string>();
  if (data?.atoms) {
    data.atoms.forEach((atom) => {
      atomIdMap.set(atom.label, atom.term_id);
    });
  }

  // Enrich founders with their atomId
  const foundersWithAtomIds: FounderData[] = founders.map((founder) => ({
    ...founder,
    atomId: atomIdMap.get(founder.name),
  }));

  return {
    founders: foundersWithAtomIds,
    loading,
    error,
    // Stats
    totalFounders: founders.length,
    foundersWithAtoms: atomIdMap.size,
  };
}
