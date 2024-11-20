// modules/text-sanitizer.ts
import DOMPurify from 'dompurify';

export class TextSanitizer {
  private sanitizer: DOMPurify.DOMPurifyI;

  constructor() {
    this.sanitizer = DOMPurify as unknown as DOMPurify.DOMPurifyI;
  }

  sanitize(html: string): string {
    const sanitizedHtml = this.sanitizer.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em'],
      ALLOWED_ATTR: ['href', 'title', 'target', 'rel'],
    });

    return sanitizedHtml.replace(/<(\w+)(?:\s+[^>]*)?>\s*<\/\1>/g, '');
  }
}
