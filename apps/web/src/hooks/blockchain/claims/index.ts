/**
 * Claims Module
 *
 * Création de claims INTUITION avec système de catégories:
 * - createClaim: Claim basique
 * - createClaimWithDescription: Avec description
 * - createClaimWithCategory: Système 3-triples
 * - useCreateTotemWithTriples: Création totem (atom + category triple)
 */

export { useClaims } from './useClaims';
export {
  useCreateTotemWithTriples,
  type TotemCreationInput,
  type TotemCreationResult,
  type CreationStep,
  type UseCreateTotemWithTriplesResult,
} from './useCreateTotemWithTriples';
