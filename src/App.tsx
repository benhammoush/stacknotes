/**
 * Owns the shared application shell, category routes and navigation accessibility.
 * @packageDocumentation
 */
import { useEffect, useRef } from "react";
import { Link, matchPath, Route, Routes, useLocation } from "react-router-dom";
import {
  comparisonCategories,
  categoryGroups,
  combinationsTopic,
  selfHostedCombinationsTopic,
} from "./data/categories";
import {
  selfHostedCombinations,
  selfHostedRoles,
} from "./data/selfHostedCombinations";
import ComparisonPage from "./components/ComparisonPage";
import CombinationsPage from "./components/CombinationsPage";
import NotFound from "./components/NotFound";

/**
 * Render registry-driven routes inside the shared workspace shell.
 * @returns The routed comparison or a recoverable not-found page.
 */
export default function App() {
  const { pathname } = useLocation();
  const activeGroup = categoryGroups.find(({ topics }) =>
    topics.some((topic) => matchPath(topic.path, pathname)),
  );
  const topicGroup = activeGroup ?? categoryGroups[0];
  const previousPath = useRef(pathname);
  useEffect(() => {
    const category = categoryGroups
      .flatMap(({ topics }) => topics)
      .find((item) => matchPath(item.path, pathname));
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
        {categoryGroups.map((group) => (
          <Link
            key={group.label}
            to={group.path}
            aria-current={activeGroup === group ? "true" : undefined}
          >
            {group.label}
          </Link>
        ))}
      </nav>
      <nav
        className="category-nav topic-nav"
        aria-label={`${topicGroup.label} topics`}
      >
        {topicGroup.topics.map((category) => (
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
        <Route
          path={combinationsTopic.path}
          element={<CombinationsPage key={combinationsTopic.path} />}
        />
        <Route
          path={selfHostedCombinationsTopic.path}
          element={
            <CombinationsPage
              key={selfHostedCombinationsTopic.path}
              combinations={selfHostedCombinations}
              roles={selfHostedRoles}
              selfHosted
            />
          }
        />
        {comparisonCategories.map((category) => (
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
