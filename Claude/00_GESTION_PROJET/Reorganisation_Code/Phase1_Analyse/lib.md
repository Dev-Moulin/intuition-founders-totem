# Analyse lib/ (6 fichiers)

## Résumé

| Fichier | Description | OK | À déplacer |
|---------|-------------|:--:|:----------:|
| apollo-client.ts | Client Apollo GraphQL avec HTTP/WebSocket | ✅ | - |
| networkConfig.ts | Config réseau INTUITION (testnet/mainnet) | ✅ | - |
| graphql/queries.ts | Requêtes GraphQL pour INTUITION | ✅ | - |
| graphql/subscriptions.ts | Subscriptions WebSocket temps réel | ✅ | - |
| graphql/types.ts | Types TypeScript pour schéma GraphQL | ✅ | - |
| graphql/README.md | Documentation GraphQL | ✅ | - |

---

## Détails par fichier

### apollo-client.ts ✅
**Description** : Configure Apollo Client (HTTP + WebSocket) pour INTUITION GraphQL API.
**Verdict** : OK - Bien placé dans lib/.

---

### networkConfig.ts ✅
**Description** : Gère les configs réseau (testnet/mainnet) avec localStorage.
**Verdict** : OK - Bien placé dans lib/.

**Exports** :
- `Network` - Type 'testnet' | 'mainnet'
- `NetworkConfig` - Interface config réseau
- `NETWORK_CONFIGS` - Constantes configs par réseau
- `getCurrentNetwork()` - Lit le réseau depuis localStorage
- `setCurrentNetwork()` - Enregistre le réseau
- `getNetworkConfig()` - Retourne config du réseau actuel

---

### graphql/queries.ts ✅
**Description** : Toutes les requêtes GraphQL (23 queries) pour atoms, triples, deposits, positions.
**Verdict** : OK - Bien placé dans lib/graphql/.

**Queries principales** :
- `GET_FOUNDER_PROPOSALS` - Propositions d'un fondateur
- `GET_USER_PROPOSALS` - Propositions d'un utilisateur
- `GET_USER_VOTES` - Votes d'un utilisateur
- `GET_TRIPLE_BY_ID` - Triple par ID
- `GET_TOTEM_CATEGORY` - Catégorie d'un totem
- etc.

---

### graphql/subscriptions.ts ✅
**Description** : Subscriptions WebSocket pour mises à jour temps réel (6 subscriptions).
**Verdict** : OK - Bien placé dans lib/graphql/.

**Subscriptions** :
- `SUBSCRIBE_FOUNDER_PROPOSALS` - Propositions en temps réel
- `SUBSCRIBE_ALL_PROPOSALS` - Toutes les propositions
- `SUBSCRIBE_CLAIM_DEPOSITS` - Votes sur un claim
- `SUBSCRIBE_USER_POSITIONS` - Positions utilisateur
- `SUBSCRIBE_TOTEM_CATEGORIES` - Catégories de totems
- `SUBSCRIBE_CATEGORIES_BY_TOTEMS` - Catégories par batch

---

### graphql/types.ts ✅
**Description** : Types TypeScript pour le schéma GraphQL INTUITION (359 lignes).
**Verdict** : OK - Bien placé dans lib/graphql/.

**Types de base** :
- `AtomType`, `VaultType` - Types enum
- `Account`, `Vault`, `Atom`, `Triple`, `Deposit`, `Position` - Entités core

**Types de résultats** :
- `GetFounderProposalsResult`, `GetUserVotesResult`, etc.
- `TripleVoteCounts`, `ProposalWithVotes`
- `TimelineDataPoint`, `DistributionBucket`, `FounderStats`

---

### graphql/README.md ✅
**Description** : Documentation complète de l'intégration GraphQL.
**Verdict** : OK - Bien placé dans lib/graphql/.

---

## Résumé des extractions

**Aucune extraction nécessaire** - Le dossier lib/ est bien organisé.

---

## Note importante

Le dossier `lib/graphql/` est **le bon endroit** pour les types GraphQL.

Les types dispersés dans hooks/ (voir [hooks.md](./hooks.md)) devraient être :
- Soit déplacés dans `lib/graphql/types.ts` s'ils sont liés au schéma GraphQL
- Soit déplacés dans `types/` s'ils sont spécifiques à l'application

**Types déjà bien placés dans lib/graphql/types.ts** :
- `Atom`, `Triple`, `Deposit`, `Position` - entités INTUITION
- `ProposalWithVotes`, `TripleVoteCounts` - types enrichis
- Types de résultats de queries

**Types à garder dans types/** (spécifiques app) :
- `FounderData` (types/founder.ts)
- `UserPosition` (à extraire de components/)
- `CategoryConfigType`, `Predicate` (à extraire de components/)
