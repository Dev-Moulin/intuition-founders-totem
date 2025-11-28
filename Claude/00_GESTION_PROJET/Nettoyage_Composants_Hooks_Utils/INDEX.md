# Nettoyage Composants, Hooks et Utils

**Date**: 27/11/2025
**Branche**: `cleanup/remove-unused-code`
**Status**: DOCUMENTATION TERMINÉE - PRÊT POUR SUPPRESSION

---

## Résumé de l'analyse

| Type | Utilisés | Non-utilisés | Total |
|------|----------|--------------|-------|
| Composants | 13 | 14 | 27 |
| Hooks | 13 | 1 | 14 |
| Utils | 2 | 10 | 12 |
| **Total** | **28** | **25** | **53** |

---

## Documentation créée

### Composants Utilisés (13 fichiers)
📁 `ComposantsUtilises/`

### Hooks Utilisés (13 fichiers)
📁 `HooksUtilises/`

### Utils Utilisés (2 fichiers)
📁 `UtilsUtilises/`

### Fichiers À Supprimer (25 fichiers)
📁 `ASupprimer/LISTE.md`

---

## Fichiers à supprimer

### Groupe 1 : Composants non-utilisés (14 fichiers)

| Fichier | Status |
|---------|--------|
| `components/ErrorBoundary.tsx` | [ ] Commenté |
| `components/ErrorMessage.tsx` | [ ] Commenté |
| `components/InsufficientBalanceCard.tsx` | [ ] Commenté |
| `components/NetworkErrorCard.tsx` | [ ] Commenté |
| `components/NotEligible.tsx` | [ ] Commenté |
| `components/SafeHTML.tsx` | [ ] Commenté |
| `components/SafeHTML.test.tsx` | [ ] Commenté |
| `components/SuccessConfirmation.tsx` | [ ] Commenté |
| `components/SuccessConfirmation.test.tsx` | [ ] Commenté |
| `components/TransactionProgress.tsx` | [ ] Commenté |
| `components/TransactionProgress.test.tsx` | [ ] Commenté |
| `components/VoteErrorAlert.tsx` | [ ] Commenté |
| `components/WalletInfo.tsx` | [ ] Commenté |
| `components/WrongNetworkCard.tsx` | [ ] Commenté |

**Build Groupe 1**: [ ] OK
**Tests Groupe 1**: [ ] OK

### Groupe 2 : Utils non-utilisés (10 fichiers)

| Fichier | Status |
|---------|--------|
| `utils/auth.ts` | [ ] Commenté |
| `utils/auth.test.ts` | [ ] Commenté |
| `utils/csp.ts` | [ ] Commenté |
| `utils/localCache.ts` | [ ] Commenté |
| `utils/localCache.test.ts` | [ ] Commenté |
| `utils/sanitize.ts` | [ ] Commenté |
| `utils/sanitize.test.ts` | [ ] Commenté |
| `utils/errorFormatter.ts` | [ ] Commenté |
| `utils/errorFormatter.test.ts` | [ ] Commenté |
| `utils/README.md` | [ ] Supprimé |

**Build Groupe 2**: [ ] OK
**Tests Groupe 2**: [ ] OK

### Groupe 3 : Hooks non-utilisés (1 fichier)

| Fichier | Status |
|---------|--------|
| `hooks/useWalletAuth.ts` | [ ] Commenté |

**Build Groupe 3**: [ ] OK
**Tests Groupe 3**: [ ] OK

### Groupe 4 : Mise à jour des index (exports)

| Fichier | Action |
|---------|--------|
| `utils/index.ts` | [ ] Retirer exports obsolètes (localCache, errorFormatter) |
| `hooks/index.ts` | [ ] Retirer exports obsolètes (useWalletAuth types) |

**Build Groupe 4**: [ ] OK
**Tests Groupe 4**: [ ] OK

---

## Phase de suppression

| Action | Status |
|--------|--------|
| Build AVANT suppression | [ ] OK |
| Suppression physique des 25 fichiers | [ ] OK |
| Build APRÈS suppression | [ ] OK |
| Tests APRÈS suppression | [ ] OK |

---

## Validation finale

| Action | Status |
|--------|--------|
| Commit créé | [ ] OK |
| Push vers origin | [ ] OK |
| PR créée | [ ] OK |
| CI GitHub OK | [ ] OK |
| PR mergée | [ ] OK |

---

## Notes

- **WithdrawModal.tsx** était dans la liste initiale mais EST UTILISÉ (par ClaimExistsModal) → retiré de la liste
- ErrorBoundary et ErrorMessage utilisent errorFormatter → tous supprimés ensemble
- SafeHTML utilise sanitize → tous supprimés ensemble
- localCache n'est jamais importé (sauf son test)
- auth.ts est commenté dans useWalletAuth
- csp.ts n'a aucun import dans le projet
