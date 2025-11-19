import { useState } from 'react';
import { FounderCard, type FounderData } from '../components/FounderCard';
import { ProposalModal, type ProposalFormData } from '../components/ProposalModal';
import { useIntuition } from '../hooks/useIntuition';
import foundersData from '../../../../packages/shared/src/data/founders.json';
import type { Hex } from 'viem';

export function ProposePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFounder, setSelectedFounder] = useState<FounderData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // INTUITION SDK hook
  const { createClaim, isReady } = useIntuition();

  // Cast foundersData to FounderData array
  const founders = foundersData as FounderData[];

  // TODO: Fetch existing predicates and objects from GraphQL (issue #33)
  const existingPredicates: Array<{ id: Hex; label: string }> = [];
  const existingObjects: Array<{ id: Hex; label: string }> = [];

  // Filter founders based on search term
  const filteredFounders = founders.filter(
    (founder) =>
      founder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      founder.shortBio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePropose = (founderId: string) => {
    const founder = founders.find((f) => f.id === founderId);
    if (founder) {
      setSelectedFounder(founder);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFounder(null);
  };

  const handleSubmitProposal = async (data: ProposalFormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!isReady) {
        throw new Error('Wallet non connecté');
      }

      if (!data.founderAtomId) {
        throw new Error('Atom ID du fondateur manquant');
      }

      console.log('Creating claim:', data);

      // Create the claim using INTUITION SDK
      const result = await createClaim({
        subjectId: data.founderAtomId,
        predicate: data.predicate,
        object: data.object,
        depositAmount: data.trustAmount,
      });

      console.log('Claim created:', result);

      // Close modal on success
      handleCloseModal();

      // Show success message
      setSuccess(`Claim créé avec succès pour ${selectedFounder?.name}! Transaction: ${result.triple.transactionHash.slice(0, 10)}...`);

      // Clear success after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      console.error('Error creating claim:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création du claim';
      setError(errorMessage);

      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success/Error notifications */}
      {success && (
        <div className="fixed top-4 right-4 z-50 max-w-md p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="fixed top-4 right-4 z-50 max-w-md p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Proposer un Totem
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Choisissez un fondateur et proposez un totem qui le représente.
          Votre proposition sera soumise on-chain via le protocole INTUITION.
        </p>
      </div>

      {/* Search bar */}
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Rechercher un fondateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50 transition-colors"
        />
      </div>

      {/* Stats */}
      <div className="text-center text-white/50 text-sm">
        {filteredFounders.length} fondateur{filteredFounders.length !== 1 ? 's' : ''}
        {searchTerm && ` trouvé${filteredFounders.length !== 1 ? 's' : ''}`}
      </div>

      {/* Founders grid */}
      {filteredFounders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFounders.map((founder) => (
            <FounderCard
              key={founder.id}
              founder={founder}
              proposalCount={0} // TODO: Fetch from GraphQL (issue #33)
              onPropose={() => handlePropose(founder.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-white/50">
            Aucun fondateur ne correspond à votre recherche.
          </p>
        </div>
      )}

      {/* Proposal Modal */}
      {selectedFounder && (
        <ProposalModal
          founder={selectedFounder}
          founderAtomId={selectedFounder.atomId as Hex | undefined}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitProposal}
          isLoading={isSubmitting}
          existingPredicates={existingPredicates}
          existingObjects={existingObjects}
        />
      )}
    </div>
  );
}
