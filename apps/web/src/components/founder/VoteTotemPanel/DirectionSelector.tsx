/**
 * DirectionSelector - FOR/AGAINST vote direction buttons
 *
 * Features:
 * - INTUITION protocol rule: AGAINST blocked on new triples (must vote FOR to create)
 * - Visual states: existing position (ring-slate), current selection (animate-ring-pulse)
 * - Pulsation on current step to guide user
 */

import { useTranslation } from 'react-i18next';
import { SUPPORT_COLORS, OPPOSE_COLORS } from '../../../config/colors';

interface DirectionSelectorProps {
  /** Current vote direction */
  voteDirection: 'for' | 'against' | 'withdraw' | null;
  /** Callback when direction is selected */
  onDirectionClick: (direction: 'for' | 'against') => void;
  /** Whether user has any position on this totem */
  hasAnyPosition: boolean;
  /** User's current position direction */
  positionDirection: 'for' | 'against' | null;
  /** Whether AGAINST is blocked (new triple = must vote FOR) */
  isOpposeBlockedByProtocol: boolean;
  /** CSS class for blur effect */
  blurClass: string;
  /** Get pulse class for step guidance */
  getPulseClass: (step: number, isSelected: boolean) => string;
}

export function DirectionSelector({
  voteDirection,
  onDirectionClick,
  hasAnyPosition,
  positionDirection,
  isOpposeBlockedByProtocol,
  blurClass,
  getPulseClass,
}: DirectionSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className={blurClass}>
      <label className="block text-xs text-white/60 mb-1">Direction</label>
      <div className="flex gap-2">
        {/* Support button */}
        <button
          onClick={() => onDirectionClick('for')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            voteDirection === 'for'
              ? 'bg-slate-500/30 animate-ring-pulse'
              : hasAnyPosition && positionDirection === 'for'
                ? 'bg-slate-500/10 text-slate-300/80 ring-1 ring-slate-400/50'
                : 'bg-white/5 text-white/60 ring-1 ring-slate-500/30 hover:bg-white/10'
          } ${voteDirection !== 'for' ? getPulseClass(1, false) : ''}`}
          style={voteDirection === 'for' ? { color: SUPPORT_COLORS.base } : undefined}
        >
          {t('vote.support')}
        </button>

        {/* Oppose button */}
        <button
          onClick={() => !isOpposeBlockedByProtocol && onDirectionClick('against')}
          disabled={isOpposeBlockedByProtocol}
          title={isOpposeBlockedByProtocol ? 'Oppose impossible sur un nouveau triple (règle du protocole)' : undefined}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            isOpposeBlockedByProtocol
              ? 'bg-white/5 text-white/20 ring-1 ring-slate-500/20 cursor-not-allowed'
              : voteDirection === 'against'
                ? 'bg-slate-500/30 animate-ring-pulse'
                : hasAnyPosition && positionDirection === 'against'
                  ? 'bg-slate-500/10 text-slate-300/80 ring-1 ring-slate-400/50'
                  : 'bg-white/5 text-white/60 ring-1 ring-slate-500/30 hover:bg-white/10'
          } ${!isOpposeBlockedByProtocol && voteDirection !== 'against' ? getPulseClass(1, false) : ''}`}
          style={!isOpposeBlockedByProtocol && voteDirection === 'against' ? { color: OPPOSE_COLORS.base } : undefined}
        >
          {t('vote.oppose')}
        </button>
      </div>
    </div>
  );
}
