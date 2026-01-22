/**
 * VotePreview - Preview of the vote to be submitted
 *
 * Shows:
 * - Triple: Founder → Predicate → Totem
 * - Direction (Support/Oppose) and amount
 * - New totem/category indicators if creating
 */

import { useTranslation } from 'react-i18next';
import type { NewTotemData } from '../TotemCreationForm';

interface VotePreviewProps {
  /** Founder name */
  founderName: string;
  /** Selected predicate label */
  predicateLabel: string | undefined;
  /** Totem name (selected or new) */
  totemName: string;
  /** Vote direction */
  voteDirection: 'for' | 'against' | null;
  /** Trust amount */
  trustAmount: string;
  /** Whether creating a new totem */
  isCreatingNewTotem: boolean;
  /** New totem data (if creating) */
  newTotemData: NewTotemData | null | undefined;
}

export function VotePreview({
  founderName,
  predicateLabel,
  totemName,
  voteDirection,
  trustAmount,
  isCreatingNewTotem,
  newTotemData,
}: VotePreviewProps) {
  const { t } = useTranslation();

  return (
    <div className={`rounded-lg p-3 ${isCreatingNewTotem ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-white/5'}`}>
      <div className="text-xs text-white/60 mb-1">
        {t('founderExpanded.votePreview')}
        {isCreatingNewTotem && (
          <span className="text-orange-400/70 ml-1">({t('creation.new') || 'nouveau'})</span>
        )}
      </div>
      <p className="text-sm text-white">
        <span className="text-slate-400">{founderName}</span>
        {' '}{predicateLabel || '...'}{' '}
        <span className="text-slate-400">{totemName}</span>
      </p>
      <p className="text-xs text-white/50 mt-1">
        {voteDirection === 'for' ? `👍 ${t('vote.support')}` : `👎 ${t('vote.oppose')}`} - {trustAmount || '0'} TRUST
      </p>
      {isCreatingNewTotem && newTotemData && (
        <p className="text-xs text-orange-400/60 mt-1">
          + {t('creation.category')}: {newTotemData.category}
          {newTotemData.isNewCategory && ` (${t('creation.new') || 'nouveau'})`}
        </p>
      )}
    </div>
  );
}
