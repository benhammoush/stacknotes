/**
 * Compares service combinations by role using the shared compact table layout.
 * @packageDocumentation
 */
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { combinationRoles, combinations } from "../data/combinations";
import "./CombinationsPage.css";

/**
 * Render suggested starting points without implying automatic integration or ranking.
 * @returns An accessible role-by-combination table and configuration boundaries.
 */
export default function CombinationsPage() {
  return (
    <main tabIndex={-1} className="combinations-page">
      <div className="page-heading">
        <h1>Common combinations</h1>
        <span className="provider-count">
          {combinations.length} combinations
        </span>
      </div>
      <div className="table-tools">
        <p className="table-hint" id="combinations-help">
          Each row is a combination. Scroll to compare service types; open “What
          to know” for setup notes and product examples.
        </p>
      </div>
      <div
        id="comparison"
        className="table-scroll compact combinations-table"
        role="region"
        aria-label="Common service combinations"
        aria-describedby="combinations-help"
        tabIndex={0}
        style={{ "--provider-count": combinationRoles.length } as CSSProperties}
      >
        <table aria-label="Services by combination">
          <thead>
            <tr>
              <th scope="col">Combination</th>
              {combinationRoles.map((role) => (
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
                  </details>
                </th>
                {combination.services.map(([name, logo, url], index) => (
                  <td key={combinationRoles[index].label}>
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
        Starting points, not ready-made integrations. Background tasks and
        monitoring are optional additions. Check the linked documentation for
        setup and limits; some supporting services are not in the comparisons.
        Product examples are partial matches, not confirmation of their current
        complete setup.
      </p>
    </main>
  );
}
