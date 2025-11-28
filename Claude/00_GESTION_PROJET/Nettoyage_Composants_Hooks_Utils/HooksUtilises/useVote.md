# useVote.ts

**Chemin**: `apps/web/src/hooks/useVote.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/ClaimExistsModal.tsx` | Composant |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useState`, `useCallback`, `useRef` | Hooks | `react` (externe) |
| `useAccount`, `usePublicClient`, `useWalletClient` | Hooks | `wagmi` (externe) |
| `parseEther`, `Hex`, `Address` | Fonctions/Types | `viem` (externe) |
| `getMultiVaultAddressFromChainId` | Fonction | `@0xintuition/sdk` (externe) |
| `MultiVaultAbi` | ABI | `@0xintuition/protocol` (externe) |
| `currentIntuitionChain` | Config | `../config/wagmi` |
| `toast` | Fonction | `sonner` (externe) |

## Exports

| Export | Type |
|--------|------|
| `useVote` | Hook fonction |
| `VoteStatus` | Type (`'idle' \| 'checking' \| 'depositing' \| 'success' \| 'error'`) |
| `VoteError` | Interface |
| `UseVoteResult` | Interface |

## Retourne

```typescript
{
  vote: (claimId: Hex, amount: string, isFor: boolean) => Promise<void>;
  status: VoteStatus;
  error: VoteError | null;
  isLoading: boolean;
  currentStep: number;
  totalSteps: number;
  reset: () => void;
}
```

## Description

Hook pour gérer le processus de vote sur un claim existant via INTUITION Protocol.

### Processus de vote
1. **checking** : Vérification de la balance TRUST
2. **depositing** : Signature et envoi de la transaction de dépôt

### Notes techniques
- TRUST est le token NATIF sur INTUITION L3 (pas d'approve ERC20 nécessaire)
- Utilise `depositBatch` sur le contrat MultiVault
- curveId = 1n pour la bonding curve par défaut
- **Limitation** : Les votes AGAINST ne sont pas encore supportés (nécessite counter_term_id)

### Gestion des erreurs
- `USER_REJECTED` : Transaction rejetée par l'utilisateur
- `INSUFFICIENT_BALANCE` : Balance TRUST insuffisante
- Messages d'erreur affichés via toast (sonner)
