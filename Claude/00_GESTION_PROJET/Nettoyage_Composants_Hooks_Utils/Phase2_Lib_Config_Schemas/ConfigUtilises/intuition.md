# intuition.ts

**Chemin**: `apps/web/src/config/intuition.ts`
**Status**: UTILISÉ

## Utilisé par

- `hooks/useIntuition.ts`
- `hooks/useProtocolConfig.ts`
- `hooks/useVote.ts`
- `hooks/useWithdraw.ts`
- `components/NetworkGuard.tsx`

## Description

Configuration INTUITION protocol (MultiVault, endpoints, chain).

## Exports

- `INTUITION_CONFIG` - Configuration complète du protocole
- `publicClient` - Client viem pour lecture blockchain
- `getApiUrl()` - URL de l'API backend (si utilisée)
