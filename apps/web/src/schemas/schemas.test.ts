import { describe, it, expect } from 'vitest';
import { VoteFormSchema, WithdrawFormSchema, MIN_TRUST_AMOUNT } from './vote.schema';
import { TotemProposalSchema, TotemTypeSchema, ImageFileSchema } from './proposal.schema';
import { ModerationActionSchema, ModerationDecisionSchema, ContentReportSchema } from './moderation.schema';

describe('Vote Schemas', () => {
  describe('VoteFormSchema', () => {
    it('should validate correct vote data', () => {
      const validData = {
        claimId: '0x1234567890abcdef',
        amount: '10',
        isFor: true,
      };

      const result = VoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid claim ID', () => {
      const invalidData = {
        claimId: 'invalid-id',
        amount: '10',
        isFor: true,
      };

      const result = VoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject amount below minimum', () => {
      const invalidData = {
        claimId: '0x1234567890abcdef',
        amount: '0.5',
        isFor: true,
      };

      const result = VoteFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept minimum trust amount', () => {
      const validData = {
        claimId: '0x1234567890abcdef',
        amount: String(MIN_TRUST_AMOUNT),
        isFor: false,
      };

      const result = VoteFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('WithdrawFormSchema', () => {
    it('should validate correct withdraw data', () => {
      const validData = {
        termId: '0xabcdef1234567890',
        shares: '100',
        isPositive: true,
      };

      const result = WithdrawFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject zero shares', () => {
      const invalidData = {
        termId: '0xabcdef1234567890',
        shares: '0',
        isPositive: true,
      };

      const result = WithdrawFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

describe('Proposal Schemas', () => {
  describe('TotemTypeSchema', () => {
    it('should accept valid totem types', () => {
      expect(TotemTypeSchema.safeParse('Object').success).toBe(true);
      expect(TotemTypeSchema.safeParse('Animal').success).toBe(true);
      expect(TotemTypeSchema.safeParse('Trait').success).toBe(true);
      expect(TotemTypeSchema.safeParse('Universe').success).toBe(true);
    });

    it('should reject invalid totem type', () => {
      expect(TotemTypeSchema.safeParse('InvalidType').success).toBe(false);
    });
  });

  describe('TotemProposalSchema', () => {
    it('should validate correct proposal', () => {
      const validData = {
        founderId: 'founder-1',
        totemName: 'Golden Phoenix',
        predicate: 'is represented by',
        trustAmount: '0.01',
      };

      const result = TotemProposalSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept optional description', () => {
      const validData = {
        founderId: 'founder-1',
        totemName: 'Phoenix',
        predicate: 'embodies',
        description: 'A symbol of rebirth and innovation',
        trustAmount: '0.01',
      };

      const result = TotemProposalSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject totem name too short', () => {
      const invalidData = {
        founderId: 'founder-1',
        totemName: 'A',
        predicate: 'is',
        trustAmount: '0.01',
      };

      const result = TotemProposalSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject totem name too long', () => {
      const invalidData = {
        founderId: 'founder-1',
        totemName: 'A'.repeat(51),
        predicate: 'is represented by',
        trustAmount: '0.01',
      };

      const result = TotemProposalSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid trust amount', () => {
      const invalidData = {
        founderId: 'founder-1',
        totemName: 'Phoenix',
        predicate: 'embodies',
        trustAmount: '0',
      };

      const result = TotemProposalSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept accented characters in totem name', () => {
      const validData = {
        founderId: 'founder-1',
        totemName: 'Phénix doré',
        predicate: 'est représenté par',
        trustAmount: '0.01',
      };

      const result = TotemProposalSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});

describe('Moderation Schemas', () => {
  describe('ModerationActionSchema', () => {
    it('should accept valid actions', () => {
      expect(ModerationActionSchema.safeParse('APPROVE').success).toBe(true);
      expect(ModerationActionSchema.safeParse('REJECT').success).toBe(true);
      expect(ModerationActionSchema.safeParse('FLAG').success).toBe(true);
      expect(ModerationActionSchema.safeParse('REVIEW').success).toBe(true);
    });

    it('should reject invalid action', () => {
      expect(ModerationActionSchema.safeParse('DELETE').success).toBe(false);
    });
  });

  describe('ModerationDecisionSchema', () => {
    it('should validate correct decision', () => {
      const validData = {
        proposalId: '0x1234567890abcdef',
        action: 'APPROVE',
        moderatorAddress: '0x1234567890abcdef1234567890abcdef12345678',
      };

      const result = ModerationDecisionSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept optional reason and comment', () => {
      const validData = {
        proposalId: '0x1234567890abcdef',
        action: 'REJECT',
        reason: 'SPAM',
        comment: 'This is spam content',
        moderatorAddress: '0x1234567890abcdef1234567890abcdef12345678',
      };

      const result = ModerationDecisionSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid moderator address', () => {
      const invalidData = {
        proposalId: '0x1234567890abcdef',
        action: 'APPROVE',
        moderatorAddress: 'invalid-address',
      };

      const result = ModerationDecisionSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject comment too long', () => {
      const invalidData = {
        proposalId: '0x1234567890abcdef',
        action: 'REJECT',
        comment: 'A'.repeat(501),
        moderatorAddress: '0x1234567890abcdef1234567890abcdef12345678',
      };

      const result = ModerationDecisionSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('ContentReportSchema', () => {
    it('should validate correct report', () => {
      const validData = {
        contentId: '0xabcdef1234567890',
        contentType: 'PROPOSAL',
        reason: 'SPAM',
        description: 'This is a spam proposal that should be removed',
        reporterAddress: '0x1234567890abcdef1234567890abcdef12345678',
      };

      const result = ContentReportSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject description too short', () => {
      const invalidData = {
        contentId: '0xabcdef1234567890',
        contentType: 'PROPOSAL',
        reason: 'SPAM',
        description: 'Short',
        reporterAddress: '0x1234567890abcdef1234567890abcdef12345678',
      };

      const result = ContentReportSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept all content types', () => {
      const baseData = {
        contentId: '0xabcdef1234567890',
        reason: 'OFF_TOPIC',
        description: 'This content is off topic and irrelevant',
        reporterAddress: '0x1234567890abcdef1234567890abcdef12345678',
      };

      expect(ContentReportSchema.safeParse({ ...baseData, contentType: 'PROPOSAL' }).success).toBe(true);
      expect(ContentReportSchema.safeParse({ ...baseData, contentType: 'TOTEM' }).success).toBe(true);
      expect(ContentReportSchema.safeParse({ ...baseData, contentType: 'COMMENT' }).success).toBe(true);
    });
  });
});
