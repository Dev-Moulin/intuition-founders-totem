import { createPublicClient, http } from 'viem';
import { intuitionTestnet } from '@0xintuition/protocol';
import { getMultiVaultAddressFromChainId } from '@0xintuition/sdk';

// INTUITION L3 Testnet configuration
export const INTUITION_CONFIG = {
  // MultiVault contract address on INTUITION L3 Testnet (Chain ID: 13579)
  multiVaultAddress: getMultiVaultAddressFromChainId(intuitionTestnet.id),

  // GraphQL API endpoint (testnet)
  graphqlEndpoint: 'https://testnet.intuition.sh/v1/graphql',

  // Chain configuration
  chain: intuitionTestnet,
  chainId: intuitionTestnet.id, // 13579

  // RPC endpoints
  rpcUrl: 'https://testnet.rpc.intuition.systems/http',
  wsUrl: 'wss://testnet.rpc.intuition.systems/ws',

  // Explorer
  explorerUrl: 'https://testnet.explorer.intuition.systems',
};

// Public client for reading from the blockchain
export const publicClient = createPublicClient({
  chain: intuitionTestnet,
  transport: http('https://testnet.rpc.intuition.systems/http'),
});

// Helper to get API URL
export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:3000';
};
