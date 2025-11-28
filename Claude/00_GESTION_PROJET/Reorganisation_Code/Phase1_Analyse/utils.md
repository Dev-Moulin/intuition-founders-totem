# Analyse utils/ (3 fichiers)

## Résumé

| Fichier | Description | OK | À déplacer |
|---------|-------------|:--:|:----------:|
| aggregateVotes.ts | Agrège les triples par objet (totem) | ⚠️ | 3 interfaces → types/ |
| founderImage.ts | URL image fondateur (Twitter/GitHub/fallback) | ✅ | - |
| index.ts | Barrel exports + re-export types GraphQL | ⚠️ | Re-exports confus |

---

## Détails par fichier

### aggregateVotes.ts ⚠️
**Description** : Agrège les triples par objet pour calculer les scores totaux des totems.

**À extraire** :
- `interface Triple` (L4-23) → `types/triple.ts` (structure différente de lib/graphql/types)
- `interface Claim` (L28-34) → `types/claim.ts`
- `interface AggregatedTotem` (L39-52) → `types/totem.ts`

**Fonctions OK** :
- `aggregateTriplesByObject()` - logique métier, reste dans utils
- `getWinningTotem()` - logique métier, reste dans utils
- `formatTrustAmount()` - formatter, reste dans utils

---

### founderImage.ts ✅
**Description** : Génère l'URL de l'avatar d'un fondateur (priorité: image > Twitter > GitHub > DiceBear).
**Verdict** : OK - Fonction utilitaire pure, bien placée.

---

### index.ts ⚠️
**Description** : Barrel exports + re-exports depuis lib/graphql/types.

**Problème** : Re-exporte des types GraphQL depuis utils/, ce qui crée de la confusion.

**À corriger** :
- Supprimer les re-exports de `lib/graphql/types` (L13-24)
- Les imports doivent aller directement vers `lib/graphql/types`

---

## Résumé des extractions

### Vers types/
- `Triple` (version utils) → `types/triple.ts` ou renommer pour éviter conflit avec GraphQL Triple
- `Claim` → `types/claim.ts`
- `AggregatedTotem` → `types/totem.ts`

### Actions correctives
- Supprimer re-exports confus dans `utils/index.ts`
- Clarifier la différence entre `Triple` (utils) et `Triple` (lib/graphql/types)

---

## Note sur les types Triple

Il y a 2 définitions de `Triple` :
1. **`utils/aggregateVotes.ts`** : Structure simplifiée pour l'agrégation
2. **`lib/graphql/types.ts`** : Structure complète GraphQL

Recommandation : Renommer `Triple` dans utils en `AggregationTriple` ou utiliser directement le type GraphQL.
