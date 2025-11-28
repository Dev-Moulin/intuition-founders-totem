# 02 & 03 - types/vote.ts ✅ TERMINÉ

## Résultat

| Action | Status |
|--------|--------|
| Créer `types/vote.ts` | ✅ |
| Migrer `VoteStatus`, `VoteError` depuis `useVote.ts` | ✅ |
| Migrer `VoteWithDetails` depuis `useUserVotes.ts` | ✅ |
| Mettre à jour `hooks/index.ts` | ✅ |
| Build final | ✅ |

---

## Fichier créé

**`apps/web/src/types/vote.ts`** :
- `VoteWithDetails` - Interface enrichie de vote (extends Deposit)
- `VoteStatus` - Type union pour le statut d'un vote
- `VoteError` - Interface pour les erreurs de vote

---

## Fichiers modifiés

| Fichier | Modification |
|---------|--------------|
| `hooks/useVote.ts` | Import `VoteStatus`, `VoteError` depuis types/vote |
| `hooks/useUserVotes.ts` | Import `VoteWithDetails` depuis types/vote |
| `hooks/index.ts` | Re-export depuis `../types/vote` |

---

## Date

28/11/2025
