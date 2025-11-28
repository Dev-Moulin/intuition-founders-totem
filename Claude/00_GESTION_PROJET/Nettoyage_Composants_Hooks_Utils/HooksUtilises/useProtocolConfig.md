# useProtocolConfig.ts

**Chemin**: `apps/web/src/hooks/useProtocolConfig.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/VotePanel.tsx` | Composant |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useEffect`, `useState` | Hooks | `react` (externe) |
| `usePublicClient` | Hook | `wagmi` (externe) |
| `formatEther`, `parseEther` | Fonctions | `viem` (externe) |
| `multiCallIntuitionConfigs`, `getMultiVaultAddressFromChainId` | Fonctions | `@0xintuition/protocol` (externe) |
| `currentIntuitionChain` | Config | `../config/wagmi` |

## Exports

| Export | Type |
|--------|------|
| `useProtocolConfig` | Hook fonction |
| `ProtocolConfig` | Interface |

## Retourne

```typescript
{
  config: ProtocolConfig | null;
  loading: boolean;
  error: Error | null;
  isDepositValid: (amount: string) => boolean;
  getTotalTripleCost: (depositAmount: string) => { totalWei: string; formatted: string } | null;
}
```

## Interface ProtocolConfig

```typescript
{
  // Coûts de base (wei)
  atomCost: string;
  tripleCost: string;
  minDeposit: string;

  // Coûts formatés (TRUST)
  formattedAtomCost: string;
  formattedTripleCost: string;
  formattedMinDeposit: string;

  // Frais (basis points, ex: 700 = 7%)
  entryFee: string;
  exitFee: string;
  protocolFee: string;
  feeDenominator: string;

  // Frais formatés (pourcentage)
  formattedEntryFee: string;
  formattedExitFee: string;
  formattedProtocolFee: string;
}
```

## Description

Hook pour récupérer la configuration du protocole INTUITION depuis le contrat MultiVault.

### Données récupérées
- **Coûts de base** : atomCost, tripleCost, minDeposit (en wei et formaté)
- **Frais** : entryFee, exitFee, protocolFee (en basis points et pourcentage)

### Helpers fournis
- `isDepositValid(amount)` : Vérifie si le montant est >= minDeposit
- `getTotalTripleCost(deposit)` : Calcule tripleCost + depositAmount

### Notes
- Nettoie les valeurs formatées (remove trailing zeros)
- Utilise `multiCallIntuitionConfigs` de `@0xintuition/protocol`
