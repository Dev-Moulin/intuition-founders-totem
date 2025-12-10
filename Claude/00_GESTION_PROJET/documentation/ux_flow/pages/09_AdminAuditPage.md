# AdminAuditPage

> Route: `/admin/audit`
> Fichier: `apps/web/src/pages/AdminAuditPage.tsx`
> Statut: Implementee

## Objectif

Page d'audit pour verifier les donnees INTUITION (fondateurs, predicats, atoms).

## Wireframe

```
+----------------------------------------------------------+
| HEADER                                      [Connect]     |
+----------------------------------------------------------+
|                                                           |
|         AUDIT DES DONNEES INTUITION                       |
|   Verification des 42 fondateurs et predicats             |
|                                                           |
+----------------------------------------------------------+
|                                                           |
|   STATS SUMMARY                                           |
|   +----------+  +----------+  +----------+  +----------+  |
|   |    42    |  |    5     |  |    37    |  |    0     |  |
|   | Founders |  | Trouves  |  | Manquants|  | Predicats|  |
|   +----------+  +----------+  +----------+  +----------+  |
|                                                           |
+----------------------------------------------------------+
|                                                           |
|   PREDICATS DISPONIBLES (0)                               |
|   Aucun predicat trouve sur INTUITION                     |
|                                                           |
+----------------------------------------------------------+
|                                                           |
|   STATUT DES 42 FONDATEURS                                |
|                                                           |
|   | # | Nom              | Statut     | Atom ID    | Type |
|   |---|------------------|------------|------------|------|
|   | 1 | Joseph Lubin     | Trouve     | 0xc433...  | Thing|
|   | 2 | Andrew Keys      | Trouve     | 0x3d94...  | Thing|
|   | 3 | Jonathan C.      | Manquant   | -          | -    |
|   | 4 | Taylor Monahan   | Manquant   | -          | -    |
|   | ...                                                   |
|                                                           |
+----------------------------------------------------------+
|                                                           |
|   FONDATEURS SANS ATOM (37)                               |
|   +---------------+  +---------------+  +---------------+ |
|   | Jonathan C.   |  | Taylor M.     |  | Edward M.     | |
|   +---------------+  +---------------+  +---------------+ |
|   | Cecily Mak    |  | Ric Burton    |  | Rouven Heck   | |
|   +---------------+  +---------------+  +---------------+ |
|   | ...                                                   |
|                                                           |
+----------------------------------------------------------+
```

## Composants

### Stats Summary
- 4 cards avec compteurs:
  - Fondateurs Total (42)
  - Atoms Trouves (vert)
  - Atoms Manquants (rouge)
  - Predicats (violet)

### Predicats Section
- Liste des predicats existants
- Badges cliquables
- Message si aucun

### Founders Table
- Tableau complet des 42 fondateurs
- Colonnes: #, Nom, Statut, Atom ID, Type
- Statut colore (vert=trouve, rouge=manquant)
- Atom ID tronque avec tooltip

### Missing Founders Grid
- Liste des fondateurs sans atom
- Affiche aussi le Twitter si disponible

## Hooks

- `useQuery(GET_ATOMS_BY_LABELS)` - Atoms par label
- `useQuery(GET_ALL_PREDICATES)` - Tous les predicats

## Queries GraphQL

```graphql
query GetAtomsByLabels($labels: [String!]!) {
  atoms(where: { label: { _in: $labels } }) {
    term_id
    label
    image
    emoji
    type
  }
}

query GetAllPredicates {
  atoms(where: { type: { _eq: "predicate" } }) {
    term_id
    label
  }
}
```

## Donnees Source

- `packages/shared/src/data/founders.json` - Liste des 42 fondateurs

## Usage

Page admin pour:
1. Verifier ce qui existe sur INTUITION testnet
2. Identifier les atoms a creer
3. Tracker la progression de l'enrichissement des donnees

## Implementation actuelle

- [x] Page complete implementee (210 lignes)
- [x] Query `GET_ATOMS_BY_LABELS` pour fondateurs
- [x] Query `GET_ALL_PREDICATES` pour predicats
- [x] Stats Summary (4 cards)
- [x] Predicats Section avec badges
- [x] Founders Table complete
- [x] Missing Founders Grid
- [x] Loading/Error states

## Lien Documentation

- [AUDIT_INTUITION_DATA.md](../../donnees/AUDIT_INTUITION_DATA.md) - Suivi detaille
