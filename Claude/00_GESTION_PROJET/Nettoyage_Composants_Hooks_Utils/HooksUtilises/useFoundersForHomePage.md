# useFoundersForHomePage.ts

**Chemin**: `apps/web/src/hooks/useFoundersForHomePage.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `pages/HomePage.tsx` | Page |
| `components/FounderHomeCard.tsx` | Composant (type) |
| `components/VotePanel.tsx` | Composant (type) |
| `components/FounderExpandedView.tsx` | Composant (type) |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useMemo` | Hook | `react` (externe) |
| `useQuery` | Hook | `@apollo/client` (externe) |
| `foundersData` | Data | `packages/shared/src/data/founders.json` |
| `FounderData` | Type | `../types/founder` |
| `GET_ATOMS_BY_LABELS`, `GET_ALL_PROPOSALS` | Queries | `../lib/graphql/queries` |
| `Triple` | Type | `../lib/graphql/types` |
| `aggregateTriplesByObject` | Fonction | `../utils/aggregateVotes` |

## Exports

| Export | Type |
|--------|------|
| `useFoundersForHomePage` | Hook fonction |
| `TrendDirection` | Type (`'up' \| 'down' \| 'neutral'`) |
| `WinningTotem` | Interface |
| `FounderForHomePage` | Interface (extends FounderData) |

## Retourne

```typescript
{
  founders: FounderForHomePage[];  // 42 founders enrichis
  loading: boolean;
  error: ApolloError | undefined;
  stats: {
    totalFounders: number;        // Toujours 42
    foundersWithAtoms: number;    // Founders avec atomId
    foundersWithTotems: number;   // Founders avec totem gagnant
    totalProposals: number;       // Nombre total de propositions
  };
}
```

## Interface FounderForHomePage

```typescript
interface FounderForHomePage extends FounderData {
  winningTotem: WinningTotem | null;  // Totem avec meilleur score
  proposalCount: number;               // Nombre de propositions
  recentActivityCount: number;         // Activité dernières 24h
}
```

## Interface WinningTotem

```typescript
interface WinningTotem {
  objectId: string;
  label: string;
  image?: string;
  netScore: bigint;        // FOR - AGAINST
  totalFor: bigint;
  totalAgainst: bigint;
  claimCount: number;
  trend: TrendDirection;   // up si > 60% FOR, down si < 40%
}
```

## Description

Hook principal pour la HomePage. Combine :
1. **Data statique** : 42 founders depuis JSON
2. **AtomIds** : Query GraphQL pour récupérer les atom IDs
3. **Propositions** : Query GraphQL pour tous les triples
4. **Calcul** : Totem gagnant par founder, activité récente, stats

### Logique
- Groupe les triples par founder (subject.label)
- Compte l'activité des dernières 24h
- Utilise `aggregateTriplesByObject` pour agréger par totem
- Calcule le trend basé sur ratio FOR/AGAINST
