# RefreshIndicator.tsx

**Chemin**: `apps/web/src/components/RefreshIndicator.tsx`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/FounderExpandedView.tsx` | Composant |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `React` | Module | `react` (externe) |
| `formatTimeSinceUpdate` | Fonction | `../hooks/useFounderSubscription` |

## Exports

| Export | Type |
|--------|------|
| `RefreshIndicator` | Composant fonction |
| `RefreshIndicatorCompact` | Composant fonction (version dot only) |
| `default` | RefreshIndicator |

## Description

Indicateur visuel montrant le statut de la subscription WebSocket et le temps depuis la dernière mise à jour.

### États affichés
- **Bleu + "Connexion..."** : Chargement initial
- **Vert + "à l'instant"** : Vient d'être mis à jour
- **Vert + "il y a Xs"** : Connecté
- **Jaune + "En pause"** : Subscription en pause (onglet caché)
- **Rouge + "Déconnecté"** : Erreur de connexion

### Animations
- Pulse animation quand update < 3 secondes
- Badge "LIVE" quand connecté et update < 60 secondes

## Props

| Prop | Type | Description |
|------|------|-------------|
| `secondsSinceUpdate` | `number` | Secondes depuis dernière MAJ |
| `isConnected` | `boolean` | Si subscription connectée |
| `isPaused` | `boolean` | Si subscription en pause |
| `isLoading` | `boolean` | Si chargement initial |
| `className` | `string` | Classes CSS additionnelles |
