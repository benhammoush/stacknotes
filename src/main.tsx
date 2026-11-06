/**
 * Mounts the React application with browser-history routing and shared styles.
 * @packageDocumentation
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./design-system/styles.css";
import "./App.css";
import "./components/ComparisonPage.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application mount point.");
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
