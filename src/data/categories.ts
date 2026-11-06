/**
 * Owns comparison datasets and the registry used for routes and navigation.
 * @packageDocumentation
 */
import databases from "./databases.json";
import hosting from "./hosting.json";
import authentication from "./authentication.json";
import storage from "./storage.json";
import jobs from "./jobs.json";
import monitoring from "./monitoring.json";

/** Editorial content shared by each comparison page. */
export interface Category {
  label: string;
  title: string;
  path: string;
  data: {
    providers: {
      name: string;
      company: string;
      logo: string;
      url: string;
      pricing?: string;
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
    label: "Authentication",
    title: "Authentication",
    path: "/authentication/",
    data: authentication,
  },
  { label: "Storage", title: "Storage", path: "/storage/", data: storage },
  {
    label: "Jobs & queues",
    title: "Jobs & queues",
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
