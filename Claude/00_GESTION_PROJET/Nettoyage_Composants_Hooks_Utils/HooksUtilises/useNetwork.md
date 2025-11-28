# useNetwork.ts

**Chemin**: `apps/web/src/hooks/useNetwork.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/NetworkSwitch.tsx` | Composant |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useState`, `useEffect`, `useCallback` | Hooks | `react` (externe) |
| `Network`, `getCurrentNetwork`, `setCurrentNetwork`, `getNetworkConfig` | Types/Fonctions | `../lib/networkConfig` |

## Exports

| Export | Type |
|--------|------|
| `useNetwork` | Hook fonction |

## Retourne

```typescript
{
  network: Network;           // 'testnet' | 'mainnet'
  config: NetworkConfig;      // Configuration du réseau actuel
  switchNetwork: (network) => void;  // Change de réseau
  toggleNetwork: () => void;  // Bascule entre testnet/mainnet
  isTestnet: boolean;
  isMainnet: boolean;
}
```

## Description

Hook pour gérer le switch entre Testnet et Mainnet INTUITION.
- Stocke le réseau en localStorage
- Force un reload de page pour réinitialiser Apollo Client avec les nouveaux endpoints
