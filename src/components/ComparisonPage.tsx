/**
 * Renders shared comparison tables with local disclosure state and native explanations.
 * @packageDocumentation
 */
import { useRef, useState } from "react";
import type { Category } from "../data/categories";
import { differences } from "../utils/comparison";

/** Content and route identity supplied by the application registry. */
interface ComparisonPageProps {
  category: Category;
}

/**
 * Render one category; route keys reset controls and remove open popovers on navigation.
 * @param props - The category dataset and its public identity.
 * @returns Semantic comparison content with accessible table controls.
 */
export default function ComparisonPage(props: ComparisonPageProps) {
  const { category } = props;
  const { data } = category;
  const [expanded, setExpanded] = useState(false);
  const [compact, setCompact] = useState(false);
  const scroll = useRef<HTMLDivElement>(null);

  return (
    <>
      <main tabIndex={-1}>
        <div className="page-heading">
          <h1>{category.title}</h1>
          <span className="provider-count">
            {data.providers.length} providers
          </span>
        </div>
        <div className="legend" aria-label="Responsibility legend">
          <span>
            <strong className="status auto">Auto</strong> Provider operates
          </span>
          <span>
            <strong className="status manual">Manual</strong> You configure or
            design
          </span>
          <span>
            <strong className="status excluded">Excluded</strong> Handle
            elsewhere
          </span>
        </div>
        <div className="table-tools">
          <p className="table-hint" id="table-help">
            Scroll to compare. ⓘ explains terms.{" "}
            <span className="difference-key">≠ Less-common status</span> in this
            row—not better or worse.
          </p>
          <div className="view-controls">
            <label htmlFor="provider-jump">Jump to</label>
            <select
              id="provider-jump"
              defaultValue=""
              onChange={(event) => {
                const value = event.currentTarget.value;
                if (value === "" || !scroll.current) return;
                const column = scroll.current.querySelector<HTMLElement>(
                  `#provider-${value}`,
                )!;
                const label =
                  scroll.current.querySelector<HTMLElement>("thead th")!;
                scroll.current.scrollTo({
                  left: column.offsetLeft - label.offsetWidth,
                  behavior: "instant",
                });
              }}
            >
              <option value="">Provider…</option>
              {data.providers.map((provider, index) => (
                <option key={index} value={index}>
                  {provider.company === provider.name
                    ? provider.name
                    : `${provider.company} · ${provider.name}`}
                </option>
              ))}
            </select>
            <button
              id="compact-toggle"
              aria-pressed={compact}
              onClick={() => setCompact(!compact)}
            >
              Compact view
            </button>
          </div>
        </div>
        <div
          ref={scroll}
          id="comparison"
          className={`table-scroll${compact ? " compact" : ""}`}
          role="region"
          aria-label={`${category.path === "/" ? "Managed database" : category.title} comparison`}
          aria-describedby="table-help"
          tabIndex={0}
        >
          <table>
            <caption className="sr-only">
              {category.path === "/"
                ? "Managed database providers"
                : `${category.title} providers`}
              : overview and technical responsibilities
            </caption>
            <thead>
              <tr>
                <th scope="col">Characteristic</th>
                {data.providers.map((provider, index) => (
                  <th key={index} scope="col" id={`provider-${index}`}>
                    <div className="provider-heading">
                      <img
                        className="provider-logo"
                        src={provider.logo}
                        alt=""
                        width="32"
                        height="32"
                      />
                      <div>
                        <a href={provider.url}>
                          {provider.name}{" "}
                          <span aria-hidden="true" className="external">
                            ↗
                          </span>
                        </a>
                        <span className="company">{provider.company}</span>
                        {provider.caveat ? (
                          <span className="provider-caveat">
                            {provider.caveat}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="section-row">
                <th scope="rowgroup" colSpan={data.providers.length + 1}>
                  Overview
                </th>
              </tr>
              {data.overview.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tbody>
              <tr className="section-row">
                <th scope="rowgroup" colSpan={data.providers.length + 1}>
                  <button
                    id="technical-toggle"
                    className="section-toggle"
                    aria-expanded={expanded}
                    aria-controls="technical-rows"
                    onClick={() => setExpanded(!expanded)}
                  >
                    <span className="section-chevron" aria-hidden="true">
                      ›
                    </span>
                    Technical responsibilities
                  </button>
                </th>
              </tr>
            </tbody>
            <tbody
              id="technical-rows"
              aria-labelledby="technical-toggle"
              hidden={!expanded}
            >
              {data.responsibilities.map((row, index) => {
                const cues = differences(row.values.map(([status]) => status));
                return (
                  <tr key={row.label}>
                    <th scope="row">
                      <span>{row.label}</span>
                      <button
                        className="info-button"
                        {...{
                          popovertarget: `term-${index}`,
                          popovertargetaction: "show",
                        }}
                        aria-label={`About ${row.label}`}
                        onPointerEnter={(event) => {
                          if (event.pointerType === "mouse")
                            document
                              .getElementById(`term-${index}`)
                              ?.showPopover();
                        }}
                      >
                        ⓘ
                      </button>
                    </th>
                    {row.values.map(([status, note], cell) => (
                      <td
                        key={cell}
                        className={cues[cell] ? "different" : undefined}
                      >
                        <strong className={`status ${status.toLowerCase()}`}>
                          {status}
                          {cues[cell] ? (
                            <>
                              <span
                                aria-hidden="true"
                                className="difference-mark"
                              >
                                {" "}
                                ≠
                              </span>
                              <span className="sr-only">
                                {" "}
                                — less-common status in this row
                              </span>
                            </>
                          ) : null}
                        </strong>
                        {note ? (
                          <span className="cell-note">{note}</span>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <section className="reading-notes" aria-label="Comparison notes">
          {category.path === "/" ? (
            <>
              <p>
                <strong>You manage:</strong> schema, constraints, transactions,
                safe retries, queries/indexes, migrations, permissions,
                retention and recovery testing.
              </p>
              <p>
                Features and charges vary by plan/region. Auto is not free or
                unlimited; Manual can mean one-time setup. Replicas are not
                backups. RDS, Aurora and Cloud SQL use PostgreSQL examples.
              </p>
              <p className="provenance">
                November 2026 PDF baseline; not independently revalidated. Check
                provider docs.
              </p>
            </>
          ) : (
            <>
              <p>
                Hosted offerings; features, limits and charges vary by plan and
                region. Auto is not free or unlimited. Manual can mean one-time
                configuration. Excluded means outside the product compared, not
                unavailable from the vendor.
              </p>
              <p className="provenance">
                Official documentation and billing models reviewed November 4,
                2026. Summaries are not feature-equivalence or price rankings.
                Provider headings link to documentation.
              </p>
              <details className="sources">
                <summary>Billing sources</summary>
                <ul>
                  {data.providers.map((provider, index) => (
                    <li key={index}>
                      <a href={provider.pricing}>
                        {provider.company === provider.name
                          ? provider.name
                          : `${provider.company} · ${provider.name}`}{" "}
                        pricing
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </>
          )}
        </section>
      </main>
      {data.responsibilities.map((row, index) => (
        <aside
          key={row.label}
          id={`term-${index}`}
          {...{ popover: "auto" }}
          aria-labelledby={`term-title-${index}`}
          className="term-popover"
        >
          <div>
            <h2 id={`term-title-${index}`}>{row.label}</h2>
            <button
              className="close-button"
              {...{
                popovertarget: `term-${index}`,
                popovertargetaction: "hide",
              }}
              aria-label="Close explanation"
            >
              ×
            </button>
          </div>
          <p>{row.explanation}</p>
        </aside>
      ))}
    </>
  );
}
