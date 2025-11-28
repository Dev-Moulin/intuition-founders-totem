# WithdrawModal.tsx

**Chemin**: `apps/web/src/components/WithdrawModal.tsx`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/ClaimExistsModal.tsx` | Composant |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useState`, `useEffect` | Hooks | `react` (externe) |
| `useQuery` | Hook | `@apollo/client` (externe) |
| `useAccount` | Hook | `wagmi` (externe) |
| `formatEther`, `Hex` | Fonctions/Types | `viem` (externe) |
| `useTranslation` | Hook | `react-i18next` (externe) |
| `useWithdraw`, `estimateWithdrawAmount` | Hook/Fonction | `../hooks/useWithdraw` |
| `GET_USER_POSITION` | Query | `../lib/graphql/queries` |

## Exports

| Export | Type |
|--------|------|
| `WithdrawModal` | Composant fonction |
| `default` | WithdrawModal |

## Description

Modal pour retirer du TRUST depuis un vault de claim.

### Fonctionnalités
- Affiche les infos du claim
- Query la position de l'utilisateur
- Input montant avec bouton MAX
- Estimation du montant après frais (~7%)
- Transaction de retrait via useWithdraw
- Messages succès/erreur

## Props

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Si modal visible |
| `termId` | `string` | ID du triple |
| `claimLabel` | `string` | Label du claim |
| `isPositive` | `boolean` | True si FOR vault, false si AGAINST |
| `vaultTotalShares` | `string` | Total shares du vault |
| `vaultTotalAssets` | `string` | Total assets du vault |
| `onClose` | `() => void` | Callback fermeture |
| `onSuccess` | `(txHash: string) => void` | Callback après retrait réussi |
