import React from 'react';
import PropTypes from 'prop-types';
import { parseMarkdownToHtml } from '../utils/markdownParser';

/**
 * PreviewPane Component
 *
 * This component is responsible for displaying the rendered HTML output
 * of the markdown text provided. It leverages the `markdownParser` utility
 * to convert markdown into HTML and then uses `dangerouslySetInnerHTML`
 * to inject the HTML into the DOM.
 *
 * It's crucial to ensure that the `parseMarkdownToHtml` function
 * properly sanitizes the HTML to prevent Cross-Site Scripting (XSS) attacks,
 * especially if the markdown input could come from untrusted sources.
 * For a personal markdown previewer, the risk is lower, but good practice
 * dictates robust sanitization.
 *
 * @param {object} props - The component's props.
 * @param {string} props.markdownText - The markdown text to be rendered into HTML.
 */
const PreviewPane = ({ markdownText }) => {
  // Convert the markdown text to HTML using the utility function.
  const htmlContent = parseMarkdownToHtml(markdownText);

  return (
    <div className="preview-pane">
      <h2 className="preview-pane__title">Rendered Output</h2>
      <div
        className="preview-pane__content"
        // dangerouslySetInnerHTML is used here to render the HTML string directly.
        // React intentionally makes this dangerous, as it can expose users to XSS attacks
        // if the HTML is not properly sanitized.
        // We rely on `parseMarkdownToHtml` to handle any necessary sanitization.
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        aria-live="polite" // Announce changes to screen readers
        aria-atomic="true" // Announce the entire region as a single unit
      />
    </div>
  );
};

/**
 * Prop Types for the PreviewPane component.
 * Defines the expected types and requirements for the component's props.
 */
PreviewPane.propTypes = {
  /**
   * The markdown text string that will be parsed and displayed as HTML.
   * This prop is required.
   */
  markdownText: PropTypes.string.isRequired,
};

export default PreviewPane;