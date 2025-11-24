import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useAccount } from 'wagmi';
import { GET_ATOMS_BY_LABELS, GET_ALL_PREDICATES } from '../lib/graphql/queries';
import { useIntuition, getFounderImageUrl } from '../hooks/useIntuition';
import foundersData from '../../../../packages/shared/src/data/founders.json';

const ADMIN_WALLET = '0xefc86f5fabe767daac9358d0ba2dfd9ac7d29948';

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
  fullBio?: string;
  twitter: string | null;
  linkedin?: string | null;
  github?: string | null;
}

/**
 * Get the image source type for display
 */
function getImageSource(founder: FounderData): string {
  if (founder.twitter) return 'Twitter';
  if (founder.github) return 'GitHub';
  return 'DiceBear (généré)';
}

export function AdminAuditPage() {
  const founders = foundersData as FounderData[];
  const founderNames = founders.map((f) => f.name);

  const { address } = useAccount();
  const { createFounderAtom, isReady } = useIntuition();

  const isAdmin = address?.toLowerCase() === ADMIN_WALLET.toLowerCase();

  const [creatingAtom, setCreatingAtom] = useState<string | null>(null);
  const [createdAtoms, setCreatedAtoms] = useState<Map<string, { termId: string; txHash: string }>>(new Map());
  const [createError, setCreateError] = useState<string | null>(null);

  const handleCreateAtom = async (founder: FounderData) => {
    if (!isReady || !isAdmin) return;

    setCreatingAtom(founder.name);
    setCreateError(null);

    try {
      // Utilise createFounderAtom avec toutes les métadonnées
      const result = await createFounderAtom({
        name: founder.name,
        shortBio: founder.shortBio,
        fullBio: founder.fullBio,
        twitter: founder.twitter,
        linkedin: founder.linkedin,
        github: founder.github,
      });
      setCreatedAtoms((prev) => {
        const newMap = new Map(prev);
        newMap.set(founder.name, { termId: result.termId, txHash: result.transactionHash });
        return newMap;
      });
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Erreur lors de la création');
    } finally {
      setCreatingAtom(null);
    }
  };

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

      {/* Error Message */}
      {createError && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-400">{createError}</p>
        </div>
      )}

      {/* Recently Created Atoms */}
      {createdAtoms.size > 0 && (
        <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
          <h2 className="text-xl font-bold text-green-400 mb-4">
            Atoms créés cette session ({createdAtoms.size})
          </h2>
          <div className="space-y-2">
            {Array.from(createdAtoms.entries()).map(([name, data]) => (
              <div key={name} className="p-3 bg-white/5 rounded flex justify-between items-center">
                <span className="text-white font-medium">{name}</span>
                <a
                  href={`https://testnet.explorer.intuition.systems/tx/${data.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  Voir TX
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Founders List */}
      {missingCount > 0 && (
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
          <h2 className="text-xl font-bold text-red-400 mb-4">
            Fondateurs sans Atom ({missingCount})
          </h2>
          <div className="space-y-4">
            {founders
              .filter((f) => !atomsByLabel.has(f.name) && !createdAtoms.has(f.name))
              .map((founder) => {
                // Calcul de l'URL qui sera utilisée
                const atomUrl = founder.twitter
                  ? `https://twitter.com/${founder.twitter.replace('@', '')}`
                  : founder.linkedin || null;

                // Calcul de l'image avec cascade: Twitter > GitHub > DiceBear
                const atomImage = getFounderImageUrl(founder);
                const imageSource = getImageSource(founder);

                return (
                  <div
                    key={founder.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    {/* Header avec image, nom et bouton */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={atomImage}
                          alt={founder.name}
                          className="w-12 h-12 rounded-full object-cover bg-white/10"
                          onError={(e) => {
                            // Fallback to DiceBear if image fails
                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(founder.name)}`;
                          }}
                        />
                        <div>
                          <div className="font-bold text-white text-lg">{founder.name}</div>
                          <div className="text-xs text-white/40">Image: {imageSource}</div>
                        </div>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={() => handleCreateAtom(founder)}
                          disabled={creatingAtom !== null}
                          className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {creatingAtom === founder.name ? 'Création...' : 'Créer Atom'}
                        </button>
                      )}
                    </div>

                    {/* Métadonnées qui seront envoyées */}
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-[100px_1fr] gap-2">
                        <span className="text-white/50">Name:</span>
                        <span className="text-white">{founder.name}</span>
                      </div>

                      <div className="grid grid-cols-[100px_1fr] gap-2">
                        <span className="text-white/50">Description:</span>
                        <span className="text-white/80 text-xs">
                          {founder.fullBio || founder.shortBio}
                        </span>
                      </div>

                      <div className="grid grid-cols-[100px_1fr] gap-2">
                        <span className="text-white/50">URL:</span>
                        {atomUrl ? (
                          <a
                            href={atomUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 truncate"
                          >
                            {atomUrl}
                          </a>
                        ) : (
                          <span className="text-white/30 italic">Aucune URL</span>
                        )}
                      </div>

                      <div className="grid grid-cols-[100px_1fr] gap-2">
                        <span className="text-white/50">Twitter:</span>
                        <span className="text-white/70">{founder.twitter || '-'}</span>
                      </div>

                      <div className="grid grid-cols-[100px_1fr] gap-2">
                        <span className="text-white/50">LinkedIn:</span>
                        {founder.linkedin ? (
                          <a
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 truncate"
                          >
                            {founder.linkedin}
                          </a>
                        ) : (
                          <span className="text-white/30">-</span>
                        )}
                      </div>

                      <div className="grid grid-cols-[100px_1fr] gap-2">
                        <span className="text-white/50">GitHub:</span>
                        {founder.github ? (
                          <a
                            href={`https://github.com/${founder.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-300 truncate"
                          >
                            {founder.github}
                          </a>
                        ) : (
                          <span className="text-white/30">-</span>
                        )}
                      </div>

                      <div className="grid grid-cols-[100px_1fr] gap-2">
                        <span className="text-white/50">Image:</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            imageSource === 'Twitter' ? 'bg-blue-500/20 text-blue-400' :
                            imageSource === 'GitHub' ? 'bg-gray-500/20 text-gray-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {imageSource}
                          </span>
                          <a
                            href={atomImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-300 truncate text-xs"
                          >
                            {atomImage.length > 50 ? atomImage.slice(0, 50) + '...' : atomImage}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
