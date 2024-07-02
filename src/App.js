```javascript
import React, { useState, useEffect } from 'react';
import './App.css';
import MarkdownEditor from './components/MarkdownEditor';
import PreviewPane from './components/PreviewPane';
import { parseMarkdownToHtml } from './utils/markdownParser'; // Assuming this is the named export for the parsing utility

/**
 * App Component
 * The main container for the Markdown Previewer application.
 * It orchestrates the flow of markdown text from the editor,
 * through a parsing utility, and into the preview pane.
 *
 * This component manages the global state for the markdown content,
 * ensuring real-time synchronization between the input and output.
 */
function App() {
  // Initial markdown content to demonstrate features upon loading.
  // In a more complex, interconnected system, this initial content
  // could be fetched from a backend service (e.g., a 'Full-Stack Blog Platform' API)
  // or loaded from a local storage.
  const initialMarkdown = `
# Welcome to the Markdown Previewer!

This is a live markdown editor built with **React**.
Type your markdown on the left, and see the HTML preview on the right, in real-time.

## Key Features:
*   **Real-time Rendering**: Instant conversion of Markdown to HTML as you type.
*   **Rich Text Formatting**: Supports standard Markdown syntax including headers, lists, links, images, code blocks, and more.
*   **Responsive Design**: Adapts to different screen sizes for optimal viewing (styling handled in App.css).

### Code Example:
\`\`\`javascript
// Function to greet the user
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("Markdown Enthusiast");
\`\`\`

> "The only way to do great work is to love what you do." - Steve Jobs

### Lists:
*   Unordered list item 1
*   Unordered list item 2
    *   Nested item A
    *   Nested item B
1.  Ordered list item 1
2.  Ordered list item 2

### Links and Images:
[Visit React Official Website](https://react.dev)

![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg "React Logo")

---

**Bold Text**, *Italic Text*, ~~Strikethrough~~, \`Inline Code\`.

---
*This project is part of a larger interconnected system, showcasing microservice architecture principles.*
`;

  // State to hold the current markdown text entered by the user.
  // Initialized with the example content.
  const [markdownText, setMarkdownText] = useState(initialMarkdown);

  // State to hold the HTML content generated from the markdown.
  // This will be passed to the PreviewPane component.
  const [htmlContent, setHtmlContent] = useState('');

  /**
   * useEffect hook to parse markdown to HTML whenever `markdownText` changes.
   * This ensures the preview pane is always up-to-date with the editor's content.
   * The parsing logic is encapsulated in the `markdownParser` utility.
   */
  useEffect(() => {
    // Call the utility function to convert markdown to HTML.
    const parsedHtml = parseMarkdownToHtml(markdownText);
    setHtmlContent(parsedHtml);
  }, [markdownText]); // Dependency array: re-run this effect whenever markdownText changes

  return (
    <div className="App">
      {/* Application Header */}
      <header className="App-header">
        <h1>Markdown Previewer</h1>
        {/* Cross-project context:
            In a real microservice setup, this app might be used to edit content
            for other services like an 'E-commerce Storefront' (for product descriptions)
            or a 'Full-Stack Blog Platform' (for blog posts).
            Links or integration points could be added here. */}
        {/* <p>Integrated with <a href={process.env.REACT_APP_BLOG_PLATFORM_URL} target="_blank" rel="noopener noreferrer">Blog Platform</a> for content management.</p> */}
      </header>

      {/* Main content area containing the editor and preview panes */}
      <main className="App-main-content">
        {/* Markdown Editor Component */}
        {/* It receives the current markdown text and a function to update it. */}
        <MarkdownEditor
          markdown={markdownText}
          onMarkdownChange={setMarkdownText} // Pass the state setter directly for updates
        />

        {/* Preview Pane Component */}
        {/* It receives the parsed HTML content to display. */}
        <PreviewPane html={htmlContent} />
      </main>

      {/* Application Footer */}
      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} Markdown Previewer. Part of the interconnected system.</p>
        {/* Further cross-project context:
            This content could potentially be sent to an 'AI-Powered Content Summarizer'
            for generating summaries or keywords, or shared via a 'Collaborative Code Editor'
            for team-based markdown document creation. */}
        {/* <p>Content analysis powered by <a href={process.env.REACT_APP_AI_SUMMARIZER_API_URL} target="_blank" rel="noopener noreferrer">AI Content Summarizer</a>.</p> */}
      </footer>
    </div>
  );
}

export default App;
```