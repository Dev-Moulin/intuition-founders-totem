# Gestion de Projet

Ce dossier contient tous les fichiers de suivi et de gestion du projet.

**⚠️ IMPORTANT** : Ce README doit être lu impérativement après chaque compression/résumé de conversation.

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

## 📂 Structure

```
00_GESTION_PROJET/
├── issues/
│   └── ISSUES_GITHUB.md           # Liste complète des issues GitHub
├── corrections/
│   └── CORRECTION_ISSUES_AGGREGATION.md   # Corrections mécanisme d'agrégation
├── modifications/
│   ├── MODIFICATIONS_EN_COURS.md  # Tracker central des modifications
│   └── ARCHITECTURE_NO_BACKEND.md # Architecture frontend-only
└── README.md                      # Ce fichier (À LIRE APRÈS CHAQUE RÉSUMÉ)
```

## 📋 Fichiers

### Issues
- **[ISSUES_GITHUB.md](./issues/ISSUES_GITHUB.md)** : Liste exhaustive des issues du projet avec leur statut

### Corrections
- **[CORRECTION_ISSUES_AGGREGATION.md](./corrections/CORRECTION_ISSUES_AGGREGATION.md)** : Documentation détaillée de la correction du mécanisme d'agrégation INTUITION v2

### Modifications
- **[MODIFICATIONS_EN_COURS.md](./modifications/MODIFICATIONS_EN_COURS.md)** : Tracker central de toutes les modifications en cours et à venir
- **[ARCHITECTURE_NO_BACKEND.md](./modifications/ARCHITECTURE_NO_BACKEND.md)** : Décision architecture frontend-only (pas de serveur backend)

## 🔄 Workflow

1. **Identifier** une modification → Ajouter dans `MODIFICATIONS_EN_COURS.md`
2. **Documenter** en détail → Créer un fichier dans `corrections/` si complexe
3. **Tracer** les issues GitHub → Référencer dans `ISSUES_GITHUB.md`
4. **Archiver** quand terminé

## 📚 Documentation Projet

Ce dossier (`Claude/00_GESTION_PROJET/`) est la **source de vérité**.

La documentation complète du projet se trouve dans :
- `Claude/01_OBJECTIF/` - Objectifs du projet
- `Claude/02_FONCTIONNEMENT/` - Fonctionnement détaillé
- `Claude/03_TECHNOLOGIES/` - Stack technique
- `Claude/04_VERIFICATION_WALLETS/` - Whitelist NFT
- `Claude/05_STRUCTURE_DONNEES/` - Schémas de données
- `Claude/05_UX_FLOW/` - Architecture des pages
- `Claude/06_BACKEND/` - Backend (obsolète - frontend-only)
- `Claude/07_SECURITE/` - Sécurité
- `Claude/08_UX_UI/` - Design system
- `Claude/09_GESTION_ERREURS/` - Gestion erreurs
- `Claude/10_TESTS/` - Stratégie de tests
- `Claude/13_DONNEES_FONDATEURS/` - Données fondateurs
- `Claude/14_TOTEMS/` - Totems

**Note** : Il peut y avoir des différences entre les issues GitHub (créées au début) et la documentation actuelle. En cas de conflit, **ce dossier fait foi**.

---

**Dernière mise à jour** : 21 novembre 2025
