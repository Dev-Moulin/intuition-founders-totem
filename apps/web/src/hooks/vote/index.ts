/**
 * Vote Hooks - Custom hooks for VoteTotemPanel
 *
 * These hooks encapsulate the complex business logic for the voting flow:
 * - Form step management (blur, pulsation, progression)
 * - INTUITION protocol rules (curve availability, direction changes)
 * - Cross-predicate blocking
 * - Minimum amount calculation
 *
 * @see components/founder/VoteTotemPanel.tsx
 */

// Form step management
export {
  useFormSteps,
  type FormStep,
  type UseFormStepsParams,
  type UseFormStepsResult,
} from './useFormSteps';

// INTUITION curve availability rules
export {
  useCurveAvailability,
  type CurveAvailability,
  type UseCurveAvailabilityParams,
} from './useCurveAvailability';

// Cross-predicate blocking
export {
  usePredicateBlocking,
  type VotesByPredicate,
  type PredicateRedeemInfo,
  type UsePredicateBlockingParams,
  type UsePredicateBlockingResult,
} from './usePredicateBlocking';

// Direction change flow
export {
  useDirectionChange,
  type DirectionChangeInfo,
  type PendingRedeemInfo,
  type UseDirectionChangeParams,
  type UseDirectionChangeResult,
} from './useDirectionChange';

// Minimum required amount
export {
  useMinRequired,
  type MinRequiredAmount,
  type UseMinRequiredParams,
} from './useMinRequired';

// Add to cart logic
export {
  useAddToCart,
  type AddToCartFormState,
  type AddToCartFounderInfo,
  type AddToCartPositionInfo,
  type AddToCartPendingInfo,
  type UseAddToCartParams,
  type UseAddToCartResult,
} from './useAddToCart';

// Multiple position withdrawal
export {
  useWithdrawMultiple,
  type WithdrawRequest,
  type UseWithdrawMultipleParams,
  type UseWithdrawMultipleResult,
} from './useWithdrawMultiple';

// Cross-predicate redemption
export {
  useCrossPredicateRedeem,
  type UseCrossPredicateRedeemParams,
  type UseCrossPredicateRedeemResult,
} from './useCrossPredicateRedeem';

// All user positions for withdraw panel
export {
  useAllUserPositions,
  type UserPositionInfo,
  type ClaimInfoForPositions,
  type UseAllUserPositionsParams,
  type UseAllUserPositionsResult,
} from './useAllUserPositions';

// Position display calculations
export {
  usePositionDisplay,
  type SelectedCombinationPosition,
  type PendingCartAmount,
  type UsePositionDisplayParams,
  type UsePositionDisplayResult,
} from './usePositionDisplay';

// Auto-select position based on user's existing position
export {
  useAutoSelectPosition,
  type UseAutoSelectPositionParams,
} from './useAutoSelectPosition';
