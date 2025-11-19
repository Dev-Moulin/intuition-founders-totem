import { WalletConnectButton } from './ConnectButton';

export function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-white">
          INTUITION Founders Totem
        </h1>
      </div>
      <WalletConnectButton />
    </header>
  );
}
