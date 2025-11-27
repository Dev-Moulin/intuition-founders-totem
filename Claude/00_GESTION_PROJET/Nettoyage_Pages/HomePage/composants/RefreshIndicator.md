# RefreshIndicator

**Fichier source :** `apps/web/src/components/RefreshIndicator.tsx`

---

## Ce qu'il fait

Indicateur visuel montrant le statut de la connexion WebSocket et le temps écoulé depuis la dernière mise à jour.

Affiche :
- 🔵 "Connexion..." quand chargement initial
- 🟢 "à l'instant" ou "il y a Xs" quand connecté
- 🟡 "En pause" quand onglet caché
- 🔴 "Déconnecté" quand erreur

Affiche aussi "LIVE" quand la connexion est active et récente (< 60s).

### Variante compacte
`RefreshIndicatorCompact` : juste le point coloré avec tooltip.

---

## Dépendances

| Type | Nom | Ce qu'il fait |
|------|-----|---------------|
| Fonction | `formatTimeSinceUpdate` | Formate le temps écoulé en texte (vient de `useFounderSubscription`) |

---

## Sous-dépendances

Aucune (composant UI simple)

---

## Utilisé par

- `FounderExpandedView`
