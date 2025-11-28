# Analyse config/ (3 fichiers)

## Résumé

| Fichier | Description | OK | À déplacer |
|---------|-------------|:--:|:----------:|
| chains.ts | Définition chain INTUITION Mainnet | ✅ | - |
| wagmi.ts | Config wagmi/RainbowKit (chains + WalletConnect) | ✅ | - |
| intuition.ts | Config INTUITION (MultiVault, endpoints, publicClient) | ✅ | - |

---

## Détails par fichier

### chains.ts ✅
**Description** : Définit la chain INTUITION Mainnet (chainId 1155) avec RPC, WebSocket et explorer.
**Verdict** : OK - Bien placé dans config/.

---

### wagmi.ts ✅
**Description** : Configure wagmi avec RainbowKit (chains INTUITION + Base, WalletConnect).
**Verdict** : OK - Bien placé dans config/.

**Exports** :
- `config` - Configuration wagmi/RainbowKit
- `currentIntuitionChain` - Chain INTUITION active (testnet ou mainnet)

---

### intuition.ts ✅
**Description** : Configuration INTUITION (adresse MultiVault, endpoints GraphQL, publicClient).
**Verdict** : OK - Bien placé dans config/.

**Exports** :
- `INTUITION_CONFIG` - Objet config complet
- `publicClient` - Client viem pour lecture blockchain
- `getApiUrl()` - URL API backend

---

## Résumé des extractions

**Aucune extraction nécessaire** - Le dossier config/ est bien organisé.

---

## Note

Les constantes `ADMIN_WALLET` et `NFT_CONTRACT` trouvées dans components/ et hooks/ devraient être ajoutées ici dans un fichier `constants.ts`.

Suggestion de structure finale :
```
config/
├── chains.ts        # Définitions de chains
├── wagmi.ts         # Config wagmi/RainbowKit
├── intuition.ts     # Config INTUITION protocol
└── constants.ts     # Constantes (ADMIN_WALLET, NFT_CONTRACT, OFC_PREFIX)
```
