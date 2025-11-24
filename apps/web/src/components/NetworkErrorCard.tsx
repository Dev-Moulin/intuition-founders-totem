import { useState, useEffect, useCallback } from 'react';
import { WifiOff, RefreshCw, Loader2 } from 'lucide-react';

/**
 * Props for NetworkErrorCard component
 */
interface NetworkErrorCardProps {
  onRetry: () => Promise<void> | void;
  maxRetries?: number;
  autoRetry?: boolean;
  autoRetryDelays?: number[];
}

/**
 * Card component for network errors with auto-retry functionality
 *
 * Displays network error with manual retry button and optional auto-retry.
 * Uses exponential backoff for auto-retry delays.
 *
 * @example
 * ```tsx
 * <NetworkErrorCard
 *   onRetry={handleRetry}
 *   autoRetry={true}
 *   maxRetries={3}
 * />
 * ```
 */
export function NetworkErrorCard({
  onRetry,
  maxRetries = 3,
  autoRetry = true,
  autoRetryDelays = [1000, 2000, 4000],
}: NetworkErrorCardProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const executeRetry = useCallback(async () => {
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  }, [onRetry]);

  // Auto-retry logic
  useEffect(() => {
    if (!autoRetry || retryCount >= maxRetries || isRetrying) {
      return;
    }

    const delay = autoRetryDelays[retryCount] || autoRetryDelays[autoRetryDelays.length - 1];
    let remaining = Math.ceil(delay / 1000);
    setCountdown(remaining);

    const countdownInterval = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
    }, 1000);

    const retryTimeout = setTimeout(async () => {
      clearInterval(countdownInterval);
      setCountdown(null);
      setRetryCount((prev) => prev + 1);
      await executeRetry();
    }, delay);

    return () => {
      clearTimeout(retryTimeout);
      clearInterval(countdownInterval);
    };
  }, [autoRetry, retryCount, maxRetries, autoRetryDelays, isRetrying, executeRetry]);

  const handleManualRetry = async () => {
    setRetryCount(0);
    await executeRetry();
  };

  const hasRetriesLeft = retryCount < maxRetries;

  return (
    <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <WifiOff className="w-5 h-5 text-blue-400" />
        <h4 className="font-medium text-blue-400">Erreur de connexion</h4>
      </div>

      <p className="text-sm text-white/70 mb-3">
        Impossible de contacter le réseau. Vérifiez votre connexion internet.
      </p>

      {/* Retry status */}
      {autoRetry && hasRetriesLeft && (
        <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
          {isRetrying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Nouvelle tentative en cours...</span>
            </>
          ) : countdown !== null ? (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>
                Nouvelle tentative dans {countdown}s ({retryCount + 1}/{maxRetries})
              </span>
            </>
          ) : null}
        </div>
      )}

      {/* Max retries reached */}
      {!hasRetriesLeft && (
        <p className="text-sm text-orange-400 mb-3">
          Nombre maximum de tentatives atteint.
        </p>
      )}

      {/* Manual retry button */}
      <button
        onClick={handleManualRetry}
        disabled={isRetrying}
        className={`
          flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md text-sm font-medium
          bg-blue-500/20 text-blue-300
          hover:bg-blue-500/30 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isRetrying ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <RefreshCw className="w-4 h-4" />
        )}
        {isRetrying ? 'Connexion...' : 'Réessayer maintenant'}
      </button>
    </div>
  );
}
