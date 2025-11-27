# WalletConnectButton

**Fichier source :** `apps/web/src/components/ConnectButton.tsx`

---

## Ce qu'il fait

Bouton pour connecter son wallet. Affiche :
- "Connect Wallet" si pas connecté
- "Wrong network" si mauvais réseau
- L'adresse du wallet si connecté

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `@rainbow-me/rainbowkit` → `ConnectButton` | Composant RainbowKit qui gère la connexion wallet |

---

## Sous-dépendances

Aucune (utilise uniquement RainbowKit)

---

## Utilisé par

- `HomePage` (directement)
- `VotePanel` (si wallet pas connecté)
