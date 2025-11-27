# useFoundersForHomePage

**Fichier source :** `apps/web/src/hooks/useFoundersForHomePage.ts`

---

## Ce qu'il fait

Récupère les 42 fondateurs avec leurs atomIds et totems gagnants pour la HomePage.

Combine :
1. Données statiques des fondateurs depuis JSON
2. AtomIds depuis GraphQL INTUITION
3. Totems gagnants calculés depuis toutes les propositions

Retourne pour chaque fondateur :
- Infos de base (nom, bio, image...)
- `atomId` (ID on-chain)
- `winningTotem` (le totem avec le meilleur score)
- `proposalCount` (nombre de propositions)
- `recentActivityCount` (activité des dernières 24h)

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `@apollo/client` → `useQuery` | Requêtes GraphQL |
| Query | `GET_ATOMS_BY_LABELS` | Récupère les atomIds des fondateurs |
| Query | `GET_ALL_PROPOSALS` | Récupère toutes les propositions |
| Data | `founders.json` | Liste statique des 42 fondateurs |
| Type | `FounderData` | Type de données fondateur (de `FounderCard.tsx`) |
| Fonction | `aggregateTriplesByObject` | Agrège les votes par totem |

---

## Sous-dépendances

- `aggregateTriplesByObject` vient de `utils/aggregateVotes.ts`

---

## Types exportés

- `TrendDirection` : `'up' | 'down' | 'neutral'`
- `WinningTotem` : données du totem gagnant
- `FounderForHomePage` : fondateur enrichi pour HomePage

---

## Utilisé par

- `HomePage` (directement)
- Utilisé comme type dans `FounderHomeCard`, `FounderExpandedView`, `VotePanel`
