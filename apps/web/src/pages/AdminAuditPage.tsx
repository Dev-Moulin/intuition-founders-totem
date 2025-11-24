import { useQuery } from '@apollo/client';
import { GET_ATOMS_BY_LABELS, GET_ALL_PREDICATES } from '../lib/graphql/queries';
import foundersData from '../../../../packages/shared/src/data/founders.json';

interface Atom {
  term_id: string;
  label: string;
  image?: string;
  emoji?: string;
  type?: string;
}

interface FounderData {
  id: string;
  name: string;
  shortBio: string;
  twitter: string | null;
}

export function AdminAuditPage() {
  const founders = foundersData as FounderData[];
  const founderNames = founders.map((f) => f.name);

  // Query atoms matching founder names
  const {
    data: atomsData,
    loading: atomsLoading,
    error: atomsError,
  } = useQuery<{ atoms: Atom[] }>(GET_ATOMS_BY_LABELS, {
    variables: { labels: founderNames },
  });

  // Query all predicates
  const {
    data: predicatesData,
    loading: predicatesLoading,
  } = useQuery<{ atoms: Atom[] }>(GET_ALL_PREDICATES);

  const foundAtoms = atomsData?.atoms || [];
  const predicates = predicatesData?.atoms || [];

  // Map found atoms by label for quick lookup
  const atomsByLabel = new Map<string, Atom>();
  foundAtoms.forEach((atom) => {
    atomsByLabel.set(atom.label, atom);
  });

  // Count stats
  const foundCount = foundAtoms.length;
  const missingCount = founders.length - foundCount;

  if (atomsLoading || predicatesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-white/70">Chargement des données INTUITION...</div>
      </div>
    );
  }

  if (atomsError) {
    return (
      <div className="p-6 bg-red-500/20 border border-red-500/50 rounded-lg">
        <h2 className="text-red-400 font-bold mb-2">Erreur</h2>
        <p className="text-red-300">{atomsError.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Audit des Données INTUITION
        </h1>
        <p className="text-white/70">
          Vérification des 42 fondateurs et prédicats sur la blockchain INTUITION
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
          <div className="text-3xl font-bold text-white">{founders.length}</div>
          <div className="text-white/50 text-sm">Fondateurs Total</div>
        </div>
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-400">{foundCount}</div>
          <div className="text-green-400/70 text-sm">Atoms Trouvés</div>
        </div>
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
          <div className="text-3xl font-bold text-red-400">{missingCount}</div>
          <div className="text-red-400/70 text-sm">Atoms Manquants</div>
        </div>
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
          <div className="text-3xl font-bold text-purple-400">{predicates.length}</div>
          <div className="text-purple-400/70 text-sm">Prédicats</div>
        </div>
      </div>

      {/* Predicates Section */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">
          Prédicats Disponibles ({predicates.length})
        </h2>
        {predicates.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {predicates.map((pred) => (
              <span
                key={pred.term_id}
                className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm"
              >
                {pred.label}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-white/50">Aucun prédicat trouvé sur INTUITION</p>
        )}
      </div>

      {/* Founders Table */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">
          Statut des 42 Fondateurs
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-white/70 font-medium">#</th>
                <th className="py-3 px-4 text-white/70 font-medium">Nom</th>
                <th className="py-3 px-4 text-white/70 font-medium">Statut</th>
                <th className="py-3 px-4 text-white/70 font-medium">Atom ID</th>
                <th className="py-3 px-4 text-white/70 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {founders.map((founder, index) => {
                const atom = atomsByLabel.get(founder.name);
                const hasAtom = !!atom;

                return (
                  <tr
                    key={founder.id}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="py-3 px-4 text-white/50">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div className="text-white font-medium">{founder.name}</div>
                      <div className="text-white/50 text-sm">{founder.shortBio}</div>
                    </td>
                    <td className="py-3 px-4">
                      {hasAtom ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded">
                          ✓ Trouvé
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm rounded">
                          ✗ Manquant
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-white/70 font-mono text-sm">
                      {atom?.term_id ? (
                        <span title={atom.term_id}>
                          {atom.term_id.slice(0, 10)}...
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 px-4 text-white/50 text-sm">
                      {atom?.type || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Missing Founders List */}
      {missingCount > 0 && (
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
          <h2 className="text-xl font-bold text-red-400 mb-4">
            Fondateurs sans Atom ({missingCount})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {founders
              .filter((f) => !atomsByLabel.has(f.name))
              .map((founder) => (
                <div
                  key={founder.id}
                  className="p-3 bg-white/5 rounded text-white"
                >
                  <div className="font-medium">{founder.name}</div>
                  {founder.twitter && (
                    <div className="text-white/50 text-sm">{founder.twitter}</div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
