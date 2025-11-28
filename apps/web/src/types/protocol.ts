/**
 * Protocol configuration types
 */

/**
 * Configuration du protocole INTUITION
 */
export interface ProtocolConfig {
  // Coûts de base (wei)
  atomCost: string;
  tripleCost: string;
  minDeposit: string;

  // Coûts formatés (TRUST)
  formattedAtomCost: string;
  formattedTripleCost: string;
  formattedMinDeposit: string;

  // Frais (basis points, ex: 700 = 7%)
  entryFee: string;
  exitFee: string;
  protocolFee: string;
  feeDenominator: string;

  // Frais formatés (pourcentage)
  formattedEntryFee: string;
  formattedExitFee: string;
  formattedProtocolFee: string;
}
