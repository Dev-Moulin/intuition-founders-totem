# ClaimExistsModal

**Fichier source :** `apps/web/src/components/ClaimExistsModal.tsx`

---

## Ce qu'il fait

Modal qui apparaît quand l'utilisateur essaie de créer un claim qui existe déjà.

Permet de :
- Voir les infos du claim existant (sujet, prédicat, objet)
- Voir les votes actuels FOR/AGAINST
- Voter FOR ou AGAINST sur le claim existant
- Voir sa position actuelle si déjà voté
- Retirer ses tokens (via WithdrawModal)

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `wagmi` → `useAccount` | Récupère l'adresse du wallet |
| Librairie | `@apollo/client` → `useQuery` | Requête GraphQL |
| Librairie | `viem` → `formatEther`, `Hex` | Formatage montants |
| Librairie | `react-i18next` → `useTranslation` | Traductions |
| Hook | `useVote` | Exécute le vote sur la blockchain |
| Fonction | `formatVoteAmount` | Formate les montants de vote (vient de `useFounderProposals`) |
| Query | `GET_USER_POSITION` | Récupère la position de l'utilisateur sur ce claim |
| Composant | `WithdrawModal` | Modal pour retirer ses tokens |

---

## Sous-dépendances

- `useVote` → voir [../hooks/useVote.md](../hooks/useVote.md)
- `WithdrawModal` → voir [WithdrawModal.md](WithdrawModal.md)

---

## Utilisé par

- `VotePanel`
