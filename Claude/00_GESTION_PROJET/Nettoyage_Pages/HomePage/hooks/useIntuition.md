# useIntuition

**Fichier source :** `apps/web/src/hooks/useIntuition.ts`

---

## Ce qu'il fait

Hook principal pour interagir avec le protocole INTUITION. Permet de créer des atoms et des triples (claims) sur la blockchain.

Retourne :
- `createAtom(data)` : crée un atom (fondateur, prédicat, totem...)
- `createTriple(subject, predicate, object, deposit)` : crée un triple/claim
- `createClaim(options)` : crée un claim complet (gère les atoms existants)
- `createClaimWithCategory(options)` : crée un claim + triple de catégorie OFC
- `isReady` : true si le wallet est connecté et prêt
- `error` : erreur éventuelle

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `wagmi` → `usePublicClient`, `useWalletClient` | Accès blockchain |
| Librairie | `@apollo/client` → `useApolloClient` | Pour vérifier si un claim existe |
| Librairie | `viem` → `parseEther`, `formatEther`, `Hex` | Manipulation de valeurs |
| Package | `@0xintuition/sdk` | SDK pour créer atoms |
| Package | `@0xintuition/protocol` | ABI et config du contrat |
| Query | `GET_ATOMS_BY_LABELS` | Vérifie si un atom existe déjà |
| Query | `GET_TRIPLE_BY_ATOMS` | Vérifie si un triple existe déjà |
| Data | `categories.json` | Configuration des catégories OFC |

---

## Classe exportée

- `ClaimExistsError` : erreur spéciale quand un claim existe déjà (contient l'ID du claim existant)

---

## Utilisé par

- `VotePanel` (pour créer des claims)
- `AdminAuditPage` (pour créer des atoms admin)
