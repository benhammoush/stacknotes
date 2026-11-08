/**
 * Owns the shared application shell, category routes and navigation accessibility.
 * @packageDocumentation
 */
import { useEffect, useRef } from "react";
import {
  Link,
  matchPath,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  comparisonCategories,
  categoryGroups,
  combinationsTopic,
} from "./data/categories";
import ComparisonPage from "./components/ComparisonPage";
import CombinationsPage from "./components/CombinationsPage";
import CloudServicesPage from "./components/CloudServicesPage";
import NotFound from "./components/NotFound";
import ToolComparisonPage from "./components/ToolComparisonPage";
import { javascriptStacksTopic, javascriptTopics } from "./data/javascript";
import { javascriptStackContent } from "./data/javascriptStacks";

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
          path="/javascript/app-frameworks/"
          element={<Navigate to="/javascript/ui/" replace />}
        />
        <Route
          path={javascriptStacksTopic.path}
          element={
            <CombinationsPage
              key={javascriptStacksTopic.path}
              {...javascriptStackContent}
            />
          }
        />
        {javascriptTopics.map((topic) => (
          <Route
            key={topic.path}
            path={topic.path}
            element={<ToolComparisonPage key={topic.path} topic={topic} />}
          />
        ))}
        <Route path={combinationsTopic.path} element={<CloudServicesPage />} />
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
