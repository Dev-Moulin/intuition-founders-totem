# 07 - types/voter.ts + lib/graphql/queries.ts ✅ TERMINÉ

## Résultat

| Action | Status |
|--------|--------|
| Créer `types/voter.ts` avec `TotemVoter` | ✅ |
| Ajouter `GET_TOTEM_VOTERS` dans `lib/graphql/queries.ts` | ✅ |
| Migrer imports dans `useTotemVoters.ts` | ✅ |
| Mettre à jour `hooks/index.ts` | ✅ |
| Build final | ✅ |

---

## Fichiers créés

**`apps/web/src/types/voter.ts`** :
- `TotemVoter` - Interface pour les informations d'un votant

---

## Fichiers modifiés

| Fichier | Modification |
|---------|--------------|
| `lib/graphql/queries.ts` | Ajout de `GET_TOTEM_VOTERS` query |
| `hooks/useTotemVoters.ts` | Import depuis types/voter + lib/graphql/queries |
| `hooks/index.ts` | Re-export TotemVoter depuis types/voter |

---

## Date

28/11/2025
