# ConnectButton.tsx

**Chemin**: `apps/web/src/components/ConnectButton.tsx`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/Header.tsx` | Composant |
| `pages/HomePage.tsx` | Page |
| `components/VotePanel.tsx` | Composant |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `ConnectButton` | Composant | `@rainbow-me/rainbowkit` (externe) |

## Exports

| Export | Type |
|--------|------|
| `WalletConnectButton` | Composant fonction |

## Description

Bouton de connexion wallet personnalisé utilisant RainbowKit.
- État déconnecté : affiche "Connect Wallet"
- Mauvais réseau : affiche "Wrong network"
- Connecté : affiche l'adresse du wallet (displayName)
