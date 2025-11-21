import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { intuitionTestnet } from '@0xintuition/protocol';

export const config = getDefaultConfig({
  appName: 'INTUITION Founders Totem',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo',
  chains: [intuitionTestnet],
  ssr: false,
});
