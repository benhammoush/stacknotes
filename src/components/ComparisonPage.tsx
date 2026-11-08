/**
 * Renders shared comparison tables with local disclosure state and native explanations.
 * @packageDocumentation
 */
import { type CSSProperties, useState } from "react";
import type { Category } from "../data/categories";
import { differences } from "../utils/comparison";

/** Content and route identity supplied by the application registry. */
interface ComparisonPageProps {
  category: Category;
}

/**
 * Render one compact category; route keys reset disclosure and dialogs on navigation.
 * @param props - The category dataset and its public identity.
 * @returns Semantic comparison content with accessible table controls.
 */
export default function ComparisonPage(props: ComparisonPageProps) {
  const { category } = props;
  const { data } = category;
  const [expanded, setExpanded] = useState(false);
  const statusHelp = category.selfHosted
    ? "Auto: software handles it after setup. Manual: you configure and operate it. Excluded: handle separately."
    : "Auto: the provider handles it. Manual: you set it up. Excluded: handle separately.";
  const tableHelp = `${statusHelp} The ≠ mark means a less-common status in this row, not better or worse.`;

  return (
    <>
      <main tabIndex={-1}>
        <h1 className="sr-only">{category.title}</h1>
        <p className="sr-only" id="table-help">
          {tableHelp}
        </p>
        <div
          id="comparison"
          className="table-scroll compact"
          role="region"
          aria-label={`${category.path === "/" ? "Managed database" : category.title} comparison`}
          aria-describedby="table-help"
          tabIndex={0}
        >
          <table
            style={
              { "--provider-count": data.providers.length } as CSSProperties
            }
          >
            <caption className="sr-only">
              {category.path === "/"
                ? "Managed database providers"
                : `${category.title} providers`}
              : overview and who handles what
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
                    Who handles what
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
                        aria-label={`About ${row.label}`}
                        aria-haspopup="dialog"
                        aria-controls={`term-${index}`}
                        onClick={() =>
                          (
                            document.getElementById(
                              `term-${index}`,
                            ) as HTMLDialogElement
                          )?.showModal()
                        }
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
          <details className="sources">
            <summary>Notes & sources</summary>
            <p>{tableHelp}</p>
            {category.selfHosted ? (
              <>
                <p>
                  <strong>You operate the service:</strong> provide the servers,
                  network and disks; maintain the operating system and software;
                  configure access rules, monitoring, backups and recovery.
                  Renting a cloud server does not transfer those
                  responsibilities to the software project.
                </p>
                <p>
                  Auto means a software feature works after setup, not that a
                  provider operates it for you. Manual means you configure and
                  maintain it. Excluded means use a separate product or app
                  code. Replication is not a backup.
                </p>
                <p className="provenance">
                  Based on official documentation and license files reviewed in
                  November 2026. These are starting points, not installation or
                  security instructions. Editions and license terms differ;
                  check the linked sources.
                </p>
                <div>
                  <h2>License sources</h2>
                  <ul>
                    {data.providers.map((provider) => (
                      <li key={provider.name}>
                        <a href={provider.license}>{provider.name} license</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : category.path === "/" ? (
              <>
                <p>
                  <strong>You manage:</strong> data structure and validation,
                  changes that must succeed together, safe retries, queries and
                  search indexes, database changes, access rules, how long to
                  keep data and recovery testing.
                </p>
                <p>
                  Features and charges vary by plan and location. Auto does not
                  mean free or unlimited. Manual can mean one-time setup.
                  Read-only copies are not backups. RDS, Aurora and Cloud SQL
                  use PostgreSQL examples.
                </p>
                <p className="provenance">
                  The original eight products are based on the November 2026
                  PDF; their technical claims have not been independently
                  revalidated. DynamoDB and Firestore were added from official
                  documentation. Wording has been simplified. Check provider
                  documentation.
                </p>
              </>
            ) : (
              <>
                {category.path === "/hosting/" ? (
                  <p>
                    A web app is used through a browser, including a website.
                    Browser files provide its interface; server code handles
                    work on the provider&apos;s machines. Background tasks do
                    work separately, such as sending emails. A framework
                    provides a starting structure and tools for app code.
                  </p>
                ) : null}
                <p>
                  These are provider-run products. Features, limits and charges
                  vary by plan and location. Auto does not mean free or
                  unlimited. Manual can mean one-time setup. Excluded means not
                  included in this product; the provider may sell a separate
                  tool for it.
                </p>
                <p className="provenance">
                  Based on official documentation and billing information
                  reviewed in November 2026. Similar descriptions do not mean
                  identical features or prices. Provider names link to
                  documentation.
                </p>
                <div>
                  <h2>Pricing sources</h2>
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
                </div>
              </>
            )}
          </details>
        </section>
      </main>
      {data.responsibilities.map((row, index) => (
        <dialog
          key={row.label}
          id={`term-${index}`}
          aria-labelledby={`term-title-${index}`}
          aria-describedby={`term-text-${index}`}
          className="combination-dialog"
          onClick={(event) => {
            if (event.target === event.currentTarget)
              event.currentTarget.close();
          }}
        >
          <div className="combination-dialog-header">
            <h2 id={`term-title-${index}`}>{row.label}</h2>
            <button
              className="close-button"
              aria-label="Close explanation"
              onClick={(event) =>
                event.currentTarget.closest("dialog")?.close()
              }
            >
              ×
            </button>
          </div>
          <div className="combination-dialog-body">
            <p id={`term-text-${index}`}>{row.explanation}</p>
          </div>
        </dialog>
      ))}
    </>
  );
}
