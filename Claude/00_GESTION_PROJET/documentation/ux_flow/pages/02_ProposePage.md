# ProposePage

> Route: `/propose` (ou `/propose?founder=0x123...`)
> Fichier: `apps/web/src/pages/ProposePage.tsx`
> Statut: Partiellement implementee

## Objectif

Permet aux users de creer une nouvelle proposition (claim) pour un fondateur **deja selectionne depuis la HomePage**.

**Note importante** : Le fondateur est choisi sur la HomePage via le bouton "Propose" de la FounderCard. Cette page affiche donc directement le formulaire de proposition pour ce fondateur.

## Wireframe

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ HEADER                                      [Connect]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │         PROPOSE A TOTEM FOR                             │ │
│ │                                                          │ │
│ │  ┌────────┐                                             │ │
│ │  │        │  Joseph Lubin                               │ │
│ │  │ Photo  │  Co-founder of Ethereum                     │ │
│ │  │        │  Founder of ConsenSys                       │ │
│ │  └────────┘                                             │ │
│ │                                                          │ │
│ │  [← Back to founders]   [Change founder]               │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │          PROPOSAL FORM                                  │ │
│ │                                                          │ │
│ │  ┌──────────────────────────────────────────────────┐   │ │
│ │  │ 1. Select or Create Predicate                   │   │ │
│ │  │                                                   │   │ │
│ │  │  [v] is represented by    ▼                      │   │ │
│ │  │      - is represented by                         │   │ │
│ │  │      - has totem                                 │   │ │
│ │  │      - is symbolized by                          │   │ │
│ │  │      - embodies                                  │   │ │
│ │  │      - Create new... [_____________]             │   │ │
│ │  └──────────────────────────────────────────────────┘   │ │
│ │                                                          │ │
│ │  ┌──────────────────────────────────────────────────┐   │ │
│ │  │ 2. Select or Create Totem (Object)              │   │ │
│ │  │                                                   │   │ │
│ │  │  Search: [Lion________________]  🔍              │   │ │
│ │  │                                                   │   │ │
│ │  │  Existing totems:                                │   │ │
│ │  │  ○ 🦁 Lion (150 TRUST, 5 claims)                │   │ │
│ │  │  ○ 🥝 Kiwi (80 TRUST, 2 claims)                 │   │ │
│ │  │  ○ 🦅 Eagle (60 TRUST, 3 claims)                │   │ │
│ │  │                                                   │   │ │
│ │  │  ● Create new: "Lion"                            │   │ │
│ │  │                                                   │   │ │
│ │  │  Category: [Animal ▼]                            │   │ │
│ │  │  Emoji (optional): [🦁]                          │   │ │
│ │  └──────────────────────────────────────────────────┘   │ │
│ │                                                          │ │
│ │  ┌──────────────────────────────────────────────────┐   │ │
│ │  │ 3. Initial TRUST Deposit                        │   │ │
│ │  │                                                   │   │ │
│ │  │  Amount: [10_____] TRUST                         │   │ │
│ │  │                                                   │   │ │
│ │  │  ℹ️ This TRUST will be deposited FOR this claim │   │ │
│ │  │  You can withdraw it later if needed            │   │ │
│ │  │                                                   │   │ │
│ │  │  Your balance: 1,234 TRUST                      │   │ │
│ │  └──────────────────────────────────────────────────┘   │ │
│ │                                                          │ │
│ │  ┌──────────────────────────────────────────────────┐   │ │
│ │  │ CLAIM PREVIEW                                    │   │ │
│ │  │                                                   │   │ │
│ │  │  Joseph Lubin + is represented by + 🦁 Lion     │   │ │
│ │  │                                                   │   │ │
│ │  │  Initial deposit: 10 TRUST FOR                  │   │ │
│ │  │  Est. gas: ~0.001 ETH                           │   │ │
│ │  └──────────────────────────────────────────────────┘   │ │
│ │                                                          │ │
│ │         [Cancel]              [Create Claim]            │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ FOOTER                                                   │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Composants

### Founder Header
- **Photo du fondateur** : Grande photo
- **Nom + Bio** : Nom, role, description courte
- **Navigation** :
  - Bouton "← Back to founders" : Retour a HomePage
  - Bouton "Change founder" : Permet de changer de fondateur

### Proposal Form

**Etape 1 : Predicat**
- **Dropdown** avec predicats existants (query GraphQL)
- **Option "Create new"** : Input text pour nouveau predicat
- Predicats suggeres :
  - "is represented by" (par defaut)
  - "has totem"
  - "is symbolized by"
  - "embodies"
  - "channels"
  - "resonates with"

**Etape 2 : Objet (Totem)**
- **Search bar** : Recherche dans les totems existants
- **Liste de totems existants** :
  - Affiche emoji + nom + stats (TRUST total, nombre de claims)
  - Radio button pour selection
- **Option "Create new"** :
  - Input text : Nom du totem
  - Dropdown : Categorie (Animal, Object, Trait, Universe, Superpower, Other)
  - Input text : Emoji (optionnel)

**Etape 3 : Depot initial**
- **Input number** : Montant TRUST a deposer
- **Affichage balance** : Balance actuelle du user
- **Info tooltip** : Explication sur le depot (recuperable, vote FOR)

**Claim Preview**
- Affiche la phrase complete : `[Sujet] + [Predicat] + [Objet]`
- Montant depose
- Estimation du gas

**Boutons d'action**
- **Cancel** : Ferme le modal/panel
- **Create Claim** : Declenche la transaction

### Notifications
- **Success** : Toast vert en haut a droite (5s)
- **Error** : Toast rouge en haut a droite (5s)

## Flow d'interaction

```
User sur HomePage
    ↓
Click bouton "Propose" sur FounderCard
    ↓
Redirect vers ProposePage avec founderId en param
    ↓
ProposePage charge avec fondateur preselectionne
    ↓
User voit le Founder Header + Proposal Form
    ↓
User selectionne/cree predicat
    ↓
User selectionne/cree totem
    ↓
User entre montant TRUST
    ↓
User voit preview du claim
    ↓
User click "Create Claim"
    ↓
Transaction blockchain
    ↓
Notification succes/erreur
```

## Hooks

- `useIntuition()` : Pour `createClaim()`
- `useParams()` ou `useSearchParams()` : Pour founderId
- `useExistingPredicates()` : Query GraphQL predicats
- `useExistingObjects()` : Query GraphQL totems

## Etats

- `selectedFounder` : Fondateur depuis URL param
- `selectedPredicate` : Predicat choisi
- `selectedObject` : Totem choisi
- `trustAmount` : Montant TRUST
- `isSubmitting` : Transaction en cours
- `error` / `success` : Messages

## Donnees

```typescript
// Fondateurs charges depuis JSON
import foundersData from 'packages/shared/src/data/founders.json';

// Predicats existants depuis GraphQL
const { predicates } = useExistingPredicates();

// Totems existants depuis GraphQL
const { objects } = useExistingObjects();
```

---

## Ecarts avec l'implementation actuelle

### Ce qui est implemente (169 lignes)
- [x] Grille des 42 fondateurs avec recherche
- [x] Composant `FounderCard` avec bouton Propose
- [x] Composant `ProposalModal` avec formulaire
- [x] Hook `useIntuition()` avec `createClaim()`
- [x] Notifications success/error (toast)
- [x] Preview du claim

### Ce qui manque
- [ ] **Fondateur pre-selectionne** : Pas de param URL, l'user doit choisir dans la grille
- [ ] **Dropdown predicats existants** : Input libre seulement (issue #33)
- [ ] **Recherche totems existants** : Input libre seulement (issue #33)
- [ ] **Stats sur totems** : Pas d'affichage TRUST/claims existants
- [ ] **Categorie/Emoji** : Pas de selection categorie ni emoji
- [ ] **Estimation gas** : Non affichee
- [ ] **Balance TRUST** : Non affichee

### Differences de design
- L'implementation actuelle utilise une **grille + modal** au lieu de **page dediee avec fondateur pre-selectionne**
- Le formulaire est **simplifie** (3 inputs libres) vs la spec (dropdown + recherche + stats)
- Navigation differente : pas de "Back to founders" ni "Change founder"

