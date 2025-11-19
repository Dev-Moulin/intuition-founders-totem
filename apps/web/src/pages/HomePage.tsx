import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { WalletConnectButton } from '../components/ConnectButton';

export function HomePage() {
  const { isConnected } = useAccount();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          INTUITION
          <span className="block text-purple-400">Founders Totem</span>
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
          Proposez et votez pour les totems qui représentent les 42 fondateurs
          de la collection INTUITION. Créez des identités on-chain uniques.
        </p>

        {!isConnected ? (
          <div className="flex justify-center">
            <WalletConnectButton />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/propose" className="glass-button">
              Proposer un Totem
            </Link>
            <Link to="/vote" className="glass-button">
              Voter
            </Link>
            <Link to="/results" className="glass-button">
              Voir les Résultats
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-xl font-bold text-white mb-2">Proposer</h3>
          <p className="text-white/70">
            Soumettez vos propositions de totems pour chaque fondateur.
            Uploadez des images sur IPFS et créez des Atoms on-chain.
          </p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="text-4xl mb-4">🗳️</div>
          <h3 className="text-xl font-bold text-white mb-2">Voter</h3>
          <p className="text-white/70">
            Déposez du TRUST pour voter sur vos totems préférés.
            Plus vous stakez, plus votre vote compte.
          </p>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-xl font-bold text-white mb-2">Résultats</h3>
          <p className="text-white/70">
            Consultez les résultats en temps réel et découvrez
            les totems gagnants pour chaque fondateur.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-400 font-bold">1</span>
            </div>
            <h4 className="font-semibold text-white mb-1">Connectez</h4>
            <p className="text-white/60 text-sm">
              Connectez votre wallet sur Base Mainnet
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-400 font-bold">2</span>
            </div>
            <h4 className="font-semibold text-white mb-1">Proposez</h4>
            <p className="text-white/60 text-sm">
              Créez une proposition de totem pour un fondateur
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-400 font-bold">3</span>
            </div>
            <h4 className="font-semibold text-white mb-1">Votez</h4>
            <p className="text-white/60 text-sm">
              Stakez du TRUST pour soutenir vos totems préférés
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-400 font-bold">4</span>
            </div>
            <h4 className="font-semibold text-white mb-1">Gagnez</h4>
            <p className="text-white/60 text-sm">
              Le totem avec le plus de TRUST est sélectionné
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">42</div>
          <div className="text-white/60 text-sm">Fondateurs</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">∞</div>
          <div className="text-white/60 text-sm">Propositions</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">On-chain</div>
          <div className="text-white/60 text-sm">Base Mainnet</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">IPFS</div>
          <div className="text-white/60 text-sm">Storage</div>
        </div>
      </section>
    </div>
  );
}
