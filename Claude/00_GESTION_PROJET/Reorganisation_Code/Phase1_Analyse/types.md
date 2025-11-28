# Analyse types/ (1 fichier)

## Résumé

| Fichier | Description | OK | À déplacer |
|---------|-------------|:--:|:----------:|
| founder.ts | Interface FounderData pour données fondateurs | ✅ | - |

---

## Détails par fichier

### founder.ts ✅
**Description** : Interface `FounderData` pour les données des fondateurs OFC.
**Verdict** : OK - Bien placé dans types/.

**Exports** :
- `FounderData` - Interface avec id, name, shortBio, fullBio, socials, image, atomId

---

## Résumé des extractions

**Aucune extraction nécessaire** - Le fichier est bien organisé.

---

## Types à ajouter dans types/

D'après l'analyse des autres dossiers, les types suivants devraient être extraits et ajoutés dans `types/` :

### Depuis components/
- `UserPosition` (de VotePanel.tsx) → `types/vote.ts`
- `CategoryConfigType` (de VotePanel.tsx) → `types/category.ts`
- `Predicate` (de CreateClaimModal.tsx) → `types/claim.ts`
- `ExistingClaimInfo` (de CreateClaimModal.tsx) → `types/claim.ts`

### Depuis hooks/
- `Founder` (de useFounders.ts) → **déjà `FounderData` dans types/founder.ts**
- `EnrichedTriple` (de useVotePanel.ts) → `types/vote.ts`
- `UseVotePanelReturn` (de useVotePanel.ts) → `types/vote.ts`
- `VoteData` (de useVoteData.ts) → `types/vote.ts`
- `UseVoteDataReturn` (de useVoteData.ts) → `types/vote.ts`
- `VotePanelVoter` (de useVotePanelVoters.ts) → `types/vote.ts`

### Depuis utils/
- `VoteResult`, `AggregatedVotes`, `VotingStats` (de aggregateVotes.ts) → `types/vote.ts`

---

## Structure finale suggérée

```
types/
├── founder.ts      # FounderData (existant)
├── vote.ts         # UserPosition, EnrichedTriple, VoteData, VotePanelVoter, etc.
├── category.ts     # CategoryConfigType
└── claim.ts        # Predicate, ExistingClaimInfo
```

Alternativement, un seul fichier `types/index.ts` avec tous les types app-specific.
