import { useState, useCallback, useRef } from 'react';
import { useAccount, usePublicClient, useWalletClient, useReadContract } from 'wagmi';
import { parseEther, type Hex, erc20Abi } from 'viem';
import { batchDepositStatement, getMultiVaultAddressFromChainId } from '@0xintuition/sdk';
import { intuitionTestnet } from '@0xintuition/protocol';
import { toast } from 'sonner';

export type VoteStatus =
  | 'idle'
  | 'checking'
  | 'approving'
  | 'depositing'
  | 'success'
  | 'error';

export interface VoteError {
  code: string;
  message: string;
  step: 'checking' | 'approving' | 'depositing';
}

export interface UseVoteResult {
  vote: (claimId: Hex, amount: string, isFor: boolean) => Promise<void>;
  status: VoteStatus;
  error: VoteError | null;
  isLoading: boolean;
  currentStep: number;
  totalSteps: number;
  reset: () => void;
}

// Address du token TRUST sur Base Mainnet (INTUITION L3 Testnet uses same token)
const TRUST_TOKEN_ADDRESS = '0x6cd905dF2Ed214b22e0d48FF17CD4200C1C6d8A3' as Hex;

/**
 * Hook pour gérer le processus complet de vote (approve + deposit)
 *
 * @example
 * ```tsx
 * function VoteModal({ claimId }) {
 *   const { vote, status, error, isLoading, currentStep, totalSteps } = useVote();
 *
 *   const handleVote = async () => {
 *     await vote(claimId, "10", true); // Vote FOR with 10 TRUST
 *   };
 *
 *   return (
 *     <div>
 *       {isLoading && <p>Step {currentStep}/{totalSteps}</p>}
 *       {error && <p>Error: {error.message}</p>}
 *       <button onClick={handleVote}>Vote</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useVote(): UseVoteResult {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [status, setStatus] = useState<VoteStatus>('idle');
  const [error, setError] = useState<VoteError | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(2);

  // Ref to track current status for error handling in async callbacks
  const statusRef = useRef<VoteStatus>('idle');

  const multiVaultAddress = getMultiVaultAddressFromChainId(intuitionTestnet.id);

  // Read current allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: TRUST_TOKEN_ADDRESS,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address && multiVaultAddress ? [address, multiVaultAddress] : undefined,
    query: {
      enabled: !!address && !!multiVaultAddress,
    },
  });

  // Helper to update both state and ref
  const updateStatus = useCallback((newStatus: VoteStatus) => {
    statusRef.current = newStatus;
    setStatus(newStatus);
  }, []);

  const reset = useCallback(() => {
    updateStatus('idle');
    setError(null);
    setCurrentStep(0);
    setTotalSteps(2);
  }, [updateStatus]);

  const vote = useCallback(
    async (claimId: Hex, amount: string, isFor: boolean) => {
      if (!address) {
        setError({
          code: 'WALLET_NOT_CONNECTED',
          message: 'Please connect your wallet',
          step: 'checking',
        });
        updateStatus('error');
        return;
      }

      if (!walletClient || !publicClient) {
        setError({
          code: 'CLIENT_NOT_READY',
          message: 'Wallet client not ready',
          step: 'checking',
        });
        updateStatus('error');
        return;
      }

      try {
        reset();
        const amountWei = parseEther(amount);

        // Step 1: Check allowance
        updateStatus('checking');
        setCurrentStep(1);
        toast.info('Checking TRUST allowance...');

        await refetchAllowance();

        const currentAllowance = (allowance as bigint) || 0n;
        const needsApproval = currentAllowance < amountWei;

        if (needsApproval) {
          setTotalSteps(3); // checking + approving + depositing
        } else {
          setTotalSteps(2); // checking + depositing
        }

        // Step 2: Approve if necessary
        if (needsApproval) {
          updateStatus('approving');
          setCurrentStep(2);
          toast.info('Approval required. Please sign the transaction...');

          // Use wagmi's writeContract for approval
          const approveTx = await walletClient.writeContract({
            address: TRUST_TOKEN_ADDRESS,
            abi: erc20Abi,
            functionName: 'approve',
            args: [multiVaultAddress, amountWei],
          });

          toast.loading('Approving TRUST tokens...', { id: 'approve' });

          // Wait for approval confirmation
          const approveReceipt = await publicClient.waitForTransactionReceipt({
            hash: approveTx,
          });

          if (approveReceipt.status !== 'success') {
            throw new Error('Approval transaction failed');
          }

          toast.success('TRUST tokens approved!', { id: 'approve' });

          // Refetch allowance after approval
          await refetchAllowance();
        }

        // Step 3: Deposit
        updateStatus('depositing');
        setCurrentStep(needsApproval ? 3 : 2);
        toast.info('Please sign the deposit transaction...');

        const config = {
          walletClient,
          publicClient,
          address: multiVaultAddress,
        };

        // TODO: Fix batchDepositStatement signature
        // The SDK signature might be different than expected
        // Temporarily using 'as any' until we can test the real signature
        const depositResult = await (batchDepositStatement as any)(
          config,
          [[claimId], [amountWei], [isFor]]
        );

        toast.loading('Depositing TRUST...', { id: 'deposit' });

        // Wait for deposit confirmation
        const depositReceipt = await publicClient.waitForTransactionReceipt({
          hash: depositResult.transactionHash as Hex,
        });

        if (depositReceipt.status !== 'success') {
          throw new Error('Deposit transaction failed');
        }

        toast.success(
          `Vote ${isFor ? 'FOR' : 'AGAINST'} successfully recorded!`,
          { id: 'deposit' }
        );

        updateStatus('success');
        setError(null);
      } catch (err: any) {
        console.error('Vote error:', err);

        let errorMessage = 'An unexpected error occurred';
        let errorCode = 'UNKNOWN_ERROR';
        let errorStep: 'checking' | 'approving' | 'depositing' = 'checking';

        // Parse error messages
        if (err.message?.includes('User rejected')) {
          errorMessage = 'Transaction rejected by user';
          errorCode = 'USER_REJECTED';
        } else if (err.message?.includes('insufficient funds')) {
          errorMessage = 'Insufficient ETH for gas fees';
          errorCode = 'INSUFFICIENT_GAS';
        } else if (err.message?.includes('balance')) {
          errorMessage = 'Insufficient TRUST balance';
          errorCode = 'INSUFFICIENT_BALANCE';
        } else if (err.message) {
          errorMessage = err.message;
        }

        // Determine which step failed using ref for current status
        if (statusRef.current === 'approving') {
          errorStep = 'approving';
        } else if (statusRef.current === 'depositing') {
          errorStep = 'depositing';
        }

        setError({
          code: errorCode,
          message: errorMessage,
          step: errorStep,
        });
        updateStatus('error');

        toast.error(errorMessage);
      }
    },
    [
      address,
      walletClient,
      publicClient,
      multiVaultAddress,
      allowance,
      refetchAllowance,
      reset,
      updateStatus,
    ]
  );

  return {
    vote,
    status,
    error,
    isLoading: ['checking', 'approving', 'depositing'].includes(status),
    currentStep,
    totalSteps,
    reset,
  };
}
