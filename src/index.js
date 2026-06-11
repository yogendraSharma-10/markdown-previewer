import React from "react";
import ReactDOM from "react-dom/client"; // Using createRoot for React 18+ for modern React applications

import App from "./App"; // Import the main application component
import "./App.css"; // Import global styles for the application

/**
 * src/index.js
 *
 * This is the entry point of the React application.
 * It is responsible for rendering the root `App` component into the DOM.
 *
 * Key responsibilities:
 * 1. Import necessary React libraries and components.
 * 2. Mount the main `App` component to the DOM element with the ID 'root' (defined in public/index.html).
 * 3. Utilize `React.StrictMode` to enable additional checks and warnings during development,
 *    helping to identify potential issues and promote best practices.
 *
 * For a microservice architecture, this client-side entry point focuses on bootstrapping the UI.
 * Interactions with other services (like the AI-Powered Content Summarizer for advanced markdown processing,
 * or the Full-Stack Blog Platform for content storage) would typically occur within the `App` component
 * or its children, often via API calls.
 */

// Get the root DOM element where the React application will be mounted.
// This element is typically found in `public/index.html`.
const rootElement = document.getElementById("root");

// Create a React root using `ReactDOM.createRoot()`.
// This is the recommended way to render React applications starting with React 18,
// offering improved performance and new concurrent features.
const root = ReactDOM.createRoot(rootElement);

// Render the main `App` component into the root.
// `React.StrictMode` is a tool for highlighting potential problems in an application.
// It activates additional checks and warnings for its descendants during development mode.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(); // Uncomment and implement if performance monitoring is required.
