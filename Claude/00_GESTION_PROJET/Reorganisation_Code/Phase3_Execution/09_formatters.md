# 09 - utils/formatters.ts ✅ TERMINÉ

## Résultat

| Action | Status |
|--------|--------|
| Créer `utils/formatters.ts` | ✅ |
| Migrer `formatTimeSinceUpdate` | ✅ |
| Migrer `getTimeAgo` | ✅ |
| Mettre à jour `useFounderSubscription.ts` | ✅ |
| Mettre à jour `VotePanel.tsx` | ✅ |
| Mettre à jour `hooks/index.ts` | ✅ |
| Mettre à jour `utils/index.ts` | ✅ |
| Build final | ✅ |

---

## Fichier créé

**`apps/web/src/utils/formatters.ts`** :
- `formatTimeSinceUpdate(seconds)` → "à l'instant", "il y a 5s", "il y a 2min"
- `getTimeAgo(timestamp)` → "à l'instant", "2m", "1h", "2j"

---

## Fichiers modifiés

| Fichier | Modification |
|---------|--------------|
| `hooks/useFounderSubscription.ts` | Re-export depuis utils/formatters |
| `components/VotePanel.tsx` | Import depuis utils/formatters |
| `hooks/index.ts` | Export depuis utils/formatters |
| `utils/index.ts` | Export des 2 fonctions |

---

## Duplication éliminée

Les 2 fonctions étaient dans :
- `useFounderSubscription.ts` (lignes 165-172) ❌ Supprimé
- `VotePanel.tsx` (lignes 22-36) ❌ Supprimé

→ Maintenant centralisées dans `utils/formatters.ts`

---

## Date

28/11/2025
