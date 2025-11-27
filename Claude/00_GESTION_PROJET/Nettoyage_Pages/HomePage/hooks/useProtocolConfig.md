# useProtocolConfig

**Fichier source :** `apps/web/src/hooks/useProtocolConfig.ts`

---

## Ce qu'il fait

Récupère la configuration du protocole INTUITION depuis le contrat MultiVault.

Retourne :
- `config` : objet avec les coûts et frais du protocole
  - `atomCost`, `tripleCost`, `minDeposit` (en wei)
  - `formattedAtomCost`, `formattedTripleCost`, `formattedMinDeposit` (en TRUST)
  - `entryFee`, `exitFee`, `protocolFee` (en basis points)
  - `formattedEntryFee`, `formattedExitFee`, `formattedProtocolFee` (en %)
- `loading` : true pendant le chargement
- `error` : erreur éventuelle
- `isDepositValid(amount)` : vérifie si un montant est valide (>= minDeposit)
- `getTotalTripleCost(depositAmount)` : calcule le coût total pour créer un triple

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `wagmi` → `usePublicClient` | Client pour lire la blockchain |
| Librairie | `viem` → `formatEther`, `parseEther` | Conversion de montants |
| Package | `@0xintuition/protocol` | Config et ABI du protocole |
| Config | `currentIntuitionChain` | Chaîne INTUITION actuelle (testnet/mainnet) |

---

## Utilisé par

- `VotePanel` (pour afficher les coûts et valider les montants)
