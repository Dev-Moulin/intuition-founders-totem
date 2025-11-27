# useWithdraw

**Fichier source :** `apps/web/src/hooks/useWithdraw.ts`

---

## Ce qu'il fait

Gère le processus de retrait de TRUST depuis un claim vault.

Retourne :
- `withdraw(termId, shares, isPositive, minAssets?)` : exécute le retrait
- `status` : état (`'idle'`, `'calculating'`, `'withdrawing'`, `'success'`, `'error'`)
- `error` : erreur éventuelle avec code et message
- `isLoading` : true si un retrait est en cours
- `reset()` : remet à zéro l'état

---

## Fonctions exportées

- `estimateWithdrawAmount(shares, totalShares, totalAssets)` : calcule le montant estimé de TRUST à recevoir

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `wagmi` → `useAccount`, `usePublicClient`, `useWalletClient` | Accès wallet et blockchain |
| Librairie | `viem` → `formatEther`, `Hex` | Manipulation de valeurs |
| Package | `@0xintuition/protocol` → `redeem`, `getMultiVaultAddressFromChainId` | Fonction de retrait et adresse contrat |
| Librairie | `sonner` → `toast` | Notifications toast |
| Config | `currentIntuitionChain` | Chaîne INTUITION actuelle |

---

## Utilisé par

- `WithdrawModal`
