# useUserVotes.ts

**Chemin**: `apps/web/src/hooks/useUserVotes.ts`
**Status**: UTILISÉ (exporté via index.ts)

## Utilisé par

| Fichier | Type |
|---------|------|
| `hooks/index.ts` | Export |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useQuery` | Hook | `@apollo/client` (externe) |
| `formatEther` | Fonction | `viem` (externe) |
| `GET_USER_VOTES`, `GET_USER_VOTES_DETAILED`, `GET_USER_POSITION` | Queries | `../lib/graphql/queries` |
| Types | Types | `../lib/graphql/types` |

## Exports

| Export | Type |
|--------|------|
| `useUserVotes` | Hook fonction |
| `useUserVotesDetailed` | Hook fonction (commenté dans index.ts) |
| `useUserPosition` | Hook fonction |
| `getTotalVotedAmount` | Fonction utilitaire |
| `filterVotesByType` | Fonction utilitaire |
| `groupVotesByTerm` | Fonction utilitaire |
| `formatTotalVotes` | Fonction utilitaire |
| `hasVotedOnTerm` | Fonction utilitaire |
| `getUserVoteDirection` | Fonction utilitaire |
| `VoteWithDetails` | Interface |

## Hooks

### useUserVotes(walletAddress)

Récupère tous les votes d'un utilisateur (atoms et triples).

```typescript
// Retourne
{
  votes: VoteWithDetails[];
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
}
```

### useUserVotesDetailed(walletAddress)

Récupère votes détaillés (triples only), séparés FOR/AGAINST.

```typescript
// Retourne
{
  votes: VoteWithDetails[];
  forVotes: VoteWithDetails[];
  againstVotes: VoteWithDetails[];
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
}
```

### useUserPosition(walletAddress, termId)

Position de l'utilisateur sur un term spécifique.

```typescript
// Retourne
{
  position: Position | null;
  hasPosition: boolean;
  shares: string;
  totalDeposited: string;
  totalRedeemed: string;
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
}
```

## Fonctions utilitaires

- `getTotalVotedAmount(votes)` : Total en wei
- `filterVotesByType(votes, vaultType)` : Filtre par type de vault
- `groupVotesByTerm(votes)` : Group by term_id
- `formatTotalVotes(wei, decimals)` : Format "X.XX TRUST"
- `hasVotedOnTerm(votes, termId)` : A voté sur ce term ?
- `getUserVoteDirection(votes, termId)` : 'for' | 'against' | null

## Interface VoteWithDetails

```typescript
interface VoteWithDetails extends Deposit {
  isPositive: boolean;      // true = FOR, false = AGAINST
  formattedAmount: string;  // "10.50"
}
```
