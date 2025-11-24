import { describe, it, expect } from 'vitest';
import {
  TotemTypeSchema,
  TotemProposalSchema,
  ImageFileSchema,
} from './proposal.schema';

describe('TotemTypeSchema', () => {
  it('should accept valid totem types', () => {
    expect(TotemTypeSchema.safeParse('Object').success).toBe(true);
    expect(TotemTypeSchema.safeParse('Animal').success).toBe(true);
    expect(TotemTypeSchema.safeParse('Trait').success).toBe(true);
    expect(TotemTypeSchema.safeParse('Universe').success).toBe(true);
  });

  it('should reject invalid totem types', () => {
    expect(TotemTypeSchema.safeParse('Invalid').success).toBe(false);
    expect(TotemTypeSchema.safeParse('').success).toBe(false);
    expect(TotemTypeSchema.safeParse(123).success).toBe(false);
  });
});

describe('TotemProposalSchema', () => {
  const validProposal = {
    founderId: 'founder-123',
    totemName: 'Phoenix',
    predicate: 'is a visionary',
    trustAmount: '10',
  };

  describe('founderId', () => {
    it('should accept valid founderId', () => {
      const result = TotemProposalSchema.safeParse(validProposal);
      expect(result.success).toBe(true);
    });

    it('should reject empty founderId', () => {
      const result = TotemProposalSchema.safeParse({
        ...validProposal,
        founderId: '',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Fondateur requis');
      }
    });
  });

  describe('totemName', () => {
    it('should accept valid totem names', () => {
      expect(
        TotemProposalSchema.safeParse({
          ...validProposal,
          totemName: 'Phoenix',
        }).success
      ).toBe(true);

      expect(
        TotemProposalSchema.safeParse({
          ...validProposal,
          totemName: "L'oiseau de feu",
        }).success
      ).toBe(true);

      expect(
        TotemProposalSchema.safeParse({
          ...validProposal,
          totemName: 'Totem-2024',
        }).success
      ).toBe(true);
    });

    it('should reject too short names', () => {
      const result = TotemProposalSchema.safeParse({
        ...validProposal,
        totemName: 'A',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Minimum 2 caractères');
      }
    });

    it('should reject too long names', () => {
      const result = TotemProposalSchema.safeParse({
        ...validProposal,
        totemName: 'A'.repeat(51),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Maximum 50 caractères');
      }
    });

    it('should reject invalid characters', () => {
      const result = TotemProposalSchema.safeParse({
        ...validProposal,
        totemName: 'Invalid@Name!',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Caractères alphanumériques uniquement'
        );
      }
    });
  });

  describe('predicate', () => {
    it('should accept valid predicates', () => {
      expect(
        TotemProposalSchema.safeParse({
          ...validProposal,
          predicate: 'is a visionary',
        }).success
      ).toBe(true);
    });

    it('should reject too short predicates', () => {
      const result = TotemProposalSchema.safeParse({
        ...validProposal,
        predicate: 'A',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Minimum 2 caractères');
      }
    });

    it('should reject too long predicates', () => {
      const result = TotemProposalSchema.safeParse({
        ...validProposal,
        predicate: 'A'.repeat(51),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Maximum 50 caractères');
      }
    });
  });

  describe('description', () => {
    it('should accept optional description', () => {
      expect(
        TotemProposalSchema.safeParse({
          ...validProposal,
          description: undefined,
        }).success
      ).toBe(true);
    });

    it('should accept valid description', () => {
      expect(
        TotemProposalSchema.safeParse({
          ...validProposal,
          description: 'This is a valid description with enough characters.',
        }).success
      ).toBe(true);
    });

    it('should reject too short descriptions', () => {
      const result = TotemProposalSchema.safeParse({
        ...validProposal,
        description: 'Short',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Minimum 10 caractères');
      }
    });

    it('should reject too long descriptions', () => {
      const result = TotemProposalSchema.safeParse({
        ...validProposal,
        description: 'A'.repeat(501),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Maximum 500 caractères');
      }
    });
  });

  describe('trustAmount', () => {
    it('should accept valid amounts', () => {
      expect(
        TotemProposalSchema.safeParse({
          ...validProposal,
          trustAmount: '10',
        }).success
      ).toBe(true);

      expect(
        TotemProposalSchema.safeParse({
          ...validProposal,
          trustAmount: '0.001',
        }).success
      ).toBe(true);
    });

    it('should reject zero amount', () => {
      const result = TotemProposalSchema.safeParse({
        ...validProposal,
        trustAmount: '0',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Montant doit être supérieur à 0'
        );
      }
    });

    it('should reject negative amounts', () => {
      const result = TotemProposalSchema.safeParse({
        ...validProposal,
        trustAmount: '-10',
      });
      expect(result.success).toBe(false);
    });

    it('should reject non-numeric strings', () => {
      const result = TotemProposalSchema.safeParse({
        ...validProposal,
        trustAmount: 'abc',
      });
      expect(result.success).toBe(false);
    });
  });
});

describe('ImageFileSchema', () => {
  // Helper to create a mock File
  const createMockFile = (
    name: string,
    size: number,
    type: string
  ): File => {
    const blob = new Blob(['x'.repeat(size)], { type });
    return new File([blob], name, { type });
  };

  it('should accept undefined (optional)', () => {
    const result = ImageFileSchema.safeParse(undefined);
    expect(result.success).toBe(true);
  });

  it('should accept valid JPEG files', () => {
    const file = createMockFile('image.jpg', 1024, 'image/jpeg');
    const result = ImageFileSchema.safeParse(file);
    expect(result.success).toBe(true);
  });

  it('should accept valid PNG files', () => {
    const file = createMockFile('image.png', 1024, 'image/png');
    const result = ImageFileSchema.safeParse(file);
    expect(result.success).toBe(true);
  });

  it('should accept valid WebP files', () => {
    const file = createMockFile('image.webp', 1024, 'image/webp');
    const result = ImageFileSchema.safeParse(file);
    expect(result.success).toBe(true);
  });

  it('should accept valid GIF files', () => {
    const file = createMockFile('image.gif', 1024, 'image/gif');
    const result = ImageFileSchema.safeParse(file);
    expect(result.success).toBe(true);
  });

  it('should reject files that are too large (>5MB)', () => {
    const file = createMockFile('large.jpg', 6 * 1024 * 1024, 'image/jpeg');
    const result = ImageFileSchema.safeParse(file);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Image trop volumineuse (max 5MB)'
      );
    }
  });

  it('should accept files at exactly 5MB', () => {
    const file = createMockFile('exact.jpg', 5 * 1024 * 1024, 'image/jpeg');
    const result = ImageFileSchema.safeParse(file);
    expect(result.success).toBe(true);
  });

  it('should reject unsupported file types', () => {
    const file = createMockFile('doc.pdf', 1024, 'application/pdf');
    const result = ImageFileSchema.safeParse(file);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Format accepté: JPG, PNG, WebP ou GIF'
      );
    }
  });

  it('should reject SVG files', () => {
    const file = createMockFile('image.svg', 1024, 'image/svg+xml');
    const result = ImageFileSchema.safeParse(file);
    expect(result.success).toBe(false);
  });

  it('should reject text files', () => {
    const file = createMockFile('file.txt', 1024, 'text/plain');
    const result = ImageFileSchema.safeParse(file);
    expect(result.success).toBe(false);
  });

  it('should reject non-File values', () => {
    expect(ImageFileSchema.safeParse('not a file').success).toBe(false);
    expect(ImageFileSchema.safeParse(123).success).toBe(false);
    expect(ImageFileSchema.safeParse({}).success).toBe(false);
  });
});
