# FounderDetailsPage

> Route: `/results/:founderId`
> Fichier: `apps/web/src/pages/FounderDetailsPage.tsx`
> Statut: Partiellement implementee

## Objectif

Page dediee a un fondateur avec tous ses totems proposes et le totem gagnant.

## Wireframe

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ HEADER                                      [Connect]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │           FOUNDER HEADER                                │ │
│ │                                                          │ │
│ │  ┌────────┐                                             │ │
│ │  │        │   Joseph Lubin                              │ │
│ │  │ Photo  │   Co-founder of Ethereum                    │ │
│ │  │        │   Founder of ConsenSys                      │ │
│ │  └────────┘                                             │ │
│ │                                                          │ │
│ │  🔗 Twitter  🔗 LinkedIn  🔗 Website                   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  🏆 WINNING TOTEM                                       │ │
│ │                                                          │ │
│ │  ┌───────────────────────────────────────────────────┐  │ │
│ │  │                                                    │  │ │
│ │  │             🦁                                     │  │ │
│ │  │            Lion                                    │  │ │
│ │  │                                                    │  │ │
│ │  │      125 TRUST NET (150 FOR - 25 AGAINST)         │  │ │
│ │  │                                                    │  │ │
│ │  │      5 claims | 3 predicates                      │  │ │
│ │  │                                                    │  │ │
│ │  │      [Vote FOR]  [Vote AGAINST]  [Details]        │  │ │
│ │  └───────────────────────────────────────────────────┘  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  ALL PROPOSED TOTEMS (15 totems)                       │ │
│ │                                                          │ │
│ │  Sort by: [NET Score ▼]                                 │ │
│ │                                                          │ │
│ │  ┌─────────────┬─────────────┬─────────────────────┐   │ │
│ │  │ Rank | Totem│ NET Score   │ Actions             │   │ │
│ │  ├─────────────┼─────────────┼─────────────────────┤   │ │
│ │  │ #1   🦁 Lion│ 125 TRUST   │ [Vote] [Details]    │   │ │
│ │  │      5 claim│ ████████░░  │                     │   │ │
│ │  ├─────────────┼─────────────┼─────────────────────┤   │ │
│ │  │ #2   🥝 Kiwi│ 70 TRUST    │ [Vote] [Details]    │   │ │
│ │  │      2 claim│ ████░░░░░░  │                     │   │ │
│ │  ├─────────────┼─────────────┼─────────────────────┤   │ │
│ │  │ #3   🦅Eagle│ 55 TRUST    │ [Vote] [Details]    │   │ │
│ │  │      3 claim│ ███░░░░░░░  │                     │   │ │
│ │  └─────────────┴─────────────┴─────────────────────┘   │ │
│ │                                                          │ │
│ │  ... (all totems for this founder)                      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  STATISTICS                                             │ │
│ │                                                          │ │
│ │  Total Claims: 27          Total TRUST: 1,245           │ │
│ │  Unique Totems: 15         Avg per Totem: 83 TRUST      │ │
│ │  Top Category: Animal (8)  First Claim: 3 days ago      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  RECENT ACTIVITY                                        │ │
│ │                                                          │ │
│ │  • 0x1234 voted FOR "Lion" with 10 TRUST (2h ago)       │ │
│ │  • 0x5678 created claim "embodies Eagle" (5h ago)       │ │
│ │  • 0x9abc voted AGAINST "Kiwi" with 5 TRUST (1d ago)    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ FOOTER                                                   │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Composants

### Founder Header
- **Photo** : Grande photo du fondateur
- **Name + Bio** : Nom, role, description
- **Social Links** : Twitter, LinkedIn, Website, etc.

### Winning Totem Highlight
- **Grande card mise en avant** :
  - Emoji du totem en grand
  - Nom du totem
  - NET Score avec detail (FOR - AGAINST)
  - Stats (nombre de claims, predicats)
  - Actions (Vote FOR, AGAINST, Details)

### All Totems Table
- **Table triable** :
  - Colonnes : Rank, Totem (emoji + nom), NET Score, Actions
  - Progress bar pour visualiser le score
  - Nombre de claims par totem
  - Boutons Vote et Details

### Statistics Panel
- **Chiffres cles** :
  - Total claims pour ce fondateur
  - Total TRUST depose
  - Nombre de totems uniques
  - Moyenne TRUST par totem
  - Categorie la plus populaire
  - Date du premier claim

### Recent Activity Feed
- **Timeline des evenements recents** :
  - Nouveaux claims
  - Votes FOR/AGAINST
  - Retraits
- Format : `[Address] [action] [details] ([date])`

## Flow d'interaction

```
User arrive depuis ResultsPage
    |
Voit le Founder Header avec photo et bio
    |
Voit le Winning Totem mis en avant
    |
Parcourt la table des totems
    |
Click sur un totem
    |
Redirect vers TotemDetailsPage
```

## Hooks

- `useParams()` : founderId depuis URL
- `useFounderData(founderId)` : Donnees du fondateur
- `useFounderTotems(founderId)` : Tous les totems agreges
- `useFounderStats(founderId)` : Statistiques
- `useFounderActivity(founderId)` : Activite recente

## Etats

- `loading` : Chargement des donnees
- `error` : Erreur de chargement
- `founder` : Donnees du fondateur
- `totems` : Totems agreges
- `stats` : Statistiques
- `activity` : Activite recente

## Donnees

```typescript
// Aggregation des triples par objet
const aggregatedTotems = aggregateTriplesByObject(triples);
const winningTotem = aggregatedTotems[0]; // Highest NET score

// Stats calculees
const totalFor = aggregatedTotems.reduce((sum, t) => sum + t.totalFor, 0n);
const totalAgainst = aggregatedTotems.reduce((sum, t) => sum + t.totalAgainst, 0n);
const totalStaked = totalFor + totalAgainst;
const netTotal = totalFor - totalAgainst;
```

## Navigation

- **Breadcrumb** : Home > Founders > Joseph Lubin
- **Actions** :
  - Bouton "Propose new totem" -> ProposePage avec ce fondateur
  - Bouton "View all founders" -> HomePage

---

## Ecarts avec l'implementation actuelle

### Ce qui est implemente (238 lignes)
- [x] Back button vers ResultsPage
- [x] Avatar avec initiale fallback
- [x] Nom du fondateur
- [x] Quick stats (propositions, claims, totem gagnant)
- [x] 4 cards de stats globales (FOR, AGAINST, Staked, NET)
- [x] Grille de TotemProposalCard
- [x] Hook `useFounderProposals()` avec GraphQL
- [x] Aggregation des votes par totem
- [x] Loading/Error/Empty states

### Ce qui manque
- [ ] **Bio du fondateur** : Description complete
- [ ] **Social Links** : Twitter, LinkedIn, Website
- [ ] **Winning Totem Highlight** : Grande card mise en avant
- [ ] **Table triable** : Format table au lieu de grille
- [ ] **Progress bar** : Visualisation du score
- [ ] **Statistics Panel** : Stats detaillees (moyenne, categorie, date)
- [ ] **Recent Activity Feed** : Timeline des evenements
- [ ] **Breadcrumb** : Navigation hierarchique
- [ ] **Boutons Vote** : Actions directes sur les totems

### Differences de design
- L'implementation utilise une **grille de cards** au lieu d'une **table**
- Pas de section **Winning Totem** mise en avant separement
- Stats globales simplifiees (4 cards) vs panel detaille
- Pas de **Recent Activity** feed

