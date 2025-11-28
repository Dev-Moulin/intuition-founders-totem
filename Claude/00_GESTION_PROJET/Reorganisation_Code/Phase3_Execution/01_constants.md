# 01 - config/constants.ts ✅ TERMINÉ

## Résultat

| Action | Status |
|--------|--------|
| Créer `config/constants.ts` | ✅ |
| Migrer `Header.tsx` | ✅ |
| Migrer `NetworkSwitch.tsx` | ✅ |
| Migrer `AdminAuditPage.tsx` | ✅ |
| Migrer `useWhitelist.ts` | ✅ |
| Build final | ✅ |

---

## Fichier créé

**`apps/web/src/config/constants.ts`** :
- `ADMIN_WALLET` - Adresse admin depuis env
- `NFT_CONTRACT` - `0x98e240326966e86ad6ec27e13409ffb748788f8c`
- `OFC_PREFIX` - `'OFC:'`

---

## Fichiers modifiés

| Fichier | Modification |
|---------|--------------|
| `components/Header.tsx` | Import `ADMIN_WALLET` depuis constants |
| `components/NetworkSwitch.tsx` | Import `ADMIN_WALLET`, renommé `AUTHORIZED_WALLET` → `ADMIN_WALLET` |
| `pages/AdminAuditPage.tsx` | Import `ADMIN_WALLET` depuis constants |
| `hooks/useWhitelist.ts` | Import `NFT_CONTRACT` depuis constants |

---

## Date

28/11/2025
