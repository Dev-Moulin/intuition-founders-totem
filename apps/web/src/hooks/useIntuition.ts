import { useCallback } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import {
  createAtomFromString,
  createAtomFromThing,
  batchCreateTripleStatements,
  getMultiVaultAddressFromChainId,
} from '@0xintuition/sdk';
import { parseEther, type Hex } from 'viem';
import { intuitionTestnet } from '@0xintuition/protocol';

export interface CreateAtomResult {
  uri: string;
  transactionHash: string;
  termId: Hex;
}

export interface CreateTripleResult {
  transactionHash: string;
  tripleId: Hex;
  subjectId: Hex;
  predicateId: Hex;
  objectId: Hex;
}

export interface FounderData {
  name: string;
  shortBio: string;
  fullBio?: string;
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
  image?: string;
}

/**
 * Get the best available image URL for a founder
 * Priority: manual image > Twitter avatar > GitHub avatar > DiceBear fallback
 */
export function getFounderImageUrl(founder: FounderData): string {
  // 1. Manual image if provided
  if (founder.image) {
    return founder.image;
  }

  // 2. Twitter avatar via unavatar.io
  if (founder.twitter) {
    return `https://unavatar.io/twitter/${founder.twitter.replace('@', '')}`;
  }

  // 3. GitHub avatar (direct from GitHub)
  if (founder.github) {
    return `https://github.com/${founder.github}.png`;
  }

  // 4. DiceBear fallback - generates unique avatar based on name
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(founder.name)}`;
}

export function useIntuition() {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const multiVaultAddress = getMultiVaultAddressFromChainId(intuitionTestnet.id);

  /**
   * Create an Atom from a string (for predicates, totems)
   */
  const createAtom = useCallback(
    async (value: string, depositAmount?: string): Promise<CreateAtomResult> => {
      if (!walletClient || !publicClient) {
        throw new Error('Wallet not connected');
      }

      const config = {
        walletClient,
        publicClient,
        address: multiVaultAddress,
      };

      const deposit = depositAmount ? parseEther(depositAmount) : undefined;

      const result = await createAtomFromString(config, value, deposit);

      return {
        uri: result.uri,
        transactionHash: result.transactionHash,
        termId: result.state.termId,
      };
    },
    [walletClient, publicClient, multiVaultAddress]
  );

  /**
   * Create an Atom with full metadata (for founders)
   * Uses createAtomFromThing to include name, description, image, url
   */
  const createFounderAtom = useCallback(
    async (founder: FounderData, depositAmount?: string): Promise<CreateAtomResult> => {
      if (!walletClient || !publicClient) {
        throw new Error('Wallet not connected');
      }

      const config = {
        walletClient,
        publicClient,
        address: multiVaultAddress,
      };

      const deposit = depositAmount ? parseEther(depositAmount) : undefined;

      // Build URL from twitter or linkedin
      const url = founder.twitter
        ? `https://twitter.com/${founder.twitter.replace('@', '')}`
        : founder.linkedin || undefined;

      // Build image URL using cascade: manual > Twitter > GitHub > DiceBear
      const image = getFounderImageUrl(founder);

      const result = await createAtomFromThing(
        config,
        {
          url,
          name: founder.name,
          description: founder.fullBio || founder.shortBio,
          image,
        },
        deposit
      );

      return {
        uri: result.uri,
        transactionHash: result.transactionHash,
        termId: result.state.termId,
      };
    },
    [walletClient, publicClient, multiVaultAddress]
  );

  /**
   * Create a Triple (claim) from three atom IDs
   */
  const createTriple = useCallback(
    async (
      subjectId: Hex,
      predicateId: Hex,
      objectId: Hex,
      depositAmount: string
    ): Promise<CreateTripleResult> => {
      if (!walletClient || !publicClient) {
        throw new Error('Wallet not connected');
      }

      const config = {
        walletClient,
        publicClient,
        address: multiVaultAddress,
      };

      // batchCreateTripleStatements expects arrays for batch operations
      // We pass single-element arrays for a single triple
      const result = await batchCreateTripleStatements(
        config,
        [[subjectId], [predicateId], [objectId], [parseEther(depositAmount)]]
      );

      const state = result.state[0];

      return {
        transactionHash: result.transactionHash,
        tripleId: state.termId,
        subjectId: state.subjectId,
        predicateId: state.predicateId,
        objectId: state.objectId,
      };
    },
    [walletClient, publicClient, multiVaultAddress]
  );

  /**
   * Create a complete claim with new atoms if needed
   * Returns the triple result
   */
  const createClaim = useCallback(
    async (params: {
      subjectId: Hex; // Founder atom ID (pre-existing)
      predicate: string | Hex; // String = create new atom, Hex = use existing
      object: string | Hex; // String = create new atom, Hex = use existing
      depositAmount: string;
    }): Promise<{
      triple: CreateTripleResult;
      predicateAtom?: CreateAtomResult;
      objectAtom?: CreateAtomResult;
    }> => {
      let predicateId: Hex;
      let objectId: Hex;
      let predicateAtom: CreateAtomResult | undefined;
      let objectAtom: CreateAtomResult | undefined;

      // Create predicate atom if it's a string
      if (typeof params.predicate === 'string') {
        predicateAtom = await createAtom(params.predicate);
        predicateId = predicateAtom.termId;
      } else {
        predicateId = params.predicate;
      }

      // Create object atom if it's a string
      if (typeof params.object === 'string') {
        objectAtom = await createAtom(params.object);
        objectId = objectAtom.termId;
      } else {
        objectId = params.object;
      }

      // Create the triple
      const triple = await createTriple(
        params.subjectId,
        predicateId,
        objectId,
        params.depositAmount
      );

      return {
        triple,
        predicateAtom,
        objectAtom,
      };
    },
    [createAtom, createTriple]
  );

  return {
    createAtom,
    createFounderAtom,
    createTriple,
    createClaim,
    isReady: !!walletClient && !!publicClient,
  };
}
