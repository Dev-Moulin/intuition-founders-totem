# NetworkSwitch.tsx

**Chemin**: `apps/web/src/components/NetworkSwitch.tsx`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/Header.tsx` | Composant |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useAccount` | Hook | `wagmi` (externe) |
| `useNetwork` | Hook | `../hooks/useNetwork` |

## Exports

| Export | Type |
|--------|------|
| `NetworkSwitch` | Composant fonction |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `VITE_ADMIN_WALLET_ADDRESS` | Wallet autorisé à voir/utiliser le switch |

## Description

Bouton pill pour switcher entre Testnet et Mainnet.
- Visible uniquement pour le wallet admin autorisé
- Rouge pour Testnet, Vert pour Mainnet
- Utilise le hook `useNetwork` pour la logique
