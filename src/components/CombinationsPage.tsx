/**
 * Compares service combinations by role using the shared compact table layout.
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
 * Render suggested starting points without implying automatic integration or ranking.
 * @param props - Optional self-hosted content; cloud content is the default.
 * @returns An accessible role-by-combination table and configuration boundaries.
 */
export default function CombinationsPage(props: CombinationsPageProps) {
  const combinations = props.combinations ?? cloudCombinations;
  const roles = props.roles ?? combinationRoles;
  return (
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
          Each row is a combination. Scroll to compare service types; open “What
          to know” for{" "}
          {props.selfHosted
            ? "setup boundaries. You run the servers and connect these components yourself"
            : "setup notes and product examples"}
          .
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
                  <span className="combination-name">{combination.name}</span>
                  <details className="combination-note">
                    <summary>What to know</summary>
                    <p>{combination.description}</p>
                    <p>{combination.note}</p>
                    {combination.example ? (
                      <p className="combination-product-example">
                        <span>Product example · partial match</span>
                        {combination.example.productUrl ? (
                          <a href={combination.example.productUrl}>
                            {combination.example.product}
                          </a>
                        ) : (
                          combination.example.product
                        )}
                        {" · "}
                        <a
                          href={combination.example.url}
                          aria-label={`Source for ${combination.example.product}`}
                        >
                          Source
                        </a>
                      </p>
                    ) : null}
                  </details>
                </th>
                {combination.services.map(([name, logo, url], index) => (
                  <td key={roles[index].label}>
                    <div className="provider-heading">
                      <img
                        className="provider-logo"
                        src={`/providers/${logo}`}
                        alt=""
                      />
                      <a href={url}>{name}</a>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="combinations-footer">
        {props.selfHosted ? (
          "Suggested setups, not ready-made integrations or claims about a company’s stack. You provide app server code and task workers, configure access rules, maintain all services, and test backups and recovery. Components can need different operating systems or separate machines; no example is an installation recipe."
        ) : (
          <>
            Starting points, not ready-made integrations. Background tasks and
            monitoring are optional additions. Check the linked documentation
            for setup and limits; some supporting services are not in the
            comparisons. Product examples are partial matches, not confirmation
            of their current complete setup.
          </>
        )}
      </p>
    </main>
  );
}
