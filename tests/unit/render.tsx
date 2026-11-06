/**
 * Mounts the real app shell with isolated in-memory navigation for component tests.
 * @packageDocumentation
 */
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";

/**
 * Render the application at a selected route without touching browser history.
 * @param path - Initial route, defaulting to the database comparison.
 * @returns Testing Library queries and the application container.
 */
export function renderApp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}
