import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FounderResultCard } from '../components/FounderResultCard';
import { useAllProposals } from '../hooks';

type SortOption = 'name' | 'votes' | 'proposals';

export function ResultsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  // Fetch all proposals grouped by founder
  const {
    founders: allFounders,
    loading,
    error,
    totalFounders,
    totalProposals,
    foundersWithWinners,
    totalClaims,
  } = useAllProposals();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="glass-card p-8 max-w-md text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h2 className="text-xl font-bold text-white mb-2">{t('resultsPage.loading')}</h2>
          <p className="text-white/70">
            {t('resultsPage.loadingDescription')}
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
          <h2 className="text-2xl font-bold text-white mb-2">{t('resultsPage.error')}</h2>
          <p className="text-white/60 mb-6">
            {t('resultsPage.errorDescription', { message: error.message })}
          </p>
          <Link to="/" className="glass-button">
            {t('resultsPage.backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  // Filter founders based on search
  const filteredFounders = allFounders.filter((founder) => {
    const query = searchQuery.toLowerCase();
    return (
      founder.name.toLowerCase().includes(query) ||
      founder.winningTotem?.object.label.toLowerCase().includes(query)
    );
  });

  // Sort founders
  const sortedFounders = [...filteredFounders].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'votes':
        return b.totalVoters - a.totalVoters;
      case 'proposals':
        return b.totalProposals - a.totalProposals;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t('resultsPage.title')}
          <span className="block text-purple-400">{t('resultsPage.subtitle')}</span>
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          {t('resultsPage.description')}
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">
            {totalFounders}
          </div>
          <div className="text-white/60 text-sm">{t('resultsPage.stats.founders')}</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">
            {totalProposals}
          </div>
          <div className="text-white/60 text-sm">{t('resultsPage.stats.proposals')}</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">
            {foundersWithWinners}
          </div>
          <div className="text-white/60 text-sm">{t('resultsPage.stats.winningTotems')}</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">{totalClaims}</div>
          <div className="text-white/60 text-sm">{t('resultsPage.stats.totalClaims')}</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder={t('resultsPage.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm whitespace-nowrap">
              {t('resultsPage.sortBy')}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="name">{t('resultsPage.sortOptions.name')}</option>
              <option value="votes">{t('resultsPage.sortOptions.votes')}</option>
              <option value="proposals">{t('resultsPage.sortOptions.proposals')}</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-white/60">
          {t('resultsPage.resultsCount', { count: sortedFounders.length })}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="ml-2 text-purple-400 hover:text-purple-300"
            >
              {t('resultsPage.reset')}
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {sortedFounders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFounders.map((founder) => (
            <FounderResultCard
              key={founder.id}
              founder={founder}
              winningTotem={founder.winningTotem}
              totalProposals={founder.totalProposals}
              totalVoters={founder.totalVoters}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">
            {t('resultsPage.noResults')}
          </h3>
          <p className="text-white/60 mb-4">
            {t('resultsPage.noResultsDescription')}
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="glass-button"
          >
            {t('resultsPage.resetFilters')}
          </button>
        </div>
      )}

      {/* Status Notice */}
      <div className="glass-card p-4 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-white/60">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>{t('resultsPage.statusNotice')}</span>
        </div>
      </div>
    </div>
  );
}
