# WithdrawModal

**Fichier source :** `apps/web/src/components/WithdrawModal.tsx`

---

## Ce qu'il fait

Modal pour retirer ses TRUST d'un claim vault.

Permet de :
- Voir ses shares (parts) dans le vault
- Choisir combien de shares retirer
- Voir l'estimation du montant TRUST à recevoir
- Exécuter le retrait sur la blockchain

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `wagmi` → `useAccount` | Récupère l'adresse du wallet |
| Librairie | `@apollo/client` → `useQuery` | Requête GraphQL |
| Librairie | `viem` → `formatEther`, `Hex` | Formatage montants |
| Librairie | `react-i18next` → `useTranslation` | Traductions |
| Hook | `useWithdraw` | Exécute le retrait sur la blockchain |
| Fonction | `estimateWithdrawAmount` | Calcule le montant estimé (vient de `useWithdraw`) |
| Query | `GET_USER_POSITION` | Récupère la position de l'utilisateur |

---

## Sous-dépendances

- `useWithdraw` → voir [../hooks/useWithdraw.md](../hooks/useWithdraw.md)

---

## Utilisé par

- `ClaimExistsModal`
