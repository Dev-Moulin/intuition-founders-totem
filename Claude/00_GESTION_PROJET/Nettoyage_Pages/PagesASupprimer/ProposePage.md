# ProposePage - Analyse pour suppression

## Route
- `/propose`

## Fichier
`apps/web/src/pages/ProposePage.tsx`

---

## Ce que fait cette page

Ancienne page pour proposer un totem pour un fondateur. Affiche une grille de fondateurs avec un bouton "Propose" qui ouvre un modal.

**Remplacée par :** HomePage avec `/?founder=xxx` qui fait la même chose via FounderExpandedView + VotePanel.

---

## Dépendances de ProposePage

### Composants

| Composant | Fichier | Utilisé par pages conservées ? | Action |
|-----------|---------|-------------------------------|--------|
| `FounderCard` | `components/FounderCard.tsx` | ❌ NON | 🗑️ SUPPRIMER |
| `ProposalModal` | `components/ProposalModal.tsx` | ❌ NON | 🗑️ SUPPRIMER |

### Hooks

| Hook | Fichier | Utilisé par pages conservées ? | Action |
|------|---------|-------------------------------|--------|
| `useIntuition` | `hooks/useIntuition.ts` | ✅ OUI (HomePage, AdminAuditPage) | ✅ GARDER |
| `useFoundersWithAtomIds` | `hooks/useFoundersWithAtomIds.ts` | ❌ NON | 🗑️ SUPPRIMER |

### Queries GraphQL

| Query | Utilisée par pages conservées ? | Action |
|-------|-------------------------------|--------|
| `GET_ALL_PROPOSALS` | ✅ OUI (useFoundersForHomePage) | ✅ GARDER |
| `GET_ATOMS_BY_LABELS` | ✅ OUI (HomePage, AdminAuditPage) | ✅ GARDER |

### Librairies externes

| Librairie | Fonction | Note |
|-----------|----------|------|
| `react-router-dom` | `useNavigate` | Utilisé globalement |
| `@apollo/client` | `useQuery` | Utilisé globalement |
| `react-i18next` | `useTranslation` | Utilisé globalement |
| `viem` | `Hex` | Utilisé globalement |

---

## Résumé des actions

### ��️ À SUPPRIMER (utilisé UNIQUEMENT par ProposePage)

| Type | Nom | Fichier |
|------|-----|---------|
| Page | `ProposePage` | `pages/ProposePage.tsx` |
| Composant | `FounderCard` | `components/FounderCard.tsx` |
| Composant | `ProposalModal` | `components/ProposalModal.tsx` |
| Hook | `useFoundersWithAtomIds` | `hooks/useFoundersWithAtomIds.ts` |

### ✅ À GARDER (utilisé par pages conservées)

| Type | Nom | Utilisé par |
|------|-----|-------------|
| Hook | `useIntuition` | HomePage (VotePanel), AdminAuditPage |
| Query | `GET_ALL_PROPOSALS` | useFoundersForHomePage |
| Query | `GET_ATOMS_BY_LABELS` | HomePage, AdminAuditPage |

---

## Note importante

⚠️ `FounderCard.tsx` contient aussi la fonction `getFounderImageUrl` qui est utilisée par HomePage et AdminAuditPage.

**Solution :** Déplacer `getFounderImageUrl` dans un fichier utilitaire avant de supprimer `FounderCard.tsx`, OU garder uniquement cette fonction dans le fichier.
