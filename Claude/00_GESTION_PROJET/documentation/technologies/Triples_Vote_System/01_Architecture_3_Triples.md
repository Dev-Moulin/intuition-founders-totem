# Architecture 3 Triples - Système de Vote

**Date** : 28/11/2025
**Status** : PROPOSITION (non implémenté)

---

## Contexte

On construit une app de vote sur le protocole INTUITION. Les utilisateurs votent sur des "totems" (symboles/caractéristiques) associés à des founders (personnalités tech).

INTUITION utilise des **triples** (sujet → prédicat → objet) pour représenter des claims/affirmations. Chaque triple a un vault où les gens peuvent déposer du TRUST (token) pour voter FOR ou AGAINST.

---

## Système actuel (2 triples)

```
Triple 1: [Elon Musk] → [has totem] → [Lion]
Triple 2: [Lion] → [has category] → [OFC:Animal]
```

### Problème

On utilise un préfixe `OFC:` (Overmind Founders Collection) hardcodé dans le label de la catégorie. Pour récupérer les catégories, on doit faire un filtre `LIKE 'OFC:%'` ce qui est :
- Pas élégant
- Pas dans l'esprit des triples INTUITION
- Difficile à maintenir

---

## Nouveau système proposé (3 triples)

```
Triple 1: [Elon Musk] → [has totem] → [Lion]           ← Vote FOR/AGAINST
Triple 2: [Lion] → [has category] → [Animal]           ← Catégorie du totem
Triple 3: [Animal] → [tag category] → [???]            ← Marque comme catégorie du système
```

### Avantages

1. **Plus propre** : "Animal" est un atom générique sans préfixe
2. **Tout est explicite via triples** : La relation "Animal est une catégorie du système" est elle-même un triple queryable
3. **Réutilisable** : L'atom "Animal" peut être utilisé par d'autres projets
4. **Query simple** : Pas de `LIKE`, juste une égalité exacte

---

## Options pour le nom du système (Triple 3 object)

### Options projet-spécifiques

| Nom | Description |
|-----|-------------|
| `Overmind Founders Totem` | Spécifique au système totem |
| `Overmind Founders Community` | Plus large, communauté |
| `Overmind Founders Collection` | Nom du projet actuel |
| `Overmind Totem System` | Technique |

### Options génériques

| Nom | Description |
|-----|-------------|
| `TotemCategory` | Générique, réutilisable |
| `VoteCategory` | Pour tout système de vote |
| `ClaimCategory` | Aligné vocabulaire INTUITION |
| `Category` | Ultra simple |

### Décision

**À choisir** : `Overmind Founders Totem` ou autre ?

---

## Atoms système (créés une seule fois)

| Atom | Rôle | Type |
|------|------|------|
| `has totem` | Prédicat du vote principal | Prédicat |
| `has category` | Prédicat pour lier totem → catégorie | Prédicat |
| `tag category` | Prédicat pour typer une catégorie | Prédicat |
| `[Nom choisi]` | Identifiant du système de catégories | Object |

---

## Atoms catégories (créés au besoin)

Chaque nouvelle catégorie nécessite un Triple 3 :

| Catégorie | Triple de déclaration |
|-----------|----------------------|
| `Animal` | `[Animal] → [tag category] → [Nom choisi]` |
| `Film` | `[Film] → [tag category] → [Nom choisi]` |
| `Concept` | `[Concept] → [tag category] → [Nom choisi]` |
| `Trait` | `[Trait] → [tag category] → [Nom choisi]` |
| etc. | ... |

---

## Queries GraphQL

### Récupérer toutes les catégories du système

```graphql
query GetAllCategories {
  triples(where: {
    predicate: { label: { _eq: "tag category" } }
    object: { label: { _eq: "Overmind Founders Totem" } }
  }) {
    subject {
      term_id
      label  # Animal, Film, Concept...
    }
  }
}
```

### Récupérer la catégorie d'un totem

```graphql
query GetTotemCategory($totemId: String!) {
  triples(where: {
    subject_id: { _eq: $totemId }
    predicate: { label: { _eq: "has category" } }
  }) {
    object {
      term_id
      label  # Animal, Film...
    }
  }
}
```

### Récupérer tous les totems d'une catégorie

```graphql
query GetTotemsByCategory($categoryLabel: String!) {
  triples(where: {
    predicate: { label: { _eq: "has category" } }
    object: { label: { _eq: $categoryLabel } }
  }) {
    subject {
      term_id
      label  # Lion, Dark Vador...
    }
  }
}
```

---

## Flux de création d'un nouveau totem

### Étape 1 : User crée le totem

User veut créer "Dark Vador" dans la catégorie "Film" pour le founder "Jean"

### Étape 2 : Système crée les triples

```
1. Créer/récupérer atom "Dark Vador"
2. Créer Triple 1 : [Jean] → [has totem] → [Dark Vador]
3. Créer/récupérer atom "Film"
4. Créer Triple 2 : [Dark Vador] → [has category] → [Film]
5. Vérifier si "Film" est déjà une catégorie du système
6. Si non, créer Triple 3 : [Film] → [tag category] → [Overmind Founders Totem]
```

### Coûts

| Action | Coût estimé |
|--------|-------------|
| Triple 1 (vote) | triple_cost + dépôt user |
| Triple 2 (catégorie) | triple_cost + min_deposit |
| Triple 3 (si nouvelle catégorie) | triple_cost + min_deposit |
| **Total nouveau totem + nouvelle catégorie** | **~3x triple_cost** |
| **Total nouveau totem + catégorie existante** | **~2x triple_cost** |

---

## Comparaison ancien vs nouveau

| Aspect | Ancien (2 triples + OFC:) | Nouveau (3 triples) |
|--------|---------------------------|---------------------|
| Nombre de triples | 2 | 2 ou 3 |
| Préfixe hardcodé | Oui (OFC:) | Non |
| Query catégories | `LIKE 'OFC:%'` | Égalité exacte |
| Réutilisabilité atoms | Faible | Forte |
| Coût nouvelle catégorie | 0 | 1 triple |
| Complexité code | Moyenne | Légèrement plus |

---

## Implémentation

### Fichiers à modifier

1. `useIntuition.ts` - Fonction `createClaimWithCategory`
2. `categories.json` - Structure des catégories
3. Queries GraphQL - Adapter les filtres
4. `VotePanel.tsx` - Affichage catégories

### TODO

- [ ] Choisir le nom définitif du système
- [ ] Créer les atoms système sur testnet
- [ ] Modifier `createClaimWithCategory` pour 3 triples
- [ ] Adapter les queries GraphQL
- [ ] Tester sur testnet
- [ ] Migrer les données existantes (si nécessaire)

---

## Notes

- Cette architecture est plus "pure" dans l'esprit INTUITION
- Le coût supplémentaire (1 triple par nouvelle catégorie) est négligeable
- Les catégories existantes ne coûtent rien de plus (Triple 3 déjà créé)
