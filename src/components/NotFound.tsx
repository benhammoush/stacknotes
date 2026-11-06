/**
 * Gives unknown client-side routes a clear recovery path.
 * @packageDocumentation
 */
import { Link } from "react-router-dom";

/**
 * Render a missing-page message within the shared navigation shell.
 * @returns The not-found main landmark with a working skip-link target.
 */
export default function NotFound() {
  return (
    <main id="comparison" tabIndex={-1}>
      <h1>Page not found</h1>
      <p>This comparison does not exist.</p>
      <Link to="/">Browse comparisons</Link>
    </main>
  );
}
