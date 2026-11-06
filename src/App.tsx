/**
 * Owns the shared application shell, category routes and navigation accessibility.
 * @packageDocumentation
 */
import { useEffect, useRef } from "react";
import { Link, matchPath, Route, Routes, useLocation } from "react-router-dom";
import { categories } from "./data/categories";
import ComparisonPage from "./components/ComparisonPage";
import NotFound from "./components/NotFound";

/**
 * Render registry-driven routes inside the shared workspace shell.
 * @returns The routed comparison or a recoverable not-found page.
 */
export default function App() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const category = categories.find((item) => matchPath(item.path, pathname));
    document.title =
      category?.path === "/"
        ? "Stacknotes · Knowledge base"
        : `${category?.title ?? "Page not found"} · Stacknotes`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        category?.path === "/"
          ? "A growing knowledge base for ideas, clear explanations, practical notes and useful comparisons."
          : category
            ? `Explore ${category.title.toLowerCase()} in the Stacknotes knowledge base: explanations, comparisons and trade-offs.`
            : "This Stacknotes page does not exist. Browse the knowledge base.",
      );
    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document
        .querySelector<HTMLElement>("main")
        ?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname]);

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="Stacknotes home">
          <span aria-hidden="true" className="brand-mark">
            ≋
          </span>{" "}
          Stacknotes
        </Link>
      </header>
      <nav className="category-nav" aria-label="Categories">
        {categories.map((category) => (
          <Link
            key={category.path}
            to={category.path}
            aria-current={
              matchPath(category.path, pathname) ? "page" : undefined
            }
          >
            {category.label}
          </Link>
        ))}
      </nav>
      <Routes>
        {categories.map((category) => (
          <Route
            key={category.path}
            path={category.path}
            element={<ComparisonPage key={category.path} category={category} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
