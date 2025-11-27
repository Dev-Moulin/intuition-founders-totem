# FounderDetailsPage - Analyse pour suppression

## Route
- `/results/:founderId`

## Fichier
`apps/web/src/pages/FounderDetailsPage.tsx`

---

## Ce que fait cette page

Page de détails d'un fondateur accessible depuis ResultsPage. Affiche toutes les propositions de totems pour un fondateur spécifique, classées par score NET.

**Remplacée par :** HomePage via `FounderExpandedView` qui affiche les mêmes informations directement sur la page d'accueil.

---

## Dépendances de FounderDetailsPage

### Composants

| Composant | Fichier | Utilisé par pages conservées ? | Action |
|-----------|---------|-------------------------------|--------|
| `TotemProposalCard` | `components/TotemProposalCard.tsx` | ❌ NON | 🗑️ SUPPRIMER |

### Hooks

| Hook | Fichier | Utilisé par pages conservées ? | Action |
|------|---------|-------------------------------|--------|
| `useFounderProposals` | `hooks/useFounderProposals.ts` | ✅ OUI (VotePanel, ClaimExistsModal) | ✅ GARDER |

### Utilities

| Utility | Fichier | Utilisé par pages conservées ? | Action |
|---------|---------|-------------------------------|--------|
| `aggregateTriplesByObject` | `utils/aggregateVotes.ts` | ✅ OUI (useFoundersForHomePage) | ✅ GARDER |
| `formatTrustAmount` | `utils/index.ts` | ✅ OUI (VotePanel, etc.) | ✅ GARDER |

### Librairies externes

| Librairie | Fonction | Note |
|-----------|----------|------|
| `react-router-dom` | `useParams`, `Link` | Utilisé globalement |

---

## Résumé des actions

### 🗑️ À SUPPRIMER (utilisé UNIQUEMENT par FounderDetailsPage)

| Type | Nom | Fichier |
|------|-----|---------|
| Page | `FounderDetailsPage` | `pages/FounderDetailsPage.tsx` |
| Composant | `TotemProposalCard` | `components/TotemProposalCard.tsx` |

### ✅ À GARDER (utilisé par pages conservées)

| Type | Nom | Utilisé par |
|------|-----|-------------|
| Hook | `useFounderProposals` | VotePanel, ClaimExistsModal (HomePage) |
| Utility | `aggregateTriplesByObject` | useFoundersForHomePage (HomePage) |
| Utility | `formatTrustAmount` | VotePanel, FounderExpandedView (HomePage) |

---

## Note

Le `TotemProposalCard` contient un `Link` vers `/results/:founderId/:totemId` qui est `TotemDetailsPage` (aussi à supprimer).
