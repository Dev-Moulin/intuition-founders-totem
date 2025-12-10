# TotemDetailsPage

> Route: `/results/:founderId/:totemId`
> Fichier: `apps/web/src/pages/TotemDetailsPage.tsx`
> Statut: Partiellement implementee

## Objectif

Page dediee a un totem specifique montrant tous les claims qui le composent.

## Wireframe

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ HEADER                                      [Connect]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │           TOTEM HEADER                                  │ │
│ │                                                          │ │
│ │               🦁                                         │ │
│ │              Lion                                        │ │
│ │                                                          │ │
│ │         for Joseph Lubin                                │ │
│ │                                                          │ │
│ │      125 TRUST NET (150 FOR - 25 AGAINST)               │ │
│ │      ████████████░░                                     │ │
│ │                                                          │ │
│ │      Rank: #1 out of 15 totems                          │ │
│ │      Category: Animal                                   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  ALL CLAIMS FOR THIS TOTEM (5 claims)                  │ │
│ │                                                          │ │
│ │  ┌───────────────────────────────────────────────────┐  │ │
│ │  │ Claim #1                                          │  │ │
│ │  │                                                    │  │ │
│ │  │ Joseph Lubin + is represented by + Lion           │  │ │
│ │  │                                                    │  │ │
│ │  │ 50 TRUST FOR  |  5 TRUST AGAINST  |  45 NET      │  │ │
│ │  │ ████████░░                                        │  │ │
│ │  │                                                    │  │ │
│ │  │ Created by: 0x1234...abcd  |  3 days ago         │  │ │
│ │  │ Voters: 15 FOR, 2 AGAINST                        │  │ │
│ │  │                                                    │  │ │
│ │  │ [Vote FOR]  [Vote AGAINST]  [View on Explorer]   │  │ │
│ │  └───────────────────────────────────────────────────┘  │ │
│ │                                                          │ │
│ │  ┌───────────────────────────────────────────────────┐  │ │
│ │  │ Claim #2                                          │  │ │
│ │  │                                                    │  │ │
│ │  │ Joseph Lubin + embodies + Lion                    │  │ │
│ │  │                                                    │  │ │
│ │  │ 30 TRUST FOR  |  2 TRUST AGAINST  |  28 NET      │  │ │
│ │  │ ████░░░░░░                                        │  │ │
│ │  │                                                    │  │ │
│ │  │ Created by: 0x5678...ef01  |  2 days ago         │  │ │
│ │  │ Voters: 8 FOR, 1 AGAINST                         │  │ │
│ │  │                                                    │  │ │
│ │  │ [Vote FOR]  [Vote AGAINST]  [View on Explorer]   │  │ │
│ │  └───────────────────────────────────────────────────┘  │ │
│ │                                                          │ │
│ │  ... (all 5 claims)                                     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  CLAIM COMPARISON                                       │ │
│ │                                                          │ │
│ │  Which claim best represents this totem?               │ │
│ │                                                          │ │
│ │  ┌────────────────────┬─────────┬───────────────────┐   │ │
│ │  │ Predicate          │ NET     │ Voters            │   │ │
│ │  ├────────────────────┼─────────┼───────────────────┤   │ │
│ │  │ is represented by  │ 45 TR   │ 15 FOR, 2 AGAINST │   │ │
│ │  │ embodies           │ 28 TR   │ 8 FOR, 1 AGAINST  │   │ │
│ │  │ channels           │ 20 TR   │ 5 FOR, 0 AGAINST  │   │ │
│ │  │ resonates with     │ 18 TR   │ 6 FOR, 2 AGAINST  │   │ │
│ │  │ has totem          │ 14 TR   │ 4 FOR, 1 AGAINST  │   │ │
│ │  └────────────────────┴─────────┴───────────────────┘   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  VOTERS LEADERBOARD                                     │ │
│ │                                                          │ │
│ │  Top contributors to this totem:                        │ │
│ │                                                          │ │
│ │  1. 0x1234...abcd  -  50 TRUST FOR                      │ │
│ │  2. 0x5678...ef01  -  30 TRUST FOR                      │ │
│ │  3. 0x9abc...1234  -  20 TRUST FOR                      │ │
│ │  4. 0xdef0...5678  -  10 TRUST AGAINST                  │ │
│ │  5. 0x4567...89ab  -  10 TRUST FOR                      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ FOOTER                                                   │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Composants

### Totem Header
- **Emoji en grand** : Representation visuelle
- **Nom du totem** : Label
- **Founder** : Pour qui ce totem
- **Aggregate Stats** :
  - NET Score total avec detail
  - Progress bar
  - Rang global
  - Categorie

### Claims List
Pour chaque claim :
- **Claim Statement** : `[Sujet] + [Predicat] + [Objet]`
- **Vote Stats** : FOR, AGAINST, NET avec progress bar
- **Creator** : Adresse du createur + date
- **Voter Count** : Nombre de voters FOR et AGAINST
- **Actions** :
  - Vote FOR
  - Vote AGAINST
  - View on Explorer (lien vers Basescan avec tripleId)

### Claim Comparison Table
- **Table comparative** des predicats :
  - Colonne Predicate
  - Colonne NET Score
  - Colonne Nombre de voters
- Permet de voir quel predicat a le plus de support

### Voters Leaderboard
- **Top 10 contributors** :
  - Adresse (tronquee)
  - Montant TRUST depose
  - Direction (FOR ou AGAINST)

## Flow d'interaction

```
User arrive depuis FounderDetailsPage
    |
Voit le Totem Header avec stats
    |
Parcourt les claims
    |
Peut voter FOR/AGAINST sur un claim
    |
Voit la comparaison des predicats
    |
Voit le leaderboard des voters
```

## Hooks

- `useParams()` : founderId et totemId depuis URL
- `useTotemDetails(founderId, objectId)` : Tous les claims pour ce totem
- `useTotemVoters(objectId)` : Liste des voters
- `useTotemStats(objectId)` : Stats agregees

## Navigation

- **Breadcrumb** : Home > Founders > Joseph Lubin > Lion
- **Actions** :
  - Bouton "Back to founder" -> FounderDetailPage
  - Bouton "Vote on this totem" -> Ouvre VoteModal

---

## Ecarts avec l'implementation actuelle

### Ce qui est implemente (230 lignes)
- [x] Breadcrumb navigation
- [x] Totem Header avec image/initiale
- [x] Winner Badge conditionnel
- [x] 4 stats cards (NET, FOR, AGAINST, Claims)
- [x] Win Rate progress bar
- [x] Claims grid avec `ClaimCard`
- [x] Hook `useTotemDetails()` avec GraphQL
- [x] Back button
- [x] Loading/Error/Empty states

### Ce qui manque
- [ ] **Rank** : Position du totem (#1 out of 15)
- [ ] **Category** : Categorie du totem (Animal, Object, etc.)
- [ ] **Creator info** : Adresse du createur + date sur chaque claim
- [ ] **Voter Count** : Nombre de voters FOR/AGAINST par claim
- [ ] **Vote buttons** : Boutons Vote FOR/AGAINST sur ClaimCard
- [ ] **View on Explorer** : Lien vers Basescan/INTUITION explorer
- [ ] **Claim Comparison Table** : Table comparative des predicats
- [ ] **Voters Leaderboard** : Top contributors

### Differences de design
- L'implementation utilise une **grille de cards** simple
- Pas de section **Claim Comparison** en table
- Pas de **Voters Leaderboard**
- ClaimCard simplifiees sans actions Vote

