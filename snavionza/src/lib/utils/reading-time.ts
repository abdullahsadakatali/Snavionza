/**
 * Calculates the estimated reading time for a given text content.
 * Based on an average reading speed of 200 words per minute.
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '').replace(/[#*_`]/g, '');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes);
}
