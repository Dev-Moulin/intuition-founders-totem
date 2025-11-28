# ClaimExistsModal.tsx

**Chemin**: `apps/web/src/components/ClaimExistsModal.tsx`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/VotePanel.tsx` | Composant |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useState`, `useEffect`, `useRef` | Hooks | `react` (externe) |
| `useAccount` | Hook | `wagmi` (externe) |
| `useQuery` | Hook | `@apollo/client` (externe) |
| `formatEther`, `Hex` | Fonctions/Types | `viem` (externe) |
| `useTranslation` | Hook | `react-i18next` (externe) |
| `useVote` | Hook | `../hooks/useVote` |
| `formatVoteAmount` | Fonction | `../hooks/useFounderProposals` |
| `GET_USER_POSITION` | Query | `../lib/graphql/queries` |
| `WithdrawModal` | Composant | `./WithdrawModal` |

## Exports

| Export | Type |
|--------|------|
| `ClaimExistsModal` | Composant fonction |
| `ExistingClaimInfo` | Interface (type) |

## Description

Modal qui s'affiche quand un claim existe déjà. Permet de voter FOR ou AGAINST au lieu de recréer le claim.

### Fonctionnalités
- Affiche les infos du claim existant (subject, predicate, object)
- Affiche les votes actuels (FOR/AGAINST)
- Affiche la position de l'utilisateur s'il en a une
- Bouton pour retirer (WithdrawModal) si position existante
- Sélection direction de vote (FOR/AGAINST)
- Input montant TRUST
- Indicateur de progression du vote
- Messages succès/erreur

## Props

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Si modal visible |
| `onClose` | `() => void` | Callback fermeture |
| `claim` | `ExistingClaimInfo \| null` | Infos du claim |
| `initialAmount` | `string` | Montant pré-rempli |
| `onVoteSuccess` | `() => void` | Callback après vote réussi |

## Type ExistingClaimInfo

```typescript
interface ExistingClaimInfo {
  termId: string;
  subjectLabel: string;
  predicateLabel: string;
  objectLabel: string;
  forVotes?: string;
  againstVotes?: string;
}
```
