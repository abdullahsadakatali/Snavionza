const SITE_NAME = 'Snavionza';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://snavionza.netlify.app';
const SITE_DESCRIPTION = 'Your go-to source for AI tools, productivity software, automation guides, and creator resources. Helping creators work smarter with AI.';

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  tagline: 'Helping Creators Work Smarter with AI',
  defaultImage: `${SITE_URL}/og-default.png`,
  twitterHandle: '@snavionza',
};

export function generateMetaTitle(title: string, override?: string | null): string {
  if (override) return override;
  return `${title} | ${SITE_NAME}`;
}

export function generateMetaDescription(excerpt: string | null, override?: string | null): string {
  if (override) return override;
  if (excerpt) return excerpt.slice(0, 160);
  return SITE_DESCRIPTION;
}

export function generateCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function generateOgImageUrl(imageUrl: string | null): string {
  return imageUrl || `${SITE_URL}/og-default.png`;
}
