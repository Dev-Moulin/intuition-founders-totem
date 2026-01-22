/**
 * Batch Vote Module
 *
 * Ce module expose les fonctions et types pour le système de batch voting.
 * Architecture modulaire pour une meilleure maintenabilité.
 *
 * @see Documentation: Claude/00_GESTION_PROJET/Projet_02_SDK_V2/Phase_18_Positions_UX/15.8_RECHERCHE_Transactions_Complete.md
 */

// Types
export * from './types';

// Utilitaires
export * from './utils';

// Fonctions d'exécution
export { executeCreateTriples } from './executeCreateTriples';
export type { CreateTriplesParams, CreateTriplesResult } from './executeCreateTriples';

export { executeCreateNewTotems } from './executeCreateAtoms';
export type { CreateNewTotemsParams, CreateNewTotemsResult } from './executeCreateAtoms';

export { executeRedeems, redeemBlockingForPositions } from './executeRedeems';
export type { RedeemParams, RedeemResult, RedeemBlockingPositionsParams } from './executeRedeems';

export { executeDeposits } from './executeDeposits';
export type { DepositsParams, DepositsResult } from './executeDeposits';

// Polling utilities pour attendre l'indexation GraphQL
export {
  waitForTripleIndexed,
  waitForAtomIndexed,
  waitForMultipleTriplesIndexed,
} from './waitForIndexed';
export type { PollingConfig, TripleIndexedResult } from './waitForIndexed';

// Hook pour création batch de triples
export {
  useBatchTriples,
  type BatchTripleItem,
  type TripleValidation,
  type BatchTripleCost,
  type BatchTripleResult,
  type UseBatchTriplesResult,
} from './useBatchTriples';
