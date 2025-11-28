# test/setup.ts

**Chemin**: `apps/web/src/test/setup.ts`
**Status**: UTILISÉ

## Utilisé par

- `vitest.config.ts` (setupFiles)

## Description

Configuration Vitest : initialisation i18n, mocks globaux (matchMedia, ResizeObserver), cleanup.

## Rôle

- Initialise i18n en français pour les tests
- Mock `window.matchMedia` pour éviter erreurs
- Mock `ResizeObserver` global
- Cleanup après chaque test
