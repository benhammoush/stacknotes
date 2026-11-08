/**
 * Presents compact library comparisons with optional ecosystem column groups.
 * @packageDocumentation
 */
import { useState, type CSSProperties } from "react";
import type { JavaScriptTopic } from "../data/javascript";
import "./ToolComparisonPage.css";

/** A single source-linked tool comparison, distinct from cloud service data. */
interface ToolComparisonPageProps {
  topic: JavaScriptTopic;
}

/**
 * Render all tools in one compact table, keeping context in row explanations and notes.
 * @param props - The source-linked tool topic; route keys reset local state.
 * @returns An accessible comparison with click-only dimension explanations.
 */
export default function ToolComparisonPage(props: ToolComparisonPageProps) {
  const { topic } = props;
  const [expanded, setExpanded] = useState(false);
  const tools = topic.tools;
  const groups = topic.columnGroups;
  const rows = [
    {
      label: "Primary purpose",
      explanation:
        "The tool's purpose and scope; similar names do not mean equivalent products.",
      values: tools.map((tool) => tool.purpose),
    },
    {
      label: "Strengths",
      explanation:
        "Useful qualities, not a ranking or a promise that the tool is best for every app.",
      values: tools.map((tool) => tool.strength),
    },
    {
      label: "Limitations",
      explanation:
        "Trade-offs and remaining application responsibilities to evaluate before adoption.",
      values: tools.map((tool) => tool.limitation),
    },
    {
      label: "License & operating costs",
      explanation:
        "Core software license terms, not a hosted-service price. Infrastructure, operations, paid add-ons and external services depend on your setup and are not priced here. Core terms do not cover every extension or asset; follow the linked license and verify the release you adopt.",
      values: tools.map((tool) => tool.licenseName),
    },
    ...topic.dimensions.map((dimension, index) => ({
      ...dimension,
      values: tools.map((tool) => tool.facts[index]),
    })),
  ];

  /**
   * Render the same row cells and explanation controls in either table section.
   * @param row - Comparison label, explanation and aligned values.
   * @param index - Stable position used by the explanation dialog.
   * @returns One semantic comparison row with an activation-only explanation.
   */
  const renderRow = (row: (typeof rows)[number], index: number) => (
    <tr key={row.label}>
      <th scope="row">
        {row.label}
        <button
          className="info-button"
          aria-label={`About ${row.label}`}
          aria-haspopup="dialog"
          aria-controls={`tool-explanation-${index}`}
          onClick={() =>
            (
              document.getElementById(
                `tool-explanation-${index}`,
              ) as HTMLDialogElement
            )?.showModal()
          }
        >
          ⓘ
        </button>
      </th>
      {row.values.map((value, cell) => (
        <td key={tools[cell].id}>
          {typeof value === "string" ? (
            value
          ) : (
            <>
              <span className="tool-feature-status">
                {value.included ? "Included" : "—"}
              </span>
              <span className="cell-note">{value.detail}</span>
            </>
          )}
        </td>
      ))}
    </tr>
  );
  return (
    <>
      <main tabIndex={-1}>
        <h1 className="sr-only">{topic.title}</h1>
        <p className="sr-only" id="tool-help">
          {topic.introduction}
        </p>
        <div
          id="comparison"
          className={`table-scroll compact${groups ? " grouped-tool-table" : ""}`}
          role="region"
          aria-label={`${topic.title} comparison`}
          aria-describedby="tool-help"
          tabIndex={0}
        >
          <table style={{ "--provider-count": tools.length } as CSSProperties}>
            <caption className="sr-only">
              {topic.title}: purpose, trade-offs and capabilities
            </caption>
            <thead>
              {groups ? (
                <tr className="tool-group-headers">
                  <th scope="col" rowSpan={2} className="tool-group-corner">
                    Characteristic
                  </th>
                  {groups.map((group) => (
                    <th
                      key={group.label}
                      scope="colgroup"
                      colSpan={group.toolIds.length}
                    >
                      {group.label}
                    </th>
                  ))}
                </tr>
              ) : null}
              <tr className={groups ? "tool-column-headers" : undefined}>
                {!groups ? <th scope="col">Characteristic</th> : null}
                {tools.map((tool) => (
                  <th key={tool.id} id={`tool-${tool.id}`} scope="col">
                    <div className="provider-heading">
                      {tool.logo ? (
                        <img
                          className="provider-logo"
                          src={`/providers/${tool.logo}`}
                          alt=""
                          width="24"
                          height="24"
                        />
                      ) : null}
                      <div>
                        <a href={tool.url}>
                          {tool.name}{" "}
                          <span aria-hidden="true" className="external">
                            ↗
                          </span>
                        </a>
                        <span className="company">
                          {tool.ecosystems.join(" · ")}
                        </span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="section-row">
                <th scope="rowgroup" colSpan={tools.length + 1}>
                  Overview
                </th>
              </tr>
              {rows.slice(0, 4).map(renderRow)}
            </tbody>
            <tbody>
              <tr className="section-row">
                <th scope="rowgroup" colSpan={tools.length + 1}>
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
                    Features
                  </button>
                </th>
              </tr>
            </tbody>
            <tbody
              id="technical-rows"
              aria-labelledby="technical-toggle"
              hidden={!expanded}
            >
              {rows.slice(4).map((row, index) => renderRow(row, index + 4))}
            </tbody>
          </table>
        </div>
        <section className="reading-notes" aria-label="Comparison notes">
          <details className="sources">
            <summary>Notes & sources</summary>
            <p>{topic.note}</p>
            <p>
              License cells show core terms only. Infrastructure, operations,
              paid add-ons and external services depend on your setup; their
              costs are not included or priced here.
            </p>
            <p className="provenance">
              Based on linked official documentation. Capabilities and
              integrations change by version; verify your chosen release. Source
              availability is not proof of a tested integration.
            </p>
            <ul>
              {tools.map((tool) => (
                <li key={tool.id}>
                  <a href={tool.url}>{tool.name} documentation</a>
                  {" · "}
                  <a href={tool.license}>{tool.name} license terms</a>
                </li>
              ))}
              {topic.sources?.map((source) => (
                <li key={source.url}>
                  <a href={source.url}>{source.label}</a>
                </li>
              ))}
            </ul>
          </details>
        </section>
      </main>
      {rows.map((row, index) => (
        <dialog
          key={row.label}
          id={`tool-explanation-${index}`}
          className="combination-dialog"
          aria-labelledby={`tool-explanation-title-${index}`}
          aria-describedby={`tool-explanation-text-${index}`}
          onClick={(event) => {
            if (event.target === event.currentTarget)
              event.currentTarget.close();
          }}
        >
          <div className="combination-dialog-header">
            <h2 id={`tool-explanation-title-${index}`}>{row.label}</h2>
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
            <p id={`tool-explanation-text-${index}`}>{row.explanation}</p>
          </div>
        </dialog>
      ))}
    </>
  );
}
