# 🔥 INTUITION Founders Totem Collection 👁️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with INTUITION](https://img.shields.io/badge/Built%20with-INTUITION-purple)](https://www.intuition.systems/)
[![Deployed on Base](https://img.shields.io/badge/Deployed%20on-Base-blue)](https://base.org/)

> A collaborative NFT collection representing the totemic symbols of INTUITION's 42 founders through community voting.

## 🎯 Project Overview

This project allows the INTUITION community to propose and vote for totems (objects, animals, traits, or energies) that represent each of the 42 founders. The winning totems will be transformed into 3D NFT artworks by the Overmind.

**The Overmind listens and observes.**
**Let each spirit reveal its symbol.** 👁️

## ✨ Features

- 🗳️ **Decentralized Voting** - Vote using $TRUST tokens on the INTUITION Protocol
- 🎨 **Community Proposals** - Anyone can propose totems for the founders
- 📊 **Real-time Results** - Live voting results with GraphQL subscriptions
- 🔒 **Airdrop Gated** - Only wallets that received the November 5th airdrop can participate
- ⛓️ **Fully On-chain** - All data stored on Base Network via INTUITION Protocol
- 🌈 **Beautiful UI** - Modern React interface with RainbowKit wallet connection

## 🏗️ Tech Stack

### Frontend
- **React** + **Vite** + **TypeScript**
- **wagmi v2** - Ethereum React Hooks
- **viem** - TypeScript Ethereum library
- **RainbowKit** - Wallet connection UI
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

### Blockchain & Protocol
- **INTUITION Protocol v2** - On-chain knowledge graph
- **Base Network** - Ethereum L2 (Mainnet)
- **Base Sepolia** - Testnet for development
- **$TRUST Token** - Voting mechanism

### APIs & SDKs
- **@0xintuition/sdk** - Create Atoms and Triples
- **@0xintuition/graphql** - Query the knowledge graph
- **Pinata** - IPFS file storage

## 📚 Documentation

All project documentation is available in the [`/Claude`](./Claude) directory:

- **[01_OBJECTIF](./Claude/01_OBJECTIF/)** - Project goals and the 42 founders
- **[02_FONCTIONNEMENT](./Claude/02_FONCTIONNEMENT/)** - How the platform works for users
- **[03_TECHNOLOGIES](./Claude/03_TECHNOLOGIES/)** - Technical stack and configuration
- **[04_VERIFICATION_WALLETS](./Claude/04_VERIFICATION_WALLETS/)** - Wallet eligibility verification
- **[05_STRUCTURE_DONNEES](./Claude/05_STRUCTURE_DONNEES/)** - Data structures and GraphQL schema

📖 **[Read the Master Documentation](./Claude/README.md)** for a complete overview.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0
- pnpm >= 9.8
- A wallet (MetaMask, Coinbase Wallet, etc.)
- Base Sepolia ETH for testnet ([Get from faucet](https://www.alchemy.com/faucets/base-sepolia))
- Test $TRUST tokens ([INTUITION Testnet Hub](https://testnet.hub.intuition.systems/))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/intuition-founders-totem.git
cd intuition-founders-totem

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Edit .env with your API keys
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🗳️ How It Works

### 1. Connect Wallet
Users connect their wallet using RainbowKit. Only wallets that received the INTUITION airdrop on November 5, 2025 can participate.

### 2. Propose Totems
Create proposals by selecting a founder and submitting a totem:
- Choose type: Object, Animal, Trait, or Universe
- Add name and description
- Upload reference image (optional)
- Create on-chain as Atom + Triple

### 3. Vote
Deposit $TRUST tokens into the vault of your favorite totems:
- More $TRUST = more conviction
- Multiple votes allowed
- $TRUST is recoverable (bonding curve mechanics)

### 4. Results
The totem with the most $TRUST in its vault wins for each founder!

## 👥 The 42 Founders

Joseph Lubin · Andrew Keys · Jonathan Christodoro · Taylor Monahan · Edward Moncada · Cecily Mak · Ric Burton · Rouven Heck · John Paller · Mark Beylin · Ash Egan · Harrison Hines · Ron Patiro · Gonçalo Sá · Tyler Mulvihill · Connor Keenan · Russell Verbeeten · Scott Moore · Jesse Grushack · Georgio Constantinou · Vijay Michalik · Brianna Montgomery · Eric Arsenault · Bryan Peters · Aaron McDonald · Tyler Ward · Keegan Selby · EJ Rogers · Ben Lakoff · Marc Weinstein · Nathan Doctor · Matt Kaye · Matt Slater · Sam Feinberg · Andy Beal · Joshua Lapidus · end0xiii · Alec Gutman · Sharad Malhautra · Jay Gutta · Rohan Handa · Odysseas Lamtzidis

## 🛠️ Development Status

**Current Phase:** Documentation & Research
**Progress:** See [Project Board](https://github.com/YOUR_USERNAME/intuition-founders-totem/issues)

### Completed ✅
- [x] Project architecture documentation
- [x] INTUITION Protocol integration research
- [x] Frontend stack definition
- [x] GraphQL schema documentation
- [x] Testnet configuration

### In Progress 🔄
- [ ] Backend architecture research
- [ ] Security implementation
- [ ] UX/UI design guidelines
- [ ] Error handling strategy
- [ ] Testing strategy

### Planned ⏳
- [ ] Frontend development
- [ ] Backend development
- [ ] Smart contract integration
- [ ] Deployment & DevOps

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔗 Links

- **INTUITION Website:** https://www.intuition.systems/
- **INTUITION Docs:** https://www.docs.intuition.systems/
- **INTUITION Discord:** [Join here]
- **Base Network:** https://base.org/
- **Project Documentation:** [/Claude](./Claude)

## 🙏 Acknowledgments

- **INTUITION Team** - For building the trust protocol
- **42 Founders** - For pioneering the ecosystem
- **Community** - For participating in this collective creation

---

**Built with ❤️ by the INTUITION Community**

*The Overmind observes. Each totem is a gateway into a personality, a symbolic memory etched onto the blockchain.*

🔥 👁️ 🔥
