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

const existingPredicates = [
  { id: '0xpred1' as `0x${string}`, label: 'is a genius' },
  { id: '0xpred2' as `0x${string}`, label: 'loves cats' },
];

const existingObjects = [
  { id: '0xobj1' as `0x${string}`, label: 'Unicorn' },
  { id: '0xobj2' as `0x${string}`, label: 'Dragon' },
];

describe('ProposalModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
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

    it('should show default predicates in select', () => {
      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Default predicates are shown in the select dropdown
      expect(screen.getByText('is represented by (nouveau)')).toBeInTheDocument();
      expect(screen.getByText('has totem (nouveau)')).toBeInTheDocument();
    });
  });

  describe('close functionality', () => {
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

    it('should call onClose when X button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Find the X button (SVG close button)
      const closeButtons = screen.getAllByRole('button');
      const xButton = closeButtons.find(
        (btn) => btn.querySelector('svg') && !btn.textContent?.includes('Annuler')
      );
      if (xButton) {
        await user.click(xButton);
        expect(mockOnClose).toHaveBeenCalled();
      }
    });

    it('should call onClose when backdrop is clicked', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Find backdrop by class
      const backdrop = document.querySelector('.bg-black\\/60');
      if (backdrop) {
        await user.click(backdrop);
        expect(mockOnClose).toHaveBeenCalled();
      }
    });

    it('should not close when loading', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          isLoading={true}
        />
      );

      await user.click(screen.getByRole('button', { name: /annuler/i }));
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('predicate modes', () => {
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
      const createButtons = screen.getAllByRole('button', { name: /créer/i });
      await user.click(createButtons[0]);

      // Should show input for new predicate
      expect(screen.getByPlaceholderText(/is represented by/i)).toBeInTheDocument();
    });

    it('should switch back to select mode', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Switch to create mode
      const createButtons = screen.getAllByRole('button', { name: /créer/i });
      await user.click(createButtons[0]);

      // Switch back to select mode
      await user.click(screen.getByRole('button', { name: /choisir/i }));

      // Should show select dropdown
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should update predicate in create mode', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Switch to create mode
      const createButtons = screen.getAllByRole('button', { name: /créer/i });
      await user.click(createButtons[0]);

      // Type a new predicate
      const predicateInput = screen.getByPlaceholderText(/is represented by/i);
      await user.type(predicateInput, 'is symbolized by');

      expect(predicateInput).toHaveValue('is symbolized by');
    });

    it('should select predicate from dropdown', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          existingPredicates={existingPredicates}
        />
      );

      // Select a predicate from dropdown
      const predicateSelect = screen.getByRole('combobox');
      await user.selectOptions(predicateSelect, 'is represented by');

      expect(predicateSelect).toHaveValue('is represented by');
    });
  });

  describe('object modes', () => {
    it('should show existing objects as clickable buttons when provided', () => {
      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          existingObjects={existingObjects}
        />
      );

      // Existing objects should appear as clickable buttons
      expect(screen.getByRole('button', { name: 'Unicorn' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Dragon' })).toBeInTheDocument();
    });

    it('should select existing object when clicked', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          existingObjects={existingObjects}
        />
      );

      // Click an existing object button
      await user.click(screen.getByRole('button', { name: 'Unicorn' }));

      // The button should now have selected styling (purple background)
      const unicornButton = screen.getByRole('button', { name: 'Unicorn' });
      expect(unicornButton.className).toContain('purple');
    });

    it('should update object in create mode', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Object is in create mode by default - find by placeholder
      const objectInput = screen.getByPlaceholderText(/tapez un totem/i);
      await user.type(objectInput, 'Phoenix');

      expect(objectInput).toHaveValue('Phoenix');
    });
  });

  describe('form validation', () => {
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

    it('should enable submit button when form is valid', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Switch predicate to create mode and fill
      const createButtons = screen.getAllByRole('button', { name: /créer/i });
      await user.click(createButtons[0]);
      await user.type(screen.getByPlaceholderText(/is represented by/i), 'is symbolized by');

      // Fill object
      await user.type(screen.getByPlaceholderText(/tapez un totem/i), 'Phoenix');

      const submitButton = screen.getByRole('button', { name: /créer le claim/i });
      expect(submitButton).not.toBeDisabled();
    });

    it('should not submit when predicate is empty', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Only fill object (predicate is empty in select mode by default)
      await user.type(screen.getByPlaceholderText(/tapez un totem/i), 'Phoenix');

      const submitButton = screen.getByRole('button', { name: /créer le claim/i });
      expect(submitButton).toBeDisabled();
    });

    it('should not submit when object is empty', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Only fill predicate
      const createButtons = screen.getAllByRole('button', { name: /créer/i });
      await user.click(createButtons[0]);
      await user.type(screen.getByPlaceholderText(/is represented by/i), 'is symbolized by');

      const submitButton = screen.getByRole('button', { name: /créer le claim/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('form submission', () => {
    it('should call onSubmit with correct data', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          founderAtomId={'0xatom123' as `0x${string}`}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Switch predicate to create mode and fill
      const createButtons = screen.getAllByRole('button', { name: /créer/i });
      await user.click(createButtons[0]);
      await user.type(screen.getByPlaceholderText(/is represented by/i), 'is symbolized by');

      // Fill object
      await user.type(screen.getByPlaceholderText(/tapez un totem/i), 'Phoenix');

      // Submit
      await user.click(screen.getByRole('button', { name: /créer le claim/i }));

      expect(mockOnSubmit).toHaveBeenCalledWith({
        founderId: '0xfounder1',
        founderAtomId: '0xatom123',
        predicate: 'is symbolized by',
        object: 'Phoenix',
        trustAmount: '0.001',
      });
    });

    it('should submit with selected predicate', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Select a predicate from dropdown
      await user.selectOptions(screen.getByRole('combobox'), 'is represented by');

      // Fill object
      await user.type(screen.getByPlaceholderText(/tapez un totem/i), 'Phoenix');

      // Submit
      await user.click(screen.getByRole('button', { name: /créer le claim/i }));

      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          predicate: 'is represented by',
          object: 'Phoenix',
        })
      );
    });

    it('should allow changing trust amount', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Check trust input is editable
      const trustInput = screen.getByLabelText(/montant trust/i) as HTMLInputElement;
      expect(trustInput).toHaveValue(0.001);

      // Type additional digits
      await user.type(trustInput, '5');
      expect(trustInput.value).toContain('5');
    });
  });

  describe('loading state', () => {
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

    it('should disable inputs when loading', () => {
      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          isLoading={true}
        />
      );

      expect(screen.getByLabelText(/montant trust/i)).toBeDisabled();
      expect(screen.getByRole('combobox')).toBeDisabled();
    });
  });

  describe('claim preview', () => {
    it('should update preview when predicate changes', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Switch predicate to create mode and fill
      const createButtons = screen.getAllByRole('button', { name: /créer/i });
      await user.click(createButtons[0]);
      await user.type(screen.getByPlaceholderText(/is represented by/i), 'loves');

      // Preview should contain the predicate
      expect(screen.getByText('loves')).toBeInTheDocument();
    });

    it('should update preview when object changes', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill object
      await user.type(screen.getByPlaceholderText(/tapez un totem/i), 'Unicorn');

      // Preview should contain the object
      expect(screen.getByText('Unicorn')).toBeInTheDocument();
    });
  });

  describe('object selection with existing objects', () => {
    it('should allow typing a new object while existing objects are shown', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          existingObjects={existingObjects}
        />
      );

      // Type in the object input
      const objectInput = screen.getByPlaceholderText(/tapez un totem/i);
      await user.type(objectInput, 'Phoenix');

      expect(objectInput).toHaveValue('Phoenix');
    });

    it('should clear input when clicking existing object button', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          existingObjects={existingObjects}
        />
      );

      // Type something first
      const objectInput = screen.getByPlaceholderText(/tapez un totem/i);
      await user.type(objectInput, 'Phoenix');

      // Click an existing object button
      await user.click(screen.getByRole('button', { name: 'Unicorn' }));

      // Input should show the selected object's label
      expect(objectInput).toHaveValue('Unicorn');
    });

    it('should submit with selected existing object', async () => {
      const user = userEvent.setup();

      render(
        <ProposalModal
          founder={mockFounder}
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          existingObjects={existingObjects}
        />
      );

      // Select predicate
      await user.selectOptions(screen.getByRole('combobox'), 'is represented by');

      // Click an existing object button
      await user.click(screen.getByRole('button', { name: 'Unicorn' }));

      // Submit
      await user.click(screen.getByRole('button', { name: /créer le claim/i }));

      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          object: '0xobj1', // The ID of Unicorn
        })
      );
    });
  });
});
