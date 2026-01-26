import { useEffect, useState, useRef, useCallback } from 'react';
import { type Hex } from 'viem';
import type { FounderForHomePage } from '../../hooks';
import {
  useFounderSubscription,
  useAutoSubscriptionPause,
  CURVE_LINEAR,
  type CurveId,
} from '../../hooks';
import { useVoteCart, useVoteCartContext, VoteCartContext } from '../../hooks/cart/useVoteCart';
import { FounderInfoPanel, FounderCenterPanel } from './index';
import { FlippableRightPanel } from './FlippableRightPanel';
import type { NewTotemData } from './TotemCreationForm';
import type { TotemCreationResult } from '../../hooks/blockchain/claims/useCreateTotemWithTriples';
import type { CurveFilter } from '../../hooks/data/useVotesTimeline';

interface FounderExpandedViewProps {
  founder: FounderForHomePage;
  onClose: () => void;
}

/**
 * Inner component that uses the cart context
 */
function FounderExpandedViewInner({ founder, onClose }: FounderExpandedViewProps) {
  // Real-time subscription for founder proposals
  const {
    secondsSinceUpdate,
    pause,
    resume,
  } = useFounderSubscription(founder.name);

  // Auto-pause subscription when tab is hidden
  useAutoSubscriptionPause(pause, resume, {
    pauseOnHidden: true,
    resumeDelay: 100,
  });

  // Vote Cart - from context (shared with FlippableRightPanel)
  const { initCart } = useVoteCartContext();

  // Initialize cart for this founder
  useEffect(() => {
    if (founder.atomId) {
      initCart(founder.atomId as Hex, founder.name);
    }
  }, [founder.atomId, founder.name, initCart]);

  // Track when new data arrives for animation
  const [hasNewData, setHasNewData] = useState(false);
  const prevSecondsRef = useRef(secondsSinceUpdate);

  useEffect(() => {
    // Detect when secondsSinceUpdate resets to 0 (new data received)
    if (prevSecondsRef.current > 0 && secondsSinceUpdate === 0) {
      setHasNewData(true);
      // Remove animation class after 1 second
      const timer = setTimeout(() => setHasNewData(false), 1000);
      return () => clearTimeout(timer);
    }
    prevSecondsRef.current = secondsSinceUpdate;
  }, [secondsSinceUpdate]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Selected totem state (from center panel - existing totems)
  const [selectedTotemId, setSelectedTotemId] = useState<string | undefined>();
  const [selectedTotemLabel, setSelectedTotemLabel] = useState<string | undefined>();

  // New totem data (from creation form in center panel)
  const [newTotemData, setNewTotemData] = useState<NewTotemData | null>(null);

  const handleSelectTotem = useCallback((totemId: string, totemLabel: string) => {
    setSelectedTotemId(totemId);
    setSelectedTotemLabel(totemLabel);
    // Clear new totem data when selecting an existing totem
    setNewTotemData(null);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedTotemId(undefined);
    setSelectedTotemLabel(undefined);
    setNewTotemData(null);
  }, []);

  // Handle new totem data from creation form
  const handleNewTotemChange = useCallback((data: NewTotemData | null) => {
    setNewTotemData(data);
    // Clear existing totem selection when creating a new one
    if (data) {
      setSelectedTotemId(undefined);
      setSelectedTotemLabel(undefined);
    }
  }, []);

  // Handle totem created (from creation form) - select it for voting
  const handleTotemCreated = useCallback((result: TotemCreationResult) => {
    // Select the newly created (or existing) totem for voting
    setSelectedTotemId(result.totemId);
    setSelectedTotemLabel(result.totemName);
    // Clear new totem form data since we now have a real totem
    setNewTotemData(null);
  }, []);

  // Trigger to refetch user votes after cart validation
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  // Handler for refetch (called by FlippableRightPanel after cart success)
  const handleRefetch = useCallback(() => {
    setRefetchTrigger(prev => prev + 1);
  }, []);

  // Curve filter state - shared between CenterPanel and InfoPanel
  const [curveFilter, setCurveFilter] = useState<CurveFilter>('progressive');

  // User's position on selected totem (for visual highlighting across panels)
  const [userPositionCurveId, setUserPositionCurveId] = useState<CurveId | null>(null);

  // Handler to sync curve filter when user's position is detected
  const handleUserPositionDetected = useCallback((position: { direction: 'for' | 'against'; curveId: CurveId } | null) => {
    if (position) {
      // Auto-switch curve filter to match user's position curve
      const newFilter: CurveFilter = position.curveId === CURVE_LINEAR ? 'linear' : 'progressive';
      setCurveFilter(newFilter);
      // Store position curve for visual highlighting
      setUserPositionCurveId(position.curveId);
    } else {
      setUserPositionCurveId(null);
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 m-0 bg-black/40 backdrop-blur-md flex items-start justify-center pt-2 px-4 pb-4 overflow-hidden"
      onClick={handleBackdropClick}
      style={{ margin: 0, overscrollBehavior: 'contain' }}
    >
      {/* Main container - 3-panel layout responsive */}
      <div className="w-full max-w-[1600px] h-[93vh] max-h-[93vh] flex flex-col lg:flex-row gap-3 xl:gap-4 animate-fade-in overflow-hidden">

        {/* Left Panel - Founder Info (+20% wider for graphs) */}
        <div className="lg:w-[384px] xl:w-[432px] 2xl:w-[480px] shrink-0 h-full min-h-0">
          <FounderInfoPanel
            founder={founder}
            onClose={onClose}
            hasNewData={hasNewData}
            onSelectTotem={handleSelectTotem}
            selectedTotemId={selectedTotemId}
          />
        </div>

        {/* Center Panel - Totems Grid (flexible) */}
        <div className="flex-1 min-w-0 min-h-0 h-full">
          <FounderCenterPanel
            founder={founder}
            onSelectTotem={handleSelectTotem}
            selectedTotemId={selectedTotemId}
            refetchTrigger={refetchTrigger}
            onNewTotemChange={handleNewTotemChange}
            onTotemCreated={handleTotemCreated}
            curveFilter={curveFilter}
            onCurveFilterChange={setCurveFilter}
            userPositionCurveId={userPositionCurveId}
          />
        </div>

        {/* Right Panel - Vote Action with flip animation (adaptive width) */}
        <div className="lg:w-[320px] xl:w-[360px] 2xl:w-[400px] shrink-0 h-full min-h-0">
          <FlippableRightPanel
            founder={founder}
            selectedTotemId={selectedTotemId}
            selectedTotemLabel={selectedTotemLabel}
            newTotemData={newTotemData}
            onClearSelection={handleClearSelection}
            onUserPositionDetected={handleUserPositionDetected}
            refetchTrigger={refetchTrigger}
            onRefetch={handleRefetch}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Full-screen overlay showing 3-panel layout:
 * - Left: Founder info + Vote Market stats
 * - Center: Totems grid + user positions
 * - Right: Vote action panel
 *
 * Implements V2_FONDATION Phase 9 three-panel design
 *
 * Uses WebSocket subscription for real-time updates on founder proposals.
 * Automatically pauses subscription when tab is hidden.
 *
 * Wraps content in VoteCartContext.Provider to share cart state
 * between VoteTotemPanel and VoteCartPanel.
 */
export function FounderExpandedView({ founder, onClose }: FounderExpandedViewProps) {
  const cartState = useVoteCart();

  return (
    <VoteCartContext.Provider value={cartState}>
      <FounderExpandedViewInner founder={founder} onClose={onClose} />
    </VoteCartContext.Provider>
  );
}
