# getFounderImageUrl

**Fichier source :** `apps/web/src/components/FounderCard.tsx`

**Note :** C'est une fonction utilitaire exportée depuis `FounderCard.tsx`, pas un composant.

---

## Ce qu'elle fait

Récupère la meilleure URL d'image disponible pour un fondateur.

**Ordre de priorité :**
1. Image manuelle (si `founder.image` est défini)
2. Avatar Twitter via unavatar.io
3. Avatar GitHub
4. Fallback DiceBear (génère un avatar unique basé sur le nom)

---

## Dépendances

Aucune (fonction utilitaire pure)

---

## Utilisé par

- `FounderHomeCard`
- `FounderExpandedView`
- `FounderCard` (le composant dans le même fichier)

---

## Note importante

Le fichier `FounderCard.tsx` contient aussi un composant `FounderCard` qui n'est **PAS utilisé par HomePage**. Seule la fonction `getFounderImageUrl` est importée.

Le composant `FounderCard` utilise `Link` de react-router-dom et pourrait être obsolète.
