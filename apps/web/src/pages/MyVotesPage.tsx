import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  useUserVotesDetailed,
  getTotalVotedAmount,
  formatTotalVotes,
  groupVotesByTerm,
} from '../hooks';
import { formatTrustAmount } from '../utils';

type FilterOption = 'all' | 'for' | 'against';

export function MyVotesPage() {
  const { t } = useTranslation();
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
            {t('myVotesPage.notConnected.title')}
          </h2>
          <p className="text-white/70">
            {t('myVotesPage.notConnected.description')}
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
          <h2 className="text-xl font-bold text-white mb-2">{t('myVotesPage.loading.title')}</h2>
          <p className="text-white/70">
            {t('myVotesPage.loading.description')}
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
          <h2 className="text-2xl font-bold text-white mb-2">{t('myVotesPage.error.title')}</h2>
          <p className="text-white/60 mb-6">
            {t('myVotesPage.error.description', { message: error.message })}
          </p>
          <Link to="/" className="glass-button">
            {t('myVotesPage.error.backButton')}
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
          {t('myVotesPage.title')}
          <span className="block text-purple-400">{t('myVotesPage.subtitle')}</span>
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          {t('myVotesPage.description')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">
            {votes.length}
          </div>
          <div className="text-white/60 text-sm">{t('myVotesPage.stats.totalVotes')}</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-green-400">
            {forVotes.length}
          </div>
          <div className="text-white/60 text-sm">{t('myVotesPage.stats.forVotes')}</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-red-400">
            {againstVotes.length}
          </div>
          <div className="text-white/60 text-sm">{t('myVotesPage.stats.againstVotes')}</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">
            {formatTrustAmount(BigInt(totalVoted), 2)}
          </div>
          <div className="text-white/60 text-sm">{t('myVotesPage.stats.totalTrust')}</div>
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
              {t('myVotesPage.filters.all', { count: votes.length })}
            </button>
            <button
              onClick={() => setFilter('for')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'for'
                  ? 'bg-green-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {t('myVotesPage.filters.for', { count: forVotes.length })}
            </button>
            <button
              onClick={() => setFilter('against')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'against'
                  ? 'bg-red-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {t('myVotesPage.filters.against', { count: againstVotes.length })}
            </button>
          </div>

          {/* Summary stats */}
          <div className="text-sm text-white/60">
            {filter === 'all' && (
              <span>
                {t('myVotesPage.filters.totalLabel')}:{' '}
                <span className="font-semibold text-purple-400">
                  {formatTotalVotes(totalVoted)}
                </span>
              </span>
            )}
            {filter === 'for' && (
              <span>
                {t('myVotesPage.filters.totalForLabel')}:{' '}
                <span className="font-semibold text-green-400">
                  {formatTotalVotes(totalForVoted)}
                </span>
              </span>
            )}
            {filter === 'against' && (
              <span>
                {t('myVotesPage.filters.totalAgainstLabel')}:{' '}
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
            {t('myVotesPage.votesList.title', { count: filteredVotes.length })}
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
                        {vote.isPositive ? t('myVotesPage.votesList.forBadge') : t('myVotesPage.votesList.againstBadge')}
                      </div>

                      {/* Amount */}
                      <div className="text-lg font-bold text-white">
                        {vote.formattedAmount} TRUST
                      </div>
                    </div>

                    {/* Term ID */}
                    <div className="text-sm text-white/60 mb-1">
                      {t('myVotesPage.votesList.termId')}:{' '}
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
                      {t('myVotesPage.votesList.explorerButton')}
                    </a>

                    {/* View on Portal */}
                    <a
                      href={`https://portal.intuition.systems/app/triple/${vote.term_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 hover:text-purple-300 rounded-lg text-sm font-medium transition-colors"
                    >
                      {t('myVotesPage.votesList.portalButton')}
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
            {t('myVotesPage.emptyState.title')}
          </h3>
          <p className="text-white/60 mb-6">
            {filter === 'all'
              ? t('myVotesPage.emptyState.noVotesAll')
              : filter === 'for'
                ? t('myVotesPage.emptyState.noVotesFor')
                : t('myVotesPage.emptyState.noVotesAgainst')}
          </p>
          <Link to="/results" className="glass-button">
            {t('myVotesPage.emptyState.viewProposalsButton')}
          </Link>
        </div>
      )}

      {/* Terms Aggregation (if votes exist) */}
      {votes.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            {t('myVotesPage.aggregation.title', { count: votesByTerm.size })}
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
                  <div className="text-sm text-white/60 mb-2">{t('myVotesPage.aggregation.termLabel')}</div>
                  <code className="text-xs text-purple-300 bg-purple-900/20 px-2 py-1 rounded font-mono block mb-3 truncate">
                    {termId}
                  </code>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60 text-sm">{t('myVotesPage.aggregation.votesLabel')}:</span>
                    <span className="font-bold text-white">
                      {termVotes.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60 text-sm">{t('myVotesPage.aggregation.forAgainstLabel')}:</span>
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
                    <span className="text-white/60 text-sm">{t('myVotesPage.aggregation.totalLabel')}:</span>
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
          <span>{t('myVotesPage.statusNotice')}</span>
        </div>
      </div>
    </div>
  );
}
