/**
 * Time formatting utilities
 */

/**
 * Format seconds since update for display (French)
 * Used by RefreshIndicator for subscription status
 *
 * @param seconds - Number of seconds since last update
 * @returns Formatted string (e.g., "à l'instant", "il y a 5s", "il y a 2min")
 */
export function formatTimeSinceUpdate(seconds: number): string {
  if (seconds < 5) return 'à l\'instant';
  if (seconds < 60) return `il y a ${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  return `il y a ${hours}h`;
}

/**
 * Format timestamp to relative time string (compact French)
 * Used by VotePanel for recent activity display
 *
 * @param timestamp - ISO timestamp string
 * @returns Formatted string (e.g., "à l'instant", "2m", "1h", "2j")
 */
export function getTimeAgo(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'à l\'instant';
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHour < 24) return `${diffHour}h`;
  if (diffDay < 7) return `${diffDay}j`;
  return new Date(timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}
