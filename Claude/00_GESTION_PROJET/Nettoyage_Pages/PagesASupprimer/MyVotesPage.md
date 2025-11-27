# MyVotesPage - Analyse pour suppression

## Route
- `/my-votes`

## Fichier
`apps/web/src/pages/MyVotesPage.tsx`

---

## Ce que fait cette page

Page qui affiche tous les votes (positions) de l'utilisateur connecté. Montre les votes FOR et AGAINST avec leurs montants, et permet de filtrer/agréger par terme.

**Remplacée par :** HomePage via FounderExpandedView qui affiche "Votre position" directement sur chaque proposition.

---

## Dépendances de MyVotesPage

### Composants

Aucun composant externe - tout est rendu inline dans la page.

### Hooks et fonctions

| Hook/Fonction | Fichier | Utilisé par pages conservées ? | Action |
|---------------|---------|-------------------------------|--------|
| `useUserVotesDetailed` | `hooks/useUserVotes.ts` | ❌ NON | 🗑️ SUPPRIMER |
| `getTotalVotedAmount` | `hooks/useUserVotes.ts` | ❌ NON | 🗑️ SUPPRIMER |
| `formatTotalVotes` | `hooks/useUserVotes.ts` | ❌ NON | 🗑️ SUPPRIMER |
| `groupVotesByTerm` | `hooks/useUserVotes.ts` | ❌ NON | 🗑️ SUPPRIMER |

### Utilities

| Utility | Fichier | Utilisé par pages conservées ? | Action |
|---------|---------|-------------------------------|--------|
| `formatTrustAmount` | `utils/index.ts` | ✅ OUI (VotePanel, etc.) | ✅ GARDER |

### Queries GraphQL

La query utilisée est dans `useUserVotes.ts` - à vérifier.

### Librairies externes

| Librairie | Fonction | Note |
|-----------|----------|------|
| `wagmi` | `useAccount` | Utilisé globalement |
| `react-router-dom` | `Link` | Utilisé globalement |
| `react-i18next` | `useTranslation` | Utilisé globalement |

---

## Résumé des actions

### 🗑️ À SUPPRIMER (utilisé UNIQUEMENT par MyVotesPage)

| Type | Nom | Fichier |
|------|-----|---------|
| Page | `MyVotesPage` | `pages/MyVotesPage.tsx` |
| Hook | `useUserVotesDetailed` | `hooks/useUserVotes.ts` |
| Fonction | `getTotalVotedAmount` | `hooks/useUserVotes.ts` |
| Fonction | `formatTotalVotes` | `hooks/useUserVotes.ts` |
| Fonction | `groupVotesByTerm` | `hooks/useUserVotes.ts` |

### ✅ À GARDER (utilisé par pages conservées)

| Type | Nom | Utilisé par |
|------|-----|-------------|
| Utility | `formatTrustAmount` | VotePanel, FounderExpandedView, etc. |

---

## Note

Le fichier `hooks/useUserVotes.ts` est utilisé uniquement par MyVotesPage.
Tout le fichier peut être supprimé.

N'oublie pas de retirer les exports de `hooks/index.ts` :
- `useUserVotesDetailed`
- `getTotalVotedAmount`
- `formatTotalVotes`
- `groupVotesByTerm`
