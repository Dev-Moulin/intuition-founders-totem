# Connexion au site

## Étape 1 : Arrivée sur le site

L'utilisateur arrive sur la page d'accueil du site de vote des totems INTUITION.

## Étape 2 : Connexion wallet

### Prérequis
- Avoir un wallet compatible (MetaMask, Coinbase Wallet, WalletConnect, etc.)
- Être sur le réseau **Base Mainnet** (chain ID: 8453)

### Processus
1. Cliquer sur le bouton "Connect Wallet"
2. Choisir son wallet provider
3. Approuver la connexion dans le wallet
4. Le site détecte automatiquement l'adresse du wallet

## Étape 3 : Vérification d'éligibilité

Une fois connecté, le site vérifie automatiquement :

### Vérification manuelle (Phase de test)
- L'adresse du wallet est comparée à une **whitelist manuelle**
- Cette whitelist contient les adresses qui ont reçu l'airdrop du 5 novembre 2025

### Vérification future (Production)
- L'adresse sera vérifiée contre la liste officielle des adresses de l'airdrop INTUITION

## Étape 4 : Accès accordé ou refusé

### ✅ Si le wallet est éligible
- Accès complet au site
- Peut proposer des totems
- Peut voter pour les totems

### ❌ Si le wallet n'est pas éligible
- Message d'erreur explicatif
- "Votre wallet n'a pas reçu l'airdrop INTUITION du 5 novembre"
- Pas d'accès aux fonctionnalités

## Vérification du réseau

Si l'utilisateur n'est pas sur Base Mainnet :
1. Message : "Veuillez passer sur Base Mainnet"
2. Bouton pour changer de réseau automatiquement
3. Une fois sur Base, vérification d'éligibilité

## Informations affichées

Une fois connecté et éligible, l'utilisateur voit :
- Son adresse wallet (format court : 0x1234...5678)
- Le réseau actuel (Base Mainnet)
- Son solde de $TRUST (optionnel)
- Bouton "Disconnect"

## Technologies utilisées

### Frontend
- **wagmi** : Hooks React pour connexion wallet
- **viem** : Bibliothèque pour interactions blockchain
- **RainbowKit** ou **ConnectKit** : UI pour connexion wallet

### Exemple de code
```typescript
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { base } from 'viem/chains';

function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  // Vérifier si l'adresse est dans la whitelist
  const isEligible = checkWhitelist(address);

  if (isConnected && isEligible) {
    return <Dashboard address={address} />;
  }

  if (isConnected && !isEligible) {
    return <NotEligible />;
  }

  return <button onClick={connect}>Connect Wallet</button>;
}
```

## Sécurité

- ✅ Aucune signature de transaction à l'étape de connexion
- ✅ Pas de frais à la connexion
- ✅ Le site ne demande jamais la clé privée
- ✅ Vérification côté serveur de la whitelist pour éviter les contournements
