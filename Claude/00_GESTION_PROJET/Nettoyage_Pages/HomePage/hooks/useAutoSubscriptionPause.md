# useAutoSubscriptionPause (+ useWindowFocus)

**Fichier source :** `apps/web/src/hooks/useWindowFocus.ts`

---

## Ce qu'ils font

### useWindowFocus
Détecte si l'onglet/fenêtre du navigateur est visible et focusé.

Retourne :
- `isFocused` : true si la fenêtre est focusée
- `isVisible` : true si l'onglet est visible (pas caché)
- `lastFocusedAt` : timestamp du dernier focus
- `lastBlurredAt` : timestamp de la dernière perte de focus
- `timeSinceBlur` : temps en ms depuis la perte de focus

### useAutoSubscriptionPause
Hook utilitaire qui pause/reprend automatiquement une subscription quand l'onglet est caché/visible.

Options :
- `pauseOnHidden` : pause quand onglet caché (défaut: true)
- `pauseOnBlur` : pause quand fenêtre perd le focus (défaut: false)
- `resumeDelay` : délai avant de reprendre en ms (défaut: 0)

---

## Dépendances

Aucune (utilise uniquement les APIs navigateur : `document.visibilityState`, `window.focus/blur`)

---

## Utilisé par

- `FounderExpandedView` (pour économiser la batterie quand l'onglet est caché)
