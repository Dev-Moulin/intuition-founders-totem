# Index des Pages - INTUITION Founders Totem

> Derniere mise a jour: 24 novembre 2025

## Resume

| Total Pages | Implementees | Partiellement | A faire |
|-------------|--------------|---------------|---------|
| 9 | 1 | 8 | 0 |

---

## Documentation Globale

| Fichier | Description |
|---------|-------------|
| [00_PATTERNS_COMMUNS.md](./pages/00_PATTERNS_COMMUNS.md) | Patterns, conventions, navigation flow, etats |

---

## Liste des Pages

| # | Page | Route | Statut | Fichier Documentation |
|---|------|-------|--------|----------------------|
| 1 | HomePage | `/` | Partiellement | [pages/01_HomePage.md](./pages/01_HomePage.md) |
| 2 | ProposePage | `/propose` | Partiellement | [pages/02_ProposePage.md](./pages/02_ProposePage.md) |
| 3 | VotePage | `/vote` | Partiellement | [pages/03_VotePage.md](./pages/03_VotePage.md) |
| 4 | FounderDetailsPage | `/results/:founderId` | Partiellement | [pages/04_FounderDetailsPage.md](./pages/04_FounderDetailsPage.md) |
| 5 | TotemDetailsPage | `/results/:founderId/:totemId` | Partiellement | [pages/05_TotemDetailsPage.md](./pages/05_TotemDetailsPage.md) |
| 6 | MyVotesPage | `/my-votes` | Partiellement | [pages/06_MyVotesPage.md](./pages/06_MyVotesPage.md) |
| 7 | ResultsPage | `/results` | Partiellement | [pages/07_ResultsPage.md](./pages/07_ResultsPage.md) |
| 8 | NotFoundPage | `*` | Partiellement | [pages/08_NotFoundPage.md](./pages/08_NotFoundPage.md) |
| 9 | AdminAuditPage | `/admin/audit` | Implementee | [pages/09_AdminAuditPage.md](./pages/09_AdminAuditPage.md) |

---

## Legende Statuts

- **Implementee** : Page fonctionnelle correspondant au spec
- **Partiellement** : Page existe mais features manquantes (voir section "Ecarts" dans chaque doc)
- **A faire** : Page non creee

---

## Fichiers Code Source

| Page | Fichier Source |
|------|----------------|
| HomePage | `apps/web/src/pages/HomePage.tsx` |
| ProposePage | `apps/web/src/pages/ProposePage.tsx` |
| VotePage | `apps/web/src/pages/VotePage.tsx` |
| FounderDetailsPage | `apps/web/src/pages/FounderDetailsPage.tsx` |
| TotemDetailsPage | `apps/web/src/pages/TotemDetailsPage.tsx` |
| MyVotesPage | `apps/web/src/pages/MyVotesPage.tsx` |
| ResultsPage | `apps/web/src/pages/ResultsPage.tsx` |
| NotFoundPage | `apps/web/src/pages/NotFoundPage.tsx` |
| AdminAuditPage | `apps/web/src/pages/AdminAuditPage.tsx` |

---

## Router

Fichier: `apps/web/src/router.tsx`

```
/                          -> HomePage
/propose                   -> ProposePage
/vote                      -> VotePage
/vote/:founderId           -> FounderVotePage (placeholder)
/results                   -> ResultsPage
/results/:founderId        -> FounderDetailsPage
/results/:founderId/:totemId -> TotemDetailsPage
/my-votes                  -> MyVotesPage
/admin/audit               -> AdminAuditPage
*                          -> NotFoundPage
```
