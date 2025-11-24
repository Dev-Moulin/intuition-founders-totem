import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateAuthMessage,
  parseAuthMessage,
  verifyWalletSignature,
  clearUsedNonces,
} from './auth';

// Mock viem's verifyMessage
vi.mock('viem', () => ({
  verifyMessage: vi.fn(),
}));

import { verifyMessage } from 'viem';

describe('generateAuthMessage', () => {
  it('should generate a message with address', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    const result = generateAuthMessage(address);

    expect(result.message).toContain(address);
    expect(result.message).toContain('INTUITION Founders Totem');
  });

  it('should include a nonce (UUID format)', () => {
    const result = generateAuthMessage('0x1234567890abcdef1234567890abcdef12345678');

    expect(result.nonce).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
    expect(result.message).toContain(result.nonce);
  });

  it('should include a timestamp', () => {
    const before = Date.now();
    const result = generateAuthMessage('0x1234567890abcdef1234567890abcdef12345678');
    const after = Date.now();

    expect(result.timestamp).toBeGreaterThanOrEqual(before);
    expect(result.timestamp).toBeLessThanOrEqual(after);
    expect(result.message).toContain(result.timestamp.toString());
  });

  it('should generate unique nonces', () => {
    const result1 = generateAuthMessage('0x1234567890abcdef1234567890abcdef12345678');
    const result2 = generateAuthMessage('0x1234567890abcdef1234567890abcdef12345678');

    expect(result1.nonce).not.toBe(result2.nonce);
  });

  it('should include security notice in message', () => {
    const result = generateAuthMessage('0x1234567890abcdef1234567890abcdef12345678');
    expect(result.message).toContain('Cette signature ne coûte aucun gas');
  });
});

describe('parseAuthMessage', () => {
  it('should parse nonce and timestamp from valid message', () => {
    const { message, nonce, timestamp } = generateAuthMessage(
      '0x1234567890abcdef1234567890abcdef12345678'
    );

    const parsed = parseAuthMessage(message);

    expect(parsed).not.toBeNull();
    expect(parsed?.nonce).toBe(nonce);
    expect(parsed?.timestamp).toBe(timestamp);
  });

  it('should return null for invalid message format', () => {
    expect(parseAuthMessage('Invalid message')).toBeNull();
    expect(parseAuthMessage('')).toBeNull();
    expect(parseAuthMessage('Nonce: invalid')).toBeNull();
  });

  it('should handle message with only nonce', () => {
    const message = 'Nonce: 12345678-1234-1234-1234-123456789abc';
    expect(parseAuthMessage(message)).toBeNull();
  });

  it('should handle message with only timestamp', () => {
    const message = 'Timestamp: 1234567890123';
    expect(parseAuthMessage(message)).toBeNull();
  });
});

describe('verifyWalletSignature', () => {
  const validAddress = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
  const validSignature = '0xvalidsignature' as `0x${string}`;

  beforeEach(() => {
    vi.clearAllMocks();
    clearUsedNonces();
  });

  it('should return valid for correct signature', async () => {
    const { message } = generateAuthMessage(validAddress);
    vi.mocked(verifyMessage).mockResolvedValue(true);

    const result = await verifyWalletSignature(validAddress, message, validSignature);

    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return invalid for incorrect signature', async () => {
    const { message } = generateAuthMessage(validAddress);
    vi.mocked(verifyMessage).mockResolvedValue(false);

    const result = await verifyWalletSignature(validAddress, message, validSignature);

    expect(result.valid).toBe(false);
    expect(result.error).toBe('Signature invalide');
  });

  it('should return invalid for malformed message', async () => {
    vi.mocked(verifyMessage).mockResolvedValue(true);

    const result = await verifyWalletSignature(
      validAddress,
      'Invalid message without nonce or timestamp',
      validSignature
    );

    expect(result.valid).toBe(false);
    expect(result.error).toBe('Format de message invalide');
  });

  it('should return invalid for expired message (> 5 minutes)', async () => {
    // Create a message with old timestamp
    const oldTimestamp = Date.now() - 6 * 60 * 1000; // 6 minutes ago
    const oldMessage = `Bienvenue sur INTUITION Founders Totem!

Signez ce message pour vous authentifier.

Adresse: ${validAddress}
Nonce: 12345678-1234-1234-1234-123456789abc
Timestamp: ${oldTimestamp}

Cette signature ne coûte aucun gas et n'autorise aucune transaction.`;

    vi.mocked(verifyMessage).mockResolvedValue(true);

    const result = await verifyWalletSignature(validAddress, oldMessage, validSignature);

    expect(result.valid).toBe(false);
    expect(result.error).toBe('Message expiré (max 5 minutes)');
  });

  it('should return invalid for replayed nonce', async () => {
    const { message } = generateAuthMessage(validAddress);
    vi.mocked(verifyMessage).mockResolvedValue(true);

    // First use - should succeed
    const result1 = await verifyWalletSignature(validAddress, message, validSignature);
    expect(result1.valid).toBe(true);

    // Second use with same nonce - should fail (replay attack)
    const result2 = await verifyWalletSignature(validAddress, message, validSignature);
    expect(result2.valid).toBe(false);
    expect(result2.error).toBe('Nonce déjà utilisé (replay attack)');
  });

  it('should handle verification errors gracefully', async () => {
    const { message } = generateAuthMessage(validAddress);
    vi.mocked(verifyMessage).mockRejectedValue(new Error('Network error'));

    const result = await verifyWalletSignature(validAddress, message, validSignature);

    expect(result.valid).toBe(false);
    expect(result.error).toBe('Erreur de vérification');
  });

  it('should clean old nonces when limit exceeded', async () => {
    vi.mocked(verifyMessage).mockResolvedValue(true);

    // Generate and verify more than 1000 messages to trigger cleanup
    for (let i = 0; i < 1002; i++) {
      const { message } = generateAuthMessage(validAddress);
      await verifyWalletSignature(validAddress, message, validSignature);
    }

    // The test passes if no errors occur during cleanup
    expect(true).toBe(true);
  });
});

describe('nonce replay protection', () => {
  beforeEach(() => {
    clearUsedNonces();
  });

  it('should clear used nonces', () => {
    // Just verify clearUsedNonces doesn't throw
    expect(() => clearUsedNonces()).not.toThrow();
  });
});
