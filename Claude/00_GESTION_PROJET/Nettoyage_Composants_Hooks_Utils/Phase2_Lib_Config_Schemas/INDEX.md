# Nettoyage Phase 2 : lib/, config/, schemas/, types/, i18n/, test/

**Date**: 27/11/2025
**Branche**: `cleanup/remove-unused-code` (suite)
**Status**: EN COURS - DOCUMENTATION

---

## Résumé de l'analyse

| Dossier | Total | Utilisés | Non-utilisés |
|---------|-------|----------|--------------|
| lib/ | 6 | 6 | 0 |
| config/ | 3 | 3 | 0 |
| schemas/ | 7 | 0 | 7 |
| types/ | 1 | 1 | 0 |
| i18n/ | 3 | 3 | 0 |
| test/ | 5 | 3 | 2 |
| **Total** | **25** | **16** | **9** |

---

## Documentation créée

### Lib Utilisés (6 fichiers)
:file_folder: `LibUtilises/`

### Config Utilisés (3 fichiers)
:file_folder: `ConfigUtilises/`

### Types Utilisés (1 fichier)
:file_folder: `TypesUtilises/`

### I18n Utilisés (3 fichiers)
:file_folder: `I18nUtilises/`

### Test Utilisés (3 fichiers)
:file_folder: `TestUtilises/`

### Fichiers À Supprimer (9 fichiers)
:file_folder: `ASupprimer/LISTE.md`

---

## Fichiers à supprimer

### Groupe 1 : Schemas non-utilisés (7 fichiers - TOUT le dossier)

| Fichier | Status |
|---------|--------|
| `schemas/common.schema.ts` | [ ] Commenté |
| `schemas/moderation.schema.ts` | [ ] Commenté |
| `schemas/proposal.schema.ts` | [ ] Commenté |
| `schemas/vote.schema.ts` | [ ] Commenté |
| `schemas/index.ts` | [ ] Commenté |
| `schemas/schemas.test.ts` | [ ] Commenté |
| `schemas/proposal.schema.test.ts` | [ ] Commenté |

**Build Groupe 1**: [ ] OK
**Tests Groupe 1**: [ ] OK

### Groupe 2 : Test non-utilisés (2 fichiers)

| Fichier | Status |
|---------|--------|
| `test/wagmiMocks.ts` | [ ] Commenté |
| `test/utils.tsx` | [ ] Commenté |

**Build Groupe 2**: [ ] OK
**Tests Groupe 2**: [ ] OK

---

## Phase de suppression

| Action | Status |
|--------|--------|
| Build AVANT suppression | [ ] OK |
| Suppression physique des 9 fichiers | [ ] OK |
| Build APRÈS suppression | [ ] OK |
| Tests APRÈS suppression | [ ] OK |

---

## Validation finale

| Action | Status |
|--------|--------|
| Commit créé | [ ] OK |
| Push vers origin | [ ] OK |
| CI GitHub OK | [ ] OK |
| PR mergée (par Paul) | [ ] OK |

---

## Notes

- **schemas/** : Les schemas Zod ont été créés mais jamais intégrés. Aucun composant/hook n'importe depuis `schemas/`.
- **test/wagmiMocks.ts** : Mock créé mais jamais utilisé (les tests utilisent d'autres mocks inline).
- **test/utils.tsx** : Wrapper render créé mais les tests n'utilisent pas le custom render.
- **test/setup.ts** : UTILISÉ par vitest.config.ts
- **test/wagmi.ts** : UTILISÉ par blockchain.test.ts
- **test/blockchain.test.ts** : Test actif (4 tests, 2 skipped car besoin Anvil)
