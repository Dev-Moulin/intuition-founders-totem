import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { intuitionTestnet } from '@0xintuition/protocol';

export const config = getDefaultConfig({
  appName: 'INTUITION Founders Totem',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo',
  // Include both chains: INTUITION L3 Testnet for voting, Base Mainnet for NFT verification
  chains: [intuitionTestnet, base],
  ssr: false,
});
