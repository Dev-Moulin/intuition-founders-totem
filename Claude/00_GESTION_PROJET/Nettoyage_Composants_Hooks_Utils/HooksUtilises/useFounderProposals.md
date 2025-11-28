# useFounderProposals.ts

**Chemin**: `apps/web/src/hooks/useFounderProposals.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/VotePanel.tsx` | Composant |
| `components/ClaimExistsModal.tsx` | Composant (formatVoteAmount) |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useQuery` | Hook | `@apollo/client` (externe) |
| `formatEther` | Fonction | `viem` (externe) |
| `GET_FOUNDER_PROPOSALS`, `COUNT_USER_PROPOSALS_FOR_FOUNDER` | Queries | `../lib/graphql/queries` |
| Types | Types | `../lib/graphql/types` |

## Exports

| Export | Type |
|--------|------|
| `useFounderProposals` | Hook fonction |
| `useProposalLimit` | Hook fonction |
| `sortProposalsByVotes` | Fonction utilitaire |
| `getWinningProposal` | Fonction utilitaire |
| `formatVoteAmount` | Fonction utilitaire |

## useFounderProposals(founderName)

Récupère toutes les propositions pour un founder spécifique.

```typescript
// Retourne
{
  proposals: ProposalWithVotes[];  // Triples enrichis avec votes
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
}
```

## useProposalLimit(walletAddress, founderName)

Vérifie si un utilisateur peut créer une nouvelle proposition (limite: 3 par founder).

```typescript
// Retourne
{
  count: number;        // Nombre actuel de propositions
  canPropose: boolean;  // True si < 3
  remaining: number;    // Nombre restant
  loading: boolean;
  error: ApolloError | undefined;
  maxProposals: number; // Toujours 3
}
```

## Fonctions utilitaires

- **sortProposalsByVotes(proposals)** : Trie par votes décroissants
- **getWinningProposal(proposals)** : Retourne la proposition avec le plus de FOR votes
- **formatVoteAmount(weiAmount, decimals)** : Formate wei en string lisible (ex: "150.50")

## Fonctions internes

- `calculateVoteCounts(triple)` : Calcule FOR, AGAINST, netVotes
- `calculatePercentage(votes)` : Calcule % de FOR
- `enrichTripleWithVotes(triple)` : Ajoute votes et percentage au triple

## Notes

- `useUserProposals` est commenté (non utilisé)
- fetchPolicy: 'cache-and-network' pour afficher cache + refresh
