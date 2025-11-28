# 03 - Extraire types withdraw vers types/withdraw.ts

## Objectif

Centraliser les types liés aux withdrawals dans un fichier `types/withdraw.ts`.

---

## 1. Nouveau fichier à créer

**Chemin** : `apps/web/src/types/withdraw.ts`

```typescript
/**
 * Withdraw-related types
 */

/**
 * Withdraw status states
 */
export type WithdrawStatus =
  | 'idle'
  | 'calculating'
  | 'withdrawing'
  | 'success'
  | 'error';

/**
 * Withdraw error with details
 */
export interface WithdrawError {
  code: string;
  message: string;
}

/**
 * Preview of withdrawal amounts
 */
export interface WithdrawPreview {
  shares: bigint;
  estimatedAssets: bigint;
  formattedAssets: string;
  exitFeePercent: number;
}
```

---

## 2. Fichiers sources à modifier

### A. hooks/useWithdraw.ts

**Lignes 11-34 - À commenter puis supprimer** :
```typescript
export type WithdrawStatus =
  | 'idle'
  | 'calculating'
  | 'withdrawing'
  | 'success'
  | 'error';

export interface WithdrawError {
  code: string;
  message: string;
}

export interface WithdrawPreview {
  shares: bigint;
  estimatedAssets: bigint;
  formattedAssets: string;
  exitFeePercent: number;
}
```

**Import à ajouter** :
```typescript
import type { WithdrawStatus, WithdrawError, WithdrawPreview } from '../types/withdraw';
```

**Note** : `UseWithdrawResult` (L39-50) reste local au hook.

### B. hooks/index.ts

**Modifier le re-export** pour pointer vers `types/withdraw.ts`.

---

## 3. Étapes d'exécution

1. [ ] Créer `types/withdraw.ts`
2. [ ] Ajouter import dans `useWithdraw.ts` + COMMENTER l'ancien code
3. [ ] Modifier `hooks/index.ts` pour re-export depuis types/
4. [ ] Build + Test
5. [ ] Paul contrôle
6. [ ] Supprimer les commentaires
7. [ ] Build + Test final
8. [ ] Commit

---

## Validation Paul

- [ ] Plan validé
- [ ] Exécution autorisée
