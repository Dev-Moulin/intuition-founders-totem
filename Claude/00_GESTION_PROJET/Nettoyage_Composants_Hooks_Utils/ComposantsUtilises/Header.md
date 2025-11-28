# Header.tsx

**Chemin**: `apps/web/src/components/Header.tsx`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/Layout.tsx` | Composant |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `Link`, `useLocation` | Composant/Hook | `react-router-dom` (externe) |
| `useAccount` | Hook | `wagmi` (externe) |
| `useTranslation` | Hook | `react-i18next` (externe) |
| `WalletConnectButton` | Composant | `./ConnectButton` |
| `NetworkSwitch` | Composant | `./NetworkSwitch` |
| `LanguageSwitcher` | Composant | `./LanguageSwitcher` |

## Exports

| Export | Type |
|--------|------|
| `Header` | Composant fonction |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `VITE_ADMIN_WALLET_ADDRESS` | Adresse wallet admin pour afficher lien Admin |

## Description

Header principal de l'application avec :
- Logo/Titre avec lien vers home
- Navigation (liens commentés pour pages supprimées)
- Lien Admin (visible uniquement pour l'admin wallet)
- LanguageSwitcher (sélecteur de langue)
- NetworkSwitch (switch mainnet/testnet)
- WalletConnectButton (connexion wallet)
