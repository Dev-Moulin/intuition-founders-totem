# Fichiers à supprimer - Phase 2

**Date d'analyse**: 27/11/2025
**Méthode**: Recherche des imports dans le codebase

---

## Récapitulatif

| Type | Utilisés | Non-utilisés | Total |
|------|----------|--------------|-------|
| lib/ | 6 | 0 | 6 |
| config/ | 3 | 0 | 3 |
| schemas/ | 0 | 7 | 7 |
| types/ | 1 | 0 | 1 |
| i18n/ | 3 | 0 | 3 |
| test/ | 3 | 2 | 5 |
| **Total** | **16** | **9** | **25** |

---

## SCHEMAS À SUPPRIMER (7 fichiers - TOUT le dossier)

Les schemas Zod ont été créés mais **jamais intégrés** dans l'application.
Aucun composant, hook ou page n'importe depuis `schemas/`.

| Fichier | Raison |
|---------|--------|
| `schemas/common.schema.ts` | Exporté dans index.ts mais jamais importé ailleurs |
| `schemas/moderation.schema.ts` | Exporté dans index.ts mais jamais importé ailleurs |
| `schemas/proposal.schema.ts` | Seulement utilisé par son propre test |
| `schemas/vote.schema.ts` | Exporté dans index.ts mais jamais importé ailleurs |
| `schemas/index.ts` | Barrel file, aucun import trouvé dans le projet |
| `schemas/schemas.test.ts` | Test pour schemas non utilisés |
| `schemas/proposal.schema.test.ts` | Test pour schema non utilisé |

**Total schemas à supprimer: 7 fichiers**

---

## TEST À SUPPRIMER (2 fichiers)

| Fichier | Raison |
|---------|--------|
| `test/wagmiMocks.ts` | Mock créé mais jamais importé (tests utilisent mocks inline) |
| `test/utils.tsx` | Wrapper render créé mais jamais utilisé |

**Total test à supprimer: 2 fichiers**

---

## TOTAL FICHIERS À SUPPRIMER: 9 fichiers

1. `schemas/common.schema.ts`
2. `schemas/moderation.schema.ts`
3. `schemas/proposal.schema.ts`
4. `schemas/vote.schema.ts`
5. `schemas/index.ts`
6. `schemas/schemas.test.ts`
7. `schemas/proposal.schema.test.ts`
8. `test/wagmiMocks.ts`
9. `test/utils.tsx`

---

## Chemins complets

```
apps/web/src/schemas/common.schema.ts
apps/web/src/schemas/moderation.schema.ts
apps/web/src/schemas/proposal.schema.ts
apps/web/src/schemas/vote.schema.ts
apps/web/src/schemas/index.ts
apps/web/src/schemas/schemas.test.ts
apps/web/src/schemas/proposal.schema.test.ts
apps/web/src/test/wagmiMocks.ts
apps/web/src/test/utils.tsx
```

---

## Notes

- **schemas/** : Tout le dossier peut être supprimé car aucune validation Zod n'est utilisée en production
- **test/setup.ts** : GARDÉ - utilisé par vitest.config.ts
- **test/wagmi.ts** : GARDÉ - utilisé par blockchain.test.ts
- **test/blockchain.test.ts** : GARDÉ - test actif (4 tests)
