/**
 * DirectionChangeAlert - Alert sections for direction change scenarios
 *
 * Shows when user wants to change vote direction but has positions on both curves.
 * Two states:
 * 1. DirectionChangeSection - User must choose which curve to redeem
 * 2. PendingRedeemInfo - User has chosen, shows confirmation message
 */

import { useTranslation } from 'react-i18next';
import { CURVE_COLORS, SUPPORT_COLORS, OPPOSE_COLORS } from '../../../config/colors';
import { CURVE_LINEAR, CURVE_PROGRESSIVE, type CurveId } from '../../../hooks';

/** Position info for a single curve */
interface CurvePosition {
  shares: bigint;
  formatted: string;
  hasPosition: boolean;
}

/** Info about direction change when both curves are blocked */
export interface DirectionChangeInfo {
  linear: CurvePosition;
  progressive: CurvePosition;
  currentDirectionLabel: string;
  targetDirectionLabel: string;
}

/** Info about pending redeem after curve choice */
export interface PendingRedeemInfo {
  redeemDirection: string;
  newDirection: string;
  curveId: CurveId;
  curveLabel: string;
  formatted: string;
}

interface DirectionChangeSectionProps {
  /** Info about positions on both curves */
  info: DirectionChangeInfo;
  /** Callback when user chooses a curve to redeem */
  onCurveChoice: (curveId: CurveId) => void;
}

/** Section shown BEFORE user chooses a curve */
export function DirectionChangeSection({ info, onCurveChoice }: DirectionChangeSectionProps) {
  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 space-y-3">
      <div className="flex items-start gap-2">
        <span className="text-amber-400 text-lg">⚠️</span>
        <div className="flex-1">
          <p className="text-amber-300 text-sm font-medium">
            Position {info.currentDirectionLabel} sur les deux curves
          </p>
          <p className="text-white/70 text-xs mt-1">
            Pour faire {info.targetDirectionLabel}, choisissez quelle curve retirer :
          </p>
        </div>
      </div>
      {/* Curve choice buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onCurveChoice(CURVE_LINEAR)}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border"
          style={{
            backgroundColor: `${CURVE_COLORS.linear.base}20`,
            color: CURVE_COLORS.linear.text,
            borderColor: `${CURVE_COLORS.linear.base}30`,
          }}
        >
          📊 Linear ({info.linear.formatted})
        </button>
        <button
          onClick={() => onCurveChoice(CURVE_PROGRESSIVE)}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border"
          style={{
            backgroundColor: `${CURVE_COLORS.progressive.base}20`,
            color: CURVE_COLORS.progressive.text,
            borderColor: `${CURVE_COLORS.progressive.base}30`,
          }}
        >
          📈 Progressive ({info.progressive.formatted})
        </button>
      </div>
    </div>
  );
}

interface PendingRedeemMessageProps {
  /** Info about the pending redeem operation */
  info: PendingRedeemInfo;
}

/** Message shown AFTER user chose a curve */
export function PendingRedeemMessage({ info }: PendingRedeemMessageProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 animate-blur-to-focus">
      <div className="flex items-start gap-2">
        <span className="text-amber-400 text-lg">🔄</span>
        <div className="flex-1">
          <p className="text-amber-300 text-sm font-medium">
            {t('founderExpanded.pendingRedeemTitle', 'Changement de direction prévu')}
          </p>
          <p className="text-white/70 text-xs mt-1">
            Votre position{' '}
            <span style={{ color: info.redeemDirection === 'Support' ? SUPPORT_COLORS.base : OPPOSE_COLORS.base }}>
              {info.redeemDirection}
            </span>{' '}
            sur{' '}
            <span style={{ color: info.curveId === CURVE_LINEAR ? CURVE_COLORS.linear.text : CURVE_COLORS.progressive.text }}>
              {info.curveLabel}
            </span>{' '}
            ({info.formatted} TRUST) sera retirée lors de la validation du panier.
          </p>
          <p className="text-white/50 text-xs mt-1">
            Entrez le montant pour votre nouvelle position{' '}
            <span style={{ color: info.newDirection === 'Support' ? SUPPORT_COLORS.base : OPPOSE_COLORS.base }}>
              {info.newDirection}
            </span>.
          </p>
        </div>
      </div>
    </div>
  );
}
