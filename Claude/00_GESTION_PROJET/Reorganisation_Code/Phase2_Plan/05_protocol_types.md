# 05 - Extraire types protocol vers types/protocol.ts

## Objectif

Centraliser les types liés à la configuration du protocole INTUITION dans un fichier `types/protocol.ts`.

---

## 1. Nouveau fichier à créer

**Chemin** : `apps/web/src/types/protocol.ts`

```typescript
/**
 * Protocol configuration types
 */

/**
 * Configuration du protocole INTUITION
 */
export interface ProtocolConfig {
  // Coûts de base (wei)
  atomCost: string;
  tripleCost: string;
  minDeposit: string;

  // Coûts formatés (TRUST)
  formattedAtomCost: string;
  formattedTripleCost: string;
  formattedMinDeposit: string;

  // Frais (basis points, ex: 700 = 7%)
  entryFee: string;
  exitFee: string;
  protocolFee: string;
  feeDenominator: string;

  // Frais formatés (pourcentage)
  formattedEntryFee: string;
  formattedExitFee: string;
  formattedProtocolFee: string;
}
```

---

## 2. Fichiers sources à modifier

### A. hooks/useProtocolConfig.ts

**Lignes 10-34 - À supprimer** (après import) :
```typescript
export interface ProtocolConfig {
  // ... tout le contenu
}
```

**Import à ajouter** :
```typescript
import type { ProtocolConfig } from '../types/protocol';
```

**Re-export à ajouter** :
```typescript
export type { ProtocolConfig };
```

### B. hooks/index.ts

**Modifier l'export existant** (ligne ~80) :
```typescript
// Actuel
export { useProtocolConfig, type ProtocolConfig } from './useProtocolConfig';

// Nouveau
export { useProtocolConfig } from './useProtocolConfig';
export type { ProtocolConfig } from '../types/protocol';
```

---

## 3. Étapes d'exécution

1. [ ] Créer `types/protocol.ts`
2. [ ] Ajouter import dans `useProtocolConfig.ts` + COMMENTER l'ancien code
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
