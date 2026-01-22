/**
 * useTriples - Hook pour la gestion des Triples INTUITION
 *
 * Un Triple = relation entre 3 atoms: [Subject] [Predicate] [Object]
 * Exemple: [Vitalik] [support] [Decentralization]
 *
 * @see Documentation: 06_Hooks/blockchain/useIntuition_creation-triple.md
 */

import { useCallback } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { useApolloClient } from '@apollo/client';
import { getMultiVaultAddressFromChainId } from '@0xintuition/sdk';
import { parseEther, formatEther, type Hex } from 'viem';
import { multiCallIntuitionConfigs, MultiVaultAbi } from '@0xintuition/protocol';
import { currentIntuitionChain } from '../../../config/wagmi';
import { GET_TRIPLE_BY_ATOMS } from '../../../lib/graphql/queries';
import type { CreateTripleResult } from '../../../types/intuition';

/**
 * Résultat de recherche d'un triple existant
 */
export interface FoundTriple {
  termId: Hex;
  counterTermId?: Hex;
  subjectLabel: string;
  predicateLabel: string;
  objectLabel: string;
  forVotes?: string;
  againstVotes?: string;
}

/**
 * Hook pour la gestion des triples
 */
export function useTriples() {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const apolloClient = useApolloClient();

  const multiVaultAddress = getMultiVaultAddressFromChainId(currentIntuitionChain.id);

  /**
   * Vérifie si un triple existe déjà via GraphQL
   */
  const findTriple = useCallback(
    async (
      subjectId: Hex,
      predicateId: Hex,
      objectId: Hex
    ): Promise<FoundTriple | null> => {
      try {
        const { data } = await apolloClient.query<{
          triples: Array<{
            term_id: string;
            subject: { label: string };
            predicate: { label: string };
            object: { label: string };
            triple_vault?: { total_assets: string };
            counter_term?: { id: string; total_assets: string };
          }>;
        }>({
          query: GET_TRIPLE_BY_ATOMS,
          variables: { subjectId, predicateId, objectId },
          fetchPolicy: 'network-only',
        });

        if (data?.triples && data.triples.length > 0) {
          const triple = data.triples[0];
          return {
            termId: triple.term_id as Hex,
            counterTermId: triple.counter_term?.id as Hex | undefined,
            subjectLabel: triple.subject.label,
            predicateLabel: triple.predicate.label,
            objectLabel: triple.object.label,
            forVotes: triple.triple_vault?.total_assets,
            againstVotes: triple.counter_term?.total_assets,
          };
        }
        return null;
      } catch (error) {
        console.warn('[useTriples] Error looking up triple:', error);
        return null;
      }
    },
    [apolloClient]
  );

  /**
   * Create a Triple (claim) from three atom IDs
   *
   * V2 CONTRACT: msg.value == sum(assets)
   * assets[0] = tripleBaseCost + userDeposit
   */
  const createTriple = useCallback(
    async (
      subjectId: Hex,
      predicateId: Hex,
      objectId: Hex,
      depositAmount: string
    ): Promise<CreateTripleResult> => {
      console.log('[useTriples] ========== CREATE TRIPLE START ==========');
      console.log('[useTriples] Creating triple with:', { subjectId, predicateId, objectId, depositAmount });

      if (!walletClient || !publicClient) {
        throw new Error('Wallet not connected');
      }

      // Vérification des coûts et balance
      try {
        const contractConfig = await multiCallIntuitionConfigs({ publicClient, address: multiVaultAddress });
        const walletBalance = await publicClient.getBalance({ address: walletClient.account.address });
        const depositAmountWei = parseEther(depositAmount);
        const tripleBaseCost = BigInt(contractConfig.triple_cost);
        const minDeposit = BigInt(contractConfig.min_deposit);
        const totalRequired = tripleBaseCost + depositAmountWei;

        if (depositAmountWei < minDeposit) {
          throw new Error(
            `Dépôt trop faible! Le minimum requis par le contrat V2 est ${contractConfig.formatted_min_deposit} tTRUST, ` +
            `mais vous avez mis ${depositAmount} tTRUST. Augmentez le montant du dépôt.`
          );
        }

        if (walletBalance < totalRequired) {
          const deficit = totalRequired - walletBalance;
          throw new Error(
            `Balance insuffisante! Vous avez ${formatEther(walletBalance)} tTRUST mais il faut ${formatEther(totalRequired)} tTRUST ` +
            `(${contractConfig.formatted_triple_cost} coût de base + ${depositAmount} dépôt). ` +
            `Il vous manque ${formatEther(deficit)} tTRUST. Allez sur le faucet: https://testnet.hub.intuition.systems`
          );
        }
      } catch (err) {
        if (err instanceof Error && (err.message.includes('Balance insuffisante') || err.message.includes('Dépôt trop faible'))) {
          throw err;
        }
        console.warn('[useTriples] Could not check costs:', err);
      }

      // V2 CONTRACT: assets[0] = tripleBaseCost + userDeposit
      const depositAmountWei = parseEther(depositAmount);
      const contractConfig = await multiCallIntuitionConfigs({ publicClient, address: multiVaultAddress });
      const tripleBaseCost = BigInt(contractConfig.triple_cost);
      const totalAssetValue = tripleBaseCost + depositAmountWei;

      // Simulate first
      const { request } = await publicClient.simulateContract({
        account: walletClient.account,
        address: multiVaultAddress,
        abi: MultiVaultAbi,
        functionName: 'createTriples',
        args: [[subjectId], [predicateId], [objectId], [totalAssetValue]],
        value: totalAssetValue,
      });

      // Execute
      console.log('[useTriples] Sending createTriples transaction...');
      const txHash = await walletClient.writeContract(request);
      console.log('[useTriples] Transaction sent! Hash:', txHash);

      // Wait for receipt
      console.log('[useTriples] Waiting for transaction receipt...');
      const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
      console.log('[useTriples] Transaction confirmed!', { status: receipt.status, blockNumber: receipt.blockNumber });

      console.log('[useTriples] ✅ Triple created successfully!');
      console.log('[useTriples] ========== CREATE TRIPLE END ==========');

      return {
        transactionHash: txHash,
        tripleId: subjectId, // Placeholder
        subjectId,
        predicateId,
        objectId,
      };
    },
    [walletClient, publicClient, multiVaultAddress]
  );

  const isReady = !!walletClient && !!publicClient;

  return {
    findTriple,
    createTriple,
    isReady,
  };
}
