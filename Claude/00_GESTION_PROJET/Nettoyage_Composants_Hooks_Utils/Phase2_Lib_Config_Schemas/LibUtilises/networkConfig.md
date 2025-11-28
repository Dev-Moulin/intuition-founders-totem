# networkConfig.ts

**Chemin**: `apps/web/src/lib/networkConfig.ts`
**Status**: UTILISÉ

## Utilisé par

- `hooks/useNetwork.ts`
- `components/NetworkGuard.tsx`
- `config/intuition.ts`
- `config/wagmi.ts`

## Description

Configuration réseau (testnet/mainnet) avec endpoints GraphQL, RPC et explorateur.

## Exports

- `getCurrentNetwork()` - Retourne le réseau actuel (testnet/mainnet)
- `getNetworkConfig()` - Retourne la configuration complète du réseau
- `setNetwork()` - Change le réseau actuel
