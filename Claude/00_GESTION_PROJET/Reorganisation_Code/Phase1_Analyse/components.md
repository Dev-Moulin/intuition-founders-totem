# Analyse components/ (13 fichiers)

## Résumé

| Fichier | OK | À déplacer |
|---------|:--:|:----------:|
| ConnectButton.tsx | ✅ | - |
| Footer.tsx | ✅ | - |
| Layout.tsx | ✅ | - |
| ClaimExistsModal.tsx | ⚠️ | 2 interfaces → types/ |
| FounderExpandedView.tsx | ⚠️ | 1 interface + 1 fonction → types/ + utils/ |
| FounderHomeCard.tsx | ⚠️ | 1 interface + 1 fonction → types/ + utils/ |
| NetworkGuard.tsx | ✅ | - |
| VotePanel.tsx | ⚠️ | 4 interfaces + 2 fonctions + 1 constante → types/ + utils/ + config/ |
| RefreshIndicator.tsx | ✅ | - |
| LanguageSwitcher.tsx | ✅ | - |
| WithdrawModal.tsx | ⚠️ | 1 interface → types/ |
| Header.tsx | ⚠️ | 1 constante → config/ |
| NetworkSwitch.tsx | ⚠️ | 1 constante → config/ |

---

## Détails par fichier

### ConnectButton.tsx ✅
**Description** : Bouton de connexion wallet RainbowKit personnalisé.
**Verdict** : OK - Composant pur, pas de code à extraire.

---

### Footer.tsx ✅
**Description** : Footer avec liens INTUITION, GitHub, Base.
**Verdict** : OK - Composant pur.

---

### Layout.tsx ✅
**Description** : Layout principal (Header + children + Footer).
**Verdict** : OK - Composant pur avec 1 interface locale `LayoutProps`.

---

### ClaimExistsModal.tsx ⚠️
**Description** : Modal pour voter sur un claim existant.

**À extraire** :
- `interface UserPosition` (L11-14) → `types/position.ts`
- `interface ExistingClaimInfo` (L16-23) → `types/claim.ts`

---

### FounderExpandedView.tsx ⚠️
**Description** : Vue étendue d'un fondateur avec VotePanel.

**À extraire** :
- `interface FounderExpandedViewProps` (L13-16) → OK local (props du composant)
- `formatScore()` (L75-84) → `utils/formatters.ts` (DUPLIQUÉ dans FounderHomeCard)

---

### FounderHomeCard.tsx ⚠️
**Description** : Carte compacte d'un fondateur pour la grille.

**À extraire** :
- `interface FounderHomeCardProps` (L5-9) → OK local
- `formatScore()` (L25-34) → `utils/formatters.ts` (DUPLIQUÉ dans FounderExpandedView)

---

### NetworkGuard.tsx ✅
**Description** : Guard qui vérifie le réseau et l'éligibilité whitelist.
**Verdict** : OK - Interface locale `NetworkGuardProps` acceptable.

---

### VotePanel.tsx ⚠️
**Description** : Panel de vote avec sélection prédicat/totem.

**À extraire** :
- `const OFC_PREFIX = 'OFC:'` (L17) → `config/constants.ts`
- `getTimeAgo()` (L22-36) → `utils/formatters.ts`
- `interface CategoryConfigType` (L39-52) → `types/category.ts`
- `getCategoryName()` (L58) → `utils/formatters.ts`
- `interface Predicate` (L60-66) → `types/predicate.ts`
- `interface VotePanelProps` (L68-70) → OK local

---

### RefreshIndicator.tsx ✅
**Description** : Indicateur de statut WebSocket (connecté/pause/déconnecté).
**Verdict** : OK - Interface `RefreshIndicatorProps` locale acceptable.

---

### LanguageSwitcher.tsx ✅
**Description** : Bouton toggle FR/EN.
**Verdict** : OK - Composant pur.

---

### WithdrawModal.tsx ⚠️
**Description** : Modal pour retirer TRUST d'un vault.

**À extraire** :
- `interface UserPosition` (L9-16) → `types/position.ts` (DUPLIQUÉ dans ClaimExistsModal)
- `interface WithdrawModalProps` (L18-34) → OK local

---

### Header.tsx ⚠️
**Description** : Header avec navigation et connexion wallet.

**À extraire** :
- `const ADMIN_WALLET = import.meta.env.VITE_ADMIN_WALLET_ADDRESS` (L8) → `config/constants.ts` (DUPLIQUÉ dans NetworkSwitch)

---

### NetworkSwitch.tsx ⚠️
**Description** : Toggle testnet/mainnet (admin only).

**À extraire** :
- `const AUTHORIZED_WALLET = import.meta.env.VITE_ADMIN_WALLET_ADDRESS` (L8) → `config/constants.ts` (DUPLIQUÉ dans Header)

---

## Résumé des extractions

### Vers types/
- `UserPosition` (dupliqué 2x)
- `ExistingClaimInfo`
- `CategoryConfigType`
- `Predicate`

### Vers utils/formatters.ts
- `formatScore()` (dupliqué 2x)
- `getTimeAgo()`
- `getCategoryName()`

### Vers config/constants.ts
- `OFC_PREFIX`
- `ADMIN_WALLET` (dupliqué 2x)
