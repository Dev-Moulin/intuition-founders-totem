# VotePanel ⭐

**Fichier source :** `apps/web/src/components/VotePanel.tsx`

**Note :** C'est le composant le plus complexe de HomePage.

---

## Ce qu'il fait

Le gros formulaire pour créer un vote/claim. Permet de :
- Choisir un prédicat (ex: "is represented by", "has totem")
- Choisir un totem existant OU en créer un nouveau avec sa catégorie
- Entrer un montant de TRUST à déposer
- Voir l'aperçu du claim avant validation
- Détecter si le claim existe déjà (proactif) et proposer de voter dessus

Affiche aussi l'historique des votes récents sur ce fondateur.

---

## Dépendances

### Librairies externes

| Librairie | Fonction utilisée | Ce qu'elle fait |
|-----------|-------------------|-----------------|
| `wagmi` | `useAccount`, `useBalance` | Wallet connecté + balance TRUST |
| `@apollo/client` | `useQuery`, `useLazyQuery`, `useSubscription` | Requêtes GraphQL |
| `viem` | `formatEther`, `Hex` | Formatage montants + type adresse |

### Composants

| Composant | Ce qu'il fait |
|-----------|---------------|
| `WalletConnectButton` | Bouton connexion wallet (si pas connecté) |
| `ClaimExistsModal` | Modal pour voter sur un claim existant |

### Hooks

| Hook | Ce qu'il fait |
|------|---------------|
| `useFounderProposals` | Récupère les propositions du fondateur |
| `useProtocolConfig` | Config protocole (coûts, frais minimum) |
| `useIntuition` | Créer atoms/claims sur la blockchain |

### Queries GraphQL

| Query | Ce qu'elle fait |
|-------|-----------------|
| `GET_TRIPLES_BY_PREDICATES` | Récupère les triples avec nos prédicats |
| `GET_ATOMS_BY_LABELS` | Récupère les atoms par label |
| `GET_TRIPLE_BY_ATOMS` | Vérifie si un claim existe |
| `GET_FOUNDER_RECENT_VOTES` | Votes récents sur ce fondateur |

### Subscriptions GraphQL

| Subscription | Ce qu'elle fait |
|--------------|-----------------|
| `SUBSCRIBE_TOTEM_CATEGORIES` | Écoute les catégories de totems en temps réel |

### Fichiers de données

| Fichier | Ce qu'il contient |
|---------|-------------------|
| `predicates.json` | Liste des prédicats disponibles |
| `categories.json` | Configuration des catégories OFC |

---

## Sous-dépendances

- `ClaimExistsModal` → voir [ClaimExistsModal.md](ClaimExistsModal.md)
- `useFounderProposals` → voir [../hooks/useFounderProposals.md](../hooks/useFounderProposals.md)
- `useProtocolConfig` → voir [../hooks/useProtocolConfig.md](../hooks/useProtocolConfig.md)
- `useIntuition` → voir [../hooks/useIntuition.md](../hooks/useIntuition.md)

---

## Utilisé par

- `FounderExpandedView`
