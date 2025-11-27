# ResultsPage - Analyse pour suppression

## Route
- `/results`

## Fichier
`apps/web/src/pages/ResultsPage.tsx`

---

## Ce que fait cette page

Ancienne page qui affiche les résultats des votes pour tous les fondateurs. Pour chaque fondateur, elle montre le "totem gagnant" (celui avec le plus haut NET score).

**Remplacée par :** HomePage qui affiche directement les propositions et votes via FounderExpandedView.

---

## Dépendances de ResultsPage

### Composants

| Composant | Fichier | Utilisé par pages conservées ? | Action |
|-----------|---------|-------------------------------|--------|
| `FounderResultCard` | `components/FounderResultCard.tsx` | ❌ NON | 🗑️ SUPPRIMER |

### Hooks

| Hook | Fichier | Utilisé par pages conservées ? | Action |
|------|---------|-------------------------------|--------|
| `useAllProposals` | `hooks/useAllProposals.ts` | ❌ NON | 🗑️ SUPPRIMER |

### Utilities

| Utility | Fichier | Utilisé par pages conservées ? | Action |
|---------|---------|-------------------------------|--------|
| `exportResults.ts` | `utils/exportResults.ts` | ❌ NON (utilise type de useAllProposals) | 🗑️ SUPPRIMER |
| `exportResults.test.ts` | `utils/exportResults.test.ts` | ❌ NON | 🗑️ SUPPRIMER |

### Queries GraphQL

| Query | Utilisée par pages conservées ? | Action |
|-------|-------------------------------|--------|
| `GET_ALL_PROPOSALS` | ✅ OUI (useFoundersForHomePage) | ✅ GARDER |

### Librairies externes

| Librairie | Fonction | Note |
|-----------|----------|------|
| `react-router-dom` | `Link` | Utilisé globalement |
| `react-i18next` | `useTranslation` | Utilisé globalement |

---

## Résumé des actions

### 🗑️ À SUPPRIMER (utilisé UNIQUEMENT par ResultsPage)

| Type | Nom | Fichier |
|------|-----|---------|
| Page | `ResultsPage` | `pages/ResultsPage.tsx` |
| Composant | `FounderResultCard` | `components/FounderResultCard.tsx` |
| Hook | `useAllProposals` | `hooks/useAllProposals.ts` |
| Utility | `exportResults` | `utils/exportResults.ts` |
| Test | `exportResults.test` | `utils/exportResults.test.ts` |

### ✅ À GARDER (utilisé par pages conservées)

| Type | Nom | Utilisé par |
|------|-----|-------------|
| Query | `GET_ALL_PROPOSALS` | useFoundersForHomePage (HomePage) |

---

## Note

⚠️ `FounderResultCard` contient un `Link` vers `/results/${founder.id}` qui est la page `FounderDetailsPage` (aussi à supprimer).

Le hook `useAllProposals` utilise :
- `GET_ALL_PROPOSALS` (query partagée - GARDER)
- `aggregateTriplesByObject` de `utils/aggregateVotes.ts` - ✅ Utilisé par `useFoundersForHomePage` (GARDER)
