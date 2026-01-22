/**
 * useFormSteps - Form step management for VoteTotemPanel
 *
 * Manages:
 * - Current form step calculation (totem → predicate → direction → curve → amount)
 * - Blur effect classes based on distance from current step
 * - Pulsation classes to guide user to next action
 *
 * @see VoteTotemPanel.tsx
 */

import { useMemo, useEffect, useRef } from 'react';
import type { CurveId } from '../index';
import type { NewTotemData } from '../../components/founder/TotemCreationForm';

/** Form step values */
export type FormStep = -1 | 0 | 1 | 2 | 3;

export interface UseFormStepsParams {
  /** Selected totem ID */
  selectedTotemId: string | undefined;
  /** New totem data (if creating) */
  newTotemData: NewTotemData | null | undefined;
  /** Selected predicate ID */
  selectedPredicateId: string;
  /** Current operation mode */
  operationMode: 'deposit' | 'redeem';
  /** Vote direction */
  voteDirection: 'for' | 'against' | 'withdraw' | null;
  /** Selected curve */
  selectedCurve: CurveId | null;
  /** Whether user has any position on this totem */
  hasAnyPosition: boolean;
}

export interface UseFormStepsResult {
  /** Current form step (-1 to 3) */
  currentFormStep: FormStep;
  /** Get blur class for an element based on step distance */
  getBlurClass: (elementStep: number, currentStep: number) => string;
  /** Get pulse class for an element (guides user to next step) */
  getPulseClass: (elementStep: number, isElementSelected: boolean) => string;
  /** Ref to previous form step (for animations) */
  prevFormStepRef: React.MutableRefObject<number>;
}

/**
 * Hook for managing multi-step form progression with visual effects
 */
export function useFormSteps({
  selectedTotemId,
  newTotemData,
  selectedPredicateId,
  operationMode,
  voteDirection,
  selectedCurve,
  hasAnyPosition,
}: UseFormStepsParams): UseFormStepsResult {
  // Track previous form step for animations
  const prevFormStepRef = useRef<number>(-1);

  // Current form step based on selections
  // Step -1: Select totem (in FounderCenterPanel)
  // Step 0: Predicate
  // Step 1: Direction
  // Step 2: Curve
  // Step 3: Amount
  const currentFormStep = useMemo((): FormStep => {
    // No totem selected = step -1 (totem selection phase)
    if (!selectedTotemId && !newTotemData) return -1;
    if (!selectedPredicateId) return 0;
    if (operationMode === 'redeem') return 3; // Skip direction/curve for redeem
    if (!voteDirection || voteDirection === 'withdraw') return 1;
    if (!selectedCurve) return 2;
    return 3;
  }, [selectedTotemId, newTotemData, selectedPredicateId, operationMode, voteDirection, selectedCurve]);

  // Update prevFormStepRef after render (for animation detection)
  useEffect(() => {
    // Use a small delay to ensure animations have time to play before updating ref
    const timer = setTimeout(() => {
      prevFormStepRef.current = currentFormStep;
    }, 350); // Slightly longer than animation duration (300ms)
    return () => clearTimeout(timer);
  }, [currentFormStep]);

  // Blur step utility function with animation classes
  // Returns: base blur class + animation class if step changed
  const getBlurClass = (elementStep: number, currentStep: number): string => {
    const distance = elementStep - currentStep;
    const prevStep = prevFormStepRef.current;
    const prevDistance = elementStep - prevStep;

    // Determine base blur class
    let blurClass = 'blur-transition';
    if (distance <= 0) blurClass = 'blur-step-none blur-transition';
    else if (distance === 1) blurClass = 'blur-step-1 blur-transition';
    else if (distance === 2) blurClass = 'blur-step-2 blur-transition';
    else blurClass = 'blur-step-3 blur-transition';

    // Add animation class if step changed and element is becoming visible
    // step-reveal: element just became the current step (was blurred, now clear)
    if (currentStep !== prevStep) {
      if (distance <= 0 && prevDistance > 0) {
        blurClass += ' step-reveal';
      }
      // step-reduce-blur: element was 2+ steps away, now 1 step away
      else if (distance === 1 && prevDistance >= 2) {
        blurClass += ' step-reduce-blur';
      }
    }

    return blurClass;
  };

  // Pulsation utility function - guides user to next step
  // Mode 1: First visit (no position) → neutral glow (gray)
  // Mode 2: Return visit (has position) → violet border + scale
  const getPulseClass = (elementStep: number, isElementSelected: boolean): string => {
    // Don't pulse if element is already selected
    if (isElementSelected) return '';
    // Only pulse the current step
    if (elementStep !== currentFormStep) return '';
    // Choose pulse style based on whether user has a position
    return hasAnyPosition ? 'return-visit-pulse' : 'first-visit-pulse';
  };

  return {
    currentFormStep,
    getBlurClass,
    getPulseClass,
    prevFormStepRef,
  };
}
