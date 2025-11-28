# useWindowFocus.ts

**Chemin**: `apps/web/src/hooks/useWindowFocus.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `components/FounderExpandedView.tsx` | Composant (via useAutoSubscriptionPause) |
| `hooks/index.ts` | Export |

## Dépendances (imports)

| Import | Type | Fichier |
|--------|------|---------|
| `useState`, `useEffect`, `useCallback` | Hooks | `react` (externe) |

## Exports

| Export | Type |
|--------|------|
| `useWindowFocus` | Hook fonction |
| `useAutoSubscriptionPause` | Hook fonction |

## useWindowFocus() - Retourne

```typescript
{
  isFocused: boolean;           // True si window/tab focusée
  isVisible: boolean;           // True si tab visible (pas cachée)
  lastFocusedAt: Date | null;   // Dernière fois focusée
  lastBlurredAt: Date | null;   // Dernière fois blur
  timeSinceBlur: number;        // ms depuis dernier blur
}
```

## useAutoSubscriptionPause(pause, resume, options)

Hook utilitaire pour pause/resume automatique d'une subscription selon visibilité.

```typescript
// Paramètres
pause: () => void;      // Fonction pour mettre en pause
resume: () => void;     // Fonction pour reprendre

options?: {
  pauseOnHidden?: boolean;  // Pause quand tab cachée (default: true)
  resumeDelay?: number;     // Délai avant resume en ms (default: 0)
  pauseOnBlur?: boolean;    // Pause aussi quand window perd focus (default: false)
}
```

## Description

Hook pour détecter si l'onglet/fenêtre du navigateur est focusé.

### Cas d'usage
- Mettre en pause les WebSocket subscriptions quand tab cachée (économie batterie/bande passante)
- Rafraîchir les données quand l'utilisateur revient sur l'onglet
- Afficher des indicateurs "onglet inactif"

### Événements écoutés
- `document.visibilityState` pour visibilité onglet
- `window.focus/blur` pour focus fenêtre

### useAutoSubscriptionPause

Wrapper pratique pour automatiquement pause/resume une subscription :
- Pause automatique quand tab cachée
- Resume avec délai optionnel (évite flicker)
