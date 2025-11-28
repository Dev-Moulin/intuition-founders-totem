# 02 - Extraire types vote vers types/vote.ts

## Objectif

Centraliser les types liés aux votes dans un seul fichier `types/vote.ts`.

---

## 1. Nouveau fichier à créer

**Chemin** : `apps/web/src/types/vote.ts`

```typescript
/**
 * Vote-related types
 */

/**
 * Status of a vote operation
 */
export type VoteStatus =
  | 'idle'
  | 'checking'
  | 'depositing'
  | 'success'
  | 'error';

/**
 * Error during vote operation
 */
export interface VoteError {
  code: string;
  message: string;
  step: 'checking' | 'depositing';
}
```

---

## 2. Fichiers sources à modifier

### A. hooks/useVote.ts

**Lignes 9-20 - À commenter puis supprimer** :
```typescript
export type VoteStatus =
  | 'idle'
  | 'checking'
  | 'depositing'
  | 'success'
  | 'error';

export interface VoteError {
  code: string;
  message: string;
  step: 'checking' | 'depositing';
}
```

**Import à ajouter** :
```typescript
import type { VoteStatus, VoteError } from '../types/vote';
```

**Note** : `UseVoteResult` (L22-30) reste local au hook car c'est le type de retour du hook.

---

## 3. Fichiers NON modifiés

### hooks/useUserVotes.ts

`VoteWithDetails` (L19-22) dépend de `Deposit` de `lib/graphql/types`.
On le garde dans le hook pour l'instant car :
1. Il étend un type GraphQL
2. Il n'est utilisé que dans ce fichier

→ À revoir plus tard si besoin de partage.

---

## 4. Étapes d'exécution

1. [ ] Créer `types/vote.ts`
2. [ ] Ajouter import dans `useVote.ts` + COMMENTER l'ancien code
3. [ ] Build + Test
4. [ ] Paul contrôle
5. [ ] Supprimer les commentaires
6. [ ] Build + Test final
7. [ ] Commit

---

## Validation Paul

- [ ] Plan validé
- [ ] Exécution autorisée
