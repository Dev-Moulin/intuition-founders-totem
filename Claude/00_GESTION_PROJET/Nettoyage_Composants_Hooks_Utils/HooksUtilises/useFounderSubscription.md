# useFounderSubscription.ts

**Chemin**: `apps/web/src/hooks/useFounderSubscription.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/FounderExpandedView.tsx` | Composant |
| `components/RefreshIndicator.tsx` | Composant (formatTimeSinceUpdate) |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useSubscription` | Hook | `@apollo/client` (externe) |
| `useState`, `useEffect`, `useCallback`, `useRef` | Hooks | `react` (externe) |
| `SUBSCRIBE_FOUNDER_PROPOSALS` | Subscription | `../lib/graphql/subscriptions` |
| Types | Types | `../lib/graphql/types` |

## Exports

| Export | Type |
|--------|------|
| `useFounderSubscription` | Hook fonction |
| `formatTimeSinceUpdate` | Fonction utilitaire |

## useFounderSubscription(founderName) - Retourne

```typescript
{
  proposals: ProposalWithVotes[];  // Propositions enrichies avec votes
  loading: boolean;                // True pendant chargement initial
  error: Error | undefined;        // Erreur si subscription échoue
  lastUpdated: Date | null;        // Timestamp dernière MAJ
  secondsSinceUpdate: number;      // Secondes depuis dernière MAJ
  isConnected: boolean;            // True si subscription active
  isLoading: boolean;              // True pendant attente première donnée
  pause: () => void;               // Met en pause la subscription
  resume: () => void;              // Reprend la subscription
  isPaused: boolean;               // True si en pause
}
```

## formatTimeSinceUpdate(seconds) - Retourne

Formate le temps écoulé pour affichage :
- `< 5s` → "à l'instant"
- `< 60s` → "il y a Xs"
- `< 60min` → "il y a Xmin"
- `>= 60min` → "il y a Xh"

## Description

Hook pour recevoir les propositions d'un founder en temps réel via WebSocket.

### Fonctionnalités
- Subscription GraphQL WebSocket
- Enrichissement automatique des triples avec votes
- Timer pour afficher "secondes depuis dernière MAJ"
- Pause/Resume pour économiser les ressources (ex: onglet caché)

### Mise à jour automatique quand
- Nouveau totem proposé pour le founder
- Vote FOR ou AGAINST
- Retrait de vote

## Fonctions internes

- `calculateVoteCounts(triple)` : Calcule FOR, AGAINST, netVotes
- `calculatePercentage(votes)` : Calcule % de FOR
- `enrichTripleWithVotes(triple)` : Ajoute votes et percentage
