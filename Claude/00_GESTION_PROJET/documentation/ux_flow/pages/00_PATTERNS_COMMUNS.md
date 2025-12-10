# Patterns Communs - INTUITION Founders Totem

> Conventions et patterns reutilisables sur toutes les pages

---

## Etat d'implementation (24 nov 2025)

### Pages completement implementees avec GraphQL

| Page | Route | Status | Hook GraphQL | Build | Tests |
|------|-------|--------|--------------|-------|-------|
| **HomePage** | `/` | Implementee | N/A (statique) | OK | OK |
| **ProposePage** | `/propose` | Implementee | SDK INTUITION | OK | OK |
| **ResultsPage** | `/results` | GraphQL integre | `useAllProposals` | OK | OK |
| **FounderDetailsPage** | `/results/:founderId` | GraphQL integre | `useFounderProposals` | OK | OK |
| **TotemDetailsPage** | `/results/:founderId/:totemId` | GraphQL integre | `useTotemDetails` | OK | OK |
| **MyVotesPage** | `/my-votes` | GraphQL integre | `useUserVotesDetailed` | OK | N/A |
| **NotFoundPage** | `*` | Implementee | N/A | OK | OK |
| **AdminAuditPage** | `/admin/audit` | Implementee | `GET_ATOMS_BY_LABELS` | OK | N/A |
| **VotePage** | `/vote` | Implementee | `useAllTotems` | OK | N/A |

### Pages avec placeholder

| Page | Route | Status | Priorite |
|------|-------|--------|----------|
| **FounderVotePage** | `/vote/:founderId` | Placeholder | Moyenne |

### Resume technique

**Integration blockchain complete:**
- INTUITION L3 Testnet (Chain ID: 13579)
- Cross-chain NFT verification (Base Mainnet)
- GraphQL Apollo Client configure
- Tous les hooks GraphQL operationnels

**Hooks GraphQL crees:**
- `useAllProposals` - Tous les fondateurs avec leurs totems gagnants
- `useFounderProposals` - Propositions pour un fondateur specifique
- `useTotemDetails` - Details complets d'un totem avec claims
- `useUserVotesDetailed` - Historique des votes d'un utilisateur
- `useUserProposals` - Propositions creees par un utilisateur
- `useProposalLimit` - Verification limite de propositions
- `useAllTotems` - Agregation des totems par objet

**Tests:**
- 120/120 tests passent
- Build: ~15s
- Dev server: http://localhost:5174/

---

## Layout Structure

```
+--------------------------------+
| Header (sticky)                |
+--------------------------------+
|                                |
| Main Content                   |
| (page-specific)                |
|                                |
+--------------------------------+
| Footer                         |
+--------------------------------+
```

---

## Responsive Breakpoints

| Breakpoint | Largeur | Colonnes |
|------------|---------|----------|
| Mobile | < 640px | 1 colonne |
| Tablet | 640px - 1024px | 2-3 colonnes |
| Desktop | > 1024px | 4-6 colonnes |

---

## Loading States

Tous les composants qui fetchen des donnees ont des skeleton loaders :

```
+--------+
|████████|  <- Skeleton placeholder
|████░░  |
|████████|
+--------+
```

---

## Error States

Affichage d'erreurs avec retry :

```
+--------------------------+
| Warning Error loading data    |
|                          |
| [Retry]                  |
+--------------------------+
```

---

## Empty States

Quand pas de donnees :

```
+--------------------------+
| No votes yet             |
|                          |
| Be the first to vote!    |
|                          |
| [Vote Now]               |
+--------------------------+
```

---

## Modals/Dialogs

Structure standard :

```
+-------------------------------+
| +---------------------------+ |
| | Modal Title          [X]  | |
| +---------------------------+ |
| |                           | |
| | Modal Content             | |
| |                           | |
| +---------------------------+ |
| | [Cancel]     [Confirm]    | |
| +---------------------------+ |
+-------------------------------+
```

---

## Notifications/Toasts

```
+-----------------------------+
| Vote successful!            |
| Transaction: 0x1234...abcd  |
+-----------------------------+
```

Position: Top-right, auto-dismiss apres 5s

---

## Navigation Flow

```
HomePage (/)
  |-> ProposePage (/propose)
  |     |-> [Create Claim] -> FounderDetailsPage
  |
  |-> VotePage (/vote)
  |     |-> [Vote FOR/AGAINST] -> VoteModal
  |     |-> [View Claims] -> TotemDetailsPage
  |
  |-> FounderDetailsPage (/results/:founderId)
  |     |-> [Propose] -> ProposePage
  |     |-> [Vote] -> VoteModal
  |     |-> [Details] -> TotemDetailsPage
  |
  |-> ResultsPage (/results)
  |     |-> [Details] -> FounderDetailsPage
  |
  |-> MyVotesPage (/my-votes)
  |     |-> [Withdraw] -> Transaction
  |     |-> [Add More] -> VoteModal
  |     |-> [View Claim] -> TotemDetailsPage
  |
  |-> TotemDetailsPage (/results/:founderId/:totemId)
  |     |-> [Vote FOR/AGAINST] -> VoteModal
  |     |-> [Back to founder] -> FounderDetailsPage
  |
  |-> AdminAuditPage (/admin/audit)
        |-> Audit des donnees INTUITION
```

---

## Conventions de Code

### Nommage des fichiers
- Pages: `PascalCase` + `Page.tsx` (ex: `HomePage.tsx`)
- Hooks: `use` + `PascalCase` (ex: `useFounderProposals.ts`)
- Components: `PascalCase.tsx` (ex: `FounderCard.tsx`)

### Structure des pages
```typescript
// 1. Imports
import { ... } from 'react';
import { useParams } from 'react-router-dom';

// 2. Types/Interfaces
interface PageProps { ... }

// 3. Component
export function PageName() {
  // 3.1 Hooks
  const { param } = useParams();
  const { data, loading } = useQuery(...);

  // 3.2 States
  const [state, setState] = useState();

  // 3.3 Effects
  useEffect(() => { ... }, []);

  // 3.4 Handlers
  const handleClick = () => { ... };

  // 3.5 Render
  if (loading) return <Skeleton />;
  if (error) return <ErrorState />;

  return (
    <Layout>
      ...
    </Layout>
  );
}
```

---

## Prochaines Etapes

1. Implementer VotePage (vote FOR/AGAINST)
2. Implementer FounderVotePage (interface de vote pour un fondateur)
3. Tests E2E avec Playwright
4. Optimisations (polling GraphQL, cache Apollo)
5. Enrichissement donnees INTUITION (voir AUDIT_INTUITION_DATA.md)
