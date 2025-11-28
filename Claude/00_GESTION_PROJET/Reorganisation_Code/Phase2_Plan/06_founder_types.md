# 06 - Ajouter types founder à types/founder.ts

## Objectif

Centraliser les types liés aux founders dans le fichier `types/founder.ts` existant.

**Note** : Le fichier `types/founder.ts` existe déjà avec `FounderData`. On ajoute les types manquants.

---

## 1. Types à ajouter dans `types/founder.ts`

```typescript
/**
 * Trend direction for score changes
 */
export type TrendDirection = 'up' | 'down' | 'neutral';

/**
 * Winning totem data for a founder
 */
export interface WinningTotem {
  objectId: string;
  label: string;
  image?: string;
  netScore: bigint;
  totalFor: bigint;
  totalAgainst: bigint;
  claimCount: number;
  /** Trend based on FOR/AGAINST ratio: up if > 60% FOR, down if < 40% FOR, neutral otherwise */
  trend: TrendDirection;
}

/**
 * Founder data enriched with atomId and winning totem for HomePage
 */
export interface FounderForHomePage extends FounderData {
  winningTotem: WinningTotem | null;
  proposalCount: number;
  /** Number of new totems proposed in the last 24 hours */
  recentActivityCount: number;
}
```

---

## 2. Fichiers sources à modifier

### A. hooks/useFoundersForHomePage.ts

**Lignes 9-37 - À supprimer** (après import) :
```typescript
export type TrendDirection = 'up' | 'down' | 'neutral';
export interface WinningTotem { ... }
export interface FounderForHomePage extends FounderData { ... }
```

**Import à modifier** (ligne 4) :
```typescript
// Actuel
import type { FounderData } from '../types/founder';

// Nouveau
import type { FounderData, TrendDirection, WinningTotem, FounderForHomePage } from '../types/founder';
```

**Re-exports à ajouter** :
```typescript
export type { TrendDirection, WinningTotem, FounderForHomePage };
```

### B. hooks/index.ts

**Ajouter exports** :
```typescript
export type { TrendDirection, WinningTotem, FounderForHomePage } from '../types/founder';
```

---

## 3. Étapes d'exécution

1. [ ] Ajouter types dans `types/founder.ts`
2. [ ] Modifier imports dans `useFoundersForHomePage.ts` + COMMENTER l'ancien code
3. [ ] Modifier `hooks/index.ts` pour re-exports
4. [ ] Build + Test
5. [ ] Paul contrôle
6. [ ] Supprimer les commentaires
7. [ ] Build + Test final
8. [ ] Commit

---

## Validation Paul

- [ ] Plan validé
- [ ] Exécution autorisée
