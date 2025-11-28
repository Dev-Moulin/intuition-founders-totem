# useIntuition.ts

**Chemin**: `apps/web/src/hooks/useIntuition.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/VotePanel.tsx` | Composant |
| `pages/AdminAuditPage.tsx` | Page |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useCallback` | Hook | `react` (externe) |
| `usePublicClient`, `useWalletClient` | Hooks | `wagmi` (externe) |
| `useApolloClient` | Hook | `@apollo/client` (externe) |
| `createAtomFromString`, `createAtomFromThing`, `getMultiVaultAddressFromChainId` | Fonctions | `@0xintuition/sdk` (externe) |
| `parseEther`, `formatEther`, `Hex` | Fonctions/Types | `viem` (externe) |
| `multiCallIntuitionConfigs`, `MultiVaultAbi` | Fonctions/ABI | `@0xintuition/protocol` (externe) |
| `currentIntuitionChain` | Config | `../config/wagmi` |
| `GET_ATOMS_BY_LABELS`, `GET_TRIPLE_BY_ATOMS` | Queries | `../lib/graphql/queries` |
| `categoriesConfig` | Data | `packages/shared/src/data/categories.json` |
| `getFounderImageUrl` | Fonction | `../utils/founderImage` |

## Exports

| Export | Type |
|--------|------|
| `useIntuition` | Hook fonction |
| `ClaimExistsError` | Classe Error |
| `CreateAtomResult` | Interface |
| `CreateTripleResult` | Interface |
| `FounderData` | Interface |
| `getFounderImageUrl` | Re-export de `../utils/founderImage` |

## Retourne

```typescript
{
  createAtom: (value: string, depositAmount?: string) => Promise<CreateAtomResult>;
  createFounderAtom: (founder: FounderData, depositAmount?: string) => Promise<CreateAtomResult>;
  createTriple: (subjectId, predicateId, objectId, depositAmount) => Promise<CreateTripleResult>;
  createClaim: (params) => Promise<{ triple, predicateCreated, objectCreated }>;
  createClaimWithDescription: (params) => Promise<{ triple, predicateCreated, objectCreated }>;
  createClaimWithCategory: (params) => Promise<{ triple, categoryTriple, ... }>;
  getOrCreateAtom: (value, depositAmount?) => Promise<{ termId, created }>;
  findTriple: (subjectId, predicateId, objectId) => Promise<{ termId, labels... } | null>;
  isReady: boolean;
}
```

## Description

Hook principal pour interagir avec le protocole INTUITION. Permet de créer des atoms, triples et claims.

### Fonctionnalités principales

1. **createAtom** - Crée un atom simple depuis une string
2. **createFounderAtom** - Crée un atom avec métadonnées (name, description, image, url)
3. **createTriple** - Crée un triple depuis 3 atom IDs
4. **createClaim** - Crée un claim complet (get or create atoms + vérif triple existe)
5. **createClaimWithDescription** - Comme createClaim mais avec description sur l'objet
6. **createClaimWithCategory** - Crée 2 triples : vote + catégorie (système OFC:)
7. **getOrCreateAtom** - Vérifie si atom existe (GraphQL) sinon le crée
8. **findTriple** - Recherche un triple existant

### Classes

**ClaimExistsError** - Lancée quand un claim existe déjà. Contient :
- `termId` : ID du triple existant
- `subjectLabel`, `predicateLabel`, `objectLabel` : Labels pour affichage

### Notes techniques
- Utilise `createTriples` directement sur MultiVault (pas le SDK)
- V2 : msg.value = sum(assets) où assets inclut le base cost
- Vérifie minDeposit et balance avant création
- Re-export `getFounderImageUrl` pour compatibilité (déplacé vers utils)
