# useWithdraw.ts

**Chemin**: `apps/web/src/hooks/useWithdraw.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/WithdrawModal.tsx` | Composant |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useState`, `useCallback` | Hooks | `react` (externe) |
| `useAccount`, `usePublicClient`, `useWalletClient` | Hooks | `wagmi` (externe) |
| `formatEther`, `Hex` | Fonctions/Types | `viem` (externe) |
| `redeem`, `getMultiVaultAddressFromChainId` | Fonctions | `@0xintuition/protocol` (externe) |
| `currentIntuitionChain` | Config | `../config/wagmi` |
| `toast` | Fonction | `sonner` (externe) |

## Exports

| Export | Type |
|--------|------|
| `useWithdraw` | Hook fonction |
| `estimateWithdrawAmount` | Fonction utilitaire |
| `WithdrawStatus` | Type (`'idle' \| 'calculating' \| 'withdrawing' \| 'success' \| 'error'`) |
| `WithdrawError` | Interface |
| `WithdrawPreview` | Interface |
| `UseWithdrawResult` | Interface |

## Constantes

| Constante | Valeur | Description |
|-----------|--------|-------------|
| `POSITIVE_CURVE_ID` | `0n` | Curve ID pour vault FOR |
| `NEGATIVE_CURVE_ID` | `1n` | Curve ID pour vault AGAINST |

## useWithdraw() - Retourne

```typescript
{
  withdraw: (termId: Hex, shares: bigint, isPositive: boolean, minAssets?: bigint) => Promise<Hex | null>;
  status: WithdrawStatus;
  error: WithdrawError | null;
  isLoading: boolean;
  reset: () => void;
}
```

## estimateWithdrawAmount() - Paramètres/Retour

```typescript
// Paramètres
shares: bigint;           // Nombre de shares à retirer
totalShares: bigint;      // Total shares dans le vault
totalAssets: bigint;      // Total assets dans le vault
exitFeePercent: number;   // Frais de sortie (défaut 7%)

// Retourne
{
  shares: bigint;
  estimatedAssets: bigint;
  formattedAssets: string;
  exitFeePercent: number;
}
```

## Description

Hook pour retirer du TRUST d'un vault après avoir voté via INTUITION Protocol.

### Processus de retrait
1. Vérification wallet connecté et shares > 0
2. Signature de la transaction de redeem
3. Attente de confirmation
4. Notification succès/erreur via toast

### Notes techniques
- Utilise `redeem` de `@0xintuition/protocol`
- curveId = 0n pour FOR vault, 1n pour AGAINST vault
- Frais de sortie ~7% (configurable)
- minAssets = protection contre le slippage

### Gestion des erreurs
- `USER_REJECTED` : Transaction rejetée
- `INSUFFICIENT_GAS` : Pas assez d'ETH pour gas
- `NO_SHARES` : Pas de shares à retirer
- `SLIPPAGE_ERROR` : Slippage trop élevé
