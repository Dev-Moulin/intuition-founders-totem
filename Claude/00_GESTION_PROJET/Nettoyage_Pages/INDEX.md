# INDEX - Nettoyage des Pages

Ce dossier contient la documentation de toutes les dépendances des pages à conserver, pour identifier ce qui peut être supprimé.

---

## Pages à CONSERVER

| Page | Route | Documentation |
|------|-------|---------------|
| ✅ HomePage | `/`, `/?founder=xxx` | [HomePage/README.md](HomePage/README.md) |
| ✅ AdminAuditPage | `/admin/audit` | [AdminAuditPage/README.md](AdminAuditPage/README.md) |

---

## Pages à SUPPRIMER

| Page | Route | Status |
|------|-------|--------|
| ❌ ProposePage | `/propose` | [Analysée](PagesASupprimer/ProposePage.md) |
| ❌ VotePage | `/vote`, `/vote/:founderId` | [Analysée](PagesASupprimer/VotePage.md) |
| ❌ ResultsPage | `/results` | [Analysée](PagesASupprimer/ResultsPage.md) |
| ❌ FounderDetailsPage | `/results/:founderId` | [Analysée](PagesASupprimer/FounderDetailsPage.md) |
| ❌ TotemDetailsPage | `/results/:founderId/:totemId` | [Analysée](PagesASupprimer/TotemDetailsPage.md) |
| ❌ MyVotesPage | `/my-votes` | [Analysée](PagesASupprimer/MyVotesPage.md) |

---

## Composants utilisés par les pages conservées

### Composants de HomePage

| Composant | Fichier source | Doc | Utilisé aussi par |
|-----------|----------------|-----|-------------------|
| `WalletConnectButton` | `ConnectButton.tsx` | [Lien](HomePage/composants/WalletConnectButton.md) | VotePanel |
| `FounderHomeCard` | `FounderHomeCard.tsx` | [Lien](HomePage/composants/FounderHomeCard.md) | - |
| `FounderExpandedView` | `FounderExpandedView.tsx` | [Lien](HomePage/composants/FounderExpandedView.md) | - |
| `VotePanel` | `VotePanel.tsx` | [Lien](HomePage/composants/VotePanel.md) | - |
| `RefreshIndicator` | `RefreshIndicator.tsx` | [Lien](HomePage/composants/RefreshIndicator.md) | - |
| `ClaimExistsModal` | `ClaimExistsModal.tsx` | [Lien](HomePage/composants/ClaimExistsModal.md) | - |
| `WithdrawModal` | `WithdrawModal.tsx` | [Lien](HomePage/composants/WithdrawModal.md) | - |
| `getFounderImageUrl` | `utils/founderImage.ts` | [Lien](HomePage/composants/getFounderImageUrl.md) | AdminAuditPage |

### Composants de AdminAuditPage

Tous les sous-composants (FoundersTab, PredicatesTab, ObjectsTab, OfcCategoriesTab) sont définis dans le même fichier `AdminAuditPage.tsx`.

---

## Hooks utilisés par les pages conservées

### Hooks de HomePage

| Hook | Fichier source | Doc | Utilisé aussi par |
|------|----------------|-----|-------------------|
| `useFoundersForHomePage` | `useFoundersForHomePage.ts` | [Lien](HomePage/hooks/useFoundersForHomePage.md) | - |
| `useFounderSubscription` | `useFounderSubscription.ts` | [Lien](HomePage/hooks/useFounderSubscription.md) | - |
| `useAutoSubscriptionPause` | `useWindowFocus.ts` | [Lien](HomePage/hooks/useAutoSubscriptionPause.md) | - |
| `useFounderProposals` | `useFounderProposals.ts` | [Lien](HomePage/hooks/useFounderProposals.md) | - |
| `useProtocolConfig` | `useProtocolConfig.ts` | [Lien](HomePage/hooks/useProtocolConfig.md) | - |
| `useIntuition` | `useIntuition.ts` | [Lien](HomePage/hooks/useIntuition.md) | AdminAuditPage |
| `useVote` | `useVote.ts` | [Lien](HomePage/hooks/useVote.md) | - |
| `useWithdraw` | `useWithdraw.ts` | [Lien](HomePage/hooks/useWithdraw.md) | - |

### Hooks de AdminAuditPage

AdminAuditPage utilise `useIntuition` (déjà documenté dans HomePage) - aucun hook spécifique.

---

## Queries GraphQL utilisées

| Query | Utilisée par |
|-------|--------------|
| `GET_ATOMS_BY_LABELS` | useFoundersForHomePage, VotePanel, useIntuition, AdminAuditPage |
| `GET_ALL_PROPOSALS` | useFoundersForHomePage |
| `GET_TRIPLES_BY_PREDICATES` | VotePanel |
| `GET_TRIPLE_BY_ATOMS` | VotePanel, useIntuition |
| `GET_FOUNDER_RECENT_VOTES` | VotePanel |
| `GET_FOUNDER_PROPOSALS` | useFounderProposals |
| `GET_USER_POSITION` | ClaimExistsModal, WithdrawModal |
| `GET_ALL_TOTEM_CATEGORIES` | AdminAuditPage |

---

## Subscriptions GraphQL utilisées

| Subscription | Utilisée par |
|--------------|--------------|
| `SUBSCRIBE_FOUNDER_PROPOSALS` | useFounderSubscription |
| `SUBSCRIBE_TOTEM_CATEGORIES` | VotePanel |

---

## Fichiers de données utilisés

| Fichier | Utilisé par |
|---------|-------------|
| `founders.json` | useFoundersForHomePage, AdminAuditPage |
| `predicates.json` | VotePanel |
| `categories.json` | VotePanel, useIntuition, AdminAuditPage |

---

## RÉCAPITULATIF FINAL - À SUPPRIMER

Toutes les pages ont été analysées. Voici la liste complète de ce qui peut être supprimé :

### Pages (6 fichiers)

| Fichier | Raison |
|---------|--------|
| `pages/ProposePage.tsx` | Remplacée par HomePage |
| `pages/VotePage.tsx` | Remplacée par HomePage |
| `pages/ResultsPage.tsx` | Remplacée par HomePage |
| `pages/FounderDetailsPage.tsx` | Remplacée par HomePage |
| `pages/TotemDetailsPage.tsx` | Remplacée par HomePage |
| `pages/MyVotesPage.tsx` | Remplacée par HomePage |

### Composants (8 fichiers)

| Fichier | Utilisé uniquement par |
|---------|------------------------|
| `components/FounderCard.tsx` | ProposePage (✅ `getFounderImageUrl` extrait) |
| `components/ProposalModal.tsx` | ProposePage |
| `components/TotemVoteCard.tsx` | VotePage |
| `components/VoteModal.tsx` | VotePage |
| `components/FounderResultCard.tsx` | ResultsPage |
| `components/TotemProposalCard.tsx` | FounderDetailsPage |
| `components/ClaimCard.tsx` | TotemDetailsPage |

### Hooks (6 fichiers)

| Fichier | Utilisé uniquement par |
|---------|------------------------|
| `hooks/useFoundersWithAtomIds.ts` | ProposePage |
| `hooks/useAllTotems.ts` | VotePage |
| `hooks/useAllProposals.ts` | ResultsPage |
| `hooks/useUserVotes.ts` | MyVotesPage |
| `hooks/useTotemDetails.ts` | TotemDetailsPage |
| `hooks/usePlatformStats.ts` | À vérifier (possiblement inutilisé) |

### Utilitaires (2 fichiers)

| Fichier | Utilisé uniquement par |
|---------|------------------------|
| `utils/exportResults.ts` | ResultsPage |
| `utils/exportResults.test.ts` | Test de exportResults |

### Tests à supprimer (avec leurs hooks)

| Fichier |
|---------|
| `hooks/useAllTotems.test.ts` |

---

## ✅ ACTION COMPLÉTÉE - getFounderImageUrl extrait

**`getFounderImageUrl`** a été déplacé vers `utils/founderImage.ts`.

- Branche : `refactor/extract-getFounderImageUrl`
- Commit : `3bc8664`
- Les anciennes copies dans `FounderCard.tsx` et `useIntuition.ts` sont commentées (rollback possible)
- `FounderCard.tsx` peut maintenant être supprimé en toute sécurité

---

## 🔄 PROCÉDURE DE SUPPRESSION SÉCURISÉE

### Principe

**NE JAMAIS supprimer directement.** Toujours suivre ce processus en 2 phases :

### Phase 1 : COMMENTER + TESTER (avant commit)

1. Claude crée une nouvelle branche : `cleanup/remove-obsolete-pages`
2. Claude commente tous les fichiers à supprimer :
   - Commenter TOUT le contenu du fichier (pas supprimer)
   - Ajouter en haut : `// DEPRECATED - À SUPPRIMER - Commenté le [DATE]`
3. Claude met à jour `router.tsx` : commenter les routes obsolètes
4. Claude met à jour `hooks/index.ts` : commenter les exports obsolètes
5. Claude lance le build : `pnpm build`
6. Si le build passe → **Paul teste l'application** :
   - HomePage fonctionne ?
   - AdminAuditPage fonctionne ?
   - Pas d'erreurs console ?
   - Navigation OK ?
7. Si les tests sont OK → Claude supprime physiquement les fichiers commentés
8. Claude lance le build final : `pnpm build`
9. Claude fait : `git add` + `git commit` + `git push` (sans signature Claude, sans PR)

### Phase 2 : MERGE (Paul fait)

1. Paul crée et merge la PR sur GitHub

### Avantage de cette procédure

- **Test avant commit** : On vérifie que tout marche avant de commiter
- **Suppression propre** : Pas de fichiers commentés qui traînent dans le repo
- **Sécurité** : Paul teste avant que quoi que ce soit soit pushé

---

## 📋 CHECKLIST DE SUPPRESSION

### Étape actuelle : 🔄 EN COURS - Build OK, en attente test Paul

---

#### ✅ Étape 1 : Créer branche `cleanup/remove-obsolete-pages`
- **Status** : FAIT ✅
- **Date** : 27/11/2025
- **Commande** : `git checkout -b cleanup/remove-obsolete-pages`

---

#### ✅ Étape 2 (Groupe 1) : Commenter router.tsx + hooks/index.ts
- **Status** : FAIT ✅
- **Fichiers modifiés** :
  - `router.tsx` : imports et routes commentés
  - `hooks/index.ts` : exports commentés (useAllProposals, useTotemDetails, useAllTotems, usePlatformStats, useUserVotesDetailed, etc.)

---

#### ✅ Étape 3 (Groupe 2) : Commenter les 6 pages
- **Status** : FAIT ✅
- **Fichiers commentés** :
  - `pages/ProposePage.tsx`
  - `pages/VotePage.tsx`
  - `pages/ResultsPage.tsx`
  - `pages/FounderDetailsPage.tsx`
  - `pages/TotemDetailsPage.tsx`
  - `pages/MyVotesPage.tsx`

---

#### ✅ Étape 4 (Groupe 3) : Commenter les 7 composants
- **Status** : FAIT ✅
- **Date** : 27/11/2025
- **Fichiers commentés** :
  - `components/FounderCard.tsx`
  - `components/ProposalModal.tsx`
  - `components/TotemVoteCard.tsx`
  - `components/VoteModal.tsx`
  - `components/FounderResultCard.tsx`
  - `components/TotemProposalCard.tsx`
  - `components/ClaimCard.tsx`

---

#### ✅ Étape 5 (Groupe 4) : Commenter les 5 hooks
- **Status** : FAIT ✅
- **Date** : 27/11/2025
- **Fichiers commentés** :
  - `hooks/useFoundersWithAtomIds.ts`
  - `hooks/useAllTotems.ts`
  - `hooks/useAllProposals.ts`
  - `hooks/useTotemDetails.ts`
  - `hooks/usePlatformStats.ts`

---

#### ✅ Étape 6 (Groupe 5) : Commenter utils + tests
- **Status** : FAIT ✅
- **Date** : 27/11/2025
- **Fichiers commentés** :
  - `utils/exportResults.ts`
  - `utils/exportResults.test.ts`
  - `hooks/useAllTotems.test.ts`

---

#### ✅ Étape 7 : Paul teste l'application
- **Status** : FAIT ✅
- **Date** : 27/11/2025
- **Résultat** : Testnet OK, Mainnet a des erreurs préexistantes (schéma GraphQL différent - bug séparé)

---

#### ✅ Étape 8 : Supprimer physiquement les fichiers
- **Status** : FAIT ✅
- **Date** : 27/11/2025
- **Fichiers supprimés** : 21 fichiers (6 pages + 7 composants + 5 hooks + 2 utils + 1 test)
- **Note** : Type `FounderData` déplacé vers `types/founder.ts`

---

#### ✅ Étape 9 : Build final + commit + push
- **Status** : FAIT ✅
- **Date** : 27/11/2025
- **Build AVANT suppression** : OK ✅
- **Build APRÈS suppression** : OK ✅

---

#### ⏭️ Phase 2 : Merge (Paul fait)
- **Status** : À FAIRE
- [ ] Paul crée la PR sur GitHub
- [ ] Paul merge la PR

---

## Fichiers de routeur à modifier

Dans `router.tsx`, supprimer les routes :
- `/propose`
- `/vote`
- `/vote/:founderId`
- `/results`
- `/results/:founderId`
- `/results/:founderId/:totemId`
- `/my-votes`

---

## Exports à retirer de `hooks/index.ts`

- `useFoundersWithAtomIds`
- `useAllTotems`
- `useAllProposals`
- `useUserVotesDetailed`, `getTotalVotedAmount`, `formatTotalVotes`, `groupVotesByTerm`
- `useTotemDetails`
