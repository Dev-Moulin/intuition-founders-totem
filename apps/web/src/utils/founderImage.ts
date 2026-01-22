/**
 * Utility function to get founder image URL
 * Extracted from FounderCard.tsx for reuse across the app
 */

// Set of founder IDs that have local WebP avatars in /avatars/
const LOCAL_AVATARS = new Set([
  'aaron-mcdonald', 'alec-gutman', 'andrew-keys', 'andy-beal', 'ash-egan',
  'ben-lakoff', 'brianna-montgomery', 'bryan-peters', 'cecily-mak', 'connor-keenan',
  'edward-moncada', 'ej-rogers', 'end0xiii', 'eric-arsenault', 'georgio-constantinou',
  'goncalo-sa', 'harrison-hines', 'jay-gutta', 'jesse-grushack', 'john-paller',
  'jonathan-christodoro', 'joseph-lubin', 'joshua-lapidus', 'keegan-selby',
  'marc-weinstein', 'mark-beylin', 'matt-kaye', 'matt-slater', 'nathan-doctor',
  'odysseas-lamtzidis', 'ric-burton', 'rohan-handa', 'ron-patiro', 'rouven-heck',
  'russell-verbeeten', 'sam-feinberg', 'scott-moore', 'sharad-malhautra',
  'taylor-monahan', 'tyler-mulvihill', 'tyler-ward', 'vijay-michalik'
]);

/**
 * Generate founder ID from name (slugify)
 */
function nameToId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Get the best available image URL for a founder
 * Priority: local WebP > manual image > external fallback
 */
export function getFounderImageUrl(founder: {
  name: string;
  id?: string;
  image?: string;
  twitter?: string | null;
  github?: string | null;
}): string {
  // Generate ID from name if not provided
  const founderId = founder.id || nameToId(founder.name);

  // 1. Local WebP avatar (optimized, 72x72)
  if (LOCAL_AVATARS.has(founderId)) {
    return `${import.meta.env.BASE_URL}avatars/${founderId}.webp`;
  }

  // 2. Manual image if provided
  if (founder.image) {
    return founder.image;
  }

  // 3. External fallbacks (Twitter, GitHub, DiceBear) - only for unknown founders
  if (founder.twitter) {
    return `https://unavatar.io/twitter/${founder.twitter.replace('@', '')}?size=72`;
  }
  if (founder.github) {
    return `https://github.com/${founder.github}.png?size=72`;
  }

  // 4. DiceBear fallback
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(founder.name)}`;
}
