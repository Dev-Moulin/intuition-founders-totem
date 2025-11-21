import { useEffect, useState } from 'react';

export interface SuccessAction {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

export interface SuccessConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  txHash?: string;
  actions?: SuccessAction[];
  celebrationType?: 'confetti' | 'checkmark' | 'none';
  autoDismissAfter?: number; // in milliseconds
}

/**
 * Success confirmation component with celebration animation
 *
 * Displays a success message after a successful blockchain transaction or action.
 * Includes celebration effects, transaction details, and suggested next actions.
 *
 * @example
 * ```tsx
 * <SuccessConfirmation
 *   isOpen={showSuccess}
 *   onClose={() => setShowSuccess(false)}
 *   title="Proposition créée !"
 *   message="Votre proposition de totem a été enregistrée"
 *   txHash="0x123..."
 *   actions={[
 *     { label: "Voir mes propositions", onClick: () => navigate('/my-votes'), primary: true },
 *     { label: "Créer une autre", onClick: handleReset }
 *   ]}
 * />
 * ```
 */
export function SuccessConfirmation({
  isOpen,
  onClose,
  title,
  message,
  txHash,
  actions = [],
  celebrationType = 'checkmark',
  autoDismissAfter,
}: SuccessConfirmationProps) {
  const [showCheckmark, setShowCheckmark] = useState(false);

  // Animate checkmark on mount
  useEffect(() => {
    if (isOpen) {
      // Delay checkmark animation slightly for better effect
      const timer = setTimeout(() => setShowCheckmark(true), 200);
      return () => clearTimeout(timer);
    } else {
      setShowCheckmark(false);
    }
  }, [isOpen]);

  // Auto-dismiss if specified
  useEffect(() => {
    if (isOpen && autoDismissAfter) {
      const timer = setTimeout(onClose, autoDismissAfter);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoDismissAfter, onClose]);

  if (!isOpen) return null;

  const blockExplorerUrl = txHash
    ? `https://sepolia.basescan.org/tx/${txHash}`
    : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="glass-card p-8 max-w-lg w-full space-y-6 relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          ✕
        </button>

        {/* Success Icon with Animation */}
        <div className="text-center space-y-4">
          {celebrationType === 'checkmark' && (
            <div className="relative inline-block">
              {/* Circular background */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto shadow-lg shadow-green-500/50">
                {/* Animated Checkmark */}
                <svg
                  className={`w-14 h-14 text-white transition-all duration-500 ${
                    showCheckmark
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-50'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    className={showCheckmark ? 'animate-draw-check' : ''}
                  />
                </svg>
              </div>

              {/* Success pulse rings */}
              <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping-slow"></div>
              <div
                className="absolute inset-0 rounded-full bg-green-500/20 animate-ping-slow"
                style={{ animationDelay: '0.5s' }}
              ></div>
            </div>
          )}

          {celebrationType === 'confetti' && (
            <div className="text-8xl animate-bounce-in">🎉</div>
          )}

          {celebrationType === 'none' && (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto">
              <span className="text-5xl">✓</span>
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl font-bold text-green-400">{title}</h2>

          {/* Message */}
          <p className="text-white/80 text-lg">{message}</p>
        </div>

        {/* Transaction Hash */}
        {txHash && (
          <div className="space-y-2">
            <div className="text-xs text-white/60">Transaction Hash</div>
            <div className="flex items-center gap-2">
              <code className="text-xs text-green-300 bg-green-900/20 px-3 py-2 rounded font-mono truncate flex-1">
                {txHash}
              </code>
              {blockExplorerUrl && (
                <a
                  href={blockExplorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 text-sm whitespace-nowrap transition-colors"
                >
                  Voir ↗
                </a>
              )}
            </div>
          </div>
        )}

        {/* Success Icon */}
        <div className="flex items-center justify-center gap-2 text-green-400/60 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>Transaction confirmée sur la blockchain</span>
        </div>

        {/* Action Buttons */}
        {actions.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick();
                  onClose();
                }}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                  action.primary
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/30'
                    : 'glass-button'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Default Close Button (if no actions) */}
        {actions.length === 0 && (
          <button
            onClick={onClose}
            className="w-full glass-button bg-green-500/20 hover:bg-green-500/30 border-green-500/30"
          >
            ✓ Fermer
          </button>
        )}
      </div>

      {/* Global Styles for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes draw-check {
          from {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          to {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-draw-check {
          animation: draw-check 0.6s ease-out forwards;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-scale-in,
          .animate-draw-check,
          .animate-ping-slow,
          .animate-bounce-in {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
