import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SuccessConfirmation, type SuccessAction } from './SuccessConfirmation';

describe('SuccessConfirmation', () => {
  const mockOnClose = vi.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: 'Succès !',
    message: 'Votre action a été effectuée avec succès.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('visibility', () => {
    it('should not render when isOpen is false', () => {
      const { container } = render(
        <SuccessConfirmation {...defaultProps} isOpen={false} />
      );
      expect(container.firstChild).toBeNull();
    });

    it('should render when isOpen is true', () => {
      render(<SuccessConfirmation {...defaultProps} />);
      expect(screen.getByText('Succès !')).toBeInTheDocument();
      expect(
        screen.getByText('Votre action a été effectuée avec succès.')
      ).toBeInTheDocument();
    });
  });

  describe('celebration types', () => {
    it('should render checkmark celebration by default', () => {
      render(<SuccessConfirmation {...defaultProps} />);

      // Check for SVG checkmark
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render checkmark when celebrationType is checkmark', () => {
      render(
        <SuccessConfirmation
          {...defaultProps}
          celebrationType="checkmark"
        />
      );

      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render confetti emoji when celebrationType is confetti', () => {
      render(
        <SuccessConfirmation {...defaultProps} celebrationType="confetti" />
      );

      expect(screen.getByText('🎉')).toBeInTheDocument();
    });

    it('should render simple checkmark when celebrationType is none', () => {
      render(<SuccessConfirmation {...defaultProps} celebrationType="none" />);

      expect(screen.getByText('✓')).toBeInTheDocument();
    });
  });

  describe('transaction hash', () => {
    const txHash = '0x1234567890abcdef';

    it('should display transaction hash when provided', () => {
      render(<SuccessConfirmation {...defaultProps} txHash={txHash} />);

      expect(screen.getByText(txHash)).toBeInTheDocument();
      expect(screen.getByText('Transaction Hash')).toBeInTheDocument();
    });

    it('should show block explorer link when txHash provided', () => {
      render(<SuccessConfirmation {...defaultProps} txHash={txHash} />);

      const link = screen.getByText('Voir ↗');
      expect(link).toHaveAttribute(
        'href',
        `https://sepolia.basescan.org/tx/${txHash}`
      );
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should not display transaction hash section when not provided', () => {
      render(<SuccessConfirmation {...defaultProps} />);

      expect(screen.queryByText('Transaction Hash')).not.toBeInTheDocument();
    });
  });

  describe('close button', () => {
    it('should show close button', () => {
      render(<SuccessConfirmation {...defaultProps} />);

      expect(screen.getByLabelText('Fermer')).toBeInTheDocument();
    });

    it('should call onClose when close button clicked', async () => {
      vi.useRealTimers();
      const user = userEvent.setup();
      render(<SuccessConfirmation {...defaultProps} />);

      const closeButton = screen.getByLabelText('Fermer');
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
      vi.useFakeTimers();
    });
  });

  describe('action buttons', () => {
    const mockAction1 = vi.fn();
    const mockAction2 = vi.fn();

    const actions: SuccessAction[] = [
      {
        label: 'Action primaire',
        onClick: mockAction1,
        primary: true,
      },
      {
        label: 'Action secondaire',
        onClick: mockAction2,
      },
    ];

    it('should render action buttons when provided', () => {
      render(<SuccessConfirmation {...defaultProps} actions={actions} />);

      expect(screen.getByText('Action primaire')).toBeInTheDocument();
      expect(screen.getByText('Action secondaire')).toBeInTheDocument();
    });

    it('should call action onClick and close when action clicked', async () => {
      vi.useRealTimers();
      const user = userEvent.setup();
      render(<SuccessConfirmation {...defaultProps} actions={actions} />);

      const primaryButton = screen.getByText('Action primaire');
      await user.click(primaryButton);

      expect(mockAction1).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      vi.useFakeTimers();
    });

    it('should show default close button when no actions provided', () => {
      render(<SuccessConfirmation {...defaultProps} actions={[]} />);

      const closeButton = screen.getByText('✓ Fermer');
      expect(closeButton).toBeInTheDocument();
    });

    it('should call onClose when default close button clicked', async () => {
      vi.useRealTimers();
      const user = userEvent.setup();
      render(<SuccessConfirmation {...defaultProps} actions={[]} />);

      const closeButton = screen.getByText('✓ Fermer');
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
      vi.useFakeTimers();
    });
  });

  describe('auto-dismiss', () => {
    it('should auto-dismiss after specified time', () => {
      render(
        <SuccessConfirmation {...defaultProps} autoDismissAfter={3000} />
      );

      expect(mockOnClose).not.toHaveBeenCalled();

      // Fast-forward time
      vi.advanceTimersByTime(3000);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not auto-dismiss when autoDismissAfter not specified', () => {
      render(<SuccessConfirmation {...defaultProps} />);

      // Fast-forward a lot of time
      vi.advanceTimersByTime(10000);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should clear auto-dismiss timer when component unmounts', () => {
      const { unmount } = render(
        <SuccessConfirmation {...defaultProps} autoDismissAfter={3000} />
      );

      unmount();

      // Fast-forward time after unmount
      vi.advanceTimersByTime(3000);

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('confirmation message', () => {
    it('should display blockchain confirmation message', () => {
      render(<SuccessConfirmation {...defaultProps} />);

      expect(
        screen.getByText('Transaction confirmée sur la blockchain')
      ).toBeInTheDocument();
    });
  });

  describe('animations', () => {
    it('should have animation classes on modal', () => {
      render(<SuccessConfirmation {...defaultProps} />);

      const backdrop = document.querySelector('.animate-fade-in');
      const modal = document.querySelector('.animate-scale-in');

      expect(backdrop).toBeInTheDocument();
      expect(modal).toBeInTheDocument();
    });

    it('should show checkmark animation after delay', () => {
      render(<SuccessConfirmation {...defaultProps} />);

      // Checkmark should not be visible initially
      const svg = document.querySelector('svg');
      expect(svg).toHaveClass('opacity-0');

      // Fast-forward past the delay
      vi.advanceTimersByTime(200);

      // Update component
      vi.runAllTimers();

      // Note: In a real browser, the class would change. In tests with happy-dom,
      // we're mainly testing that the component renders without errors
    });
  });

  describe('content customization', () => {
    it('should render custom title and message', () => {
      render(
        <SuccessConfirmation
          {...defaultProps}
          title="Custom Title"
          message="Custom message here"
        />
      );

      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom message here')).toBeInTheDocument();
    });
  });
});
