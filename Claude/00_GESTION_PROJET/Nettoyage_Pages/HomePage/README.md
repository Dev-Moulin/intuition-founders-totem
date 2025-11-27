# HomePage - Vue d'ensemble

## Route
- `/`
- `/?founder=xxx`

## Fichier
`apps/web/src/pages/HomePage.tsx`

---

## Librairies externes

| Librairie | Fonction utilisée | Ce qu'elle fait |
|-----------|-------------------|-----------------|
| `wagmi` | `useAccount` | Permet de savoir si un wallet est connecté et récupérer l'adresse |
| `react-i18next` | `useTranslation` | Gère les traductions français/anglais du site |
| `react-router-dom` | `Link`, `useSearchParams` | Gère la navigation entre pages et les paramètres URL (`?founder=xxx`) |

---

## Composants utilisés

| Composant | Fichier doc | Ce qu'il fait |
|-----------|-------------|---------------|
| `WalletConnectButton` | [WalletConnectButton.md](composants/WalletConnectButton.md) | Le bouton pour connecter son wallet |
| `FounderHomeCard` | [FounderHomeCard.md](composants/FounderHomeCard.md) | La petite carte d'un fondateur dans la grille |
| `FounderHomeCardSkeleton` | [FounderHomeCard.md](composants/FounderHomeCard.md) | Version "grise" de la carte pendant le chargement |
| `FounderExpandedView` | [FounderExpandedView.md](composants/FounderExpandedView.md) | Le panneau qui s'ouvre quand tu cliques sur un fondateur |

---

## Hooks utilisés

| Hook | Fichier doc | Ce qu'il fait |
|------|-------------|---------------|
| `useFoundersForHomePage` | [useFoundersForHomePage.md](hooks/useFoundersForHomePage.md) | Récupère la liste des fondateurs avec leurs totems gagnants |
| `useFounderSubscription` | [useFounderSubscription.md](hooks/useFounderSubscription.md) | Écoute en temps réel les nouveaux votes (WebSocket) |
| `useAutoSubscriptionPause` | [useAutoSubscriptionPause.md](hooks/useAutoSubscriptionPause.md) | Met en pause l'écoute quand l'onglet est caché |

---

## Liens vers autres pages (à supprimer)

| Ligne | Lien | Destination |
|-------|------|-------------|
| 65 | `<Link to="/vote">` | VotePage (à supprimer) |
| 68 | `<Link to="/results">` | ResultsPage (à supprimer) |
| 99 | `<Link to="/propose">` | ProposePage (à supprimer) |

---

## Arborescence des dépendances

```
HomePage
├── WalletConnectButton (simple)
├── FounderHomeCard
│   └── getFounderImageUrl (de FounderCard.tsx)
├── FounderHomeCardSkeleton (simple)
├── FounderExpandedView
│   ├── VotePanel ⭐ (gros composant)
│   │   ├── WalletConnectButton
│   │   ├── ClaimExistsModal
│   │   ├── useFounderProposals
│   │   ├── useProtocolConfig
│   │   └── useIntuition
│   ├── RefreshIndicator
│   ├── useFounderSubscription
│   └── useAutoSubscriptionPause
└── useFoundersForHomePage
```
