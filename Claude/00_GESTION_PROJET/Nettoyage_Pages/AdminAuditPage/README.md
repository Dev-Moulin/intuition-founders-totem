# AdminAuditPage - Vue d'ensemble

## Route
- `/admin/audit`

## Fichier
`apps/web/src/pages/AdminAuditPage.tsx`

## Protection
Accessible uniquement si le wallet connecté correspond à `VITE_ADMIN_WALLET_ADDRESS`.

---

## Librairies externes

| Librairie | Fonction utilisée | Ce qu'elle fait |
|-----------|-------------------|-----------------|
| `wagmi` | `useAccount` | Récupère l'adresse du wallet pour vérifier si admin |
| `@apollo/client` | `useQuery` | Requêtes GraphQL pour récupérer les atoms existants |

---

## Ce que fait cette page

Page admin pour gérer les atoms INTUITION du projet. 4 onglets :

1. **Fondateurs** : Créer les 42 atoms des fondateurs ConsenSys
2. **Prédicats** : Créer les 6 prédicats (is represented by, has totem, etc.)
3. **Objets/Totems** : Créer les totems avec leur catégorie OFC
4. **OFC: Catégories** : Créer le prédicat `has_category` et les catégories `OFC:*`

---

## Composants utilisés

| Composant | Fichier doc | Ce qu'il fait |
|-----------|-------------|---------------|
| `FoundersTab` | Défini dans le même fichier | Onglet pour créer les atoms des fondateurs |
| `PredicatesTab` | Défini dans le même fichier | Onglet pour créer les prédicats |
| `ObjectsTab` | Défini dans le même fichier | Onglet pour créer les totems |
| `OfcCategoriesTab` | Défini dans le même fichier | Onglet pour créer les catégories OFC |

**Note :** Tous les sous-composants sont définis dans le même fichier `AdminAuditPage.tsx`.

---

## Hooks utilisés

| Hook | Fichier doc | Ce qu'il fait |
|------|-------------|---------------|
| `useIntuition` | [Lien](../HomePage/hooks/useIntuition.md) | Créer atoms et triples sur la blockchain |
| `getFounderImageUrl` | [Lien](../HomePage/composants/getFounderImageUrl.md) | Récupère l'URL de l'image du fondateur |

**Note :** `useIntuition` est déjà documenté dans HomePage.

---

## Queries GraphQL utilisées

| Query | Ce qu'elle fait |
|-------|-----------------|
| `GET_ATOMS_BY_LABELS` | Récupère les atoms existants par leurs labels |
| `GET_ALL_TOTEM_CATEGORIES` | Récupère tous les triples de catégorie [Totem] [has_category] [OFC:*] |

---

## Fichiers de données utilisés

| Fichier | Ce qu'il contient |
|---------|-------------------|
| `founders.json` | Liste des 42 fondateurs ConsenSys |
| `categories.json` | Configuration des catégories OFC |

---

## Arborescence des dépendances

```
AdminAuditPage
├── useIntuition (déjà documenté dans HomePage)
│   ├── createAtom()
│   ├── createFounderAtom()
│   ├── getOrCreateAtom()
│   └── createTriple()
├── getFounderImageUrl (déjà documenté dans HomePage)
├── FoundersTab (sous-composant interne)
├── PredicatesTab (sous-composant interne)
├── ObjectsTab (sous-composant interne)
└── OfcCategoriesTab (sous-composant interne)
```

---

## Éléments partagés avec HomePage

| Élément | Type | Aussi utilisé par |
|---------|------|-------------------|
| `useIntuition` | Hook | VotePanel (HomePage) |
| `getFounderImageUrl` | Fonction | FounderHomeCard, FounderExpandedView (HomePage) |
| `GET_ATOMS_BY_LABELS` | Query | useFoundersForHomePage, VotePanel, useIntuition (HomePage) |
| `founders.json` | Data | useFoundersForHomePage (HomePage) |
| `categories.json` | Data | VotePanel, useIntuition (HomePage) |
