# founderImage.ts

**Chemin**: `apps/web/src/utils/founderImage.ts`
**Status**: UTILISÉ

## Utilisé par

| Fichier | Type |
|---------|------|
| `hooks/useIntuition.ts` | Hook (re-export) |
| `components/FounderExpandedView.tsx` | Composant |
| `components/FounderHomeCard.tsx` | Composant |
| `pages/AdminAuditPage.tsx` | Page |

## Dépendances (imports)

Aucune dépendance externe.

## Exports

| Export | Type |
|--------|------|
| `getFounderImageUrl` | Fonction |

## Fonction

### getFounderImageUrl(founder): string

Retourne la meilleure URL d'image disponible pour un founder.

**Paramètre :**
```typescript
founder: {
  name: string;
  image?: string;
  twitter?: string | null;
  github?: string | null;
}
```

**Priorité :**
1. `image` - Image manuelle si fournie
2. Twitter - Avatar via unavatar.io (`https://unavatar.io/twitter/{handle}`)
3. GitHub - Avatar GitHub (`https://github.com/{username}.png`)
4. DiceBear - Fallback généré (`https://api.dicebear.com/7.x/identicon/svg?seed={name}`)

## Notes

- Fonction extraite de FounderCard.tsx pour réutilisation
- Re-exportée par `useIntuition.ts` pour compatibilité
