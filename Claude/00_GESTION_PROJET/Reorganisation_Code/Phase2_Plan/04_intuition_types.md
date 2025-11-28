# 04 - Extraire types intuition vers types/intuition.ts

## Objectif

Centraliser les types liés aux opérations INTUITION protocol dans un fichier `types/intuition.ts`.

---

## 1. Nouveau fichier à créer

**Chemin** : `apps/web/src/types/intuition.ts`

```typescript
/**
 * Intuition protocol operation types
 */

import type { Hex } from 'viem';

/**
 * Type for categories.json config structure
 */
export interface CategoryConfig {
  predicate: {
    id: string;
    label: string;
    description: string;
    termId: string | null;
  };
  categories: Array<{
    id: string;
    label: string;
    name: string;
    termId: string | null;
  }>;
}

/**
 * Result of creating an atom
 */
export interface CreateAtomResult {
  uri: string;
  transactionHash: string;
  termId: Hex;
}

/**
 * Result of creating a triple (claim)
 */
export interface CreateTripleResult {
  transactionHash: string;
  tripleId: Hex;
  subjectId: Hex;
  predicateId: Hex;
  objectId: Hex;
}

/**
 * Data for founder atom creation
 */
export interface FounderData {
  name: string;
  shortBio: string;
  fullBio?: string;
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
  image?: string;
}

/**
 * Custom error for when a claim already exists
 * Contains the existing triple info so UI can redirect to vote page
 */
export class ClaimExistsError extends Error {
  public readonly termId: Hex;
  public readonly subjectLabel: string;
  public readonly predicateLabel: string;
  public readonly objectLabel: string;

  constructor(data: {
    termId: Hex;
    subjectLabel: string;
    predicateLabel: string;
    objectLabel: string;
  }) {
    super(
      `Ce claim existe déjà : "${data.subjectLabel} ${data.predicateLabel} ${data.objectLabel}". ` +
      `Vous pouvez voter dessus au lieu de le recréer.`
    );
    this.name = 'ClaimExistsError';
    this.termId = data.termId;
    this.subjectLabel = data.subjectLabel;
    this.predicateLabel = data.predicateLabel;
    this.objectLabel = data.objectLabel;
  }
}
```

---

## 2. Fichiers sources à modifier

### A. hooks/useIntuition.ts

**Lignes 15-84 - À supprimer** (après import) :
- `interface CategoryConfig` (L16-29)
- `export interface CreateAtomResult` (L34-38)
- `export interface CreateTripleResult` (L40-46)
- `export class ClaimExistsError` (L52-74)
- `export interface FounderData` (L76-84)

**Import à ajouter** :
```typescript
import type { CategoryConfig, CreateAtomResult, CreateTripleResult, FounderData } from '../types/intuition';
import { ClaimExistsError } from '../types/intuition';
```

**Note** : `ClaimExistsError` est une classe, pas un type - import normal, pas `import type`.

### B. hooks/index.ts

**Ajouter re-export** :
```typescript
export type { CategoryConfig, CreateAtomResult, CreateTripleResult, FounderData } from '../types/intuition';
export { ClaimExistsError } from '../types/intuition';
```

---

## 3. Étapes d'exécution

1. [ ] Créer `types/intuition.ts`
2. [ ] Ajouter imports dans `useIntuition.ts` + COMMENTER l'ancien code
3. [ ] Modifier `hooks/index.ts` pour re-export
4. [ ] Build + Test
5. [ ] Paul contrôle
6. [ ] Supprimer les commentaires
7. [ ] Build + Test final
8. [ ] Commit

---

## Validation Paul

- [ ] Plan validé
- [ ] Exécution autorisée
