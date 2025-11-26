import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the GraphQL query before importing the hook
vi.mock('@apollo/client', () => ({
  useQuery: vi.fn(),
  gql: vi.fn((strings: TemplateStringsArray) => strings.join('')),
}));

// Mock aggregateTriplesByObject utility
vi.mock('../utils/aggregateVotes', () => ({
  aggregateTriplesByObject: vi.fn((triples) => {
    if (!triples || triples.length === 0) return [];

    // Group by object (V2 schema uses term_id)
    const grouped = new Map();
    triples.forEach((triple: any) => {
      const objectId = triple.object.term_id;
      if (!grouped.has(objectId)) {
        grouped.set(objectId, {
          objectId,
          object: triple.object,
          claims: [],
          totalFor: 0n,
          totalAgainst: 0n,
          netScore: 0n,
          claimCount: 0,
        });
      }
      const group = grouped.get(objectId);
      group.claims.push({
        tripleId: triple.term_id,
        predicate: triple.predicate.label,
        trustFor: BigInt(triple.triple_vault?.total_assets || '0'),
        trustAgainst: BigInt(triple.counter_term?.total_assets || '0'),
        netScore: BigInt(triple.triple_vault?.total_assets || '0') - BigInt(triple.counter_term?.total_assets || '0'),
      });
      group.totalFor += BigInt(triple.triple_vault?.total_assets || '0');
      group.totalAgainst += BigInt(triple.counter_term?.total_assets || '0');
      group.netScore = group.totalFor - group.totalAgainst;
      group.claimCount++;
    });

    return Array.from(grouped.values());
  }),
}));

import { useQuery } from '@apollo/client';
import { useAllTotems } from './useAllTotems';

// Mock triple data (V2 schema)
const mockTriples = [
  {
    term_id: '0xtriple1',
    subject: { term_id: '0xsubject1', label: 'Vitalik Buterin', image: 'https://example.com/vitalik.jpg' },
    predicate: { term_id: '0xpred1', label: 'is represented by' },
    object: { term_id: '0xobject1', label: 'Unicorn', image: 'https://example.com/unicorn.jpg' },
    triple_vault: { total_assets: '1000000000000000000', total_shares: '1000000000000000000' },
    counter_term: { id: '0xcounter1', total_assets: '200000000000000000' },
  },
  {
    term_id: '0xtriple2',
    subject: { term_id: '0xsubject1', label: 'Vitalik Buterin', image: 'https://example.com/vitalik.jpg' },
    predicate: { term_id: '0xpred2', label: 'embodies' },
    object: { term_id: '0xobject1', label: 'Unicorn', image: 'https://example.com/unicorn.jpg' },
    triple_vault: { total_assets: '500000000000000000', total_shares: '500000000000000000' },
    counter_term: { id: '0xcounter2', total_assets: '100000000000000000' },
  },
];

describe('useAllTotems', () => {
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loading state', () => {
    it('should return loading true when query is loading', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: undefined,
        loading: true,
        error: undefined,
        refetch: mockRefetch,
      } as any);

      const result = useAllTotems();

      expect(result.loading).toBe(true);
      expect(result.totems).toEqual([]);
    });
  });

  describe('successful query', () => {
    it('should return totems after loading', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: { triples: mockTriples },
        loading: false,
        error: undefined,
        refetch: mockRefetch,
      } as any);

      const result = useAllTotems();

      expect(result.loading).toBe(false);
      expect(result.totems.length).toBe(1); // 2 triples for same object = 1 totem
      expect(result.error).toBeUndefined();
    });

    it('should aggregate claims by totem', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: { triples: mockTriples },
        loading: false,
        error: undefined,
        refetch: mockRefetch,
      } as any);

      const result = useAllTotems();

      expect(result.totems[0].claims.length).toBe(2);
      expect(result.totems[0].claimCount).toBe(2);
    });

    it('should include founder info in totem', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: { triples: mockTriples },
        loading: false,
        error: undefined,
        refetch: mockRefetch,
      } as any);

      const result = useAllTotems();

      expect(result.totems[0].founder).toBeDefined();
      expect(result.totems[0].founder.name).toBe('Vitalik Buterin');
    });

    it('should include totem label and image', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: { triples: mockTriples },
        loading: false,
        error: undefined,
        refetch: mockRefetch,
      } as any);

      const result = useAllTotems();

      expect(result.totems[0].totemLabel).toBe('Unicorn');
      expect(result.totems[0].totemImage).toBe('https://example.com/unicorn.jpg');
    });

    it('should calculate top predicate', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: { triples: mockTriples },
        loading: false,
        error: undefined,
        refetch: mockRefetch,
      } as any);

      const result = useAllTotems();

      expect(result.totems[0].topPredicate).toBeDefined();
      expect(typeof result.totems[0].topPredicate).toBe('string');
    });

    it('should provide refetch function', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: { triples: mockTriples },
        loading: false,
        error: undefined,
        refetch: mockRefetch,
      } as any);

      const result = useAllTotems();

      expect(result.refetch).toBe(mockRefetch);
    });
  });

  describe('error handling', () => {
    it('should return error when query fails', () => {
      const mockError = new Error('GraphQL error');
      vi.mocked(useQuery).mockReturnValue({
        data: undefined,
        loading: false,
        error: mockError,
        refetch: mockRefetch,
      } as any);

      const result = useAllTotems();

      expect(result.error).toBe(mockError);
      expect(result.totems).toEqual([]);
    });
  });

  describe('empty data', () => {
    it('should return empty array when no triples', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: { triples: [] },
        loading: false,
        error: undefined,
        refetch: mockRefetch,
      } as any);

      const result = useAllTotems();

      expect(result.totems).toEqual([]);
    });

    it('should return empty array when data is undefined', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: undefined,
        loading: false,
        error: undefined,
        refetch: mockRefetch,
      } as any);

      const result = useAllTotems();

      expect(result.totems).toEqual([]);
    });
  });

  describe('claims structure', () => {
    it('should include forVotes and againstVotes aliases in claims', () => {
      vi.mocked(useQuery).mockReturnValue({
        data: { triples: mockTriples },
        loading: false,
        error: undefined,
        refetch: mockRefetch,
      } as any);

      const result = useAllTotems();

      const claim = result.totems[0].claims[0];
      expect(claim).toHaveProperty('forVotes');
      expect(claim).toHaveProperty('againstVotes');
      expect(typeof claim.forVotes).toBe('bigint');
      expect(typeof claim.againstVotes).toBe('bigint');
    });
  });
});
