# HomePage

> Route: `/`
> Fichier: `apps/web/src/pages/HomePage.tsx`
> Statut: Partiellement implementee

## Objectif

Landing page qui presente le projet et affiche la grille des 42 fondateurs.

## Wireframe

```
+-------------------------------------------------------------+
| +----------------------------------------------------------+|
| | HEADER                                      [Connect]     ||
| | Overmind Founders Collection                              ||
| +----------------------------------------------------------+|
|                                                              |
| +----------------------------------------------------------+|
| |               HERO SECTION                                ||
| |                                                           ||
| |        Overmind Founders Collection                       ||
| |                                                           ||
| |   Vote for the totems that represent the 42 founders      ||
| |          of INTUITION using $TRUST tokens                 ||
| |                                                           ||
| |         [View All Totems]  [How it works?]                ||
| +----------------------------------------------------------+|
|                                                              |
| +----------------------------------------------------------+|
| |                   FOUNDERS GRID                           ||
| | +--------+ +--------+ +--------+ +--------+               ||
| | | Photo  | | Photo  | | Photo  | | Photo  |               ||
| | |        | |        | |        | |        |  ...          ||
| | | Name   | | Name   | | Name   | | Name   |               ||
| | | Role   | | Role   | | Role   | | Role   |               ||
| | |--------| |--------| |--------| |--------|               ||
| | | Lion   | | Kiwi   | | Eagle  | | TBD    |               ||
| | |150 TR  | |80 TR   | |60 TR   | |0 TR    |               ||
| | |--------| |--------| |--------| |--------|               ||
| | |[Vote]  | |[Vote]  | |[Vote]  | |[Propose|               ||
| | |[Propose| |[Propose| |[Propose| |        |               ||
| | +--------+ +--------+ +--------+ +--------+               ||
| |                                                           ||
| |           ... (42 cards in responsive grid)               ||
| +----------------------------------------------------------+|
|                                                              |
| +----------------------------------------------------------+|
| | FOOTER                                                    ||
| | Made with love by Overmind | Powered by INTUITION         ||
| +----------------------------------------------------------+|
+-------------------------------------------------------------+
```

## Composants

### Header
- **Logo/Title** : "Overmind Founders Collection"
- **ConnectButton** : RainbowKit button (wallet connection)
- **Navigation** : Links vers "Vote", "My Votes", "Results"

### Hero Section
- **Title** : Grand titre avec emojis
- **Subtitle** : Explication courte du projet
- **CTA Buttons** :
  - "View All Totems" -> VotePage
  - "How it works?" -> Ouvre modal explicative

### Founders Grid
- **FounderCard** (x42) :
  - Photo du fondateur
  - Nom
  - Role/titre
  - **Winning Totem** (si existant) :
    - Emoji du totem
    - Nom du totem
    - Total TRUST NET
  - **Actions** :
    - Bouton "Vote" -> VotePage avec filtre sur ce fondateur
    - Bouton "Propose" -> ProposePage avec ce fondateur preselectionne

### Footer
- **Credits** : Overmind
- **Links** : GitHub, INTUITION, Base

## Donnees

```typescript
interface FounderCardData {
  founderId: Hex;
  name: string;
  role: string;
  image: string;
  winningTotem: {
    label: string;
    emoji: string;
    netScore: bigint;
  } | null;
}
```

## Hooks

- `useFounderTotems(founderId)` : Pour recuperer le totem gagnant
- `useAccount()` : Pour verifier si wallet connecte

## Etat de chargement

```
+--------+
| Photo  |
| [...]  |  <- Skeleton loader
| Name   |
| [...]  |
+--------+
```

---

## Ecarts avec l'implementation actuelle

### Ce qui est implemente (139 lignes)
- [x] Hero Section avec titre et description
- [x] CTA conditionnel (Connect si non connecte, 3 boutons si connecte)
- [x] Features Section (3 cards: Proposer, Voter, Resultats)
- [x] How It Works Section (4 etapes)
- [x] Stats Section (4 cards statiques: 42, ∞, On-chain, IPFS)

### Ce qui manque
- [ ] **Founders Grid** : La grille des 42 fondateurs n'est pas implementee
- [ ] **FounderCard** : Composant avec photo, nom, role, totem gagnant
- [ ] **Hook useFounderTotems** : Pour afficher les totems gagnants
- [ ] **Boutons Vote/Propose** par fondateur
- [ ] **Modal "How it works?"** : Actuellement c'est une section statique

### Differences de design
- L'implementation actuelle est une **landing page marketing** statique
- La spec prevoit une **page fonctionnelle** avec la grille des fondateurs
- Les CTA actuels redirigent vers `/propose`, `/vote`, `/results` au lieu de filtrer par fondateur
