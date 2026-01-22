/**
 * useClaims - Hook pour la création de Claims INTUITION
 *
 * Un Claim = Atoms + Triple combinés.
 * Ces fonctions créent automatiquement les atoms nécessaires puis le triple.
 *
 * 3 variantes:
 * - createClaim: Basique
 * - createClaimWithDescription: Avec description sur l'objet
 * - createClaimWithCategory: Système 3-triples (vote + catégorie + tag)
 *
 * @see Documentation: 06_Hooks/blockchain/useIntuition_creation-claims.md
 */

import { useCallback } from 'react';
import { usePublicClient } from 'wagmi';
import { getMultiVaultAddressFromChainId } from '@0xintuition/sdk';
import { formatEther, type Hex } from 'viem';
import { multiCallIntuitionConfigs } from '@0xintuition/protocol';
import { currentIntuitionChain } from '../../../config/wagmi';
import categoriesConfig from '../../../../../../packages/shared/src/data/categories.json';
import type { CategoryConfig, CreateTripleResult } from '../../../types/intuition';
import { ClaimExistsError } from '../../../types/intuition';
import { useAtoms } from '../atoms/useAtoms';
import { useTriples } from '../triples/useTriples';

const typedCategoriesConfig = categoriesConfig as CategoryConfig;

/**
 * Helper pour vérifier si une valeur est un ID Hex
 */
const isHexAtomId = (value: string): boolean => {
  return value.startsWith('0x') && value.length === 66;
};

/**
 * Hook pour la création de claims
 */
export function useClaims() {
  const publicClient = usePublicClient();
  const multiVaultAddress = getMultiVaultAddressFromChainId(currentIntuitionChain.id);

  const {
    getOrCreateAtom,
    getOrCreateAtomWithDescription,
    isReady: atomsReady,
  } = useAtoms();

  const {
    findTriple,
    createTriple,
    isReady: triplesReady,
  } = useTriples();

  /**
   * Create a complete claim with new atoms if needed
   */
  const createClaim = useCallback(
    async (params: {
      subjectId: Hex;
      predicate: string | Hex;
      object: string | Hex;
      depositAmount: string;
    }): Promise<{
      triple: CreateTripleResult;
      predicateCreated: boolean;
      objectCreated: boolean;
    }> => {
      let predicateId: Hex;
      let objectId: Hex;
      let predicateCreated = false;
      let objectCreated = false;

      // Get or create predicate
      if (typeof params.predicate === 'string' && !isHexAtomId(params.predicate)) {
        const result = await getOrCreateAtom(params.predicate);
        predicateId = result.termId;
        predicateCreated = result.created;
      } else {
        predicateId = params.predicate as Hex;
      }

      // Get or create object
      if (typeof params.object === 'string' && !isHexAtomId(params.object)) {
        const result = await getOrCreateAtom(params.object);
        objectId = result.termId;
        objectCreated = result.created;
      } else {
        objectId = params.object as Hex;
      }

      // Check if triple exists
      const existingTriple = await findTriple(params.subjectId, predicateId, objectId);
      if (existingTriple) {
        throw new ClaimExistsError({
          termId: existingTriple.termId,
          counterTermId: existingTriple.counterTermId,
          subjectLabel: existingTriple.subjectLabel,
          predicateLabel: existingTriple.predicateLabel,
          objectLabel: existingTriple.objectLabel,
          forVotes: existingTriple.forVotes,
          againstVotes: existingTriple.againstVotes,
        });
      }

      const triple = await createTriple(params.subjectId, predicateId, objectId, params.depositAmount);

      return { triple, predicateCreated, objectCreated };
    },
    [getOrCreateAtom, createTriple, findTriple]
  );

  /**
   * Create claim with description on object
   */
  const createClaimWithDescription = useCallback(
    async (params: {
      subjectId: Hex;
      predicate: string | Hex;
      objectName: string;
      objectDescription: string;
      depositAmount: string;
    }): Promise<{
      triple: CreateTripleResult;
      predicateCreated: boolean;
      objectCreated: boolean;
    }> => {
      let predicateId: Hex;
      let predicateCreated = false;

      // Get or create predicate
      if (typeof params.predicate === 'string' && !isHexAtomId(params.predicate)) {
        const result = await getOrCreateAtom(params.predicate);
        predicateId = result.termId;
        predicateCreated = result.created;
      } else {
        predicateId = params.predicate as Hex;
      }

      // Get or create object with description
      const objectResult = await getOrCreateAtomWithDescription(
        params.objectName,
        params.objectDescription
      );

      // Check if triple exists
      const existingTriple = await findTriple(params.subjectId, predicateId, objectResult.termId);
      if (existingTriple) {
        throw new ClaimExistsError({
          termId: existingTriple.termId,
          counterTermId: existingTriple.counterTermId,
          subjectLabel: existingTriple.subjectLabel,
          predicateLabel: existingTriple.predicateLabel,
          objectLabel: existingTriple.objectLabel,
          forVotes: existingTriple.forVotes,
          againstVotes: existingTriple.againstVotes,
        });
      }

      const triple = await createTriple(params.subjectId, predicateId, objectResult.termId, params.depositAmount);

      return {
        triple,
        predicateCreated,
        objectCreated: objectResult.created,
      };
    },
    [getOrCreateAtom, getOrCreateAtomWithDescription, createTriple, findTriple]
  );

  /**
   * Create claim with category triples (3-triple system)
   *
   * Triple 1: [Founder] [predicate] [Totem]
   * Triple 2: [Totem] [has category] [Category]
   * Triple 3: [Category] [tag category] [OFC]
   */
  const createClaimWithCategory = useCallback(
    async (params: {
      subjectId: Hex;
      predicate: string | Hex;
      objectName: string;
      categoryId: string;
      depositAmount: string;
    }): Promise<{
      triple: CreateTripleResult;
      categoryTriple: CreateTripleResult | null;
      tagTriple: CreateTripleResult | null;
      predicateCreated: boolean;
      objectCreated: boolean;
      categoryPredicateCreated: boolean;
      categoryObjectCreated: boolean;
      tagPredicateCreated: boolean;
      systemObjectCreated: boolean;
    }> => {
      let predicateId: Hex;
      let predicateCreated = false;
      let categoryPredicateCreated = false;
      let categoryObjectCreated = false;
      let tagPredicateCreated = false;
      let systemObjectCreated = false;

      const predefinedCategory = typedCategoriesConfig.categories.find(c => c.id === params.categoryId);
      const categoryLabel = predefinedCategory
        ? predefinedCategory.label
        : params.categoryId.charAt(0).toUpperCase() + params.categoryId.slice(1);

      // Get or create predicate
      if (typeof params.predicate === 'string' && !isHexAtomId(params.predicate)) {
        const result = await getOrCreateAtom(params.predicate);
        predicateId = result.termId;
        predicateCreated = result.created;
      } else {
        predicateId = params.predicate as Hex;
      }

      // Get or create object (totem)
      const objectResult = await getOrCreateAtom(params.objectName);

      // Check if triple exists
      const existingTriple = await findTriple(params.subjectId, predicateId, objectResult.termId);
      if (existingTriple) {
        throw new ClaimExistsError({
          termId: existingTriple.termId,
          counterTermId: existingTriple.counterTermId,
          subjectLabel: existingTriple.subjectLabel,
          predicateLabel: existingTriple.predicateLabel,
          objectLabel: existingTriple.objectLabel,
          forVotes: existingTriple.forVotes,
          againstVotes: existingTriple.againstVotes,
        });
      }

      // === TRIPLE 1: Vote principal ===
      const triple = await createTriple(params.subjectId, predicateId, objectResult.termId, params.depositAmount);

      // === TRIPLE 2 & 3: Category system ===
      let categoryTriple: CreateTripleResult | null = null;
      let tagTriple: CreateTripleResult | null = null;

      const categoryTermId = predefinedCategory?.termId;
      const categoryPredicateTermId = typedCategoriesConfig.predicate.termId;
      const tagPredicateTermId = typedCategoriesConfig.tagPredicate?.termId;
      const systemObjectTermId = typedCategoriesConfig.systemObject?.termId;

      // Triple 2: [Totem] → [has category] → [Category]
      try {
        if (!categoryPredicateTermId) {
          console.warn('[useClaims] Prédicat "has category" non créé par admin');
        } else if (!categoryTermId) {
          console.warn(`[useClaims] Catégorie "${categoryLabel}" non créée par admin`);
        } else {
          const existingCatTriple = await findTriple(objectResult.termId, categoryPredicateTermId as Hex, categoryTermId as Hex);
          if (!existingCatTriple) {
            const contractConfig = await multiCallIntuitionConfigs({ publicClient: publicClient!, address: multiVaultAddress });
            const minDeposit = formatEther(BigInt(contractConfig.min_deposit));
            categoryTriple = await createTriple(objectResult.termId, categoryPredicateTermId as Hex, categoryTermId as Hex, minDeposit);
          }
        }
      } catch (err) {
        console.error('[useClaims] Erreur triple catégorie (non bloquant):', err);
      }

      // Triple 3: [Category] → [tag category] → [OFC]
      try {
        if (categoryTermId && tagPredicateTermId && systemObjectTermId) {
          const existingTagTriple = await findTriple(categoryTermId as Hex, tagPredicateTermId as Hex, systemObjectTermId as Hex);
          if (!existingTagTriple) {
            const contractConfig = await multiCallIntuitionConfigs({ publicClient: publicClient!, address: multiVaultAddress });
            const minDeposit = formatEther(BigInt(contractConfig.min_deposit));
            tagTriple = await createTriple(categoryTermId as Hex, tagPredicateTermId as Hex, systemObjectTermId as Hex, minDeposit);
          }
        }
      } catch (err) {
        console.error('[useClaims] Erreur triple tag (non bloquant):', err);
      }

      return {
        triple,
        categoryTriple,
        tagTriple,
        predicateCreated,
        objectCreated: objectResult.created,
        categoryPredicateCreated,
        categoryObjectCreated,
        tagPredicateCreated,
        systemObjectCreated,
      };
    },
    [getOrCreateAtom, createTriple, findTriple, publicClient, multiVaultAddress]
  );

  const isReady = atomsReady && triplesReady;

  return {
    createClaim,
    createClaimWithDescription,
    createClaimWithCategory,
    isReady,
  };
}
