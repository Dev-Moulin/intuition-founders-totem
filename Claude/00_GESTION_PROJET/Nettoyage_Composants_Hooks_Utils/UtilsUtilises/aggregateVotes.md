# aggregateVotes.ts

**Chemin**: `apps/web/src/utils/aggregateVotes.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `hooks/useFoundersForHomePage.ts` | Hook |

## Dépendances (imports)

Aucune dépendance externe.

## Exports

| Export | Type |
|--------|------|
| `aggregateTriplesByObject` | Fonction |
| `getWinningTotem` | Fonction |
| `formatTrustAmount` | Fonction |
| `Triple` | Interface |
| `Claim` | Interface |
| `AggregatedTotem` | Interface |

## Interfaces

### Triple

```typescript
interface Triple {
  term_id: string;
  predicate: { term_id: string; label: string };
  object: { term_id: string; label: string; image?: string; description?: string };
  triple_vault?: { total_assets: string };
  counter_term?: { id: string; total_assets: string };
}
```

### Claim

```typescript
interface Claim {
  tripleId: string;
  predicate: string;
  netScore: bigint;
  trustFor: bigint;
  trustAgainst: bigint;
}
```

### AggregatedTotem

```typescript
interface AggregatedTotem {
  objectId: string;
  object: { id: string; label: string; image?: string; description?: string };
  claims: Claim[];
  netScore: bigint;
  totalFor: bigint;
  totalAgainst: bigint;
  claimCount: number;
}
```

## Fonctions

### aggregateTriplesByObject(triples: Triple[]): AggregatedTotem[]

Agrège les triples par leur object (totem) pour calculer les scores totaux.

**Exemple :**
- Triple 1: [Joseph] [is represented by] [Lion] → 45 NET
- Triple 2: [Joseph] [embodies] [Lion] → 28 NET
- Résultat: Lion totem NET = 73 (45 + 28)

Retourne un tableau trié par NET score décroissant.

### getWinningTotem(totems: AggregatedTotem[]): AggregatedTotem | null

Retourne le totem avec le plus haut NET score (le premier du tableau trié).

### formatTrustAmount(amount: bigint, decimals = 2): string

Formate un montant TRUST (bigint 18 decimals) en string lisible.
- 1000000000000000000n → "1.00"
- 1500000000000000000n → "1.50"
