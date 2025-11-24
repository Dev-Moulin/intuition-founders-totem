# MyVotesPage

> Route: `/my-votes`
> Fichier: `apps/web/src/pages/MyVotesPage.tsx`
> Statut: Partiellement implementee

## Objectif

Affiche l'historique des votes et propositions du user connecte.

## Wireframe

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ HEADER                                      [Connect]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │              MY VOTES & CLAIMS                          │ │
│ │                                                          │ │
│ │  Track your contributions and manage your TRUST         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  OVERVIEW                                               │ │
│ │                                                          │ │
│ │  Total TRUST Deposited: 1,234                           │ │
│ │  Active Votes: 15  |  Claims Created: 3                 │ │
│ │  Founders Voted: 8                                      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  TABS                                                   │ │
│ │  [Active Votes] [Withdrawn] [My Claims] [All History]  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  ACTIVE VOTES (15)                                      │ │
│ │                                                          │ │
│ │  ┌───────────────────────────────────────────────────┐  │ │
│ │  │ Joseph Lubin → 🦁 Lion                            │  │ │
│ │  │ "is represented by"                               │  │ │
│ │  │                                                    │  │ │
│ │  │ Your vote: 10 TRUST FOR                           │  │ │
│ │  │ Current status: 50 FOR | 5 AGAINST | 45 NET      │  │ │
│ │  │ Voted: 2 days ago                                 │  │ │
│ │  │                                                    │  │ │
│ │  │ Withdrawable: 10 TRUST                            │  │ │
│ │  │                                                    │  │ │
│ │  │ [Withdraw]  [Add More]  [View Claim]              │  │ │
│ │  └───────────────────────────────────────────────────┘  │ │
│ │                                                          │ │
│ │  ┌───────────────────────────────────────────────────┐  │ │
│ │  │ Joseph Lubin → 🥝 Kiwi                            │  │ │
│ │  │ "embodies"                                        │  │ │
│ │  │                                                    │  │ │
│ │  │ Your vote: 5 TRUST AGAINST                        │  │ │
│ │  │ Current status: 80 FOR | 15 AGAINST | 65 NET     │  │ │
│ │  │ Voted: 1 day ago                                  │  │ │
│ │  │                                                    │  │ │
│ │  │ Withdrawable: 5 TRUST                             │  │ │
│ │  │                                                    │  │ │
│ │  │ [Withdraw]  [Add More]  [View Claim]              │  │ │
│ │  └───────────────────────────────────────────────────┘  │ │
│ │                                                          │ │
│ │  ... (all active votes)                                 │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  MY CLAIMS (3)                                          │ │
│ │                                                          │ │
│ │  ┌───────────────────────────────────────────────────┐  │ │
│ │  │ 💡 Joseph Lubin embodies Eagle                    │  │ │
│ │  │                                                    │  │ │
│ │  │ Created: 3 days ago                               │  │ │
│ │  │ Status: 35 FOR | 5 AGAINST | 30 NET              │  │ │
│ │  │ Rank: #3 for Joseph Lubin                         │  │ │
│ │  │                                                    │  │ │
│ │  │ Your initial deposit: 10 TRUST (still active)    │  │ │
│ │  │                                                    │  │ │
│ │  │ Creator rewards earned: 0.5 TRUST (protocol fees)│  │ │
│ │  │                                                    │  │ │
│ │  │ [View Claim]  [Share]                             │  │ │
│ │  └───────────────────────────────────────────────────┘  │ │
│ │                                                          │ │
│ │  ... (all claims created)                               │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  QUICK ACTIONS                                          │ │
│ │                                                          │ │
│ │  [Withdraw All]  [Create New Claim]  [Export Data]     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ FOOTER                                                   │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Composants

### Overview Stats
- **Totaux** :
  - TRUST total depose
  - Nombre de votes actifs
  - Nombre de claims crees
  - Nombre de fondateurs votes

### Tabs Navigation
- **Active Votes** : Votes avec TRUST encore depose
- **Withdrawn** : Votes retires (historique)
- **My Claims** : Claims crees par le user
- **All History** : Timeline complete

### Vote Card (Active)
- **Claim info** : Fondateur, totem, predicat
- **Your vote** : Montant et direction (FOR/AGAINST)
- **Current status** : Stats actuelles du claim
- **Date** : Quand le vote a ete fait
- **Withdrawable amount** : TRUST recuperable
- **Actions** :
  - Withdraw : Retirer le TRUST
  - Add More : Ajouter du TRUST
  - View Claim : Voir details du claim

### Claim Card (Created)
- **Claim statement** : Full claim
- **Creation date** : Quand cree
- **Current status** : Stats actuelles
- **Rank** : Position pour ce fondateur
- **Initial deposit** : Montant depose a la creation (+ etat)
- **Creator rewards** : Frais de createur accumules (5% des depots)
- **Actions** :
  - View Claim : Voir details
  - Share : Partager le claim (lien)

### Quick Actions Bar
- **Withdraw All** : Retirer tout le TRUST d'un coup
- **Create New Claim** : Redirect vers ProposePage
- **Export Data** : Telecharger CSV de l'historique

## Flow d'interaction

```
User arrive sur /my-votes
    |
Verifie si wallet connecte
    |
[Non connecte] -> Affiche message de connexion
    |
[Connecte] -> Charge les votes et claims via GraphQL
    |
Affiche Overview Stats
    |
Affiche Tabs (Active Votes par defaut)
    |
User peut naviguer entre les tabs
    |
User peut Withdraw/Add More sur un vote
    |
User peut View/Share un claim
```

## Hooks

- `useAccount()` : Wallet connecte
- `useUserVotes(address)` : Tous les votes du user
- `useUserClaims(address)` : Claims crees par le user
- `useWithdrawable(address)` : Montant total withdrawable
- `useUserStats(address)` : Stats globales

## Etats

- `activeTab` : Tab selectionne
- `isWithdrawing` : Transaction de retrait en cours
- `selectedVote` : Vote selectionne pour action
- `loading` : Chargement des donnees
- `error` : Erreur de chargement

---

## Ecarts avec l'implementation actuelle

### Ce qui est implemente (357 lignes)
- [x] Hook `useUserVotesDetailed()` avec GraphQL
- [x] Verification connexion wallet
- [x] Stats Grid (4 cards: Total, FOR, AGAINST, TRUST)
- [x] Filter Buttons (All/FOR/AGAINST)
- [x] Vote Cards avec badges direction
- [x] Terms Aggregation section
- [x] Liens Explorer et Portal
- [x] Loading/Error/NotConnected/Empty states

### Ce qui manque
- [ ] **Tabs Navigation** : Active/Withdrawn/My Claims/All History (filtre simple a la place)
- [ ] **Overview Stats** : Claims Created, Founders Voted
- [ ] **Withdraw button** : Retirer le TRUST
- [ ] **Add More button** : Ajouter du TRUST
- [ ] **My Claims section** : Claims crees par le user
- [ ] **Creator rewards** : Frais de createur accumules
- [ ] **Quick Actions Bar** : Withdraw All, Create New Claim, Export Data
- [ ] **Withdrawable amount** : Montant recuperable par vote

### Differences de design
- L'implementation utilise des **filter buttons** au lieu de **tabs**
- Pas de section **My Claims** (claims crees)
- Pas d'actions **Withdraw/Add More** sur les votes
- Vote Cards simplifiees (Term ID au lieu de Founder → Totem)
- Pas de **Quick Actions Bar**

