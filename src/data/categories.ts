/**
 * Groups comparison topics into categories and derives the shared route registry.
 * @packageDocumentation
 */
import databases from "./databases.json";
import hosting from "./hosting.json";
import authentication from "./authentication.json";
import storage from "./storage.json";
import jobs from "./jobs.json";
import monitoring from "./monitoring.json";
import { selfHostedCategories } from "./selfHosted";

/** Editorial content and route identity for one comparison topic. */
export interface Category {
  label: string;
  title: string;
  path: string;
  selfHosted?: boolean;
  data: {
    providers: {
      name: string;
      company: string;
      logo: string;
      url: string;
      pricing?: string;
      license?: string;
      caveat?: string;
    }[];
    overview: { label: string; values: string[] }[];
    responsibilities: {
      label: string;
      explanation: string;
      values: string[][];
    }[];
  };
}

export const categories: Category[] = [
  {
    label: "Databases",
    title: "Managed databases",
    path: "/",
    data: databases,
  },
  { label: "Hosting", title: "Hosting", path: "/hosting/", data: hosting },
  {
    label: "Sign-in & accounts",
    title: "Sign-in & accounts",
    path: "/authentication/",
    data: authentication,
  },
  { label: "Storage", title: "Storage", path: "/storage/", data: storage },
  {
    label: "Background tasks & queues",
    title: "Background tasks & queues",
    path: "/jobs/",
    data: jobs,
  },
  {
    label: "Monitoring",
    title: "Monitoring",
    path: "/monitoring/",
    data: monitoring,
  },
];

export const combinationsTopic = {
  label: "Common combinations",
  title: "Common combinations",
  path: "/combinations/",
};

export const selfHostedCombinationsTopic = {
  label: "Common combinations",
  title: "Self-hosted combinations",
  path: "/self-hosted/combinations/",
};

export const comparisonCategories = [...categories, ...selfHostedCategories];

export const categoryGroups = [
  {
    label: "Cloud services",
    path: "/",
    topics: [combinationsTopic, ...categories],
  },
  {
    label: "Self-hosted services",
    path: "/self-hosted/databases/",
    topics: [selfHostedCombinationsTopic, ...selfHostedCategories],
  },
];
