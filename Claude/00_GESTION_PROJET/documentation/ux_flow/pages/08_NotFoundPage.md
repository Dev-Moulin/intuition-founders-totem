# NotFoundPage

> Route: `*` (catch-all)
> Fichier: `apps/web/src/pages/NotFoundPage.tsx`
> Statut: Partiellement implementee

## Objectif

Page d'erreur 404 stylisee et utile.

## Wireframe

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ HEADER                                      [Connect]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                                                             │
│                                                             │
│                     404                                     │
│                                                             │
│               🔍 Page Not Found 🔍                          │
│                                                             │
│   Looks like this totem doesn't exist... yet!             │
│                                                             │
│                                                             │
│              ┌──────────────────────┐                       │
│              │ [Back to Home]       │                       │
│              └──────────────────────┘                       │
│                                                             │
│              ┌──────────────────────┐                       │
│              │ [View All Totems]    │                       │
│              └──────────────────────┘                       │
│                                                             │
│              ┌──────────────────────┐                       │
│              │ [Propose a Totem]    │                       │
│              └──────────────────────┘                       │
│                                                             │
│                                                             │
│   Or search for a founder:                                 │
│   [_________________________________] 🔍                     │
│                                                             │
│                                                             │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ FOOTER                                                   │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Composants

### Error Display
- **404 en grand** : Typography large
- **Emoji** : 🔍 ou autre thematique
- **Message** : Message sympathique et thematique

### Quick Actions
- **Boutons CTA** :
  - Back to Home -> HomePage
  - View All Totems -> VotePage
  - Propose a Totem -> ProposePage

### Search Bar
- **Search founders** : Input pour chercher un fondateur
- Auto-suggestion si possible
- Redirect vers FounderDetailPage si trouve

## Hooks

- `useNavigate()` : React Router navigation
- `useFoundersSearch()` : Recherche dans les fondateurs

## Etats

- `searchQuery` : Recherche fondateur
- `isConnected` : boolean depuis useAccount()

---

## Ecarts avec l'implementation actuelle

### Ce qui est implemente (33 lignes)
- [x] Affichage 404 stylise (text-8xl purple)
- [x] Titre "Page non trouvee"
- [x] Message explicatif
- [x] Bouton "Retour a l'accueil"
- [x] Bouton "Proposer un Totem" (conditionnel si connecte)
- [x] Centre verticalement avec flex
- [x] Responsive (col sur mobile, row sur desktop)

### Ce qui manque
- [ ] **Emoji thematique** : 🔍 dans le message
- [ ] **Bouton "View All Totems"** : Lien vers VotePage
- [ ] **Search Bar fondateurs** : Input pour chercher un fondateur
- [ ] **Auto-suggestion** : Suggestions pendant la frappe
- [ ] **Hook useFoundersSearch()** : Pour la recherche

### Differences de design
- L'implementation actuelle a 2 boutons au lieu de 3
- Pas de Search Bar pour trouver un fondateur
- Message en francais vs anglais dans le spec
- Bouton "Propose" conditionnel vs toujours visible dans le spec

