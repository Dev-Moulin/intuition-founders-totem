# useVote

**Fichier source :** `apps/web/src/hooks/useVote.ts`

---

## Ce qu'il fait

Gère le processus de vote sur un claim existant.

Sur INTUITION L3, TRUST est le token natif (comme ETH), donc pas besoin d'approve ERC20 - on envoie directement avec `msg.value`.

Retourne :
- `vote(claimId, amount, isFor)` : exécute le vote (FOR ou AGAINST)
- `status` : état du vote (`'idle'`, `'checking'`, `'depositing'`, `'success'`, `'error'`)
- `error` : erreur éventuelle avec code, message et étape
- `isLoading` : true si un vote est en cours
- `currentStep` / `totalSteps` : progression du vote
- `reset()` : remet à zéro l'état

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `wagmi` → `useAccount`, `usePublicClient`, `useWalletClient` | Accès wallet et blockchain |
| Librairie | `viem` → `parseEther`, `Hex`, `Address` | Manipulation de valeurs |
| Package | `@0xintuition/sdk` | Adresse du contrat MultiVault |
| Package | `@0xintuition/protocol` | ABI du contrat |
| Librairie | `sonner` → `toast` | Notifications toast |
| Config | `currentIntuitionChain` | Chaîne INTUITION actuelle |

---

## Utilisé par

- `ClaimExistsModal` (pour voter sur un claim existant)
