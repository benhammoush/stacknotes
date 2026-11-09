/**
 * Calculates categorical differences without comparing editorial note text.
 * @packageDocumentation
 */

/**
 * Mark status labels less common than the row's most frequent label.
 * @param statuses - Labels only; explanatory notes never affect the comparison.
 * @returns One cue per cell; uniform rows and tied maxima remain neutral.
 */
export function differences(statuses: string[]): boolean[] {
  const counts = new Map<string, number>();
  for (const status of statuses)
    counts.set(status, (counts.get(status) ?? 0) + 1);
  const maximum = Math.max(0, ...counts.values());
  return statuses.map((status) => counts.get(status)! < maximum);
}
