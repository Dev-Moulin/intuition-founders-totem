# Configuration Testnet pour le développement

## Réseau choisi : Base Sepolia

Pour le développement et les tests, nous utilisons **Base Sepolia** (Chain ID: 84532).

### Pourquoi Base Sepolia ?
- ✅ Même réseau que la production (Base Mainnet)
- ✅ Migration facile vers mainnet
- ✅ Plus stable que l'Intuition L3 (encore en développement)
- ✅ Contrats déjà déployés et testés

## Adresses des contrats (Base Sepolia)

### Contrats INTUITION Protocol

```
Token $TRUST (Test):        0xA54b4E6e356b963Ee00d1C947f478d9194a1a210
BaseEmissionsController:    0xC14773Aae24aA60CB8F261995405C28f6D742DCf
TimelockController:         0x9099BC9fd63B01F94528B60CEEB336C679eb6d52
```

### Récupérer l'adresse du MultiVault

Le SDK récupère automatiquement l'adresse correcte :

```typescript
import { getEthMultiVaultAddressFromChainId } from '@0xintuition/sdk';
import { baseSepolia } from 'viem/chains';

const vaultAddress = getEthMultiVaultAddressFromChainId(baseSepolia.id);
```

## Configuration du SDK

### Installation

```bash
npm install @0xintuition/sdk @0xintuition/protocol viem@2.x.x
```

### Setup de base

```typescript
import { createPublicClient, createWalletClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// Client pour lire la blockchain
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http()
});

// Client pour écrire (transactions)
const account = privateKeyToAccount('0xVOTRE_CLE_PRIVEE_TESTNET');
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http()
});
```

### Configuration avec RPC provider

Pour de meilleures performances, utiliser Alchemy ou autre provider :

```typescript
import { http } from 'viem';

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http('https://base-sepolia.g.alchemy.com/v2/VOTRE_API_KEY')
});
```

## Obtenir des tokens de test

### 1. ETH pour le gas (Base Sepolia)

**Faucets Base Sepolia :**
- https://www.alchemy.com/faucets/base-sepolia
- https://docs.base.org/docs/tools/network-faucets/

**Montant nécessaire :** ~0.01 ETH suffit pour tester

### 2. $TRUST tokens de test

**Faucet INTUITION :**
- https://testnet.hub.intuition.systems/

**Alternative :** Si le faucet ne fonctionne pas, contacter l'équipe INTUITION sur Discord.

## Configuration GraphQL API

### URL Testnet

```typescript
import { createClient } from '@0xintuition/graphql';

const client = createClient({
  apiUrl: 'https://testnet.intuition.sh/v1/graphql'
});
```

### Exemple de query

```typescript
const query = `
  query GetTestAtoms {
    atoms(limit: 10, order_by: { created_at: desc }) {
      id
      label
      creator {
        id
      }
    }
  }
`;

const result = await client.request(query);
```

## Workflow de test

### Étape 1 : Setup wallet testnet

1. Créer un nouveau wallet pour le testnet (JAMAIS utiliser un wallet mainnet)
2. Obtenir de l'ETH Base Sepolia via faucet
3. Obtenir du $TRUST via le faucet INTUITION

### Étape 2 : Tester la création d'Atoms

```typescript
import { createAtomFromString } from '@0xintuition/sdk';

const testAtom = await createAtomFromString('Test Totem Lion');
console.log('Atom créé:', testAtom.termId);
```

### Étape 3 : Tester la création de Triples

```typescript
import { createTripleStatement } from '@0xintuition/sdk';

const triple = await createTripleStatement(
  founderAtomId,
  predicateAtomId,
  totemAtomId
);
console.log('Triple créé:', triple.tripleId);
```

### Étape 4 : Tester les votes (deposits)

```typescript
import { depositTriple } from '@0xintuition/sdk';
import { parseEther } from 'viem';

// Approuver d'abord le contrat
await approve(vaultAddress, parseEther('10'));

// Déposer
await depositTriple(
  tripleId,
  parseEther('10'),
  true  // FOR
);
```

## Explorers et outils

### Base Sepolia Explorer
- **Basescan Testnet** : https://sepolia.basescan.org/
- Vérifier les transactions
- Voir les contrats
- Vérifier les balances

### INTUITION Explorer (si disponible)
- Explorer les Atoms créés
- Visualiser les Triples
- Voir les votes en temps réel

## Vérification de la configuration

### Checklist avant de commencer

- [ ] Wallet testnet créé
- [ ] ETH Base Sepolia reçu (>0.005 ETH)
- [ ] $TRUST testnet reçu (>10 TRUST)
- [ ] SDK installé (`@0xintuition/sdk`)
- [ ] Clients viem configurés
- [ ] RPC endpoint configuré
- [ ] Adresse MultiVault récupérée

### Script de test complet

```typescript
import { createPublicClient, createWalletClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import {
  getEthMultiVaultAddressFromChainId,
  createAtomFromString
} from '@0xintuition/sdk';

async function testSetup() {
  // 1. Setup clients
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http()
  });

  const account = privateKeyToAccount(process.env.TESTNET_PRIVATE_KEY);
  const walletClient = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http()
  });

  // 2. Vérifier balance ETH
  const ethBalance = await publicClient.getBalance({
    address: account.address
  });
  console.log('ETH Balance:', ethBalance);

  // 3. Récupérer vault address
  const vaultAddress = getEthMultiVaultAddressFromChainId(baseSepolia.id);
  console.log('MultiVault Address:', vaultAddress);

  // 4. Créer un Atom de test
  try {
    const testAtom = await createAtomFromString('Test Setup Successful');
    console.log('✅ Setup OK! Atom créé:', testAtom.termId);
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testSetup();
```

## Migration vers Mainnet

### Différences à changer

1. **Réseau** : `baseSepolia` → `base`
2. **RPC URL** : URL testnet → URL mainnet
3. **Adresse token** : Test TRUST → TRUST mainnet
4. **Faucet** : Pas de faucet, vraie $TRUST et ETH nécessaires

### Exemple de config mainnet

```typescript
import { base } from 'viem/chains';

const publicClient = createPublicClient({
  chain: base,  // ← Changement ici
  transport: http('https://base-mainnet.g.alchemy.com/v2/VOTRE_API_KEY')
});
```

### Données testnet non transférables

⚠️ **Important** : Les Atoms/Triples créés sur testnet **ne seront PAS** sur mainnet.

Il faudra tout recréer sur mainnet :
- Les Atoms des fondateurs
- Le prédicat "represented_by"
- Tous les totems proposés
- Tous les votes

## Bonnes pratiques testnet

### Sécurité
- ✅ Utiliser un wallet dédié testnet
- ✅ Ne JAMAIS mettre de vrais fonds
- ✅ Stocker la clé privée dans `.env` (ne pas commit)
- ✅ Ajouter `.env` au `.gitignore`

### Tests
- ✅ Tester toutes les fonctionnalités une par une
- ✅ Vérifier les transactions dans l'explorer
- ✅ Tester les cas d'erreur (rejet transaction, etc.)
- ✅ Vérifier les montants et balances

### Débogage
- ✅ Console.log les IDs des Atoms/Triples créés
- ✅ Sauvegarder les adresses et IDs importants
- ✅ Utiliser l'explorer pour vérifier les données on-chain
- ✅ Tester avec plusieurs wallets différents

## Problèmes courants

### Erreur : "Insufficient funds"
- **Solution** : Obtenir plus d'ETH via faucet
- Besoin : ~0.005 ETH pour créer Atoms/Triples

### Erreur : "Approval required"
- **Solution** : Approuver le contrat avant deposit
- Voir exemple dans "Tester les votes" ci-dessus

### Erreur : "Network mismatch"
- **Solution** : Vérifier que le wallet est bien sur Base Sepolia
- Chain ID doit être 84532

### Faucet ne fonctionne pas
- **Solution** :
  - Essayer plusieurs faucets
  - Attendre quelques heures
  - Demander sur Discord INTUITION

## Ressources

### Documentation officielle
- **SDK Docs** : https://www.docs.intuition.systems/docs/developer-tools/sdks/overview
- **Testnet Hub** : https://testnet.hub.intuition.systems/
- **Base Docs** : https://docs.base.org/

### Outils
- **Base Sepolia Faucet** : https://www.alchemy.com/faucets/base-sepolia
- **INTUITION Faucet** : https://testnet.hub.intuition.systems/
- **Basescan Testnet** : https://sepolia.basescan.org/

### Support
- **Discord INTUITION** : Demander de l'aide
- **GitHub Issues** : https://github.com/0xIntuition/intuition-ts/issues
