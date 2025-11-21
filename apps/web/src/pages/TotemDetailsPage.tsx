import { useParams, Link } from 'react-router-dom';
import { ClaimCard } from '../components/ClaimCard';
import { formatTrustAmount } from '../utils';
import { useTotemDetails } from '../hooks';

export function TotemDetailsPage() {
  const { founderId, totemId } = useParams<{
    founderId: string;
    totemId: string;
  }>();

  // Decode founder name from URL (may contain spaces encoded as %20 or -)
  const founderName = founderId
    ? decodeURIComponent(founderId).replace(/-/g, ' ')
    : '';

  // Fetch totem details from GraphQL
  const { totem, loading, error } = useTotemDetails(founderName, totemId || '');

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="glass-card p-8 max-w-md text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h2 className="text-xl font-bold text-white mb-2">Chargement...</h2>
          <p className="text-white/70">
            Récupération des détails du totem pour {founderName}
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
            Erreur lors du chargement des détails du totem: {error.message}
          </p>
          <Link to="/results" className="glass-button">
            ← Retour aux résultats
          </Link>
        </div>
      </div>
    );
  }

  // Totem not found
  if (!totem) {
    return (
      <div className="space-y-8">
        <div className="glass-card p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Totem introuvable
          </h2>
          <p className="text-white/60 mb-6">
            Aucune proposition de ce totem pour {founderName}.
          </p>
          <Link to={`/results/${encodeURIComponent(founderName)}`} className="glass-button">
            ← Retour aux totems de {founderName}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-white/60">
        <Link to="/results" className="hover:text-purple-400 transition-colors">
          Résultats
        </Link>
        <span>→</span>
        <Link
          to={`/results/${encodeURIComponent(totem.founder.name)}`}
          className="hover:text-purple-400 transition-colors"
        >
          {totem.founder.name}
        </Link>
        <span>→</span>
        <span className="text-white">{totem.totem.label}</span>
      </div>

      {/* Totem Header */}
      <div className="glass-card p-8 relative">
        {/* Winner Badge */}
        {totem.isWinner && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            🏆 Totem Gagnant
          </div>
        )}

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Totem Image */}
          <div className="aspect-square rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 overflow-hidden">
            {totem.totem.image ? (
              <img
                src={totem.totem.image}
                alt={totem.totem.label}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-9xl">
                  {totem.totem.label.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Totem Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {totem.totem.label}
              </h1>
              <p className="text-lg text-white/60 mb-4">
                Totem proposé pour{' '}
                <Link
                  to={`/results/${encodeURIComponent(totem.founder.name)}`}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {totem.founder.name}
                </Link>
              </p>
            </div>

            {/* Summary Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 text-center">
                <div
                  className={`text-2xl font-bold ${
                    totem.netScore > 0n
                      ? 'text-green-400'
                      : totem.netScore < 0n
                        ? 'text-red-400'
                        : 'text-white/60'
                  }`}
                >
                  {totem.netScore >= 0n ? '+' : ''}
                  {formatTrustAmount(totem.netScore, 2)}
                </div>
                <div className="text-white/60 text-xs">NET Score</div>
              </div>

              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {formatTrustAmount(totem.totalFor, 2)}
                </div>
                <div className="text-white/60 text-xs">TRUST FOR</div>
              </div>

              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-red-400">
                  {formatTrustAmount(totem.totalAgainst, 2)}
                </div>
                <div className="text-white/60 text-xs">TRUST AGAINST</div>
              </div>

              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {totem.claimCount}
                </div>
                <div className="text-white/60 text-xs">
                  Claim{totem.claimCount > 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Win Rate Bar */}
            <div>
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Taux d'approbation</span>
                <span className="font-semibold">{totem.winRate.toFixed(1)}%</span>
              </div>
              <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400"
                  style={{ width: `${totem.winRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claims Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Détails des Claims
        </h2>
        <p className="text-white/60 mb-6">
          Chaque claim représente une proposition avec un prédicat différent
        </p>

        {/* Claims Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {totem.claims.map((claim, index) => (
            <ClaimCard key={claim.tripleId} claim={claim} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <Link
          to={`/results/${encodeURIComponent(totem.founder.name)}`}
          className="glass-button px-6 py-3"
        >
          ← Retour aux totems de {totem.founder.name}
        </Link>
      </div>

      {/* Status Notice */}
      <div className="glass-card p-4 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-white/60">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>Résultats en temps réel - Vote en cours</span>
        </div>
      </div>
    </div>
  );
}
