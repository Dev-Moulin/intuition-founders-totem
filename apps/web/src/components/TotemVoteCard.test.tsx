import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/utils';
import userEvent from '@testing-library/user-event';
import { TotemVoteCard } from './TotemVoteCard';
import type { AggregatedTotem } from '../hooks/useAllTotems';

const mockTotem: AggregatedTotem = {
  totemId: '0x123',
  totemLabel: 'Innovation Leader',
  totemImage: 'https://example.com/totem.png',
  totalFor: 1000n,
  totalAgainst: 200n,
  netScore: 800n,
  totalForVotes: 1000n,
  totalAgainstVotes: 200n,
  totalNetScore: 800n,
  claimCount: 2,
  topPredicate: 'is a visionary',
  founder: {
    id: '0xfounder1',
    name: 'Vitalik Buterin',
  },
  claims: [
    {
      tripleId: '0xtriple1',
      predicate: 'is a visionary',
      forVotes: 600n,
      againstVotes: 100n,
      netScore: 500n,
    },
    {
      tripleId: '0xtriple2',
      predicate: 'is innovative',
      forVotes: 400n,
      againstVotes: 100n,
      netScore: 300n,
    },
  ],
};

describe('TotemVoteCard', () => {
  const mockOnVote = vi.fn();

  it('should render totem information', () => {
    render(<TotemVoteCard totem={mockTotem} rank={1} onVote={mockOnVote} />);

    expect(screen.getByText('Innovation Leader')).toBeInTheDocument();
    expect(screen.getByText(/Vitalik Buterin/)).toBeInTheDocument();
  });

  it('should display rank', () => {
    render(<TotemVoteCard totem={mockTotem} rank={3} onVote={mockOnVote} />);

    expect(screen.getByText('#3')).toBeInTheDocument();
  });

  it('should show vote stats', () => {
    render(<TotemVoteCard totem={mockTotem} rank={1} onVote={mockOnVote} />);

    expect(screen.getByText('FOR')).toBeInTheDocument();
    expect(screen.getByText('AGAINST')).toBeInTheDocument();
    expect(screen.getByText('NET')).toBeInTheDocument();
  });

  it('should show claim count', () => {
    render(<TotemVoteCard totem={mockTotem} rank={1} onVote={mockOnVote} />);

    expect(screen.getByText(/2 claims/)).toBeInTheDocument();
  });

  it('should show top predicate', () => {
    render(<TotemVoteCard totem={mockTotem} rank={1} onVote={mockOnVote} />);

    expect(screen.getByText(/is a visionary/)).toBeInTheDocument();
  });

  it('should call onVote with for direction', async () => {
    const user = userEvent.setup();
    render(<TotemVoteCard totem={mockTotem} rank={1} onVote={mockOnVote} />);

    await user.click(screen.getByRole('button', { name: /vote for/i }));

    expect(mockOnVote).toHaveBeenCalledWith('0x123', 'for');
  });

  it('should call onVote with against direction', async () => {
    const user = userEvent.setup();
    render(<TotemVoteCard totem={mockTotem} rank={1} onVote={mockOnVote} />);

    await user.click(screen.getByRole('button', { name: /vote against/i }));

    expect(mockOnVote).toHaveBeenCalledWith('0x123', 'against');
  });

  it('should toggle claims visibility', async () => {
    const user = userEvent.setup();
    render(<TotemVoteCard totem={mockTotem} rank={1} onVote={mockOnVote} />);

    // Claims should be hidden initially
    expect(screen.queryByText('All Claims:')).not.toBeInTheDocument();

    // Click to show claims
    await user.click(screen.getByRole('button', { name: /view claims/i }));
    expect(screen.getByText('All Claims:')).toBeInTheDocument();
    expect(screen.getByText(/"is innovative"/)).toBeInTheDocument();

    // Click to hide claims
    await user.click(screen.getByRole('button', { name: /hide claims/i }));
    expect(screen.queryByText('All Claims:')).not.toBeInTheDocument();
  });

  it('should display totem image', () => {
    render(<TotemVoteCard totem={mockTotem} rank={1} onVote={mockOnVote} />);

    const img = screen.getByRole('img', { name: 'Innovation Leader' });
    expect(img).toHaveAttribute('src', 'https://example.com/totem.png');
  });
});
