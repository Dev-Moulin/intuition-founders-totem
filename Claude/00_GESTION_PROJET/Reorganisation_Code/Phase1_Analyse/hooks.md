# Analyse hooks/ (13 fichiers + 4 tests)

## Résumé

| Fichier | Description | OK | À déplacer |
|---------|-------------|:--:|:----------:|
| useUserVotes.ts | Récupère les votes d'un utilisateur | ⚠️ | 1 interface + 5 fonctions → types/ + utils/ |
| useWhitelist.ts | Vérifie si wallet possède le NFT requis | ⚠️ | 2 constantes → config/ |
| useTotemVoters.ts | Liste les votants d'un totem | ⚠️ | 1 interface + 1 query GQL → types/ + lib/ |
| useFounderProposals.ts | Récupère les proposals d'un fondateur | ⚠️ | 3 fonctions → utils/ |
| useVoteStats.ts | Stats de votes (timeline, distribution) | ✅ | - |
| useWindowFocus.ts | Détecte focus fenêtre/onglet | ✅ | - |
| useWithdraw.ts | Retire TRUST d'un vault | ⚠️ | 3 types + 1 fonction → types/ + utils/ |
| useIntuition.ts | Crée atoms/triples INTUITION | ⚠️ | 4 types + 1 class → types/ |
| useProtocolConfig.ts | Config protocole (coûts, frais) | ⚠️ | 1 interface → types/ |
| useFounderSubscription.ts | WebSocket temps réel founders | ⚠️ | 3 fonctions + 1 fonction export → utils/ |
| useNetwork.ts | Switch testnet/mainnet | ✅ | - |
| useVote.ts | Vote sur un claim existant | ⚠️ | 2 types → types/ |
| useFoundersForHomePage.ts | Founders avec totems gagnants | ⚠️ | 3 types → types/ |
| index.ts | Barrel exports | ✅ | - |

---

## Détails par fichier

### useUserVotes.ts ⚠️
**Description** : Récupère les votes d'un utilisateur (deposits, positions).

**À extraire** :
- `interface VoteWithDetails` (L18-22) → `types/vote.ts`
- `enrichDeposit()` (L27-36) → `utils/vote.ts`
- `getTotalVotedAmount()` (L161-166) → `utils/vote.ts`
- `filterVotesByType()` (L175-180) → `utils/vote.ts`
- `groupVotesByTerm()` (L188-199) → `utils/vote.ts`
- `formatTotalVotes()` (L208-215) → `utils/formatters.ts`
- `hasVotedOnTerm()` (L224-229) → `utils/vote.ts`
- `getUserVoteDirection()` (L238-245) → `utils/vote.ts`

---

### useWhitelist.ts ⚠️
**Description** : Vérifie si un wallet possède le NFT OFC sur Base.

**À extraire** :
- `const NFT_CONTRACT` (L12) → `config/constants.ts`
- `const ABI` (L17-25) → `config/abis.ts` ou garder local

---

### useTotemVoters.ts ⚠️
**Description** : Liste les derniers votants sur un totem spécifique.

**À extraire** :
- `GET_TOTEM_VOTERS` query (L8-27) → `lib/graphql/queries.ts` (centraliser les queries)
- `interface TotemVoter` (L32-39) → `types/voter.ts`
- `interface GetTotemVotersResult` (L44-54) → `lib/graphql/types.ts`

---

### useFounderProposals.ts ⚠️
**Description** : Récupère les proposals d'un fondateur avec votes.

**À extraire** :
- `calculateVoteCounts()` (L20-38) → `utils/vote.ts` (DUPLIQUÉ dans useFounderSubscription)
- `calculatePercentage()` (L43-52) → `utils/vote.ts` (DUPLIQUÉ dans useFounderSubscription)
- `enrichTripleWithVotes()` (L57-66) → `utils/vote.ts` (DUPLIQUÉ dans useFounderSubscription)
- `sortProposalsByVotes()` (L192-200) → `utils/vote.ts`
- `getWinningProposal()` (L208-218) → `utils/vote.ts`
- `formatVoteAmount()` (L227-234) → `utils/formatters.ts`

---

### useVoteStats.ts ✅
**Description** : Stats de votes (timeline, distribution, top voters).
**Verdict** : OK - Types et queries bien organisés.

---

### useWindowFocus.ts ✅
**Description** : Détecte si onglet/fenêtre est actif (pour pause subscriptions).
**Verdict** : OK - Interface locale `UseWindowFocusResult` acceptable.

---

### useWithdraw.ts ⚠️
**Description** : Retire TRUST d'un vault après vote.

**À extraire** :
- `type WithdrawStatus` (L11-16) → `types/withdraw.ts`
- `interface WithdrawError` (L21-24) → `types/withdraw.ts`
- `interface WithdrawPreview` (L29-34) → `types/withdraw.ts`
- `interface UseWithdrawResult` (L39-50) → OK local
- `estimateWithdrawAmount()` (L246-274) → `utils/withdraw.ts`

---

### useIntuition.ts ⚠️
**Description** : Interactions avec INTUITION (create atoms, triples, claims).

**À extraire** :
- `interface CategoryConfig` (L16-29) → `types/category.ts`
- `interface CreateAtomResult` (L34-38) → `types/intuition.ts`
- `interface CreateTripleResult` (L40-46) → `types/intuition.ts`
- `class ClaimExistsError` (L52-74) → `lib/errors.ts` ou `types/errors.ts`
- `interface FounderData` (L76-84) → DUPLIQUÉ - déjà dans `types/founder.ts`

---

### useProtocolConfig.ts ⚠️
**Description** : Récupère la config protocole INTUITION (coûts, frais).

**À extraire** :
- `interface ProtocolConfig` (L13-34) → `types/protocol.ts`

---

### useFounderSubscription.ts ⚠️
**Description** : WebSocket temps réel pour proposals d'un fondateur.

**À extraire** :
- `calculateVoteCounts()` (L16-33) → `utils/vote.ts` (DUPLIQUÉ dans useFounderProposals)
- `calculatePercentage()` (L38-45) → `utils/vote.ts` (DUPLIQUÉ dans useFounderProposals)
- `enrichTripleWithVotes()` (L50-59) → `utils/vote.ts` (DUPLIQUÉ dans useFounderProposals)
- `formatTimeSinceUpdate()` (L212-219) → `utils/formatters.ts` (exporté, utilisé par RefreshIndicator)

---

### useNetwork.ts ✅
**Description** : Gère le switch testnet/mainnet.
**Verdict** : OK - Simple wrapper autour de networkConfig.

---

### useVote.ts ⚠️
**Description** : Vote sur un claim existant (deposit TRUST).

**À extraire** :
- `type VoteStatus` (L9-14) → `types/vote.ts`
- `interface VoteError` (L16-20) → `types/vote.ts`
- `interface UseVoteResult` (L22-30) → OK local

---

### useFoundersForHomePage.ts ⚠️
**Description** : Récupère tous les founders avec totems gagnants pour HomePage.

**À extraire** :
- `type TrendDirection` (L12) → `types/founder.ts`
- `interface WinningTotem` (L17-27) → `types/founder.ts`
- `interface FounderForHomePage` (L32-37) → `types/founder.ts`

---

### index.ts ✅
**Description** : Barrel exports de tous les hooks.
**Verdict** : OK - Organisation propre.

---

## Résumé des extractions

### Vers types/
- `VoteWithDetails`, `VoteStatus`, `VoteError` → `types/vote.ts`
- `WithdrawStatus`, `WithdrawError`, `WithdrawPreview` → `types/withdraw.ts`
- `TotemVoter` → `types/voter.ts`
- `CategoryConfig` → `types/category.ts`
- `CreateAtomResult`, `CreateTripleResult` → `types/intuition.ts`
- `ProtocolConfig` → `types/protocol.ts`
- `TrendDirection`, `WinningTotem`, `FounderForHomePage` → `types/founder.ts`
- `ClaimExistsError` → `types/errors.ts`

### Vers utils/
- `calculateVoteCounts()`, `calculatePercentage()`, `enrichTripleWithVotes()` (dupliqués 2x)
- `sortProposalsByVotes()`, `getWinningProposal()`
- `getTotalVotedAmount()`, `filterVotesByType()`, `groupVotesByTerm()`
- `hasVotedOnTerm()`, `getUserVoteDirection()`
- `formatTotalVotes()`, `formatVoteAmount()`, `formatTimeSinceUpdate()`
- `estimateWithdrawAmount()`

### Vers config/
- `NFT_CONTRACT` → `config/constants.ts`

### Vers lib/graphql/
- `GET_TOTEM_VOTERS` query → `lib/graphql/queries.ts`
- `GetTotemVotersResult` type → `lib/graphql/types.ts`

---

## Code dupliqué identifié

| Fonction | Fichiers | Action |
|----------|----------|--------|
| `calculateVoteCounts()` | useFounderProposals, useFounderSubscription | → utils/vote.ts |
| `calculatePercentage()` | useFounderProposals, useFounderSubscription | → utils/vote.ts |
| `enrichTripleWithVotes()` | useFounderProposals, useFounderSubscription | → utils/vote.ts |
| `FounderData` interface | useIntuition, types/founder | → garder uniquement types/founder.ts |
