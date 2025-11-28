# NetworkGuard.tsx

**Chemin**: `apps/web/src/components/NetworkGuard.tsx`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `router.tsx` | Router principal |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `ReactNode` | Type | `react` (externe) |
| `useAccount`, `useChainId`, `useSwitchChain` | Hooks | `wagmi` (externe) |
| `currentIntuitionChain` | Config | `../config/wagmi` |
| `getCurrentNetwork` | Fonction | `../lib/networkConfig` |
| `useWhitelist` | Hook | `../hooks/useWhitelist` |

## Exports

| Export | Type |
|--------|------|
| `NetworkGuard` | Composant fonction |

## Description

Composant garde qui vérifie :
1. **Réseau correct** : Si l'utilisateur n'est pas sur le bon réseau INTUITION L3, affiche un message d'erreur avec bouton pour switcher
2. **Éligibilité** : Si connecté, vérifie que l'utilisateur possède un NFT INTUITION Founders (via useWhitelist)
3. Si tout est OK, affiche les enfants (children)

## États affichés

- Mauvais réseau → Message + bouton "Switch to INTUITION"
- Vérification en cours → Message "Vérification en cours..."
- Non éligible → Message "Non éligible" + adresse contrat NFT
- OK → Affiche le contenu
