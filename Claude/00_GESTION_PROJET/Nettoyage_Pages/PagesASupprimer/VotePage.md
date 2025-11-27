# VotePage - Analyse pour suppression

## Route
- `/vote`
- `/vote/:founderId` (placeholder dans router.tsx)

## Fichier
`apps/web/src/pages/VotePage.tsx`

---

## Ce que fait cette page

Ancienne page pour voter sur des totems existants. Affiche une liste de tous les totems avec filtres (par fondateur, tri, recherche) et permet de voter FOR ou AGAINST via un modal.

**Remplacée par :** HomePage avec VotePanel qui permet de voter directement sur les claims existants via ClaimExistsModal.

---

## Dépendances de VotePage

### Composants

| Composant | Fichier | Utilisé par pages conservées ? | Action |
|-----------|---------|-------------------------------|--------|
| `TotemVoteCard` | `components/TotemVoteCard.tsx` | ❌ NON | 🗑️ SUPPRIMER |
| `VoteModal` | `components/VoteModal.tsx` | ❌ NON | 🗑️ SUPPRIMER |

### Hooks

| Hook | Fichier | Utilisé par pages conservées ? | Action |
|------|---------|-------------------------------|--------|
| `useAllTotems` | `hooks/useAllTotems.ts` | ❌ NON | 🗑️ SUPPRIMER |

### Queries GraphQL

Aucune query directe - tout passe par `useAllTotems`.

### Librairies externes

| Librairie | Fonction | Note |
|-----------|----------|------|
| `react-router-dom` | `useSearchParams` | Utilisé globalement |
| `react-i18next` | `useTranslation` | Utilisé globalement |

---

## Résumé des actions

### 🗑️ À SUPPRIMER (utilisé UNIQUEMENT par VotePage)

| Type | Nom | Fichier |
|------|-----|---------|
| Page | `VotePage` | `pages/VotePage.tsx` |
| Composant | `TotemVoteCard` | `components/TotemVoteCard.tsx` |
| Composant | `VoteModal` | `components/VoteModal.tsx` |
| Hook | `useAllTotems` | `hooks/useAllTotems.ts` |

### ✅ À GARDER

Aucune dépendance partagée avec les pages conservées.

---

## Note

Le placeholder `FounderVotePage` dans `router.tsx` (route `/vote/:founderId`) peut aussi être supprimé - c'est juste un div vide.
