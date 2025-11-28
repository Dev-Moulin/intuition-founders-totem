# VotePanel.tsx

**Chemin**: `apps/web/src/components/VotePanel.tsx`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/FounderExpandedView.tsx` | Composant |

## Dépendances (imports)

### React/Externe
| Import | Type | Fichier |
|--------|------|---------|
| `useState`, `useMemo`, `useEffect` | Hooks | `react` (externe) |
| `useAccount`, `useBalance` | Hooks | `wagmi` (externe) |
| `useQuery`, `useLazyQuery`, `useSubscription` | Hooks | `@apollo/client` (externe) |
| `formatEther`, `Hex` | Fonctions/Types | `viem` (externe) |

### Hooks internes
| Import | Type | Fichier |
|--------|------|---------|
| `FounderForHomePage` | Type | `../hooks/useFoundersForHomePage` |
| `useFounderProposals`, `formatVoteAmount` | Hook/Fonction | `../hooks/useFounderProposals` |
| `useProtocolConfig` | Hook | `../hooks/useProtocolConfig` |
| `useIntuition`, `ClaimExistsError` | Hook/Class | `../hooks/useIntuition` |

### Composants internes
| Import | Type | Fichier |
|--------|------|---------|
| `WalletConnectButton` | Composant | `./ConnectButton` |
| `ClaimExistsModal`, `ExistingClaimInfo` | Composant/Type | `./ClaimExistsModal` |

### GraphQL
| Import | Type | Fichier |
|--------|------|---------|
| `GET_TRIPLES_BY_PREDICATES`, etc. | Queries | `../lib/graphql/queries` |
| `SUBSCRIBE_TOTEM_CATEGORIES` | Subscription | `../lib/graphql/subscriptions` |

### Data JSON
| Import | Fichier |
|--------|---------|
| `predicatesData` | `packages/shared/src/data/predicates.json` |
| `categoriesConfig` | `packages/shared/src/data/categories.json` |

## Exports

| Export | Type |
|--------|------|
| `VotePanel` | Composant fonction |

## Description

Panneau de vote principal pour créer des claims INTUITION. Composant complexe avec :

### Fonctionnalités
1. **Sélection de prédicat** (accordéon) - Liste des prédicats disponibles
2. **Sélection/création de totem** (accordéon)
   - Mode "existant" : recherche parmi totems existants, groupés par catégorie
   - Mode "nouveau" : créer un nouveau totem avec catégorie (système OFC:)
3. **Montant TRUST** - Input avec validation minimum et affichage balance
4. **Preview** - Aperçu du claim avant création
5. **Vérification proactive** - Détecte si claim existe déjà
6. **Activité récente** - Historique des derniers votes sur ce founder

### États gérés
- Prédicat sélectionné
- Mode totem (existant/nouveau)
- Totem sélectionné ou nouveau nom
- Catégorie du nouveau totem
- Montant TRUST
- États erreur/succès/loading
- Modal ClaimExistsModal

## Props

| Prop | Type | Description |
|------|------|-------------|
| `founder` | `FounderForHomePage` | Données du founder |
