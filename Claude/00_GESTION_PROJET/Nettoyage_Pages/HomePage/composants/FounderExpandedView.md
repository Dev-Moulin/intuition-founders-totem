# FounderExpandedView

**Fichier source :** `apps/web/src/components/FounderExpandedView.tsx`

---

## Ce qu'il fait

Panneau plein écran qui s'ouvre quand on clique sur un fondateur. Divisé en 2 parties :
- **Gauche (1/4)** : photo du fondateur, nom, bio, stats, indicateur temps réel
- **Droite (3/4)** : le VotePanel pour voter/créer un claim

Se ferme avec Escape ou clic en dehors. Affiche une animation flash quand de nouvelles données arrivent.

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `viem` → `formatEther` | Convertit les wei en TRUST lisible |
| Librairie | `react-i18next` → `useTranslation` | Traductions |
| Type | `FounderForHomePage` | Type de données pour un fondateur |
| Hook | `useFounderSubscription` | Écoute temps réel des votes via WebSocket |
| Hook | `useAutoSubscriptionPause` | Pause auto quand onglet caché |
| Fonction | `getFounderImageUrl` | Récupère l'URL de l'image du fondateur |
| Composant | `VotePanel` | Formulaire de vote/création de claim |
| Composant | `RefreshIndicator` | Indicateur "Actualisé il y a X secondes" |

---

## Sous-dépendances

- `VotePanel` → voir [VotePanel.md](VotePanel.md)
- `RefreshIndicator` → voir [RefreshIndicator.md](RefreshIndicator.md)
- `getFounderImageUrl` → voir [getFounderImageUrl.md](getFounderImageUrl.md)
- `useFounderSubscription` → voir [../hooks/useFounderSubscription.md](../hooks/useFounderSubscription.md)
- `useAutoSubscriptionPause` → voir [../hooks/useAutoSubscriptionPause.md](../hooks/useAutoSubscriptionPause.md)

---

## Utilisé par

- `HomePage` (directement)
