# 07 - Extraire types voter + query GraphQL

## Objectif

1. Centraliser le type `TotemVoter` dans `types/voter.ts`
2. Déplacer la query `GET_TOTEM_VOTERS` vers `lib/graphql/queries.ts` (cohérence)

---

## 1. Nouveau fichier à créer

**Chemin** : `apps/web/src/types/voter.ts`

```typescript
/**
 * Voter-related types
 */

/**
 * Voter information for a totem
 */
export interface TotemVoter {
  address: string;
  amount: string;
  formattedAmount: string;
  isFor: boolean;
  createdAt: string;
  transactionHash: string;
}
```

---

## 2. Fichier lib/graphql/queries.ts - Ajouter à la fin

```typescript
/**
 * Get voters for a specific totem (triple)
 * Returns the last N voters ordered by creation date (most recent first)
 */
export const GET_TOTEM_VOTERS = gql`
  query GetTotemVoters($termId: String!, $limit: Int = 50) {
    deposits(
      where: {
        term_id: { _eq: $termId }
        vault_type: { _in: ["triple_positive", "triple_negative"] }
      }
      order_by: { created_at: desc }
      limit: $limit
    ) {
      id
      sender_id
      vault_type
      assets_after_fees
      shares
      created_at
      transaction_hash
    }
  }
`;
```

---

## 3. Fichiers sources à modifier

### A. hooks/useTotemVoters.ts

**Lignes 8-27 - À supprimer** (la query GraphQL) :
```typescript
const GET_TOTEM_VOTERS = gql`
  query GetTotemVoters($termId: String!, $limit: Int = 50) {
    deposits(
      where: {
        term_id: { _eq: $termId }
        vault_type: { _in: ["triple_positive", "triple_negative"] }
      }
      order_by: { created_at: desc }
      limit: $limit
    ) {
      id
      sender_id
      vault_type
      assets_after_fees
      shares
      created_at
      transaction_hash
    }
  }
`;
```

**Lignes 29-39 - À supprimer** (le type) :
```typescript
export interface TotemVoter {
  address: string;
  amount: string;
  formattedAmount: string;
  isFor: boolean;
  createdAt: string;
  transactionHash: string;
}
```

**Imports à modifier** :
```typescript
// Avant
import { useQuery, gql } from '@apollo/client';

// Après
import { useQuery } from '@apollo/client';
import { GET_TOTEM_VOTERS } from '../lib/graphql/queries';
import type { TotemVoter } from '../types/voter';
```

**Re-export à ajouter** (pour compatibilité) :
```typescript
export type { TotemVoter };
```

### B. hooks/index.ts

**Modifier l'export existant** :
```typescript
// Actuel
export { useTotemVoters, type TotemVoter } from './useTotemVoters';

// Nouveau
export { useTotemVoters } from './useTotemVoters';
export type { TotemVoter } from '../types/voter';
```

---

## 4. Étapes d'exécution

1. [ ] Créer `types/voter.ts`
2. [ ] Ajouter `GET_TOTEM_VOTERS` dans `lib/graphql/queries.ts`
3. [ ] Modifier `useTotemVoters.ts` : imports + COMMENTER ancien code (type + query)
4. [ ] Modifier `hooks/index.ts` pour re-export depuis types/
5. [ ] Build + Test
6. [ ] Paul contrôle
7. [ ] Supprimer les commentaires
8. [ ] Build + Test final
9. [ ] Commit

---

## Validation Paul

- [ ] Plan validé
- [ ] Exécution autorisée
