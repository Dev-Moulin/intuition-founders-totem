import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { intuitionTestnet } from '@0xintuition/protocol';
import {
  getMultiVaultAddressFromChainId,
  createAtomFromThing,
} from '@0xintuition/sdk';
import foundersData from '../packages/shared/src/data/founders.json';

// Types
interface FounderData {
  id: string;
  name: string;
  shortBio: string;
  fullBio?: string;
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
  image?: string;
}

/**
 * Get the best available image URL for a founder
 * Priority: manual image > Twitter avatar > GitHub avatar > DiceBear fallback
 */
function getFounderImageUrl(founder: FounderData): string {
  // 1. Manual image if provided
  if (founder.image) {
    return founder.image;
  }

  // 2. Twitter avatar via unavatar.io
  if (founder.twitter) {
    return `https://unavatar.io/twitter/${founder.twitter.replace('@', '')}`;
  }

  // 3. GitHub avatar (direct from GitHub)
  if (founder.github) {
    return `https://github.com/${founder.github}.png`;
  }

  // 4. DiceBear fallback - generates unique avatar based on name
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(founder.name)}`;
}

/**
 * Query existing atoms by labels to check which founders already have atoms
 */
async function getExistingAtoms(founderNames: string[]): Promise<Set<string>> {
  const query = `
    query GetAtomsByLabels($labels: [String!]!) {
      atoms(where: { label: { _in: $labels } }) {
        label
        term_id
      }
    }
  `;

  const response = await fetch('https://testnet.intuition.sh/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { labels: founderNames },
    }),
  });

  const result = await response.json();
  const existingLabels = new Set<string>();

  if (result.data?.atoms) {
    result.data.atoms.forEach((atom: { label: string }) => {
      existingLabels.add(atom.label);
    });
  }

  return existingLabels;
}

/**
 * Create a founder atom with full metadata
 */
async function createFounderAtom(
  walletClient: any,
  publicClient: any,
  multiVaultAddress: string,
  founder: FounderData
): Promise<{ termId: string; transactionHash: string }> {
  const config = {
    walletClient,
    publicClient,
    address: multiVaultAddress,
  };

  // Build URL from twitter or linkedin
  const url = founder.twitter
    ? `https://twitter.com/${founder.twitter.replace('@', '')}`
    : founder.linkedin || undefined;

  // Build image URL using cascade: manual > Twitter > GitHub > DiceBear
  const image = getFounderImageUrl(founder);

  console.log(`\n📝 Creating atom for: ${founder.name}`);
  console.log(`   - Description: ${founder.fullBio || founder.shortBio}`);
  console.log(`   - URL: ${url || 'None'}`);
  console.log(`   - Image: ${image}`);

  const result = await createAtomFromThing(
    config,
    {
      url,
      name: founder.name,
      description: founder.fullBio || founder.shortBio,
      image,
    },
    undefined // No deposit
  );

  return {
    termId: result.state.termId,
    transactionHash: result.transactionHash,
  };
}

/**
 * Main script
 */
async function main() {
  console.log('🚀 Starting Founders Atoms Creation Script\n');

  // Check for private key
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('❌ PRIVATE_KEY environment variable not set');
  }

  console.log('🔧 Setting up clients...');

  // Setup account
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  console.log(`   Admin wallet: ${account.address}`);

  // Setup clients
  const publicClient = createPublicClient({
    chain: intuitionTestnet,
    transport: http('https://testnet.rpc.intuition.systems/http'),
  });

  const walletClient = createWalletClient({
    account,
    chain: intuitionTestnet,
    transport: http('https://testnet.rpc.intuition.systems/http'),
  });

  // Get MultiVault address
  const multiVaultAddress = getMultiVaultAddressFromChainId(intuitionTestnet.id);
  console.log(`   MultiVault: ${multiVaultAddress}`);

  // Check balance
  const balance = await publicClient.getBalance({ address: account.address });
  console.log(`   Balance: ${(Number(balance) / 1e18).toFixed(4)} tTRUST\n`);

  // Load founders data
  const founders = foundersData as FounderData[];
  console.log(`📊 Total founders: ${founders.length}`);

  // Check which founders already have atoms
  console.log('🔍 Checking existing atoms...');
  const founderNames = founders.map((f) => f.name);
  const existingAtoms = await getExistingAtoms(founderNames);
  console.log(`   Found ${existingAtoms.size} existing atoms\n`);

  // Filter out founders that already have atoms
  const foundersToCreate = founders.filter((f) => !existingAtoms.has(f.name));
  console.log(`🎯 Founders to create: ${foundersToCreate.length}\n`);

  if (foundersToCreate.length === 0) {
    console.log('✅ All founders already have atoms!');
    return;
  }

  // Display list of founders to create
  console.log('📋 Founders that will be created:');
  foundersToCreate.forEach((f, i) => {
    console.log(`   ${i + 1}. ${f.name}`);
  });
  console.log('');

  // Create atoms one by one
  const results: Array<{
    name: string;
    success: boolean;
    termId?: string;
    txHash?: string;
    error?: string;
  }> = [];

  for (let i = 0; i < foundersToCreate.length; i++) {
    const founder = foundersToCreate[i];
    console.log(`\n[${i + 1}/${foundersToCreate.length}] Creating atom for: ${founder.name}`);

    try {
      const result = await createFounderAtom(
        walletClient,
        publicClient,
        multiVaultAddress,
        founder
      );

      results.push({
        name: founder.name,
        success: true,
        termId: result.termId,
        txHash: result.transactionHash,
      });

      console.log(`✅ Success!`);
      console.log(`   Term ID: ${result.termId}`);
      console.log(`   TX: https://testnet.explorer.intuition.systems/tx/${result.transactionHash}`);

      // Wait a bit between transactions to avoid rate limiting
      if (i < foundersToCreate.length - 1) {
        console.log('   ⏳ Waiting 2 seconds before next transaction...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      results.push({
        name: founder.name,
        success: false,
        error: errorMessage,
      });

      console.log(`❌ Failed: ${errorMessage}`);
    }
  }

  // Summary
  console.log('\n\n📊 SUMMARY');
  console.log('='.repeat(80));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`\n✅ Successfully created: ${successful.length}/${foundersToCreate.length}`);
  if (successful.length > 0) {
    successful.forEach((r) => {
      console.log(`   - ${r.name}`);
      console.log(`     TX: https://testnet.explorer.intuition.systems/tx/${r.txHash}`);
    });
  }

  if (failed.length > 0) {
    console.log(`\n❌ Failed: ${failed.length}/${foundersToCreate.length}`);
    failed.forEach((r) => {
      console.log(`   - ${r.name}: ${r.error}`);
    });
  }

  console.log('\n✨ Script completed!\n');
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
