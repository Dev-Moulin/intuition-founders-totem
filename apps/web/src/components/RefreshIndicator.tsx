import React from 'react';
import { formatTimeSinceUpdate } from '../hooks/useFounderSubscription';

interface RefreshIndicatorProps {
  /** Seconds since last update */
  secondsSinceUpdate: number;
  /** True if subscription is connected */
  isConnected: boolean;
  /** True if subscription is paused */
  isPaused: boolean;
  /** True if still loading initial data */
  isLoading?: boolean;
  /** Optional className for styling */
  className?: string;
}

/**
 * Visual indicator showing subscription status and time since last update
 *
 * Shows:
 * - Blue dot + "Connexion..." when loading initial data
 * - Green dot + "à l'instant" when just updated
 * - Green dot + "il y a Xs" when connected
 * - Yellow dot + "En pause" when paused
 * - Red dot + "Déconnecté" when not connected (error state)
 *
 * @example
 * ```tsx
 * const { secondsSinceUpdate, isConnected, isPaused, isLoading } = useFounderSubscription('...');
 *
 * <RefreshIndicator
 *   secondsSinceUpdate={secondsSinceUpdate}
 *   isConnected={isConnected}
 *   isPaused={isPaused}
 *   isLoading={isLoading}
 * />
 * ```
 */
export const RefreshIndicator: React.FC<RefreshIndicatorProps> = ({
  secondsSinceUpdate,
  isConnected,
  isPaused,
  isLoading = false,
  className = '',
}) => {
  // Determine status
  let statusColor: string;
  let statusText: string;
  let pulseAnimation = false;

  if (isPaused) {
    statusColor = 'bg-yellow-500';
    statusText = 'En pause';
  } else if (isLoading) {
    statusColor = 'bg-blue-500';
    statusText = 'Connexion...';
    pulseAnimation = true;
  } else if (!isConnected) {
    statusColor = 'bg-red-500';
    statusText = 'Déconnecté';
  } else {
    statusColor = 'bg-green-500';
    statusText = formatTimeSinceUpdate(secondsSinceUpdate);
    // Pulse animation when just updated (< 3 seconds)
    pulseAnimation = secondsSinceUpdate < 3;
  }

  return (
    <div
      className={`flex items-center gap-2 text-xs text-gray-400 ${className}`}
      title={isPaused ? 'Onglet masqué - actualisation en pause' :
             isLoading ? 'Connexion en cours...' :
             !isConnected ? 'Connexion perdue - vérifiez votre réseau' :
             'Actualisation temps réel active'}
    >
      {/* Status dot */}
      <span className="relative flex h-2 w-2">
        {pulseAnimation && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${statusColor} opacity-75`}
          />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${statusColor}`}
        />
      </span>

      {/* Status text */}
      <span>{statusText}</span>

      {/* Live indicator when connected and recently updated */}
      {isConnected && !isPaused && secondsSinceUpdate < 60 && (
        <span className="text-green-500 font-medium">LIVE</span>
      )}
    </div>
  );
};

/**
 * Compact version of RefreshIndicator (dot only with tooltip)
 */
export const RefreshIndicatorCompact: React.FC<
  Omit<RefreshIndicatorProps, 'className'> & { className?: string }
> = ({ secondsSinceUpdate, isConnected, isPaused, isLoading = false, className = '' }) => {
  let statusColor: string;
  let title: string;
  let pulseAnimation = false;

  if (isPaused) {
    statusColor = 'bg-yellow-500';
    title = 'En pause (onglet masqué)';
  } else if (isLoading) {
    statusColor = 'bg-blue-500';
    title = 'Connexion en cours...';
    pulseAnimation = true;
  } else if (!isConnected) {
    statusColor = 'bg-red-500';
    title = 'Déconnecté - vérifiez votre réseau';
  } else {
    statusColor = 'bg-green-500';
    title = `Actualisé ${formatTimeSinceUpdate(secondsSinceUpdate)}`;
    pulseAnimation = secondsSinceUpdate < 3;
  }

  return (
    <span
      className={`relative flex h-2 w-2 cursor-help ${className}`}
      title={title}
    >
      {pulseAnimation && (
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${statusColor} opacity-75`}
        />
      )}
      <span
        className={`relative inline-flex h-2 w-2 rounded-full ${statusColor}`}
      />
    </span>
  );
};

export default RefreshIndicator;
