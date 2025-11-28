# 09 - Extraire fonctions de formatage vers utils/

## Objectif

Centraliser les fonctions de formatage de temps :
- `formatTimeSinceUpdate` (useFounderSubscription.ts) - "il y a 5s", "il y a 2min"
- `getTimeAgo` (VotePanel.tsx) - "2m", "1h", "2j"

**Note** : Les 2 fonctions sont similaires mais avec des formats légèrement différents. On les garde toutes les deux pour préserver le comportement actuel.

---

## 1. Nouveau fichier à créer

**Chemin** : `apps/web/src/utils/formatters.ts`

```typescript
/**
 * Time formatting utilities
 */

/**
 * Format seconds since update for display (French)
 * Used by RefreshIndicator for subscription status
 *
 * @param seconds - Number of seconds since last update
 * @returns Formatted string (e.g., "à l'instant", "il y a 5s", "il y a 2min")
 */
export function formatTimeSinceUpdate(seconds: number): string {
  if (seconds < 5) return 'à l\'instant';
  if (seconds < 60) return `il y a ${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  return `il y a ${hours}h`;
}

/**
 * Format timestamp to relative time string (compact French)
 * Used by VotePanel for recent activity display
 *
 * @param timestamp - ISO timestamp string
 * @returns Formatted string (e.g., "à l'instant", "2m", "1h", "2j")
 */
export function getTimeAgo(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'à l\'instant';
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHour < 24) return `${diffHour}h`;
  if (diffDay < 7) return `${diffDay}j`;
  return new Date(timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}
```

---

## 2. Fichiers sources à modifier

### A. hooks/useFounderSubscription.ts

**Lignes 165-172 - À supprimer** :
```typescript
export function formatTimeSinceUpdate(seconds: number): string {
  if (seconds < 5) return 'à l\'instant';
  if (seconds < 60) return `il y a ${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  return `il y a ${hours}h`;
}
```

**Re-export à ajouter** :
```typescript
// Re-export for backward compatibility
export { formatTimeSinceUpdate } from '../utils/formatters';
```

### B. components/VotePanel.tsx

**Lignes 22-36 - À supprimer** :
```typescript
function getTimeAgo(timestamp: string): string {
  // ...
}
```

**Import à ajouter** :
```typescript
import { getTimeAgo } from '../utils/formatters';
```

### C. hooks/index.ts

**Modifier l'export** (ligne ~86) :
```typescript
// Actuel
export {
  useFounderSubscription,
  formatTimeSinceUpdate,
} from './useFounderSubscription';

// Nouveau
export { useFounderSubscription } from './useFounderSubscription';
export { formatTimeSinceUpdate } from '../utils/formatters';
```

### D. utils/index.ts

**Export à ajouter** :
```typescript
export { formatTimeSinceUpdate, getTimeAgo } from './formatters';
```

---

## 3. Étapes d'exécution

1. [ ] Créer `utils/formatters.ts`
2. [ ] Modifier `useFounderSubscription.ts` : re-export + COMMENTER ancien code
3. [ ] Modifier `VotePanel.tsx` : import + COMMENTER ancien code
4. [ ] Mettre à jour `hooks/index.ts`
5. [ ] Mettre à jour `utils/index.ts`
6. [ ] Build + Test
7. [ ] Paul contrôle
8. [ ] Supprimer les commentaires
9. [ ] Build + Test final
10. [ ] Commit

---

## Validation Paul

- [ ] Plan validé
- [ ] Exécution autorisée
