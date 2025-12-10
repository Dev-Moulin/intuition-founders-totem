# VotePage

> Route: `/vote`
> Fichier: `apps/web/src/pages/VotePage.tsx`
> Statut: Partiellement implementee

## Objectif

Affiche tous les totems proposes avec possibilite de voter FOR ou AGAINST.

## Wireframe

```
+-------------------------------------------------------------+
| HEADER                                          [Connect]    |
+-------------------------------------------------------------+
|                                                              |
|              VOTE FOR TOTEMS                                 |
|                                                              |
|  Support your favorite totem proposals by voting FOR or     |
|  AGAINST                                                    |
+-------------------------------------------------------------+
| STATS                                                        |
|                                                              |
|  +-------------+  +-------------+  +-------------+           |
|  | 15          |  | 8           |  | 27          |           |
|  | Total Totems|  | Founders    |  | Total Claims|           |
|  +-------------+  +-------------+  +-------------+           |
+-------------------------------------------------------------+
| FILTERS & SORTING                                            |
|                                                              |
|  Founder: [All v]  Category: [All v]  Sort: [Net Score v]   |
|                                                              |
|  Search: [Search totems, founders, predicates...]           |
|                                                              |
|  Showing 15 of 15 totems                                    |
+-------------------------------------------------------------+
|                                                              |
|              TOTEMS LIST (Aggregated by Object)              |
|                                                              |
|  +--------------------------------------------------------+ |
|  | #1  Lion for Joseph Lubin                              | |
|  |                                                         | |
|  |  150 TRUST FOR  |  25 TRUST AGAINST  |  125 NET        | |
|  |  [============--]                                       | |
|  |                                                         | |
|  |  5 claims with 3 different predicates                  | |
|  |  Top predicate: "is represented by"                    | |
|  |                                                         | |
|  |  [Vote FOR]  [Vote AGAINST]  [View Claims]             | |
|  +--------------------------------------------------------+ |
|                                                              |
|  +--------------------------------------------------------+ |
|  | #2  Kiwi for Joseph Lubin                              | |
|  |                                                         | |
|  |  80 TRUST FOR  |  10 TRUST AGAINST  |  70 NET          | |
|  |  [========----]                                         | |
|  |                                                         | |
|  |  2 claims with 2 different predicates                  | |
|  |  Top predicate: "embodies"                             | |
|  |                                                         | |
|  |  [Vote FOR]  [Vote AGAINST]  [View Claims]             | |
|  +--------------------------------------------------------+ |
|                                                              |
|  ... (all totems)                                            |
|                                                              |
|  [Load More]                                                 |
+-------------------------------------------------------------+
|                                                              |
|        VOTE MODAL (when clicking Vote FOR/AGAINST)           |
|                                                              |
|  +--------------------------------------------------------+ |
|  |  Vote FOR: Lion (Joseph Lubin)                         | |
|  |                                                         | |
|  |  Select a specific claim to vote on:                   | |
|  |                                                         | |
|  |  o "is represented by Lion"                            | |
|  |     50 FOR | 5 AGAINST | 45 NET                        | |
|  |                                                         | |
|  |  * "embodies Lion"                                     | |
|  |     30 FOR | 2 AGAINST | 28 NET                        | |
|  |                                                         | |
|  |  o "channels Lion"                                     | |
|  |     20 FOR | 0 AGAINST | 20 NET                        | |
|  |                                                         | |
|  |  Amount: [10_____] TRUST                               | |
|  |                                                         | |
|  |  Your balance: 1,234 TRUST                             | |
|  |                                                         | |
|  |  [Cancel]              [Confirm Vote]                  | |
|  +--------------------------------------------------------+ |
+-------------------------------------------------------------+
| FOOTER                                                       |
+-------------------------------------------------------------+
```

## Composants

### Stats Bar
- **Total Totems** : Nombre de totems agreges
- **Founders** : Nombre de fondateurs avec totems
- **Total Claims** : Somme de tous les claims

### Filters Bar
- **Dropdown Founder** : Filtre par fondateur (ou "All Founders")
- **Dropdown Sort** :
  - "Net Score (Highest)"
  - "Most FOR Votes"
  - "Most AGAINST Votes"
  - "Most Claims"
- **Search bar** : Recherche par totem, fondateur ou predicat
- **Results count** : "Showing X of Y totems"

### TotemCard (Agrege)
- **Rank** : Position dans le classement (#1, #2, etc.)
- **Emoji + Label** : Nom du totem
- **Founder** : Pour quel fondateur
- **Vote Stats** :
  - Total TRUST FOR
  - Total TRUST AGAINST
  - NET Score
  - Progress bar visuelle
- **Claim Stats** :
  - Nombre de claims
  - Nombre de predicats differents
  - Predicat le plus utilise
- **Actions** :
  - Bouton "Vote FOR"
  - Bouton "Vote AGAINST"
  - Bouton "View Claims" (expandable ou redirect)

### VoteModal
Affiche quand user clique sur "Vote FOR" ou "Vote AGAINST"

- **Titre** : "Vote FOR: [Totem]" ou "Vote AGAINST: [Totem]"
- **Liste des claims** :
  - Radio buttons pour selectionner le claim specifique
  - Affiche le predicat et les stats de chaque claim
  - Si totem a plusieurs claims, user choisit lequel supporter/contester
- **Input Amount** : Montant TRUST a deposer
- **Balance display** : Balance actuelle
- **Confirm button** : Declenche transaction

**Important** : Le user vote sur un **claim specifique**, pas sur le totem agrege. Mais l'interface groupe par totem pour faciliter la navigation.

## Flow d'interaction

```
User entre sur VotePage
    |
Voit liste des totems agreges
    |
Applique filtres/tri (optionnel)
    |
Click "Vote FOR" sur un totem
    |
VoteModal s'ouvre
    |
Selectionne claim specifique (si plusieurs)
    |
Entre montant TRUST
    |
Click "Confirm Vote"
    |
Transaction (depositTriple via SDK)
    |
Notification succes/erreur
    |
Liste des totems se rafraichit
```

## Hooks

- `useAllTotems()` : Query GraphQL + agregation
- `useFounderTotems(founderId)` : Si filtre par fondateur
- `useDepositTriple()` : Pour voter (wrapper du SDK)
- `useAccount()` : Wallet connecte
- `useBalance()` : Balance TRUST

## Etats

- `filters` : { founder, category, search }
- `sortBy` : Mode de tri
- `selectedTotem` : Totem pour lequel on veut voter
- `voteMode` : 'for' | 'against'
- `selectedClaim` : Claim specifique selectionne
- `voteAmount` : Montant TRUST
- `isVoting` : Transaction en cours

---

## Ecarts avec l'implementation actuelle

### Ce qui est implemente (211 lignes)
- [x] Hook `useAllTotems()` avec agregation
- [x] Composant `VoteModal`
- [x] Composant `TotemVoteCard`
- [x] Filtres: Founder, Sort, Search
- [x] Stats: Total Totems, Founders, Total Claims
- [x] Loading/Error states

### Ce qui manque
- [ ] **Filtre Category** : Dropdown pour filtrer par categorie (Animal, Object, etc.)
- [ ] **Load More** : Pagination des resultats
- [ ] **Selection claim specifique** : Le modal ne permet pas de choisir parmi plusieurs claims
- [ ] **Balance display** : Affichage de la balance TRUST dans le modal
- [ ] **Claim Stats** : Nombre de predicats differents, predicat le plus utilise
- [ ] **View Claims** : Bouton pour voir/expandre les claims

### Differences de design
- Le modal actuel est simplifie : pas de selection de claim specifique
- Pas d'affichage du nombre de predicats differents par totem
- Pas de bouton "View Claims" sur les cards
