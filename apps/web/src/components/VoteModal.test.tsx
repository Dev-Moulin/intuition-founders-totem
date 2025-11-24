import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../test/utils';
import userEvent from '@testing-library/user-event';
import { VoteModal } from './VoteModal';
import type { AggregatedTotem } from '../hooks/useAllTotems';

// Mock wagmi
vi.mock('wagmi', () => ({
  useAccount: () => ({ address: '0x1234567890abcdef1234567890abcdef12345678' }),
}));

// Mock useVote hook
const mockVote = vi.fn();
const mockReset = vi.fn();
vi.mock('../hooks/useVote', () => ({
  useVote: () => ({
    vote: mockVote,
    status: 'idle',
    error: null,
    isLoading: false,
    currentStep: 0,
    totalSteps: 3,
    reset: mockReset,
  }),
}));

const mockTotem: AggregatedTotem = {
  totemId: '0x123',
  totemLabel: 'Innovation Leader',
  totemImage: 'https://example.com/totem.png',
  totalForVotes: 1000n,
  totalAgainstVotes: 200n,
  totalNetScore: 800n,
  claimCount: 1,
  founder: {
    id: '0xfounder1',
    name: 'Vitalik Buterin',
  },
  claims: [
    {
      tripleId: '0xtriple1',
      predicate: 'is a visionary',
      forVotes: 1000n,
      againstVotes: 200n,
      netScore: 800n,
    },
  ],
};

describe('VoteModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when closed', () => {
    render(
      <VoteModal
        isOpen={false}
        onClose={mockOnClose}
        totem={mockTotem}
        direction="for"
      />
    );

    expect(screen.queryByText('Vote FOR')).not.toBeInTheDocument();
  });

  it('should render when open', () => {
    render(
      <VoteModal
        isOpen={true}
        onClose={mockOnClose}
        totem={mockTotem}
        direction="for"
      />
    );

    expect(screen.getByText('Vote FOR')).toBeInTheDocument();
    expect(screen.getByText('Innovation Leader')).toBeInTheDocument();
  });

  it('should display totem information', () => {
    render(
      <VoteModal
        isOpen={true}
        onClose={mockOnClose}
        totem={mockTotem}
        direction="for"
      />
    );

    expect(screen.getByText('Innovation Leader')).toBeInTheDocument();
    expect(screen.getByText(/Vitalik Buterin/)).toBeInTheDocument();
  });

  it('should show AGAINST vote direction', () => {
    render(
      <VoteModal
        isOpen={true}
        onClose={mockOnClose}
        totem={mockTotem}
        direction="against"
      />
    );

    expect(screen.getByText('Vote AGAINST')).toBeInTheDocument();
    expect(screen.getByText(/voting AGAINST/)).toBeInTheDocument();
  });

  it('should have amount input', () => {
    render(
      <VoteModal
        isOpen={true}
        onClose={mockOnClose}
        totem={mockTotem}
        direction="for"
      />
    );

    const amountInput = screen.getByPlaceholderText('0.0');
    expect(amountInput).toBeInTheDocument();
  });

  it('should call onClose when cancel is clicked', async () => {
    const user = userEvent.setup();

    render(
      <VoteModal
        isOpen={true}
        onClose={mockOnClose}
        totem={mockTotem}
        direction="for"
      />
    );

    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should show validation error for empty amount', async () => {
    const user = userEvent.setup();

    render(
      <VoteModal
        isOpen={true}
        onClose={mockOnClose}
        totem={mockTotem}
        direction="for"
      />
    );

    await user.click(screen.getByRole('button', { name: /confirm vote/i }));
    expect(screen.getByText(/valid amount/i)).toBeInTheDocument();
  });

  it('should accept amount input', async () => {
    const user = userEvent.setup();

    render(
      <VoteModal
        isOpen={true}
        onClose={mockOnClose}
        totem={mockTotem}
        direction="for"
      />
    );

    const amountInput = screen.getByPlaceholderText('0.0');
    await user.type(amountInput, '10');
    expect(amountInput).toHaveValue(10);
  });

  it('should display claim predicate', () => {
    render(
      <VoteModal
        isOpen={true}
        onClose={mockOnClose}
        totem={mockTotem}
        direction="for"
      />
    );

    expect(screen.getByText(/is a visionary/)).toBeInTheDocument();
  });
});
