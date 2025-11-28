# Fichiers à supprimer

**Date d'analyse**: 27/11/2025
**Méthode**: Comparaison entre fichiers existants et fichiers documentés comme utilisés

---

## Récapitulatif

| Type | Utilisés | Non-utilisés | Total |
|------|----------|--------------|-------|
| Composants | 13 | 12 | 25 |
| Hooks | 13 | 1 | 14 |
| Utils | 2 | 8 | 10 |
| **Total** | **28** | **21** | **49** |

---

## COMPOSANTS À SUPPRIMER (12 + tests)

### Composants utilisés (à GARDER) :
1. Layout.tsx
2. Header.tsx
3. Footer.tsx
4. ConnectButton.tsx
5. NetworkSwitch.tsx
6. LanguageSwitcher.tsx
7. NetworkGuard.tsx
8. FounderHomeCard.tsx
9. FounderExpandedView.tsx
10. VotePanel.tsx
11. RefreshIndicator.tsx
12. ClaimExistsModal.tsx
13. WithdrawModal.tsx

### Composants NON UTILISÉS (à supprimer) :

| Fichier | Raison |
|---------|--------|
| `ErrorBoundary.tsx` | Aucun import trouvé |
| `ErrorMessage.tsx` | Aucun import trouvé |
| `InsufficientBalanceCard.tsx` | Aucun import trouvé |
| `NetworkErrorCard.tsx` | Aucun import trouvé |
| `NotEligible.tsx` | Aucun import trouvé |
| `SafeHTML.tsx` | Aucun import trouvé |
| `SafeHTML.test.tsx` | Test pour composant supprimé |
| `SuccessConfirmation.tsx` | Aucun import trouvé |
| `SuccessConfirmation.test.tsx` | Test pour composant supprimé |
| `TransactionProgress.tsx` | Aucun import trouvé |
| `TransactionProgress.test.tsx` | Test pour composant supprimé |
| `VoteErrorAlert.tsx` | Aucun import trouvé |
| `WalletInfo.tsx` | Aucun import trouvé |
| `WrongNetworkCard.tsx` | Aucun import trouvé |

**Total composants à supprimer: 14 fichiers**

---

## HOOKS À SUPPRIMER (1)

### Hooks utilisés (à GARDER) :
1. useFoundersForHomePage.ts
2. useFounderProposals.ts
3. useFounderSubscription.ts
4. useIntuition.ts
5. useNetwork.ts
6. useProtocolConfig.ts
7. useVote.ts
8. useWhitelist.ts
9. useWindowFocus.ts
10. useWithdraw.ts
11. useUserVotes.ts
12. useVoteStats.ts
13. useTotemVoters.ts

### Hooks NON UTILISÉS (à supprimer) :

| Fichier | Raison |
|---------|--------|
| `useWalletAuth.ts` | Export commenté dans index.ts, inutilisé |

**Total hooks à supprimer: 1 fichier**

---

## UTILS À SUPPRIMER (8)

### Utils utilisés (à GARDER) :
1. aggregateVotes.ts
2. founderImage.ts

### Utils NON UTILISÉS (à supprimer) :

| Fichier | Raison |
|---------|--------|
| `auth.ts` | Import commenté dans useWalletAuth (lui-même inutilisé) |
| `auth.test.ts` | Test pour util supprimé |
| `csp.ts` | Aucun import trouvé |
| `localCache.ts` | Seulement importé par son propre test |
| `localCache.test.ts` | Test pour util supprimé |
| `sanitize.ts` | Seulement utilisé par SafeHTML (composant supprimé) |
| `sanitize.test.ts` | Test pour util supprimé |
| `errorFormatter.ts` | Seulement utilisé par ErrorBoundary/ErrorMessage (composants supprimés) |
| `errorFormatter.test.ts` | Test pour util supprimé |
| `README.md` | Documentation pour utils supprimés |

**Total utils à supprimer: 10 fichiers**

---

## FICHIERS INDEX À METTRE À JOUR

| Fichier | Action |
|---------|--------|
| `hooks/index.ts` | Retirer exports des hooks supprimés |
| `utils/index.ts` | Retirer exports des utils supprimés |

---

## TOTAL FICHIERS À SUPPRIMER: 25 fichiers

1. components/ErrorBoundary.tsx
2. components/ErrorMessage.tsx
3. components/InsufficientBalanceCard.tsx
4. components/NetworkErrorCard.tsx
5. components/NotEligible.tsx
6. components/SafeHTML.tsx
7. components/SafeHTML.test.tsx
8. components/SuccessConfirmation.tsx
9. components/SuccessConfirmation.test.tsx
10. components/TransactionProgress.tsx
11. components/TransactionProgress.test.tsx
12. components/VoteErrorAlert.tsx
13. components/WalletInfo.tsx
14. components/WrongNetworkCard.tsx
15. hooks/useWalletAuth.ts
16. utils/auth.ts
17. utils/auth.test.ts
18. utils/csp.ts
19. utils/localCache.ts
20. utils/localCache.test.ts
21. utils/sanitize.ts
22. utils/sanitize.test.ts
23. utils/errorFormatter.ts
24. utils/errorFormatter.test.ts
25. utils/README.md
