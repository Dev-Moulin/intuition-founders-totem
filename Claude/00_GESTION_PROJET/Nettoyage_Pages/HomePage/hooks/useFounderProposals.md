# useFounderProposals

**Fichier source :** `apps/web/src/hooks/useFounderProposals.ts`

---

## Ce qu'il fait

Récupère toutes les propositions (triples) pour un fondateur donné.

Retourne :
- `proposals` : liste des propositions enrichies avec les votes (FOR, AGAINST, net, pourcentage)
- `loading` : true pendant le chargement
- `error` : erreur éventuelle
- `refetch()` : fonction pour recharger les données

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `@apollo/client` → `useQuery` | Requête GraphQL |
| Librairie | `viem` → `formatEther` | Formatage montants |
| Query | `GET_FOUNDER_PROPOSALS` | Récupère les propositions d'un fondateur |
| Query | `COUNT_USER_PROPOSALS_FOR_FOUNDER` | Compte les propositions de l'utilisateur |
| Type | `Triple`, `ProposalWithVotes`, `TripleVoteCounts` | Types GraphQL |

---

## Fonctions exportées

- `formatVoteAmount(weiAmount)` : formate un montant en wei vers un texte lisible (ex: "1.5k", "0.5")

---

## Utilisé par

- `VotePanel` (pour afficher les propositions existantes)
- `ClaimExistsModal` (pour la fonction `formatVoteAmount`)
