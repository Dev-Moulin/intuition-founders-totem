import { vi } from 'vitest';

/**
 * Mock account data
 */
export const mockAccount = {
  address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' as const,
  isConnected: true,
  isConnecting: false,
  isDisconnected: false,
  status: 'connected' as const,
};

/**
 * Mock disconnected account
 */
export const mockDisconnectedAccount = {
  address: undefined,
  isConnected: false,
  isConnecting: false,
  isDisconnected: true,
  status: 'disconnected' as const,
};

/**
 * Mock public client
 */
export const mockPublicClient = {
  waitForTransactionReceipt: vi.fn().mockResolvedValue({ status: 'success' }),
  readContract: vi.fn(),
  getBalance: vi.fn().mockResolvedValue(1000000000000000000n),
};

/**
 * Mock wallet client
 */
export const mockWalletClient = {
  writeContract: vi.fn().mockResolvedValue('0xmocktxhash'),
  account: mockAccount,
};

/**
 * Create wagmi mock for vi.mock('wagmi', ...)
 */
export function createWagmiMock(overrides: {
  account?: typeof mockAccount | typeof mockDisconnectedAccount;
  allowance?: bigint;
  publicClient?: typeof mockPublicClient;
  walletClient?: typeof mockWalletClient | null;
} = {}) {
  const account = overrides.account ?? mockAccount;
  const allowance = overrides.allowance ?? 0n;
  const publicClient = overrides.publicClient ?? mockPublicClient;
  const walletClient = overrides.walletClient ?? mockWalletClient;

  return {
    useAccount: () => account,
    usePublicClient: () => publicClient,
    useWalletClient: () => ({ data: walletClient }),
    useReadContract: (config: { functionName?: string }) => {
      if (config.functionName === 'allowance') {
        return {
          data: allowance,
          refetch: vi.fn().mockResolvedValue({ data: allowance }),
        };
      }
      return { data: undefined, refetch: vi.fn() };
    },
    useWriteContract: () => ({
      writeContractAsync: vi.fn().mockResolvedValue('0xmocktxhash'),
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
      reset: vi.fn(),
    }),
    useWaitForTransactionReceipt: () => ({
      isLoading: false,
      isSuccess: true,
      data: { status: 'success' },
    }),
    useChainId: () => 8453, // Base mainnet
    useBalance: () => ({
      data: { value: 1000000000000000000n, formatted: '1.0', symbol: 'ETH' },
    }),
  };
}

/**
 * Mock for @0xintuition/sdk
 */
export const mockIntuitionSdk = {
  batchDepositStatement: vi.fn().mockResolvedValue({
    transactionHash: '0xmockdeposithash',
  }),
  getMultiVaultAddressFromChainId: vi.fn().mockReturnValue(
    '0x1234567890abcdef1234567890abcdef12345678'
  ),
  createAtom: vi.fn().mockResolvedValue({
    transactionHash: '0xmockatomhash',
    atomId: '0xmockatomid',
  }),
  createTriple: vi.fn().mockResolvedValue({
    transactionHash: '0xmocktriplehash',
    tripleId: '0xmocktripleid',
  }),
};

/**
 * Mock for @0xintuition/protocol
 */
export const mockIntuitionProtocol = {
  intuitionTestnet: {
    id: 84532,
    name: 'Base Sepolia',
  },
};

/**
 * Mock for sonner toast
 */
export const mockToast = {
  info: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
  loading: vi.fn(),
};
