import React from "react";
import PropTypes from "prop-types";
import { parseMarkdownToHtml } from "../utils/markdownParser";

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
  const htmlContent = parseMarkdownToHtml(markdownText);

  return (
    <div className="preview-container">
      <div
        className="preview-pane"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        aria-live="polite"
        aria-atomic="true"
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
