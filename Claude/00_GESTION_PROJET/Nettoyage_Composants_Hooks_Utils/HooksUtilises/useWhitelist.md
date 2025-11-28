# useWhitelist.ts

**Chemin**: `apps/web/src/hooks/useWhitelist.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/NetworkGuard.tsx` | Composant |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useReadContract` | Hook | `wagmi` (externe) |
| `base` | Chain | `wagmi/chains` (externe) |
| `Address` | Type | `viem` (externe) |

## Exports

| Export | Type |
|--------|------|
| `useWhitelist` | Hook fonction |

## Constantes

| Constante | Valeur | Description |
|-----------|--------|-------------|
| `NFT_CONTRACT` | `0x98e240326966e86ad6ec27e13409ffb748788f8c` | Adresse NFT sur Base Mainnet |

## Retourne

```typescript
{
  isEligible: boolean;    // True si possède au moins 1 NFT
  isLoading: boolean;     // État de chargement
  error: Error | null;    // Erreur si lecture contrat échoue
  refetch: () => void;    // Relancer la vérification
  balance: bigint;        // Nombre de NFTs
  contractAddress: string; // Adresse du contrat
}
```

## Description

Hook pour vérifier si un wallet possède un NFT INTUITION Founders sur Base Mainnet.
- Vérification cross-chain : NFT sur Base, app sur INTUITION L3
- Cache de 1 minute
- 2 retries en cas d'erreur
