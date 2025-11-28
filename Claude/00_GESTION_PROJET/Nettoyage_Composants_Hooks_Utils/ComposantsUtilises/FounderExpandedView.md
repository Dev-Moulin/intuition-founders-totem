# FounderExpandedView.tsx

**Chemin**: `apps/web/src/components/FounderExpandedView.tsx`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `pages/HomePage.tsx` | Page |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useEffect`, `useState`, `useRef` | Hooks | `react` (externe) |
| `formatEther` | Fonction | `viem` (externe) |
| `useTranslation` | Hook | `react-i18next` (externe) |
| `FounderForHomePage` | Type | `../hooks/useFoundersForHomePage` |
| `useFounderSubscription` | Hook | `../hooks` (index) |
| `useAutoSubscriptionPause` | Hook | `../hooks` (index) |
| `getFounderImageUrl` | Fonction | `../utils/founderImage` |
| `VotePanel` | Composant | `./VotePanel` |
| `RefreshIndicator` | Composant | `./RefreshIndicator` |

## Exports

| Export | Type |
|--------|------|
| `FounderExpandedView` | Composant fonction |

## Description

Overlay plein écran avec layout splitté :
- **Gauche (1/4)** : Carte founder étendue
  - Photo, nom, bio
  - RefreshIndicator (temps réel WebSocket)
  - Stats (propositions, totem gagnant, score, atom ID)
  - Animation flash quand nouvelles données arrivent
- **Droite (3/4)** : VotePanel pour voter

## Fonctionnalités

- Fermeture via bouton X, backdrop click, ou touche Escape
- WebSocket subscription pour updates temps réel
- Auto-pause subscription quand tab est caché
- Animation de flash quand nouvelles données arrivent

## Props

| Prop | Type | Description |
|------|------|-------------|
| `founder` | `FounderForHomePage` | Données du founder |
| `onClose` | `() => void` | Callback pour fermer |
