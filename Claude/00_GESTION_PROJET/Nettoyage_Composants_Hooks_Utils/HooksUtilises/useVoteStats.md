# useVoteStats.ts

**Chemin**: `apps/web/src/hooks/useVoteStats.ts`
**Status**: UTILISÉ (exporté via index.ts)

## Utilisé par

| Fichier | Type |
|---------|------|
| `hooks/index.ts` | Export |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useQuery` | Hook | `@apollo/client` (externe) |
| `formatEther`, `parseEther` | Fonctions | `viem` (externe) |
| Queries | Queries | `../lib/graphql/queries` |
| Types | Types | `../lib/graphql/types` |

## Exports

| Export | Type |
|--------|------|
| `useTripleVotes` | Hook fonction |
| `useRecentVotes` | Hook fonction |
| `useTopVoters` | Hook fonction |
| `useVotesTimeline` | Hook fonction |
| `useVotesDistribution` | Hook fonction |

## Hooks commentés (non exportés)

- `useGlobalVoteStats` - Doublon avec usePlatformStats
- `useFounderStats` - Non utilisé

## Hooks actifs

### useTripleVotes(termId)

Votes sur un triple spécifique avec séparation FOR/AGAINST.

```typescript
// Retourne
{
  votes: Deposit[];
  forVotes: Deposit[];
  againstVotes: Deposit[];
  totalFor: string;
  totalAgainst: string;
  formattedFor: string;
  formattedAgainst: string;
  uniqueVoters: number;
  loading, error, refetch
}
```

### useRecentVotes(limit = 20)

Votes récents sur toutes les propositions (poll 30s).

```typescript
// Retourne
{
  recentVotes: EnrichedVote[];
  loading, error, refetch
}
```

### useTopVoters(limit = 10)

Leaderboard des top voters agrégés.

```typescript
// Retourne
{
  topVoters: AggregatedVoter[];
  loading, error, refetch
}
```

### useVotesTimeline(termId)

Timeline cumulative des votes pour charts.

```typescript
// Retourne
{
  timeline: TimelineDataPoint[];
  loading, error, refetch
}
```

### useVotesDistribution(termId)

Distribution des votes par buckets (histogram).

```typescript
// Retourne
{
  buckets: DistributionBucket[];
  topVoters: TopVoter[];
  totalVotes: number;
  top10Percentage: number;
  othersTotal: string;
  formattedOthersTotal: string;
  loading, error, refetch
}
```

## Notes

- useRecentVotes a un pollInterval de 30s pour near real-time
- useTopVoters fetch 3x le limit pour mieux agréger
- useVotesDistribution définit 6 buckets : 0-0.1, 0.1-1, 1-5, 5-10, 10-50, 50+
