import { AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { useSwitchChain } from 'wagmi';
import { intuitionTestnet } from '@0xintuition/protocol';

/**
 * Props for WrongNetworkCard component
 */
interface WrongNetworkCardProps {
  currentChainId?: number;
  currentChainName?: string;
}

/**
 * Card component for wrong network errors
 *
 * Displays warning when user is on wrong network with switch button.
 *
 * @example
 * ```tsx
 * <WrongNetworkCard
 *   currentChainId={1}
 *   currentChainName="Ethereum Mainnet"
 * />
 * ```
 */
export function WrongNetworkCard({
  currentChainId,
  currentChainName,
}: WrongNetworkCardProps) {
  const { switchChain, isPending } = useSwitchChain();

  const handleSwitch = () => {
    switchChain({ chainId: intuitionTestnet.id });
  };

  return (
    <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-orange-400" />
        <h4 className="font-medium text-orange-400">Mauvais réseau</h4>
      </div>

      <p className="text-sm text-white/70 mb-3">
        Vous devez être connecté au réseau <span className="font-medium text-white">INTUITION L3 Testnet</span> pour voter.
      </p>

      {currentChainId && (
        <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
          <span>Réseau actuel:</span>
          <span className="font-mono text-orange-400">
            {currentChainName || `Chain ID ${currentChainId}`}
          </span>
        </div>
      )}

      <button
        onClick={handleSwitch}
        disabled={isPending}
        className={`
          flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md text-sm font-medium
          bg-orange-500/20 text-orange-300
          hover:bg-orange-500/30 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <ArrowRightLeft className="w-4 h-4" />
        {isPending ? 'Changement...' : 'Changer de réseau'}
      </button>
    </div>
  );
}
