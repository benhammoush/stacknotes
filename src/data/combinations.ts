/**
 * Defines the compact association contracts used by application-stack guides.
 * @packageDocumentation
 */

/** One service and equally presented alternatives, not additional dependencies. */
export type CombinationService = [
  name: string,
  logo: string | null,
  url: string | null,
  alternatives?: [
    name: string,
    logo: string,
    url: string,
    providerContext?: string,
  ][],
  providerContext?: string,
];

/** An association's choice guidance, ordered roles and integration boundaries. */
export interface Combination {
  id: string;
  name: string;
  sourceUrl: string;
  whenToChoose: string;
  services: CombinationService[];
  note: string;
}
