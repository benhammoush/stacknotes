/**
 * Presents a compact inventory of each cloud provider's own services.
 * @packageDocumentation
 */
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { cloudProviders, cloudServiceRoles } from "../data/cloudServices";
import "./CloudServicesPage.css";

/**
 * Render linked offerings without implying recommended pairings or bundled pricing.
 * @returns An accessible provider inventory with linked service-category headings.
 */
export default function CloudServicesPage() {
  return (
    <main tabIndex={-1} className="cloud-services-page">
      <h1 className="sr-only">Services offered</h1>
      <p className="sr-only" id="cloud-services-help">
        Selected services offered by each provider, not suggested combinations.
        Links open official documentation. Services may require separate payment
        and configuration; they are not necessarily bundled, free or
        automatically connected.
      </p>
      <div
        id="comparison"
        className="table-scroll compact cloud-services-table"
        role="region"
        aria-label="Cloud service inventory"
        aria-describedby="cloud-services-help cloud-services-scope"
        tabIndex={0}
        style={
          { "--provider-count": cloudServiceRoles.length } as CSSProperties
        }
      >
        <table aria-label="Services by provider">
          <thead>
            <tr>
              <th scope="col">Provider</th>
              {cloudServiceRoles.map((role) => (
                <th scope="col" key={role.id}>
                  <Link to={role.path}>{role.label}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cloudProviders.map((provider) => (
              <tr key={provider.id}>
                <th scope="row">
                  <div className="provider-heading">
                    <img
                      className="provider-logo"
                      src={`/providers/${provider.logo}`}
                      alt=""
                      width="24"
                      height="24"
                    />
                    <span>{provider.name}</span>
                  </div>
                </th>
                {cloudServiceRoles.map((role) => (
                  <td key={role.id}>
                    {provider.services[role.id]?.length ? (
                      <ul className="cloud-offerings">
                        {provider.services[role.id]!.map((offering) => (
                          <li key={offering.url}>
                            <a href={offering.url}>{offering.name}</a>
                            {offering.note ? (
                              <span className="company">{offering.note}</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span aria-label="No offering listed in this scope">
                        —
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <details className="sources reading-notes">
        <summary>Notes & sources</summary>
        <p>
          Selected services, not suggested combinations. Official documentation
          links do not imply bundled pricing, free services or automatic
          integration.
        </p>
        <p className="cloud-services-note" id="cloud-services-scope">
          Selected offerings, not an exhaustive catalog. — means no offering
          listed within this page’s scope, not that the provider has no related
          capability. External integrations and software you could install
          yourself are not listed. Railway database templates are labeled
          explicitly. Firebase is shown as its own branded platform within
          Google Cloud. Rows are ordered by listed category coverage, most to
          fewest, with alphabetical ties—not overall provider quality.
        </p>
        <p className="cloud-services-note">
          Hosting includes website hosting and server-function runtimes; sign-in
          means customer accounts, not dashboard or employee login. Storage
          means application file/object storage. Caches include data stores and
          HTTP response caches; search lists dedicated services, not database
          full-text extensions. Platform metrics, logs and full application
          monitoring have different coverage. A shared column does not mean
          equivalent features, limits, pricing or setup.
        </p>
      </details>
    </main>
  );
}
