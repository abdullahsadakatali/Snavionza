import { TableOfContentsItem } from '@/lib/types';

/**
 * Parses H2 and H3 headings from HTML or Markdown content
 * to generate a Table of Contents.
 */
export function generateTableOfContents(content: string): TableOfContentsItem[] {
  const items: TableOfContentsItem[] = [];

  // Match HTML headings (from TipTap editor output)
  const htmlHeadingRegex = /<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gi;
  let match;

  while ((match = htmlHeadingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]*>/g, '').trim();
    if (text) {
      items.push({ id, text, level });
    }
  }

  // If no HTML headings found, try Markdown headings
  if (items.length === 0) {
    const lines = content.split('\n');
    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.+)/);
      const h3Match = line.match(/^###\s+(.+)/);

      if (h2Match) {
        const text = h2Match[1].trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        items.push({ id, text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        items.push({ id, text, level: 3 });
      }
    });
  }

  return items;
}

/**
 * Injects id attributes into h2/h3 HTML heading tags for anchor linking.
 */
export function injectHeadingIds(content: string): string {
  return content.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (_, level, attrs, text) => {
    const cleanText = text.replace(/<[^>]*>/g, '').trim();
    const id = cleanText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}
