/**
 * Compares compact service associations with click-only, plain-English guidance dialogs.
 * @packageDocumentation
 */
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import {
  combinationRoles,
  combinations as cloudCombinations,
  type Combination,
} from "../data/combinations";
import "./CombinationsPage.css";

/** Data and navigation for cloud or self-operated combination matrices. */
interface CombinationsPageProps {
  combinations?: Combination[];
  roles?: typeof combinationRoles;
  selfHosted?: boolean;
}

/**
 * Render suggested associations and their benefits and trade-offs without implying automatic integration.
 * @param props - Optional self-hosted content; cloud content is the default.
 * @returns An accessible comparison table with centered, keyboard-dismissible dialogs.
 */
export default function CombinationsPage(props: CombinationsPageProps) {
  const combinations = props.combinations ?? cloudCombinations;
  const roles = props.roles ?? combinationRoles;
  return (
    <>
      <main tabIndex={-1} className="combinations-page">
        <div className="page-heading">
          <h1>
            {props.selfHosted
              ? "Self-hosted combinations"
              : "Common combinations"}
          </h1>
          <span className="provider-count">
            {combinations.length} combinations
          </span>
        </div>
        <div className="table-tools">
          <p className="table-hint" id="combinations-help">
            Click ⓘ for what a combination is good for and what you still need
            to manage. Pick only the services your app needs. Multiple choices
            in a cell are alternatives, not a ranking.
          </p>
        </div>
        <div
          id="comparison"
          className="table-scroll compact combinations-table"
          role="region"
          aria-label={
            props.selfHosted
              ? "Self-hosted service combinations"
              : "Common service combinations"
          }
          aria-describedby="combinations-help"
          tabIndex={0}
          style={{ "--provider-count": roles.length } as CSSProperties}
        >
          <table aria-label="Services by combination">
            <thead>
              <tr>
                <th scope="col">Combination</th>
                {roles.map((role) => (
                  <th scope="col" key={role.label}>
                    <Link to={role.path}>{role.label}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {combinations.map((combination) => (
                <tr key={combination.id}>
                  <th scope="row">
                    <div className="combination-heading">
                      <span className="combination-name">
                        {combination.name}
                      </span>
                      <button
                        className="combination-info"
                        aria-label={`About ${combination.name}`}
                        aria-haspopup="dialog"
                        aria-controls={`choice-${combination.id}`}
                        onClick={() =>
                          (
                            document.getElementById(
                              `choice-${combination.id}`,
                            ) as HTMLDialogElement
                          )?.showModal()
                        }
                      >
                        ⓘ
                      </button>
                    </div>
                  </th>
                  {combination.services.map(
                    (
                      [name, logo, url, alternatives, providerContext],
                      index,
                    ) => (
                      <td key={roles[index].label}>
                        <div className="combination-options">
                          {[
                            [name, logo, url, providerContext] as const,
                            ...(alternatives ?? []),
                          ].map(
                            ([
                              choiceName,
                              choiceLogo,
                              choiceUrl,
                              choiceProvider,
                            ]) => (
                              <div
                                className="provider-heading"
                                key={`${choiceName}-${choiceUrl}`}
                              >
                                {choiceLogo ? (
                                  <img
                                    className="provider-logo"
                                    src={`/providers/${choiceLogo}`}
                                    alt=""
                                  />
                                ) : null}
                                <div>
                                  {choiceUrl ? (
                                    <a
                                      href={choiceUrl}
                                      aria-label={
                                        choiceProvider
                                          ? `${choiceName} — ${choiceProvider}`
                                          : undefined
                                      }
                                    >
                                      {choiceName}
                                    </a>
                                  ) : (
                                    <span className="combination-built-in">
                                      {choiceName}
                                    </span>
                                  )}
                                  {choiceProvider ? (
                                    <span className="company">
                                      {choiceProvider}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="combinations-footer">
          {props.selfHosted
            ? "Ten associations for different needs, not a popularity ranking. Examples document the core association, not every service choice or a company's live deployment. Built-in and separate roles are named rather than filled with extra products. You operate the servers, access rules, updates, backups and recovery. Follow release-specific installation and license terms; these rows are not complete deployment recipes."
            : "Starting points, not ready-made integrations. Check the linked documentation for setup and limits; some supporting services are not in the comparisons. Choose by your app's needs, not a popularity ranking. Within means the row's hosting platform; external means another provider. Neither means free or automatically connected."}
        </p>
        <p className="combinations-footer">
          — means no separate service is suggested. App-managed or database
          search may be enough, but still needs configuration. Keep external
          search records synchronized and enforce user permissions. Keep
          disposable caches separate from queue and session stores that must not
          lose records. A queue store is not automatically an app cache.
          Alternatives can fit the same combination without having identical
          features, costs or setup work.
        </p>
      </main>
      {combinations.map((combination) => (
        <dialog
          key={combination.id}
          id={`choice-${combination.id}`}
          className="combination-dialog"
          aria-labelledby={`choice-title-${combination.id}`}
          aria-describedby={`choice-text-${combination.id} choice-note-${combination.id}`}
          onClick={(event) => {
            if (event.target === event.currentTarget)
              event.currentTarget.close();
          }}
        >
          <div className="combination-dialog-header">
            <div>
              <span className="combination-dialog-kicker">
                Combination guide
              </span>
              <h2 id={`choice-title-${combination.id}`}>{combination.name}</h2>
            </div>
            <button
              className="close-button"
              aria-label="Close combination guide"
              onClick={(event) =>
                event.currentTarget.closest("dialog")?.close()
              }
            >
              ×
            </button>
          </div>
          <div className="combination-dialog-body">
            <p id={`choice-text-${combination.id}`}>
              {combination.whenToChoose}
            </p>
            <p
              id={`choice-note-${combination.id}`}
              className="combination-tradeoff"
            >
              {combination.note}
            </p>
          </div>
          {props.selfHosted && combination.example ? (
            <footer className="combination-dialog-footer combination-product-example">
              <a
                href={combination.example.url}
                aria-label={`Source for ${combination.example.product}`}
              >
                {combination.example.product} · documented example ↗
              </a>
              <span>Core association, not a complete deployment.</span>
            </footer>
          ) : combination.services[0][2] ? (
            <footer className="combination-dialog-footer">
              <a href={combination.services[0][2]}>Hosting documentation ↗</a>
            </footer>
          ) : null}
        </dialog>
      ))}
    </>
  );
}
