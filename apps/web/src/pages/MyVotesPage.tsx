import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
import {
  useUserVotesDetailed,
  getTotalVotedAmount,
  formatTotalVotes,
  groupVotesByTerm,
} from '../hooks';
import { formatTrustAmount } from '../utils';

type FilterOption = 'all' | 'for' | 'against';

export function MyVotesPage() {
  const { address, isConnected } = useAccount();
  const [filter, setFilter] = useState<FilterOption>('all');

  // Fetch user's votes
  const { votes, forVotes, againstVotes, loading, error } =
    useUserVotesDetailed(address);

  // Not connected state
  if (!isConnected || !address) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="glass-card p-8 max-w-md text-center">
          <div className="text-4xl mb-4">🔌</div>
          <h2 className="text-xl font-bold text-white mb-2">
            Wallet non connecté
          </h2>
          <p className="text-white/70">
            Connectez votre wallet pour voir votre historique de votes
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="glass-card p-8 max-w-md text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h2 className="text-xl font-bold text-white mb-2">Chargement...</h2>
          <p className="text-white/70">
            Récupération de votre historique de votes
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-8">
        <div className="glass-card p-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Erreur</h2>
          <p className="text-white/60 mb-6">
            Erreur lors du chargement de vos votes: {error.message}
          </p>
          <Link to="/" className="glass-button">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // Filter votes based on selected filter
  const filteredVotes =
    filter === 'all' ? votes : filter === 'for' ? forVotes : againstVotes;

  // Group votes by term for aggregation
  const votesByTerm = groupVotesByTerm(filteredVotes);

  // Calculate stats
  const totalVoted = getTotalVotedAmount(votes);
  const totalForVoted = getTotalVotedAmount(forVotes);
  const totalAgainstVoted = getTotalVotedAmount(againstVotes);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Mes Votes
          <span className="block text-purple-400">Historique INTUITION</span>
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Retrouvez l'historique complet de vos votes sur les propositions de
          totems
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">
            {votes.length}
          </div>
          <div className="text-white/60 text-sm">Votes totaux</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-green-400">
            {forVotes.length}
          </div>
          <div className="text-white/60 text-sm">Votes FOR</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-red-400">
            {againstVotes.length}
          </div>
          <div className="text-white/60 text-sm">Votes AGAINST</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">
            {formatTrustAmount(BigInt(totalVoted), 2)}
          </div>
          <div className="text-white/60 text-sm">TRUST total</div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Filter buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Tous ({votes.length})
            </button>
            <button
              onClick={() => setFilter('for')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'for'
                  ? 'bg-green-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              FOR ({forVotes.length})
            </button>
            <button
              onClick={() => setFilter('against')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'against'
                  ? 'bg-red-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              AGAINST ({againstVotes.length})
            </button>
          </div>

          {/* Summary stats */}
          <div className="text-sm text-white/60">
            {filter === 'all' && (
              <span>
                Total:{' '}
                <span className="font-semibold text-purple-400">
                  {formatTotalVotes(totalVoted)}
                </span>
              </span>
            )}
            {filter === 'for' && (
              <span>
                Total FOR:{' '}
                <span className="font-semibold text-green-400">
                  {formatTotalVotes(totalForVoted)}
                </span>
              </span>
            )}
            {filter === 'against' && (
              <span>
                Total AGAINST:{' '}
                <span className="font-semibold text-red-400">
                  {formatTotalVotes(totalAgainstVoted)}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Votes List */}
      {filteredVotes.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            Historique des votes ({filteredVotes.length})
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {filteredVotes.map((vote) => (
              <div
                key={vote.id}
                className="glass-card p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  {/* Vote Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {/* Vote Direction Badge */}
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          vote.isPositive
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {vote.isPositive ? '👍 FOR' : '👎 AGAINST'}
                      </div>

                      {/* Amount */}
                      <div className="text-lg font-bold text-white">
                        {vote.formattedAmount} TRUST
                      </div>
                    </div>

                    {/* Term ID */}
                    <div className="text-sm text-white/60 mb-1">
                      Term ID:{' '}
                      <code className="text-xs text-purple-300 bg-purple-900/20 px-2 py-1 rounded font-mono">
                        {vote.term_id}
                      </code>
                    </div>

                    {/* Date */}
                    <div className="text-xs text-white/40">
                      {new Date(vote.created_at).toLocaleString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {/* View on Explorer */}
                    <a
                      href={`https://testnet.explorer.intuition.systems/tx/${vote.transaction_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Explorer ↗
                    </a>

                    {/* View on Portal */}
                    <a
                      href={`https://portal.intuition.systems/app/triple/${vote.term_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 hover:text-purple-300 rounded-lg text-sm font-medium transition-colors"
                    >
                      Portal ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-white mb-2">
            Aucun vote trouvé
          </h3>
          <p className="text-white/60 mb-6">
            {filter === 'all'
              ? "Vous n'avez pas encore voté sur de propositions"
              : filter === 'for'
                ? "Vous n'avez pas encore voté FOR sur de propositions"
                : "Vous n'avez pas encore voté AGAINST sur de propositions"}
          </p>
          <Link to="/results" className="glass-button">
            Voir les propositions →
          </Link>
        </div>
      )}

      {/* Terms Aggregation (if votes exist) */}
      {votes.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            Propositions votées ({votesByTerm.size})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from(votesByTerm.entries()).map(([termId, termVotes]) => {
              const totalForThisTerm = termVotes.reduce(
                (sum, v) => sum + BigInt(v.assets_after_fees),
                0n
              );
              const forCount = termVotes.filter((v) => v.isPositive).length;
              const againstCount = termVotes.filter((v) => !v.isPositive).length;

              return (
                <div
                  key={termId}
                  className="glass-card p-4 hover:border-purple-500/50 transition-colors"
                >
                  <div className="text-sm text-white/60 mb-2">Term</div>
                  <code className="text-xs text-purple-300 bg-purple-900/20 px-2 py-1 rounded font-mono block mb-3 truncate">
                    {termId}
                  </code>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60 text-sm">Votes:</span>
                    <span className="font-bold text-white">
                      {termVotes.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60 text-sm">FOR / AGAINST:</span>
                    <span className="text-sm">
                      <span className="text-green-400 font-semibold">
                        {forCount}
                      </span>
                      {' / '}
                      <span className="text-red-400 font-semibold">
                        {againstCount}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">Total:</span>
                    <span className="font-bold text-purple-400">
                      {formatTrustAmount(totalForThisTerm, 2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Status Notice */}
      <div className="glass-card p-4 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-white/60">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>Données en temps réel depuis INTUITION L3 Testnet</span>
        </div>
      </div>
    </div>
  );
}
