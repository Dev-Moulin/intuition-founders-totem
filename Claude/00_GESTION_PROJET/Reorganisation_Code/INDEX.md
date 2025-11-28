# Réorganisation du Code

**Date de début** : 28/11/2025
**Branche** : `refactor/code-reorganization`
**Status** : EN COURS - PHASE 2+3 (Étape 01 - constants.ts)

---

## 🚨 RÈGLES CRITIQUES - Git/GitHub Workflow

### ❌ INTERDICTIONS ABSOLUES

1. **JE NE DOIS JAMAIS** créer de Pull Request
2. **JE NE DOIS JAMAIS** marquer que c'est moi qui ai rédigé un commit
   - ❌ Pas de "Generated with Claude Code"
   - ❌ Pas de "Co-Authored-By: Claude"
3. **JE NE DOIS JAMAIS** push directement sur `main`

### ✅ CE QUE JE PEUX FAIRE

1. **Je PEUX** push sur des **branches** (jamais sur main directement)
2. **Je DOIS** créer une **nouvelle branche** pour chaque :
   - Feature
   - Fix
   - Refactor
   - Documentation
   - Toute modification

### 👤 VALIDATION

**PAUL ET PAUL SEUL** valide les Pull Requests.

### 📝 Workflow Git Correct

```bash
# 1. Créer une nouvelle branche
git checkout -b feature/nom-descriptif

# 2. Faire les modifications et commits
git add fichiers
git commit -m "description claire"

# 3. Push sur la branche
git push origin feature/nom-descriptif

# 4. ATTENDRE que Paul valide la PR (ne pas la créer)
```

---

## Objectif

Réorganiser le code pour que chaque fichier soit dans le bon dossier :
- **Types/interfaces** → `types/`
- **Constantes de configuration** → `config/`
- **Fonctions utilitaires** → `utils/`
- **Composants UI** → `components/`
- **Hooks React** → `hooks/`
- **Clients/services externes** → `lib/`

---

## Procédure

### Phase 1 : Analyse ✅ TERMINÉE

**Objectif** : Analyser chaque fichier et documenter ce qui est mal placé.

**Pour chaque fichier** : Écrire une courte description (1 ligne) de ce que c'est et à quoi ça sert.

| Dossier | Fichiers | Status | Résumé |
|---------|----------|--------|--------|
| components/ | 13 | [x] Analysé | 6 OK, 7 à refactor (types, utils, config dupliqués) |
| hooks/ | 13 | [x] Analysé | 4 OK, 9 à refactor (beaucoup de types + fonctions dupliquées) |
| utils/ | 3 | [x] Analysé | 1 OK, 2 à refactor (types + re-exports confus) |
| config/ | 3 | [x] Analysé | 3 OK (manque constants.ts pour centraliser) |
| lib/ | 6 | [x] Analysé | 6 OK (bien organisé) |
| types/ | 1 | [x] Analysé | 1 OK (manque types à extraire d'autres dossiers) |

**Documentation créée** :
- `Phase1_Analyse/components.md`
- `Phase1_Analyse/hooks.md`
- `Phase1_Analyse/utils.md`
- `Phase1_Analyse/config.md`
- `Phase1_Analyse/lib.md`
- `Phase1_Analyse/types.md`

### Phase 2+3 : Planification et Exécution (ITÉRATIF)

**IMPORTANT** : On ne planifie PAS tout d'abord ! On fait une modification à la fois :
- Planifier tout puis exécuter = problèmes (lignes changent, imports évoluent)
- Planifier → Exécuter → Planifier suivant = correct

**Fichier de roadmap** : `Phase2_Plan/00_ORDRE_EXECUTION.md`

**Pour CHAQUE extraction** :

```
┌─────────────────────────────────────────────────────────┐
│  ÉTAPE N - Extraction complète (sans duplication)       │
├─────────────────────────────────────────────────────────┤
│  1. Créer Phase2_Plan/XX_nom.md (plan détaillé)         │
│     - Lister le code à extraire (avec lignes exactes)   │
│     - Lister les fichiers sources à modifier            │
│     - Montrer le nouveau fichier à créer                │
│                                                         │
│  2. Paul valide le plan                                 │
│                                                         │
│  3. Exécuter (en sécurité) :                            │
│     a) Créer le nouveau fichier (si pas déjà fait)      │
│     b) Ajouter import + COMMENTER l'ancien code         │
│     c) Build + Test                                     │
│     d) Si OK → Supprimer les commentaires               │
│     e) Build + Test final                               │
│                                                         │
│  4. Paul contrôle le résultat                           │
│                                                         │
│  5. Créer Phase3_Execution/XX_nom.md (résultat)         │
│                                                         │
│  6. Commit                                              │
│                                                         │
│  7. Mettre à jour 00_ORDRE_EXECUTION.md                 │
│                                                         │
│  8. Passer à l'étape N+1                                │
└─────────────────────────────────────────────────────────┘
```

**IMPORTANT** : Chaque étape = extraction complète. Pas de code dupliqué entre les commits.

**Documentation** :
- `Phase2_Plan/00_ORDRE_EXECUTION.md` - Roadmap globale (liste ordonnée)
- `Phase2_Plan/XX_nom.md` - Plan détaillé (créé juste avant exécution)
- `Phase3_Execution/XX_nom.md` - Résultat (créé après exécution)

---

## Structure des dossiers

```
Reorganisation_Code/
├── INDEX.md                     # Ce fichier (procédure + status)
├── Phase1_Analyse/              # Analyse de chaque dossier ✅ TERMINÉ
│   ├── components.md
│   ├── hooks.md
│   ├── utils.md
│   ├── config.md
│   ├── lib.md
│   └── types.md
├── Phase2_Plan/                 # Plans détaillés (1 par modification)
│   ├── 00_ORDRE_EXECUTION.md    # Roadmap globale
│   ├── 01_constants.md          # Plan étape 1 (créé)
│   ├── 02_xxx.md                # Plan étape 2 (à créer avant exécution)
│   └── ...
└── Phase3_Execution/            # Résultats (1 par modification)
    ├── 01_constants.md          # Résultat étape 1 (après exécution)
    └── ...
```

---

## Critères d'analyse

### Ce qui devrait être dans `types/`
- Interfaces TypeScript
- Types personnalisés
- Enums
- Type guards

### Ce qui devrait être dans `config/`
- Constantes de configuration
- Adresses de contrats
- URLs d'API
- Paramètres par environnement

### Ce qui devrait être dans `utils/`
- Fonctions pures (sans side effects)
- Formatters (dates, nombres, adresses)
- Validateurs
- Helpers génériques

### Ce qui devrait être dans `lib/`
- Clients externes (Apollo, Wagmi)
- Configuration de services
- Wrappers d'API

### Ce qui devrait être dans `hooks/`
- Hooks React personnalisés
- Logique réutilisable avec state/effects
- PAS de types (sauf locaux au hook)

### Ce qui devrait être dans `components/`
- Composants React UI
- PAS de logique métier complexe
- PAS de constantes globales

---

## Notes

- **Sécurité** : Commenter d'abord, supprimer après validation du build
- Build + Test après CHAQUE extraction
- Paul valide le plan avant l'exécution
- En cas de doute, on demande à Paul
