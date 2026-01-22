/**
 * MyVotesItem - Vote item display for My Votes section
 *
 * Extracted from FounderCenterPanel.tsx
 * Displays a vote with subject-predicate-object triple and direction/curve badges
 *
 * @see FounderCenterPanel.tsx
 */

import { SUPPORT_COLORS, OPPOSE_COLORS } from '../../../config/colors';

/** Triple term data (subject, predicate, or object) */
export interface TripleTermData {
  label: string;
  image?: string;
  emoji?: string;
}

/** Vote data for display */
export interface VoteDisplayData {
  subject: TripleTermData;
  predicate: TripleTermData;
  object: TripleTermData;
  isPositive: boolean;
  signedAmount: string;
  curveId: number;
}

export interface MyVotesItemProps {
  /** Vote data to display */
  vote: VoteDisplayData;
  /** Whether this vote is selected */
  isSelected: boolean;
  /** Index for cascade animation */
  index: number;
  /** Whether any totem is selected (disables cascade) */
  hasSelectedTotem: boolean;
}

export function MyVotesItem({
  vote,
  isSelected,
  index,
  hasSelectedTotem,
}: MyVotesItemProps) {
  const { subject, predicate, object, isPositive, signedAmount, curveId } = vote;
  const directionLabel = isPositive ? 'S' : 'O';
  const curveLabel = curveId === 1 ? 'L' : 'P';
  const directionColors = isPositive ? SUPPORT_COLORS : OPPOSE_COLORS;

  // Cascade pulse effect when no totem selected
  const cascadeClass = !hasSelectedTotem
    ? `cascade-pulse cascade-delay-${Math.min(index, 7)}`
    : '';

  return (
    <div
      className={`text-left p-2.5 rounded-lg transition-all ${
        isSelected
          ? 'ring-1 animate-ring-pulse'
          : `bg-white/5 hover:bg-white/10 ${cascadeClass}`
      }`}
      style={
        isSelected
          ? {
              backgroundColor: `${directionColors.base}20`,
              boxShadow: `0 0 0 1px ${directionColors.base}50`,
            }
          : undefined
      }
    >
      <div className="flex items-center justify-between gap-2">
        {/* Triple: Subject - Predicate - Object (Tags/Bulles style) */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1 flex-wrap">
          {/* Subject Tag */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 rounded-full shrink-0">
            {subject.image ? (
              <img
                src={subject.image}
                alt={subject.label}
                className="w-5 h-5 rounded object-cover shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-[10px]">
                  {subject.emoji || subject.label.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-xs text-white/80 truncate max-w-[60px]">
              {subject.label.split(' ')[0]}
            </span>
          </div>

          <span className="text-white/30 text-xs shrink-0">-</span>

          {/* Predicate Tag */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-500/30 rounded-full shrink-0">
            {predicate.image ? (
              <img
                src={predicate.image}
                alt={predicate.label}
                className="w-5 h-5 rounded object-cover shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-[10px]">
                  {predicate.emoji || predicate.label.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-xs text-slate-300 truncate max-w-[70px]">
              {predicate.label}
            </span>
          </div>

          <span className="text-white/30 text-xs shrink-0">-</span>

          {/* Object (Totem) Tag */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 rounded-full min-w-0">
            {object.image ? (
              <img
                src={object.image}
                alt={object.label}
                className="w-5 h-5 rounded object-cover shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-[10px]">
                  {object.emoji || object.label.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-xs text-white font-medium truncate">
              {object.label}
            </span>
          </div>
        </div>

        {/* Amount + Direction/Curve badges */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-sm font-medium" style={{ color: directionColors.base }}>
            {signedAmount}
          </span>
          {/* Direction badge: S (Support) or O (Oppose) */}
          <span
            className="text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded"
            style={{ backgroundColor: `${directionColors.base}30`, color: directionColors.base }}
          >
            {directionLabel}
          </span>
          {/* Curve badge: L (Linear) or P (Progressive) */}
          <span
            className="text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded"
            style={{ backgroundColor: `${directionColors.base}20`, color: directionColors.base }}
          >
            {curveLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
