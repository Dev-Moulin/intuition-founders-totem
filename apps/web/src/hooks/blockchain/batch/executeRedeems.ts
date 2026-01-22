/**
 * executeRedeems - Retrait de positions existantes
 *
 * Ce module gère le retrait (redeem) des positions existantes.
 * Utilisé principalement quand l'utilisateur change de direction
 * (switch FOR ↔ AGAINST).
 *
 * @see Documentation: Claude/00_GESTION_PROJET/Projet_02_SDK_V2/Phase_18_Positions_UX/15.8_RECHERCHE_Transactions_Complete.md
 */

import { type Hex, type Address, formatEther } from 'viem';
import type { PublicClient, WalletClient } from 'viem';
import { MultiVaultAbi } from '@0xintuition/protocol';
import type { ProcessableCartItem } from './types';
import { getPositionShares } from './utils';

/**
 * Paramètres pour executeRedeems
 */
export interface RedeemParams {
  items: ProcessableCartItem[];
  address: Address;
  walletClient: WalletClient;
  publicClient: PublicClient;
  multiVaultAddress: Address;
}

/**
 * Résultat de executeRedeems
 */
export interface RedeemResult {
  txHash: Hex;
  totalRedeemed: bigint;
}

/**
 * Exécute le retrait des positions existantes
 *
 * NOTE: Vérifie les shares réelles depuis le contrat avant de retirer
 * (les données du cart peuvent être obsolètes)
 */
export async function executeRedeems(params: RedeemParams): Promise<RedeemResult | null> {
  const {
    items,
    address,
    walletClient,
    publicClient,
    multiVaultAddress,
  } = params;

  console.log('[executeRedeems] ========== START ==========');
  console.log('[executeRedeems] Processing', items.length, 'items to redeem');

  const redeemTermIds: Hex[] = [];
  const redeemCurveIds: bigint[] = [];
  const redeemShares: bigint[] = [];
  let totalRedeemed = 0n;

  // Vérifier les shares réelles depuis le contrat
  for (const item of items) {
    if (!item.currentPosition) continue;

    const redeemTermId = item.currentPosition.direction === 'for'
      ? item.termId
      : item.counterTermId;
    const curveId = BigInt(item.currentPosition.curveId);

    // Lire les shares réelles depuis le contrat
    const actualShares = await getPositionShares(
      publicClient,
      multiVaultAddress,
      address,
      redeemTermId,
      curveId
    );

    console.log('[executeRedeems] Verifying shares:', {
      totem: item.totemName,
      termId: redeemTermId,
      curveId: curveId.toString(),
      cartShares: item.currentPosition.shares.toString(),
      actualShares: actualShares.toString(),
    });

    // Skip si pas de shares réelles (données du cart obsolètes)
    if (actualShares <= 0n) {
      console.warn('[executeRedeems] No shares to redeem for', item.totemName, '- skipping');
      continue;
    }

    redeemTermIds.push(redeemTermId);
    redeemCurveIds.push(curveId);
    redeemShares.push(actualShares);
    totalRedeemed += actualShares;
  }

  // Si rien à retirer
  if (redeemTermIds.length === 0) {
    console.log('[executeRedeems] No valid positions to redeem');
    return null;
  }

  console.log('[executeRedeems] Redeeming', redeemTermIds.length, 'positions');
  console.log('[executeRedeems] Total shares:', formatEther(totalRedeemed));

  // Simuler et exécuter redeemBatch
  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address: multiVaultAddress,
    abi: MultiVaultAbi,
    functionName: 'redeemBatch',
    args: [
      address,
      redeemTermIds,
      redeemCurveIds,
      redeemShares,
      redeemShares.map(() => 0n), // minAssets
    ],
  });

  const txHash = await walletClient.writeContract(request);
  await publicClient.waitForTransactionReceipt({ hash: txHash });

  console.log('[executeRedeems] SUCCESS! Hash:', txHash);
  console.log('[executeRedeems] ========== END ==========');

  return { txHash, totalRedeemed };
}

/**
 * Redeem des positions FOR bloquantes avant dépôt AGAINST
 */
export interface RedeemBlockingPositionsParams {
  items: ProcessableCartItem[];
  address: Address;
  walletClient: WalletClient;
  publicClient: PublicClient;
  multiVaultAddress: Address;
  curveId: bigint;
}

/**
 * Retire les positions FOR qui bloqueraient un dépôt AGAINST
 * (erreur HasCounterStake)
 */
export async function redeemBlockingForPositions(
  params: RedeemBlockingPositionsParams
): Promise<Hex | null> {
  const {
    items,
    address,
    walletClient,
    publicClient,
    multiVaultAddress,
    curveId,
  } = params;

  console.log('[redeemBlockingFor] Checking blocking FOR positions...');

  const positionsToRedeem: { termId: Hex; shares: bigint }[] = [];

  for (const item of items) {
    const forShares = await getPositionShares(
      publicClient,
      multiVaultAddress,
      address,
      item.termId,
      curveId
    );

    if (forShares > 0n) {
      positionsToRedeem.push({ termId: item.termId, shares: forShares });
      console.log('[redeemBlockingFor] Found blocking position:', {
        totem: item.totemName,
        termId: item.termId,
        shares: formatEther(forShares),
      });
    }
  }

  if (positionsToRedeem.length === 0) {
    console.log('[redeemBlockingFor] No blocking positions found');
    return null;
  }

  const redeemTermIds = positionsToRedeem.map(p => p.termId);
  const redeemCurveIds = positionsToRedeem.map(() => curveId);
  const redeemShares = positionsToRedeem.map(p => p.shares);

  const { request } = await publicClient.simulateContract({
    account: walletClient.account,
    address: multiVaultAddress,
    abi: MultiVaultAbi,
    functionName: 'redeemBatch',
    args: [
      address,
      redeemTermIds,
      redeemCurveIds,
      redeemShares,
      redeemShares.map(() => 0n),
    ],
  });

  const txHash = await walletClient.writeContract(request);
  await publicClient.waitForTransactionReceipt({ hash: txHash });

  console.log('[redeemBlockingFor] Blocking positions redeemed!');
  return txHash;
}
