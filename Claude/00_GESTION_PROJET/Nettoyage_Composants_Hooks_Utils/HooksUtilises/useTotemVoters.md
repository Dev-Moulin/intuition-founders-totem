# useTotemVoters.ts

**Chemin**: `apps/web/src/hooks/useTotemVoters.ts`
**Status**: UTILISÉ (exporté via index.ts)

## Utilisé par

| Fichier | Type |
|---------|------|
| `hooks/index.ts` | Export |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useQuery`, `gql` | Hook/Fonction | `@apollo/client` (externe) |
| `formatEther` | Fonction | `viem` (externe) |

## Exports

| Export | Type |
|--------|------|
| `useTotemVoters` | Hook fonction |
| `TotemVoter` | Interface |

## Query GraphQL interne

```graphql
query GetTotemVoters($termId: String!, $limit: Int = 50) {
  deposits(
    where: {
      term_id: { _eq: $termId }
      vault_type: { _in: ["triple_positive", "triple_negative"] }
    }
    order_by: { created_at: desc }
    limit: $limit
  ) {
    id, sender_id, vault_type, assets_after_fees, shares, created_at, transaction_hash
  }
}
```

## useTotemVoters(termId, limit = 50) - Retourne

```typescript
{
  voters: TotemVoter[];         // Liste des voters (récent en premier)
  forCount: number;             // Nombre de votes FOR
  againstCount: number;         // Nombre de votes AGAINST
  totalFor: string;             // Total FOR en wei
  totalAgainst: string;         // Total AGAINST en wei
  formattedTotalFor: string;    // Total FOR formaté
  formattedTotalAgainst: string;// Total AGAINST formaté
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
}
```

## Interface TotemVoter

```typescript
interface TotemVoter {
  address: string;         // Adresse wallet
  amount: string;          // Montant en wei
  formattedAmount: string; // Montant formaté
  isFor: boolean;          // true = FOR, false = AGAINST
  createdAt: string;       // Timestamp ISO
  transactionHash: string; // Hash de la transaction
}
```

## Description

Hook pour récupérer les N derniers voters d'un totem spécifique.
- Retourne les voters triés par date décroissante (plus récent en premier)
- Inclut informations FOR/AGAINST
- Calcule les totaux FOR et AGAINST
