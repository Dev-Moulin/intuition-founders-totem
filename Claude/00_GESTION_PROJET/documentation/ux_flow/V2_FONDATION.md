# V2_Fondation - Architecture HomePage Interactive

> Version: 2.0
> Statut: Documentation / Planification
> Date: 2025-11-25

## Vision

Transformer la HomePage en une interface **single-page interactive** où l'utilisateur peut :
1. Voir la grille des 42 fondateurs
2. Cliquer sur une card → animation flip + agrandissement
3. Voir les détails du fondateur à gauche (1/4 écran)
4. Voter/Proposer directement à droite (3/4 écran)
5. **Sans changer de page**

---

## Architecture des Données

### Principe : Zero Backend pour les Catégories

On exploite le champ `description` des Atoms pour stocker la catégorie :

```
Atom Objet/Totem {
  label: "Lion",
  description: "Catégorie: Animal"  // ← Pré-rempli automatiquement
}
```

### Filtrage des Claims Valides

Un claim est considéré comme un **vote valide** si :

```typescript
const isValidVote = (claim: Claim) => {
  // 1. Le sujet est un de nos 42 fondateurs
  const isFounderSubject = FOUNDER_ATOM_IDS.includes(claim.subject.id);

  // 2. Le prédicat est un de nos prédicats prédéfinis
  const isOurPredicate = PREDICATE_ATOM_IDS.includes(claim.predicate.id);

  // 3. L'objet a une description qui commence par "Catégorie:"
  const hasCategory = claim.object.description?.startsWith("Catégorie:");

  return isFounderSubject && isOurPredicate && hasCategory;
};
```

### Prédicats Prédéfinis (Non Modifiables)

Les utilisateurs **ne peuvent pas créer de nouveaux prédicats**. Liste fixe :

| ID | Label | Description |
|----|-------|-------------|
| is-represented-by | is represented by | X est représenté par Y |
| has-totem | has totem | X a pour totem Y |
| is-symbolized-by | is symbolized by | X est symbolisé par Y |
| embodies | embodies | X incarne Y |
| channels | channels | X canalise Y |
| resonates-with | resonates with | X résonne avec Y |

Ces prédicats doivent être créés une seule fois on-chain, puis leurs `termId` sont stockés dans `predicates.json`.

### Création d'un Objet/Totem

Quand l'utilisateur crée un nouvel objet :

```typescript
const createTotemAtom = async (label: string, category: string) => {
  const description = `Catégorie: ${category}`;

  // Créer l'atom via INTUITION SDK
  const atomId = await sdk.createAtom({
    label,
    description, // ← Contient la catégorie
  });

  return atomId;
};
```

Catégories suggérées (UI dropdown) :
- Animal
- Objet
- Trait de caractère
- Univers/Monde
- Super-pouvoir
- Art
- Autre

---

## Layout après Sélection d'un Fondateur

```
┌──────────────────────────────────────────────────────────────────────┐
│ HEADER                                                    [Connect]   │
├─────────────────────┬────────────────────────────────────────────────┤
│                     │                                                │
│   FOUNDER CARD      │            ZONE DE VOTE                        │
│   (1/4 écran)       │            (3/4 écran)                         │
│                     │                                                │
│   ┌───────────┐     │   ┌──────────────────────────────────────┐     │
│   │           │     │   │ 1. Sélectionner un Prédicat          │     │
│   │   Photo   │     │   │                                      │     │
│   │   64x64   │     │   │   ○ is represented by                │     │
│   │           │     │   │   ○ has totem                        │     │
│   └───────────┘     │   │   ○ is symbolized by                 │     │
│                     │   │   ○ embodies                         │     │
│   Joseph Lubin      │   │   ○ channels                         │     │
│                     │   │   ○ resonates with                   │     │
│   Co-founder of     │   └──────────────────────────────────────┘     │
│   Ethereum...       │                                                │
│                     │   ┌──────────────────────────────────────┐     │
│   ───────────────   │   │ 2. Sélectionner ou Créer un Totem    │     │
│                     │   │                                      │     │
│   Stats:            │   │   Search: [_______________] 🔍       │     │
│   - 5 propositions  │   │                                      │     │
│   - 150 TRUST       │   │   Totems existants:                  │     │
│   - Totem gagnant:  │   │   ○ Lion (150 TRUST)                 │     │
│   🦁 Lion           │   │   ○ Eagle (80 TRUST)                 │     │
│                     │   │   ○ Kiwi (60 TRUST)                  │     │
│   ───────────────   │   │                                      │     │
│                     │   │   ── OU créer nouveau ──             │     │
│   [× Fermer]        │   │   Nom: [_______________]             │     │
│                     │   │   Catégorie: [Animal ▼]              │     │
│                     │   └──────────────────────────────────────┘     │
│                     │                                                │
│                     │   ┌──────────────────────────────────────┐     │
│                     │   │ 3. Montant TRUST                     │     │
│                     │   │                                      │     │
│                     │   │   [10_____] TRUST                    │     │
│                     │   │   Balance: 1,234 TRUST               │     │
│                     │   └──────────────────────────────────────┘     │
│                     │                                                │
│                     │   ┌──────────────────────────────────────┐     │
│                     │   │ Preview:                             │     │
│                     │   │ Joseph Lubin is represented by Lion  │     │
│                     │   └──────────────────────────────────────┘     │
│                     │                                                │
│                     │            [Voter / Créer Claim]               │
│                     │                                                │
├─────────────────────┴────────────────────────────────────────────────┤
│ FOOTER                                                                │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Animation de la Card

### Étapes de l'animation

1. **Click sur FounderCard** dans la grille
2. **Translation** : La card se déplace vers la gauche de l'écran
3. **Agrandissement** : La card grandit (scale 1 → 1.5)
4. **Rotation** : Flip 180° dans le sens des aiguilles d'une montre (rotateY)
5. **Reveal** : Les données apparaissent avec effet "code qui défile"

### CSS Animation

```css
.founder-card {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.founder-card.selected {
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%) rotateY(180deg) scale(1.5);
  z-index: 50;
}

.founder-card .front {
  backface-visibility: hidden;
}

.founder-card .back {
  backface-visibility: hidden;
  transform: rotateY(180deg);
}
```

### Effet "Code qui défile"

```typescript
const TypewriterText = ({ text, delay = 50 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(prev => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono text-green-400">{displayed}_</span>;
};
```

---

## Composants à Créer/Modifier

### Nouveaux Composants

| Composant | Description |
|-----------|-------------|
| `FounderExpandedCard` | Version agrandie de la card après flip |
| `VotePanel` | Panel de vote à droite (prédicat + objet + montant) |
| `PredicateSelector` | Liste radio des prédicats prédéfinis |
| `TotemSelector` | Recherche + liste totems existants + création |
| `CategoryDropdown` | Dropdown pour la catégorie du nouvel atom |
| `TypewriterText` | Effet texte qui s'affiche lettre par lettre |

### Composants à Modifier

| Composant | Modification |
|-----------|--------------|
| `HomePage` | Ajouter state `selectedFounder`, gérer le layout split |
| `FounderHomeCard` | Ajouter `onClick`, classes d'animation |

---

## Hooks à Créer/Modifier

### Nouveaux Hooks

```typescript
// Hook pour les claims valides d'un fondateur
useFounderValidClaims(founderAtomId: string) {
  // Fetch claims où:
  // - subject.id = founderAtomId
  // - predicate.id IN [nos predicats]
  // - object.description LIKE "Catégorie:%"
}

// Hook pour les totems existants (avec catégorie)
useExistingTotems() {
  // Fetch atoms où description LIKE "Catégorie:%"
}

// Hook pour créer un claim avec catégorie
useCreateVote() {
  // 1. Si nouvel objet → créer atom avec description "Catégorie: X"
  // 2. Créer le claim (sujet + prédicat + objet)
  // 3. Déposer le TRUST
}
```

---

## Query GraphQL

### Fetch Claims Valides

```graphql
query GetFounderValidClaims($founderAtomId: String!, $predicateIds: [String!]!) {
  triples(
    where: {
      subject_id: { _eq: $founderAtomId }
      predicate_id: { _in: $predicateIds }
      object: {
        # Note: Le filtrage par description devra être fait côté client
        # car GraphQL INTUITION ne supporte pas LIKE sur description
      }
    }
  ) {
    id
    subject { id, label }
    predicate { id, label }
    object { id, label, description }
    vault { totalAssets }
    counterVault { totalAssets }
  }
}
```

**Note** : Le filtrage `description.startsWith("Catégorie:")` sera fait côté client après le fetch.

---

## Migration depuis V1

### Ce qu'on garde

- ✅ `founders.json` (42 fondateurs)
- ✅ `predicates.json` (6 prédicats)
- ✅ `useFoundersForHomePage` hook (à adapter)
- ✅ `FounderHomeCard` component (à adapter)
- ✅ Styles glassmorphism

### Ce qu'on supprime/remplace

- ❌ Boutons "Voter" et "Proposer" qui redirigent vers d'autres pages
- ❌ `ProposePage` séparée → intégrée dans HomePage
- ❌ `VotePage` séparée → intégrée dans HomePage
- ❌ Création libre de prédicats

### Ce qu'on ajoute

- ✨ Animation flip de la card
- ✨ Layout split (1/4 + 3/4)
- ✨ VotePanel intégré
- ✨ Filtrage par catégorie dans description
- ✨ Prédicats fixes (non créables par user)

---

## Étapes d'Implémentation

1. **Créer les prédicats on-chain** et stocker leurs termId dans `predicates.json`
2. **Modifier `FounderHomeCard`** : ajouter onClick, classes animation
3. **Créer `FounderExpandedCard`** : version agrandie avec données complètes
4. **Créer `VotePanel`** : formulaire de vote
5. **Créer `PredicateSelector`** : liste radio des prédicats
6. **Créer `TotemSelector`** : recherche + création avec catégorie
7. **Modifier `HomePage`** : state + layout conditionnel + animation
8. **Créer hooks** : `useFounderValidClaims`, `useExistingTotems`, `useCreateVote`
9. **Tester** : animation, création claim, filtrage

---

## Décisions UX (Validées)

### Fermeture de la Card
Les 3 méthodes sont supportées :
- ✅ **Click ailleurs** (backdrop)
- ✅ **Bouton ×** sur la card
- ✅ **Touche Escape**

### Responsive Mobile
- ✅ **Layout vertical** : Card en haut, VotePanel en dessous
- Breakpoint : `lg:` (1024px) pour passer en horizontal

### URL Persistance
- ✅ **URL param** : `?founder=joseph-lubin`
- Permet de partager un lien direct vers un fondateur
- Au chargement de la page, si param présent → ouvre directement la card

```typescript
// Exemple d'implémentation
const [searchParams, setSearchParams] = useSearchParams();
const founderId = searchParams.get('founder');

// À la sélection
const selectFounder = (id: string) => {
  setSearchParams({ founder: id });
  setSelectedFounder(id);
};

// À la fermeture
const closeCard = () => {
  searchParams.delete('founder');
  setSearchParams(searchParams);
  setSelectedFounder(null);
};
```

---

## Layout Mobile (< 1024px)

```
┌─────────────────────────────┐
│ HEADER              [Connect]│
├─────────────────────────────┤
│                             │
│   FOUNDER CARD              │
│   (Full width)              │
│                             │
│   ┌─────────────────────┐   │
│   │       Photo         │   │
│   │       64x64         │   │
│   └─────────────────────┘   │
│                             │
│   Joseph Lubin              │
│   Co-founder of Ethereum    │
│                             │
│   Stats: 5 prop. | 150 TRUST│
│                             │
│   [× Fermer]                │
│                             │
├─────────────────────────────┤
│                             │
│   ZONE DE VOTE              │
│   (Full width)              │
│                             │
│   1. Prédicat               │
│   ○ is represented by       │
│   ○ has totem               │
│   ...                       │
│                             │
│   2. Totem                  │
│   [Search...]               │
│   ○ Lion (150 TRUST)        │
│   ...                       │
│                             │
│   3. Montant                │
│   [10] TRUST                │
│                             │
│   [Voter / Créer Claim]     │
│                             │
├─────────────────────────────┤
│ FOOTER                      │
└─────────────────────────────┘
```
