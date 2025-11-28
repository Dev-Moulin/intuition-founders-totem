# FounderHomeCard.tsx

**Chemin**: `apps/web/src/components/FounderHomeCard.tsx`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `pages/HomePage.tsx` | Page |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `formatEther` | Fonction | `viem` (externe) |
| `FounderForHomePage` | Type | `../hooks/useFoundersForHomePage` |
| `getFounderImageUrl` | Fonction | `../utils/founderImage` |

## Exports

| Export | Type |
|--------|------|
| `FounderHomeCard` | Composant fonction |
| `FounderHomeCardSkeleton` | Composant fonction (skeleton loader) |

## Description

Carte compacte pour afficher un founder dans la grille HomePage.
- Photo du founder avec fallback dicebear
- Nom et bio courte
- Badge "NEW" si activité récente (24h)
- Totem gagnant avec score TRUST et tendance (↑/↓)
- Nombre de propositions
- Indicateur "Cliquez pour voter"

## Props

| Prop | Type | Description |
|------|------|-------------|
| `founder` | `FounderForHomePage` | Données du founder |
| `onSelect` | `(founderId: string) => void` | Callback au clic |
| `isSelected` | `boolean` | État de sélection |
