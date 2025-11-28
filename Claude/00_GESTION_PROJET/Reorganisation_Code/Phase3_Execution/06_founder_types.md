# 06 - types/founder.ts ✅ TERMINÉ

## Résultat

| Action | Status |
|--------|--------|
| Ajouter types dans `types/founder.ts` | ✅ |
| Migrer `TrendDirection` depuis `useFoundersForHomePage.ts` | ✅ |
| Migrer `WinningTotem` depuis `useFoundersForHomePage.ts` | ✅ |
| Migrer `FounderForHomePage` depuis `useFoundersForHomePage.ts` | ✅ |
| Mettre à jour `hooks/index.ts` | ✅ |
| Build final | ✅ |

---

## Fichier modifié

**`apps/web/src/types/founder.ts`** (existant) - Ajout de :
- `TrendDirection` - Type union pour tendance (up/down/neutral)
- `WinningTotem` - Interface pour le totem gagnant
- `FounderForHomePage` - Interface enrichie (extends FounderData)

---

## Fichiers modifiés

| Fichier | Modification |
|---------|--------------|
| `types/founder.ts` | Ajout des 3 types |
| `hooks/useFoundersForHomePage.ts` | Import depuis types/founder, re-export pour compatibilité |
| `hooks/index.ts` | Ajout export useFoundersForHomePage + types |

---

## Date

28/11/2025
