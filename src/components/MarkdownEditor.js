import React, { useState, useEffect } from "react";

/**
 * DEFAULT_PLACEHOLDER_MARKDOWN
 *
 * This constant holds a pre-filled markdown text to showcase the editor's capabilities
 * and provide an immediate example to the user upon loading the application.
 * It includes various markdown elements like headings, lists, code blocks, links,
 * and blockquotes.
 *
 * It also includes a cross-project integration idea to simulate a microservice
 * architecture context, suggesting how this editor could feed content to other
 * services like a blog platform or content summarizer.
 */
const DEFAULT_PLACEHOLDER_MARKDOWN = `
# Welcome to the Markdown Previewer!

This is a live markdown editor built with React.
Type your markdown on the left, and see the rendered HTML on the right.

## Features:
- **Real-time Preview**: See your changes instantly as you type.
- **Common Markdown Support**: Headings, lists, links, code blocks, and more!
- **Accessible Design**: Built with accessibility best practices in mind.

### Examples:

\`\`\`javascript
// Code Block Example
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

- Unordered list item 1
- Unordered list item 2
  - Nested list item

1. Ordered list item 1
2. Ordered list item 2

**Bold Text** and *Italic Text*
You can also use ~~Strikethrough~~.

[Visit Google](https://www.google.com)

> "The only way to do great work is to love what you do."
> - Steve Jobs

---

### Cross-Project Integration Idea:
Imagine this editor being used to draft content for the **Full-Stack Blog Platform** or to prepare articles for the **AI-Powered Content Summarizer**. The generated markdown could then be saved via an API endpoint (e.g., \`/api/blog/posts\` or \`/api/summaries/drafts\`) for further processing or publication. This highlights how the Markdown Previewer could serve as a content creation module within a larger interconnected system.
`;

/**
 * MarkdownEditor Component
 *
 * This component provides a user interface for typing markdown text.
 * It functions as a controlled component, managing its internal state for the
 * markdown content and notifying a parent component of any changes via a prop function.
 * This allows for real-time rendering of the markdown in a separate preview pane.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {function(string): void} props.onMarkdownChange - Callback function
 *   to be invoked when the markdown text changes. It receives the new markdown string.
 * @param {string} [props.initialMarkdownText=''] - Optional initial markdown text
 *   to populate the editor with. If not provided, a default placeholder text is used.
 */
const MarkdownEditor = ({ onMarkdownChange, initialMarkdownText = "" }) => {
  // State to hold the current markdown text displayed in the textarea.
  // It's initialized with either the `initialMarkdownText` prop or the
  // `DEFAULT_PLACEHOLDER_MARKDOWN` if `initialMarkdownText` is empty.
  const [markdownInput, setMarkdownInput] = useState(
    initialMarkdownText || DEFAULT_PLACEHOLDER_MARKDOWN,
  );

  /**
   * useEffect hook to synchronize the editor's internal state with the
   * `initialMarkdownText` prop from the parent component.
   *
   * This is crucial for scenarios where:
   * 1. The component mounts, and we need to set the initial content (either prop or default).
   * 2. The parent component updates `initialMarkdownText` (e.g., loading a new document).
   *
   * It also ensures that the `onMarkdownChange` callback is fired with the
   * initial content, so the preview pane is populated correctly on first render.
   */
  useEffect(() => {
    const contentToSet = initialMarkdownText || DEFAULT_PLACEHOLDER_MARKDOWN;
    setMarkdownInput(contentToSet);

    // Notify the parent component about the initial content,
    // ensuring the preview pane is updated immediately.
    if (onMarkdownChange) {
      onMarkdownChange(contentToSet);
    }
  }, [initialMarkdownText, onMarkdownChange]); // Dependencies: Re-run if initialMarkdownText or onMarkdownChange changes.

  /**
   * Handles the `onChange` event of the textarea.
   *
   * Updates the component's internal `markdownInput` state with the new value
   * from the textarea and then calls the `onMarkdownChange` prop to notify
   * the parent component of the update.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event object.
   */
  const handleChange = (event) => {
    const newText = event.target.value;
    setMarkdownInput(newText);

    // Call the parent's callback function with the new markdown text.
    if (onMarkdownChange) {
      onMarkdownChange(newText);
    }
  };

  return (
    <div className="editor-container">
      <label htmlFor="markdown-input" className="editor-label">
        Markdown Editor
      </label>
      <textarea
        id="markdown-input"
        className="markdown-editor"
        value={markdownInput} // Controlled component: textarea value is tied to state.
        onChange={handleChange} // Update state and notify parent on change.
        placeholder="Start typing your markdown here..." // This will only be visible if markdownInput is empty.
        aria-label="Markdown content editor" // Accessibility label for screen readers.
        spellCheck="true" // Enable browser spell checking.
      />
    </div>
  );
};

export default MarkdownEditor;
