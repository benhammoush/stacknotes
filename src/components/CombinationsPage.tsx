/**
 * Compares compact application-stack associations with linked tools and source notes.
 * @packageDocumentation
 */
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import type { Combination } from "../data/combinations";
import "./CombinationsPage.css";

/** Editorial content for the application-stack guide. */
interface CombinationsPageProps {
  title: string;
  roles: { label: string; path: string }[];
  combinations: Combination[];
  introduction: string;
  notes: string[];
  sourceLabel?: string;
  orderSource?: { label: string; url: string; licenseUrl: string };
}

/**
 * Render suggested associations without implying automatic integration.
 * @param props - Application-stack content and linked role categories.
 * @returns An accessible comparison table with linked tools and collapsed notes.
 */
export default function CombinationsPage(props: CombinationsPageProps) {
  const { roles, combinations, title } = props;
  return (
    <>
      <main tabIndex={-1} className="combinations-page">
        <h1 className="sr-only">{title}</h1>
        <p className="sr-only" id="combinations-help">
          {props.introduction}
        </p>
        <div
          id="comparison"
          className="table-scroll compact combinations-table"
          role="region"
          aria-label={title}
          aria-describedby="combinations-help"
          tabIndex={0}
          style={{ "--provider-count": roles.length } as CSSProperties}
        >
          <table aria-label="Tools by application stack">
            <thead>
              <tr>
                <th scope="col">Application stack</th>
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
        <details className="sources reading-notes">
          <summary>Notes & sources</summary>
          <p>{props.introduction}</p>
          {props.orderSource ? (
            <p className="combinations-footer">
              Ordering source:{" "}
              <a href={props.orderSource.url}>{props.orderSource.label}</a>.
              Usage is self-reported, not global market share or adoption of
              these exact combinations. Source: Stack Exchange Inc. ·{" "}
              <a href={props.orderSource.licenseUrl}>ODbL 1.0</a>.
            </p>
          ) : null}
          {props.notes.map((note) => (
            <p className="combinations-footer" key={note}>
              {note}
            </p>
          ))}
        </details>
      </main>
    </>
  );
}
