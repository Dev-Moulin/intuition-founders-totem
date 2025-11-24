import { Wallet, ExternalLink, ArrowRight } from 'lucide-react';
import { formatEther } from 'viem';

/**
 * Props for InsufficientBalanceCard component
 */
interface InsufficientBalanceCardProps {
  currentBalance: bigint;
  requiredAmount: bigint;
  tokenSymbol?: string;
  onAdjustToMax?: () => void;
  buyLink?: string;
}

/**
 * Card component for insufficient balance errors
 *
 * Shows current balance, required amount, and options to adjust or buy more tokens.
 *
 * @example
 * ```tsx
 * <InsufficientBalanceCard
 *   currentBalance={parseEther("5")}
 *   requiredAmount={parseEther("10")}
 *   tokenSymbol="TRUST"
 *   onAdjustToMax={() => setAmount(formatEther(balance))}
 *   buyLink="https://app.uniswap.org"
 * />
 * ```
 */
export function InsufficientBalanceCard({
  currentBalance,
  requiredAmount,
  tokenSymbol = 'TRUST',
  onAdjustToMax,
  buyLink,
}: InsufficientBalanceCardProps) {
  const formattedBalance = formatEther(currentBalance);
  const formattedRequired = formatEther(requiredAmount);
  const missing = requiredAmount - currentBalance;
  const formattedMissing = missing > 0n ? formatEther(missing) : '0';

  const balanceNum = parseFloat(formattedBalance);
  const requiredNum = parseFloat(formattedRequired);
  const percentAvailable = requiredNum > 0 ? (balanceNum / requiredNum) * 100 : 0;

  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <Wallet className="w-5 h-5 text-red-400" />
        <h4 className="font-medium text-red-400">Solde insuffisant</h4>
      </div>

      <div className="space-y-3">
        {/* Balance comparison */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/50">Votre solde</p>
            <p className="font-mono text-white">
              {parseFloat(formattedBalance).toFixed(2)} {tokenSymbol}
            </p>
          </div>
          <div>
            <p className="text-white/50">Montant requis</p>
            <p className="font-mono text-red-400">
              {parseFloat(formattedRequired).toFixed(2)} {tokenSymbol}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all"
            style={{ width: `${Math.min(percentAvailable, 100)}%` }}
          />
        </div>

        {/* Missing amount */}
        {missing > 0n && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50">Il vous manque</span>
            <span className="font-mono text-red-400">
              {parseFloat(formattedMissing).toFixed(2)} {tokenSymbol}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {onAdjustToMax && currentBalance > 0n && (
            <button
              onClick={onAdjustToMax}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              Utiliser le maximum
            </button>
          )}

          {buyLink && (
            <a
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Acheter {tokenSymbol}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
