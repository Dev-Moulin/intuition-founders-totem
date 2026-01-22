/**
 * Vote components
 *
 * Composants actifs du système de vote.
 * (Code mort supprimé le 21/01/2026 - voir 12_Audit/vote_code_mort.md)
 */

// Re-exports depuis common/
export { SuccessNotification } from '../common/SuccessNotification';
export { ErrorNotification } from '../common/ErrorNotification';

// PresetButtons - utilisé par VoteTotemPanel
export { PresetButtons, PresetButtonsCompact } from './PresetButtons';

// VoteCartPanel - utilisé par FounderExpandedView
export { VoteCartPanel } from './VoteCartPanel';

// VoteMarket - utilisé par FounderInfoPanel
export { VoteMarket, VoteMarketCompact } from './VoteMarket';
