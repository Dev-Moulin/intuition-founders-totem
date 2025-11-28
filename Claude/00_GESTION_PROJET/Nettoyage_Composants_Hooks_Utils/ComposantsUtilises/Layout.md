# Layout.tsx

**Chemin**: `apps/web/src/components/Layout.tsx`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `router.tsx` | Router principal |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `ReactNode` | Type | `react` (externe) |
| `Header` | Composant | `./Header` |
| `Footer` | Composant | `./Footer` |

## Exports

| Export | Type |
|--------|------|
| `Layout` | Composant fonction |

## Description

Composant de mise en page principal qui wrap toutes les pages de l'application.
- Affiche le Header en haut
- Affiche le contenu (children) au milieu
- Affiche le Footer en bas
- Applique le fond dégradé global
