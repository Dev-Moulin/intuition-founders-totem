# TotemDetailsPage - Analyse pour suppression

## Route
- `/results/:founderId/:totemId`

## Fichier
`apps/web/src/pages/TotemDetailsPage.tsx`

---

## Ce que fait cette page

Page de détails d'un totem spécifique pour un fondateur. Affiche tous les claims (propositions avec différents prédicats) pour ce totem, avec les scores FOR/AGAINST de chaque claim.

**Remplacée par :** HomePage via `FounderExpandedView` qui affiche les totems et leurs scores directement.

---

## Dépendances de TotemDetailsPage

### Composants

| Composant | Fichier | Utilisé par pages conservées ? | Action |
|-----------|---------|-------------------------------|--------|
| `ClaimCard` | `components/ClaimCard.tsx` | ❌ NON | 🗑️ SUPPRIMER |

### Hooks

| Hook | Fichier | Utilisé par pages conservées ? | Action |
|------|---------|-------------------------------|--------|
| `useTotemDetails` | `hooks/useTotemDetails.ts` | ❌ NON | 🗑️ SUPPRIMER |

### Utilities

| Utility | Fichier | Utilisé par pages conservées ? | Action |
|---------|---------|-------------------------------|--------|
| `formatTrustAmount` | `utils/index.ts` | ✅ OUI (VotePanel, etc.) | ✅ GARDER |

### Librairies externes

| Librairie | Fonction | Note |
|-----------|----------|------|
| `react-router-dom` | `useParams`, `Link` | Utilisé globalement |

---

## Résumé des actions

### 🗑️ À SUPPRIMER (utilisé UNIQUEMENT par TotemDetailsPage)

| Type | Nom | Fichier |
|------|-----|---------|
| Page | `TotemDetailsPage` | `pages/TotemDetailsPage.tsx` |
| Composant | `ClaimCard` | `components/ClaimCard.tsx` |
| Hook | `useTotemDetails` | `hooks/useTotemDetails.ts` |

### ✅ À GARDER (utilisé par pages conservées)

| Type | Nom | Utilisé par |
|------|-----|-------------|
| Utility | `formatTrustAmount` | VotePanel, FounderExpandedView (HomePage) |

---

## Note

Le hook `useTotemDetails` utilise `useFounderProposals` qui est partagé avec HomePage, donc seul le fichier `useTotemDetails.ts` peut être supprimé.

N'oublie pas de retirer l'export de `hooks/index.ts` pour `useTotemDetails`.
