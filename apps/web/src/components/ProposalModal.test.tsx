import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../test/utils';
import userEvent from '@testing-library/user-event';
import { ProposalModal } from './ProposalModal';
import type { FounderData } from './FounderCard';

const mockFounder: FounderData = {
  id: '0xfounder1',
  name: 'Vitalik Buterin',
  shortBio: 'Co-founder of Ethereum',
};

describe('ProposalModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when closed', () => {
    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.queryByText('Créer un Claim')).not.toBeInTheDocument();
  });

  it('should render when open', () => {
    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Créer un Claim')).toBeInTheDocument();
    expect(screen.getAllByText(/Vitalik Buterin/).length).toBeGreaterThan(0);
  });

  it('should display founder name in preview', () => {
    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Vitalik Buterin')).toBeInTheDocument();
  });

  it('should have predicate input', () => {
    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Predicate *')).toBeInTheDocument();
  });

  it('should have object input', () => {
    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Objet (Totem) *')).toBeInTheDocument();
  });

  it('should have trust amount input', () => {
    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByLabelText(/montant trust/i)).toBeInTheDocument();
  });

  it('should call onClose when cancel is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    await user.click(screen.getByRole('button', { name: /annuler/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should toggle between select and create predicate modes', async () => {
    const user = userEvent.setup();

    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    // Click on "Créer" button for predicate
    const createButton = screen.getAllByRole('button', { name: /créer/i })[0];
    await user.click(createButton);

    // Should show input for new predicate
    expect(screen.getByPlaceholderText(/is represented by/i)).toBeInTheDocument();
  });

  it('should have default trust amount', () => {
    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const trustInput = screen.getByLabelText(/montant trust/i);
    expect(trustInput).toHaveValue(0.001);
  });

  it('should disable submit button when form is invalid', () => {
    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: /créer le claim/i });
    expect(submitButton).toBeDisabled();
  });

  it('should show loading state', () => {
    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        isLoading={true}
      />
    );

    expect(screen.getByText(/création/i)).toBeInTheDocument();
  });

  it('should show existing predicates in select', () => {
    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        existingPredicates={[{ id: '0x123' as `0x${string}`, label: 'is a genius' }]}
      />
    );

    expect(screen.getByText('is a genius')).toBeInTheDocument();
  });

  it('should display claim preview text', () => {
    render(
      <ProposalModal
        founder={mockFounder}
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Votre claim :')).toBeInTheDocument();
  });
});
