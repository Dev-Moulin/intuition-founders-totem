/**
 * FlippableRightPanel - Panneau de droite avec animation flip 180°
 *
 * Face avant : VoteTotemPanel (formulaire de vote)
 * Face arrière : VoteCartPanel (panier)
 *
 * Animation inspirée du carrousel 3D (FlippableCard)
 */

import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FounderForHomePage, CurveId } from '../../hooks';
import { useVoteCartContext } from '../../hooks/cart/useVoteCart';
import { VoteTotemPanel } from './VoteTotemPanel';
import { VoteCartPanel } from '../vote/VoteCartPanel';
import type { NewTotemData } from './TotemCreationForm';

interface FlippableRightPanelProps {
  founder: FounderForHomePage;
  selectedTotemId?: string;
  selectedTotemLabel?: string;
  newTotemData: NewTotemData | null;
  onClearSelection: () => void;
  onUserPositionDetected: (position: { direction: 'for' | 'against'; curveId: CurveId } | null) => void;
  refetchTrigger: number;
  onRefetch: () => void;
}

export function FlippableRightPanel({
  founder,
  selectedTotemId,
  selectedTotemLabel,
  newTotemData,
  onClearSelection,
  onUserPositionDetected,
  refetchTrigger,
  onRefetch,
}: FlippableRightPanelProps) {
  const { t } = useTranslation();

  // Flip state: false = front (VoteTotemPanel), true = back (VoteCartPanel)
  const [isFlipped, setIsFlipped] = useState(false);

  // Cart state from context
  const {
    cart,
    itemCount,
    costSummary,
    removeItem,
    updateAmount,
    clearCart,
    validationErrors,
    isValid: isCartValid,
  } = useVoteCartContext();

  // Handle flip to cart
  const handleOpenCart = useCallback(() => {
    setIsFlipped(true);
  }, []);

  // Handle flip back to vote panel
  const handleCloseCart = useCallback(() => {
    setIsFlipped(false);
  }, []);

  // Handle cart success - auto flip back + refetch
  const handleCartSuccess = useCallback(() => {
    clearCart();
    setIsFlipped(false);
    onRefetch();
  }, [clearCart, onRefetch]);

  // Escape key closes cart (flips back)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFlipped) {
        setIsFlipped(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFlipped]);

  return (
    <div
      className="h-full w-full"
      style={{ perspective: '2000px' }}
    >
      {/* Rotating container */}
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* ========== FACE AVANT : VoteTotemPanel ========== */}
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <VoteTotemPanel
            founder={founder}
            selectedTotemId={selectedTotemId}
            selectedTotemLabel={selectedTotemLabel}
            newTotemData={newTotemData}
            onClearSelection={onClearSelection}
            onOpenCart={handleOpenCart}
            onUserPositionDetected={onUserPositionDetected}
            refetchTrigger={refetchTrigger}
          />
        </div>

        {/* ========== FACE ARRIERE : VoteCartPanel ========== */}
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="glass-card p-4 h-full flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent" style={{ overscrollBehavior: 'contain' }}>
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h2 className="text-sm font-semibold text-white">
                {t('founderExpanded.voteCart')} ({itemCount})
              </h2>
              <button
                onClick={handleCloseCart}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title={t('common.close')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart content */}
            <div className="flex-1 min-h-0">
              <VoteCartPanel
                cart={cart}
                costSummary={costSummary}
                onRemoveItem={removeItem}
                onClearCart={clearCart}
                onUpdateAmount={updateAmount}
                onSuccess={handleCartSuccess}
                validationErrors={validationErrors}
                isValid={isCartValid}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
