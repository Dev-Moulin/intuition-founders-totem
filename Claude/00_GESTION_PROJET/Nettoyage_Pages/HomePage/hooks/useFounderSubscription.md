# useFounderSubscription

**Fichier source :** `apps/web/src/hooks/useFounderSubscription.ts`

---

## Ce qu'il fait

Écoute en temps réel les nouveaux votes pour un fondateur via WebSocket.

Retourne :
- `proposals` : propositions avec votes, mises à jour en temps réel
- `loading` : true pendant le chargement initial
- `error` : erreur si la subscription échoue
- `lastUpdated` : timestamp de la dernière mise à jour
- `secondsSinceUpdate` : temps écoulé depuis la dernière mise à jour
- `isConnected` : true si connecté au WebSocket
- `isPaused` : true si en pause
- `pause()` : met en pause la subscription
- `resume()` : reprend la subscription

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `@apollo/client` → `useSubscription` | Subscription GraphQL WebSocket |
| Subscription | `SUBSCRIBE_FOUNDER_PROPOSALS` | Écoute les propositions d'un fondateur |
| Type | `Triple`, `ProposalWithVotes`, `TripleVoteCounts` | Types GraphQL |

---

## Fonctions exportées

- `formatTimeSinceUpdate(seconds)` : formate le temps en texte ("à l'instant", "il y a 5s"...)

---

## Utilisé par

- `FounderExpandedView` (pour le temps réel sur la page fondateur)
- `RefreshIndicator` (pour la fonction `formatTimeSinceUpdate`)
