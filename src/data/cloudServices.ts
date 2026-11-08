/**
 * Lists selected first-party cloud offerings, not recommended service combinations.
 * @packageDocumentation
 */

export const cloudServiceRoles = [
  { id: "hosting", label: "Hosting", path: "/hosting/" },
  { id: "database", label: "Database", path: "/" },
  { id: "auth", label: "Sign-in & accounts", path: "/authentication/" },
  { id: "storage", label: "Storage", path: "/storage/" },
  { id: "jobs", label: "Background tasks & queues", path: "/jobs/" },
  { id: "monitoring", label: "Monitoring", path: "/monitoring/" },
  { id: "caching", label: "Caching", path: "/caching/" },
  { id: "search", label: "Search", path: "/search/" },
] as const;

/** A provider-owned product or platform capability with its official documentation. */
interface CloudOffering {
  name: string;
  url: string;
  note?: string;
}

/** One provider or branded platform; omitted categories have no scoped offering listed. */
export interface CloudProvider {
  id: string;
  name: string;
  logo: string;
  services: Partial<
    Record<(typeof cloudServiceRoles)[number]["id"], CloudOffering[]>
  >;
}

// Firebase retains its own branded platform row within Google Cloud.
const providerCatalog: CloudProvider[] = [
  {
    id: "algolia",
    name: "Algolia",
    logo: "algolia.svg",
    services: {
      search: [{ name: "Algolia Search", url: "https://www.algolia.com/doc/" }],
    },
  },
  {
    id: "aws",
    name: "AWS",
    logo: "aws.svg",
    services: {
      hosting: [
        {
          name: "Amazon ECS",
          url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html",
        },
      ],
      database: [
        {
          name: "PostgreSQL",
          url: "https://aws.amazon.com/rds/postgresql/",
          note: "Amazon RDS",
        },
      ],
      auth: [
        { name: "Amazon Cognito", url: "https://aws.amazon.com/cognito/" },
      ],
      storage: [{ name: "Amazon S3", url: "https://aws.amazon.com/s3/" }],
      jobs: [
        {
          name: "Amazon SQS",
          url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
        },
        {
          name: "AWS Lambda",
          url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
        },
      ],
      monitoring: [
        { name: "CloudWatch", url: "https://aws.amazon.com/cloudwatch/" },
      ],
      caching: [
        {
          name: "ElastiCache",
          url: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html",
          note: "Valkey, Redis OSS or Memcached",
        },
      ],
      search: [
        {
          name: "OpenSearch Service",
          url: "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html",
        },
      ],
    },
  },
  {
    id: "azure",
    name: "Azure",
    logo: "microsoft.svg",
    services: {
      hosting: [
        {
          name: "App Service",
          url: "https://learn.microsoft.com/en-us/azure/app-service/overview",
        },
      ],
      database: [
        {
          name: "Azure SQL Database",
          url: "https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview",
        },
      ],
      auth: [
        {
          name: "Entra External ID",
          url: "https://learn.microsoft.com/en-us/entra/external-id/customers/overview-customers-ciam",
        },
      ],
      storage: [
        {
          name: "Blob Storage",
          url: "https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview",
        },
      ],
      jobs: [
        {
          name: "Service Bus",
          url: "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview",
        },
        {
          name: "Azure Functions",
          url: "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview",
        },
      ],
      monitoring: [
        {
          name: "Azure Monitor",
          url: "https://learn.microsoft.com/en-us/azure/azure-monitor/overview",
        },
      ],
      caching: [
        {
          name: "Azure Managed Redis",
          url: "https://learn.microsoft.com/en-us/azure/redis/overview",
        },
      ],
      search: [
        {
          name: "Azure AI Search",
          url: "https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search",
        },
      ],
    },
  },
  {
    id: "clerk",
    name: "Clerk",
    logo: "clerk.svg",
    services: {
      auth: [{ name: "Clerk Authentication", url: "https://clerk.com/docs" }],
    },
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    logo: "cloudflare.svg",
    services: {
      hosting: [
        {
          name: "Workers & Static Assets",
          url: "https://developers.cloudflare.com/workers/static-assets/",
        },
      ],
      database: [{ name: "D1", url: "https://developers.cloudflare.com/d1/" }],
      storage: [{ name: "R2", url: "https://developers.cloudflare.com/r2/" }],
      jobs: [
        { name: "Queues", url: "https://developers.cloudflare.com/queues/" },
        {
          name: "Workflows",
          url: "https://developers.cloudflare.com/workflows/",
        },
      ],
      monitoring: [
        {
          name: "Workers Observability",
          url: "https://developers.cloudflare.com/workers/observability/",
          note: "Workers logs and metrics",
        },
      ],
      caching: [
        {
          name: "Workers Cache",
          url: "https://developers.cloudflare.com/workers/cache/",
          note: "HTTP response cache",
        },
      ],
      search: [
        {
          name: "AI Search",
          url: "https://developers.cloudflare.com/ai-search/",
          note: "Managed content retrieval",
        },
      ],
    },
  },
  {
    id: "digitalocean",
    name: "DigitalOcean",
    logo: "digitalocean.svg",
    services: {
      hosting: [
        {
          name: "App Platform",
          url: "https://docs.digitalocean.com/products/app-platform/",
        },
      ],
      database: [
        {
          name: "PostgreSQL",
          url: "https://docs.digitalocean.com/products/databases/postgresql/",
        },
      ],
      storage: [
        {
          name: "Spaces",
          url: "https://docs.digitalocean.com/products/spaces/",
        },
      ],
      jobs: [
        {
          name: "App Platform workers",
          url: "https://docs.digitalocean.com/products/app-platform/how-to/manage-workers/",
          note: "Runs your worker code",
        },
      ],
      monitoring: [
        {
          name: "App Platform metrics",
          url: "https://docs.digitalocean.com/products/app-platform/how-to/manage-observability/",
        },
      ],
      caching: [
        {
          name: "Managed Valkey",
          url: "https://docs.digitalocean.com/products/databases/valkey/",
        },
      ],
    },
  },
  {
    id: "elastic",
    name: "Elastic",
    logo: "elastic.svg",
    services: {
      monitoring: [
        {
          name: "Elastic Observability",
          url: "https://www.elastic.co/docs/solutions/observability",
        },
      ],
      search: [
        {
          name: "Elastic Cloud",
          url: "https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud",
        },
      ],
    },
  },
  {
    id: "firebase",
    name: "Firebase",
    logo: "firebase.svg",
    services: {
      hosting: [
        {
          name: "Firebase Hosting",
          url: "https://firebase.google.com/docs/hosting",
        },
      ],
      database: [
        {
          name: "Cloud Firestore",
          url: "https://firebase.google.com/docs/firestore",
        },
      ],
      auth: [
        {
          name: "Firebase Authentication",
          url: "https://firebase.google.com/docs/auth",
        },
      ],
      storage: [
        {
          name: "Cloud Storage for Firebase",
          url: "https://firebase.google.com/docs/storage",
        },
      ],
      jobs: [
        {
          name: "Cloud Functions for Firebase",
          url: "https://firebase.google.com/docs/functions",
          note: "Event-driven backend code",
        },
      ],
      monitoring: [
        {
          name: "Performance Monitoring",
          url: "https://firebase.google.com/docs/perf-mon",
          note: "App performance SDK",
        },
      ],
    },
  },
  {
    id: "google-cloud",
    name: "Google Cloud",
    logo: "google-cloud.svg",
    services: {
      hosting: [
        {
          name: "Cloud Run",
          url: "https://cloud.google.com/run/docs/overview/what-is-cloud-run",
        },
      ],
      database: [
        {
          name: "PostgreSQL",
          url: "https://cloud.google.com/sql/docs/postgres/introduction",
          note: "Cloud SQL",
        },
      ],
      auth: [
        {
          name: "Identity Platform",
          url: "https://cloud.google.com/identity-platform/docs",
        },
      ],
      storage: [
        { name: "Cloud Storage", url: "https://cloud.google.com/storage/docs" },
      ],
      jobs: [
        {
          name: "Cloud Tasks",
          url: "https://cloud.google.com/tasks/docs/dual-overview",
        },
      ],
      monitoring: [
        {
          name: "Cloud Monitoring",
          url: "https://cloud.google.com/monitoring/docs",
        },
      ],
      caching: [
        {
          name: "Memorystore for Valkey",
          url: "https://docs.cloud.google.com/memorystore/docs/valkey",
        },
      ],
      search: [
        {
          name: "Agent Search",
          url: "https://docs.cloud.google.com/generative-ai-app-builder/docs/introduction",
          note: "Formerly Vertex AI Search",
        },
      ],
    },
  },
  {
    id: "inngest",
    name: "Inngest",
    logo: "inngest.svg",
    services: {
      jobs: [
        {
          name: "Inngest",
          url: "https://www.inngest.com/docs",
          note: "Durable execution and workflows",
        },
      ],
    },
  },
  {
    id: "neon",
    name: "Neon",
    logo: "neon.svg",
    services: {
      hosting: [
        {
          name: "Neon Functions",
          url: "https://neon.com/docs/compute/functions/overview",
          note: "Backend functions, not website hosting",
        },
      ],
      database: [
        { name: "PostgreSQL", url: "https://neon.com/docs/introduction" },
      ],
      auth: [
        {
          name: "Managed Better Auth",
          url: "https://neon.com/docs/auth/overview",
        },
      ],
      storage: [
        {
          name: "Neon Object Storage",
          url: "https://neon.com/docs/storage/overview",
        },
      ],
      jobs: [
        {
          name: "Function Triggers",
          url: "https://neon.com/docs/compute/functions/triggers/overview",
          note: "Scheduled and storage-triggered functions; not a queue",
        },
      ],
      monitoring: [
        {
          name: "Function logs",
          url: "https://neon.com/docs/compute/functions/logs",
        },
      ],
    },
  },
  {
    id: "railway",
    name: "Railway",
    logo: "railway.svg",
    services: {
      hosting: [
        {
          name: "Railway services",
          url: "https://docs.railway.com/guides/services",
        },
      ],
      database: [
        {
          name: "PostgreSQL",
          url: "https://docs.railway.com/databases/postgresql",
          note: "Deployed database template",
        },
      ],
      storage: [
        {
          name: "Railway Buckets",
          url: "https://docs.railway.com/guides/storage-buckets",
        },
      ],
      jobs: [
        {
          name: "Cron jobs",
          url: "https://docs.railway.com/guides/cron-jobs",
          note: "Runs your scheduled service",
        },
      ],
      monitoring: [
        {
          name: "Railway metrics",
          url: "https://docs.railway.com/guides/metrics",
        },
      ],
      caching: [
        {
          name: "Redis",
          url: "https://docs.railway.com/guides/redis",
          note: "Deployed database template",
        },
      ],
    },
  },
  {
    id: "render",
    name: "Render",
    logo: "render.svg",
    services: {
      hosting: [
        { name: "Web Services", url: "https://render.com/docs/web-services" },
      ],
      database: [
        { name: "PostgreSQL", url: "https://render.com/docs/postgresql" },
      ],
      jobs: [
        {
          name: "Background workers",
          url: "https://render.com/docs/background-workers",
          note: "Runs your worker code",
        },
      ],
      monitoring: [
        {
          name: "Render metrics",
          url: "https://render.com/docs/service-metrics",
        },
      ],
      caching: [
        {
          name: "Render Key Value",
          url: "https://render.com/docs/key-value",
          note: "Valkey-compatible store",
        },
      ],
    },
  },
  {
    id: "sentry",
    name: "Sentry",
    logo: "sentry.svg",
    services: {
      monitoring: [
        {
          name: "Sentry",
          url: "https://docs.sentry.io/",
          note: "Errors and application performance",
        },
      ],
    },
  },
  {
    id: "supabase",
    name: "Supabase",
    logo: "supabase.svg",
    services: {
      hosting: [
        {
          name: "Edge Functions",
          url: "https://supabase.com/docs/guides/functions",
          note: "Server functions, not website hosting",
        },
      ],
      database: [
        {
          name: "PostgreSQL",
          url: "https://supabase.com/docs/guides/database",
        },
      ],
      auth: [
        { name: "Supabase Auth", url: "https://supabase.com/docs/guides/auth" },
      ],
      storage: [
        {
          name: "Supabase Storage",
          url: "https://supabase.com/docs/guides/storage",
        },
      ],
      jobs: [
        {
          name: "Supabase Queues",
          url: "https://supabase.com/docs/guides/queues",
        },
        { name: "Supabase Cron", url: "https://supabase.com/docs/guides/cron" },
      ],
      monitoring: [
        {
          name: "Logs in Studio",
          url: "https://supabase.com/docs/guides/observability/logs",
          note: "Project service logs",
        },
      ],
    },
  },
  {
    id: "trigger",
    name: "Trigger.dev",
    logo: "trigger.ico",
    services: {
      jobs: [
        {
          name: "Trigger.dev tasks",
          url: "https://trigger.dev/docs",
          note: "Background tasks and scheduling",
        },
      ],
    },
  },
  {
    id: "typesense",
    name: "Typesense",
    logo: "typesense.png",
    services: {
      search: [
        {
          name: "Typesense Cloud",
          url: "https://typesense.org/docs/guide/install-typesense.html",
        },
      ],
    },
  },
  {
    id: "upstash",
    name: "Upstash",
    logo: "upstash.svg",
    services: {
      caching: [
        {
          name: "Upstash Redis",
          url: "https://upstash.com/docs/redis/overall/getstarted",
        },
      ],
      jobs: [
        {
          name: "QStash",
          url: "https://upstash.com/docs/qstash/overall/getstarted",
          note: "HTTP messaging and scheduling",
        },
      ],
    },
  },
  {
    id: "vercel",
    name: "Vercel",
    logo: "vercel.svg",
    services: {
      hosting: [
        { name: "Vercel Functions", url: "https://vercel.com/docs/functions" },
        { name: "Vercel CDN", url: "https://vercel.com/docs/cdn" },
      ],
      storage: [
        { name: "Vercel Blob", url: "https://vercel.com/docs/vercel-blob" },
      ],
      jobs: [
        {
          name: "Schedules",
          url: "https://vercel.com/docs/schedules",
          note: "Beta",
        },
        { name: "Queues", url: "https://vercel.com/docs/queues", note: "Beta" },
      ],
      monitoring: [
        {
          name: "Vercel Observability",
          url: "https://vercel.com/docs/observability",
        },
      ],
      caching: [
        {
          name: "Runtime Cache",
          url: "https://vercel.com/docs/caching/runtime-cache",
          note: "Ephemeral data cache",
        },
      ],
    },
  },
];

/**
 * Count represented categories once, regardless of how many products a cell lists.
 * @param provider - A provider in this scoped inventory.
 * @returns The number of nonempty service categories, not an overall quality score.
 */
function listedCategoryCount(provider: CloudProvider) {
  return cloudServiceRoles.filter(({ id }) => provider.services[id]?.length)
    .length;
}

export const cloudProviders = providerCatalog.sort(
  (a, b) =>
    listedCategoryCount(b) - listedCategoryCount(a) ||
    a.name.localeCompare(b.name, "en"),
);
