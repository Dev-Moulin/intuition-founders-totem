# 01 - Extraire constantes vers config/constants.ts

## Objectif

Centraliser les constantes dispersées dans un seul fichier.

---

## 1. Nouveau fichier à créer

**Chemin** : `apps/web/src/config/constants.ts` ✅ DÉJÀ CRÉÉ

---

## 2. Fichiers sources à modifier

### A. components/Header.tsx

**Ligne 8 - À commenter puis supprimer** :
```typescript
const ADMIN_WALLET = import.meta.env.VITE_ADMIN_WALLET_ADDRESS || '';
```

**Import à ajouter** :
```typescript
import { ADMIN_WALLET } from '../config/constants';
```

---

### B. components/NetworkSwitch.tsx

**Lignes 4-8 - À commenter puis supprimer** :
```typescript
/**
 * Wallet address autorisé à voir et utiliser le switch réseau
 * Défini via variable d'environnement VITE_ADMIN_WALLET_ADDRESS
 */
const AUTHORIZED_WALLET = import.meta.env.VITE_ADMIN_WALLET_ADDRESS || '';
```

**Import à ajouter** :
```typescript
import { ADMIN_WALLET } from '../config/constants';
```

**Ligne 20 - À modifier** :
- Remplacer `AUTHORIZED_WALLET` par `ADMIN_WALLET`

---

### C. pages/AdminAuditPage.tsx

**Ligne 10 - À commenter puis supprimer** :
```typescript
const ADMIN_WALLET = import.meta.env.VITE_ADMIN_WALLET_ADDRESS || '';
```

**Import à ajouter** :
```typescript
import { ADMIN_WALLET } from '../config/constants';
```

---

### D. hooks/useWhitelist.ts

**Lignes 5-12 - À commenter puis supprimer** :
```typescript
/**
 * NFT Contract address on Base Mainnet
 * Holders of this NFT are eligible to participate in the voting
 *
 * NOTE: This NFT is on Base Mainnet, but the app runs on INTUITION L3 Testnet.
 * We use cross-chain verification to check NFT ownership on Base while voting on INTUITION L3.
 */
const NFT_CONTRACT = '0x98e240326966e86ad6ec27e13409ffb748788f8c' as const;
```

**Import à ajouter** :
```typescript
import { NFT_CONTRACT } from '../config/constants';
```

---

## 3. Étapes d'exécution

1. [x] Créer `config/constants.ts` ✅ FAIT
2. [ ] Ajouter imports + commenter ancien code (4 fichiers)
3. [ ] Build + Test
4. [ ] Paul contrôle
5. [ ] Supprimer les commentaires
6. [ ] Build + Test final
7. [ ] Commit

---

## Validation Paul

- [ ] Plan validé
- [ ] Exécution autorisée
