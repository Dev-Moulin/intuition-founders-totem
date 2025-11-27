# FounderHomeCard + FounderHomeCardSkeleton

**Fichier source :** `apps/web/src/components/FounderHomeCard.tsx`

---

## Ce qu'il fait

### FounderHomeCard
Carte compacte d'un fondateur dans la grille. Affiche :
- La photo du fondateur
- Le nom
- La bio courte
- Le totem gagnant avec son score
- Un badge si activité récente
- Une flèche de tendance (↑ ou ↓)

### FounderHomeCardSkeleton
Version grise animée pendant le chargement.

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Librairie | `viem` → `formatEther` | Convertit les wei en ETH/TRUST lisible |
| Type | `FounderForHomePage` | Type de données pour un fondateur (vient de `useFoundersForHomePage`) |
| Fonction | `getFounderImageUrl` | Récupère l'URL de l'image du fondateur (vient de `FounderCard.tsx`) |

---

## Sous-dépendances

- `getFounderImageUrl` → voir [getFounderImageUrl.md](getFounderImageUrl.md)

---

## Utilisé par

- `HomePage` (directement)
