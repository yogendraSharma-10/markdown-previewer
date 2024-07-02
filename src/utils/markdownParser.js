/**
 * @file src/utils/markdownParser.js
 * @description Utility functions for parsing Markdown text into HTML.
 * This module leverages the 'marked' library for robust and secure Markdown rendering.
 */

import { marked } from 'marked';
import DOMPurify from 'dompurify'; // For sanitizing the HTML output

/**
 * Configures the 'marked' library with common options for a rich markdown experience.
 * - `gfm`: Enable GitHub Flavored Markdown (tables, strikethrough, task lists).
 * - `breaks`: Render newlines as `<br>` tags.
 * - `pedantic`: Conform to the original markdown spec, ignore stuff that doesn't.
 * - `sanitize`: DEPRECATED in marked v4+, use DOMPurify instead for security.
 *   Marked itself does not sanitize HTML by default anymore, which is why DOMPurify is crucial.
 */
marked.setOptions({
  gfm: true, // Use GitHub Flavored Markdown
  breaks: true, // Render newlines as <br>
  pedantic: false, // Don't be pedantic. Don't conform to the original markdown spec.
  // highlight: function(code, lang) { // Optional: Add syntax highlighting
  //   const hljs = require('highlight.js');
  //   const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  //   return hljs.highlight(code, { language }).value;
  // },
});

/**
 * Parses a given Markdown string into an HTML string.
 * It uses the 'marked' library for parsing and 'DOMPurify' for sanitizing
 * the resulting HTML to prevent XSS attacks and ensure safe rendering.
 *
 * @param {string} markdownText The Markdown string to parse.
 * @returns {string} The sanitized HTML string.
 */
export const parseMarkdown = (markdownText) => {
  if (typeof markdownText !== 'string') {
    console.warn('parseMarkdown received non-string input:', markdownText);
    return '';
  }

  // 1. Parse Markdown to HTML using 'marked'
  const rawHtml = marked(markdownText);

  // 2. Sanitize the HTML using DOMPurify to prevent XSS attacks.
  // This is crucial for production applications where user-generated content is rendered.
  // DOMPurify is highly configurable; default options are usually sufficient.
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true }, // Ensure standard HTML elements are allowed
    // You can add more specific configurations if needed, e.g.,
    // ALLOWED_TAGS: ['a', 'p', 'h1', 'h2', 'img', 'strong', 'em', 'pre', 'code', 'ul', 'ol', 'li', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br', 'hr'],
    // ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style'],
  });

  return cleanHtml;
};

// Example usage (for testing or demonstration purposes, not typically run in production)
/*
if (process.env.NODE_ENV === 'development') {
  const testMarkdown = `
# Hello Markdown Previewer!

This is a **live** markdown editor.

## Features
- Real-time rendering
- Supports [GitHub Flavored Markdown](https://github.github.com/gfm/)
- Secure HTML output

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

- List item 1
- List item 2
  - Nested list item

> This is a blockquote.

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

Check out the [E-commerce Storefront](http://localhost:3001) or the [Full-Stack Blog Platform](http://localhost:3003)!
`;

  const parsedHtml = parseMarkdown(testMarkdown);
  console.log('--- Original Markdown ---');
  console.log(testMarkdown);
  console.log('\n--- Parsed and Sanitized HTML ---');
  console.log(parsedHtml);
}
*/