# 03 - types/withdraw.ts ✅ TERMINÉ

## Résultat

| Action | Status |
|--------|--------|
| Créer `types/withdraw.ts` | ✅ |
| Migrer `WithdrawStatus` depuis `useWithdraw.ts` | ✅ |
| Migrer `WithdrawError` depuis `useWithdraw.ts` | ✅ |
| Migrer `WithdrawPreview` depuis `useWithdraw.ts` | ✅ |
| Mettre à jour `hooks/index.ts` | ✅ |
| Build final | ✅ |

---

## Fichier créé

**`apps/web/src/types/withdraw.ts`** :
- `WithdrawStatus` - Type union pour le statut d'un withdrawal
- `WithdrawError` - Interface pour les erreurs de withdrawal
- `WithdrawPreview` - Interface pour preview des montants

---

## Fichiers modifiés

| Fichier | Modification |
|---------|--------------|
| `hooks/useWithdraw.ts` | Import depuis types/withdraw, supprimé définitions locales |
| `hooks/index.ts` | Re-export depuis `../types/withdraw` |

---

## Date

28/11/2025
