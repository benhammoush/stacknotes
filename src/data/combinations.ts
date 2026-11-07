/**
 * Defines ten suggested combinations with official service links and scoped company evidence.
 * @packageDocumentation
 */

/** A published account of specific services, not proof of a company's whole stack. */
interface CompanyExample {
  company: string;
  product: string;
  productUrl?: string;
  url: string;
  publisher: string;
  published?: string;
  confirmed: string;
  limitation: string;
}

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

/** A combination's choice guidance, ordered roles, setup boundary and evidence. */
export interface Combination {
  id: string;
  name: string;
  whenToChoose: string;
  services: CombinationService[];
  note: string;
  example?: CompanyExample;
}

export const combinationRoles = [
  { label: "Hosting", path: "/hosting/" },
  { label: "Database", path: "/" },
  { label: "Sign-in & accounts", path: "/authentication/" },
  { label: "Storage", path: "/storage/" },
  { label: "Background tasks & queues", path: "/jobs/" },
  { label: "Monitoring", path: "/monitoring/" },
  { label: "Caching", path: "/caching/" },
  { label: "Search", path: "/search/" },
];

// Editorial order uses broad platform adoption, not measured combination usage.
export const combinations: (Combination & {
  example: CompanyExample;
})[] = [
  {
    id: "aws",
    name: "AWS",
    whenToChoose:
      "Fits container-based apps that need a wide choice of cloud services and detailed control. Keeping the main services on AWS can simplify provider management.",
    services: [
      [
        "ECS Express Mode",
        "aws.svg",
        "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/express-service-overview.html",
      ],
      [
        "PostgreSQL",
        "aws.svg",
        "https://aws.amazon.com/rds/postgresql/",
        undefined,
        "Within AWS",
      ],
      [
        "Amazon Cognito",
        "aws.svg",
        "https://aws.amazon.com/cognito/",
        undefined,
        "Within AWS",
      ],
      [
        "Amazon S3",
        "aws.svg",
        "https://aws.amazon.com/s3/",
        undefined,
        "Within AWS",
      ],
      [
        "SQS + Lambda",
        "aws.svg",
        "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
        undefined,
        "Within AWS",
      ],
      [
        "CloudWatch",
        "aws.svg",
        "https://aws.amazon.com/cloudwatch/",
        undefined,
        "Within AWS",
      ],
      [
        "Redis or Valkey",
        "aws.svg",
        "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html",
        undefined,
        "Within AWS",
      ],
      [
        "OpenSearch Service",
        "aws.svg",
        "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html",
        undefined,
        "Within AWS",
      ],
    ],
    note: "There is more setup than with a small app platform. You connect service permissions and networking, track separate charges, and still control who can access your app's data.",
    example: {
      company: "Duolingo",
      product: "Duolingo",
      productUrl: "https://www.duolingo.com/",
      url: "https://blog.duolingo.com/reducing-cloud-spending/",
      publisher: "Duolingo Engineering",
      published: "2024-10-30",
      confirmed:
        "RDS/Aurora, S3 and CloudWatch are discussed in Duolingo’s cloud cost review.",
      limitation:
        "Not evidence of ECS Express Mode, the PostgreSQL database engine, Cognito or SQS + Lambda in this suggested combination.",
    },
  },
  {
    id: "azure",
    name: "Azure",
    whenToChoose:
      "A natural fit for teams already using Microsoft tools and SQL Server. App hosting, customer accounts and file storage stay within Azure.",
    services: [
      [
        "Azure App Service",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/azure/app-service/overview",
      ],
      [
        "Azure SQL Database",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview",
        undefined,
        "Within Azure",
      ],
      [
        "Entra External ID",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/entra/external-id/customers/overview-customers-ciam",
        undefined,
        "Within Azure",
      ],
      [
        "Azure Blob Storage",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview",
        undefined,
        "Within Azure",
      ],
      [
        "Service Bus + Functions",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-service-bus",
        undefined,
        "Within Azure",
      ],
      [
        "Azure Monitor",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/azure/azure-monitor/overview",
        undefined,
        "Within Azure",
      ],
      [
        "Redis",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/azure/redis/overview",
        undefined,
        "Within Azure",
      ],
      [
        "Elastic Cloud",
        "elastic.svg",
        "https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud",
        [
          [
            "Algolia",
            "algolia.svg",
            "https://www.algolia.com/doc/guides/getting-started/what-is-algolia/",
            "External · Algolia",
          ],
          [
            "Typesense Cloud",
            "typesense.png",
            "https://typesense.org/docs/guide/syncing-data-into-typesense.html",
            "External · Typesense",
          ],
        ],
        "External · Elastic",
      ],
    ],
    note: "These are separate services, not one finished backend. You still connect sign-in, set access rules and build the code that processes background work, with separate usage charges.",
    example: {
      company: "Alaska Airlines",
      product: "Hopper (Alaska Airlines, internal app)",
      url: "https://azure.microsoft.com/en-us/blog/building-the-intelligent-cloud-announcing-new-azure-innovations-to-transform-business/",
      publisher: "Microsoft Azure Blog",
      published: "2015-09-29",
      confirmed:
        "App Service + Azure SQL Database for the employee-facing Hopper app.",
      limitation:
        "Historical example, not a current architecture report. Does not confirm Entra External ID or the other services in this row.",
    },
  },
  {
    id: "google-cloud",
    name: "Google Cloud",
    whenToChoose:
      "Fits apps that need flexible container hosting and a traditional SQL database. The app can scale separately from the database's capacity.",
    services: [
      ["Cloud Run", "google-cloud.svg", "https://cloud.google.com/run"],
      [
        "PostgreSQL",
        "google-cloud.svg",
        "https://cloud.google.com/sql/docs/postgres/connect-run",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Identity Platform",
        "google-cloud.svg",
        "https://cloud.google.com/identity-platform/docs",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Cloud Storage",
        "google-cloud.svg",
        "https://cloud.google.com/storage/docs",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Cloud Tasks + Cloud Run",
        "google-cloud.svg",
        "https://cloud.google.com/run/docs/triggering/using-tasks",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Cloud Monitoring",
        "google-cloud.svg",
        "https://cloud.google.com/monitoring/docs",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Valkey",
        "google-cloud.svg",
        "https://docs.cloud.google.com/memorystore/docs/valkey",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Elastic Cloud",
        "elastic.svg",
        "https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud",
        [
          [
            "Algolia",
            "algolia.svg",
            "https://www.algolia.com/doc/guides/getting-started/what-is-algolia/",
            "External · Algolia",
          ],
          [
            "Typesense Cloud",
            "typesense.png",
            "https://typesense.org/docs/guide/syncing-data-into-typesense.html",
            "External · Typesense",
          ],
        ],
        "External · Elastic",
      ],
    ],
    note: "Cloud Run runs your app code, while Cloud SQL supplies PostgreSQL. You connect them and set access rules; a growing app can still hit database limits and separate database charges.",
    example: {
      company: "Replit",
      product: "Replit",
      productUrl: "https://replit.com/",
      url: "https://cloud.google.com/customers/replit",
      publisher: "Google Cloud customer story",
      confirmed:
        "Cloud Run for deploying users’ apps and Cloud SQL among Replit’s data services.",
      limitation:
        "The story describes different parts of Replit’s platform, not this exact application design. It does not confirm the Cloud SQL database engine or the full row.",
    },
  },
  {
    id: "firebase",
    name: "Firebase + Google Cloud",
    whenToChoose:
      "Fits web or mobile apps whose data works well as documents. Firebase's client tools connect sign-in, file uploads and data access without building every backend feature yourself.",
    services: [
      [
        "Firebase Hosting + Cloud Run",
        "firebase.svg",
        "https://firebase.google.com/docs/hosting/serverless-overview",
      ],
      [
        "Cloud Firestore",
        "firebase.svg",
        "https://firebase.google.com/docs/firestore",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Firebase Authentication",
        "firebase.svg",
        "https://firebase.google.com/docs/auth",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Cloud Storage for Firebase",
        "firebase.svg",
        "https://firebase.google.com/docs/storage",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Cloud Tasks + Cloud Run",
        "google-cloud.svg",
        "https://cloud.google.com/run/docs/triggering/using-tasks",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Cloud Monitoring",
        "google-cloud.svg",
        "https://cloud.google.com/monitoring/docs",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Valkey",
        "google-cloud.svg",
        "https://docs.cloud.google.com/memorystore/docs/valkey",
        undefined,
        "Within Google Cloud",
      ],
      [
        "Algolia",
        "algolia.svg",
        "https://github.com/algolia/firestore-algolia-search",
        undefined,
        "External · Algolia",
      ],
    ],
    note: "The document model needs to fit your queries. You still write careful access rules; browser-file hosting alone does not run your server code, so Cloud Run is included here. External search needs synchronized records and permission checks; Algolia's sync extension requires Firebase's paid billing plan.",
    example: {
      company: "Le Figaro",
      product: "Le Figaro interactive articles",
      productUrl: "https://www.lefigaro.fr/",
      url: "https://firebase.google.com/case-studies/le-figaro",
      publisher: "Firebase case study",
      confirmed:
        "Firestore + Cloud Functions for interactive infographics in web and mobile articles.",
      limitation:
        "Only Firestore overlaps this row directly. Cloud Functions is used in the example; Firebase Hosting, Cloud Run and the remaining services are not established by it.",
    },
  },
  {
    id: "vercel-supabase",
    name: "Vercel + Supabase",
    whenToChoose:
      "Keeps your database, sign-in and file storage in one backend, with Vercel serving the web app. There are fewer independent services to connect.",
    services: [
      ["Vercel", "vercel.svg", "https://vercel.com/docs"],
      [
        "PostgreSQL",
        "supabase.svg",
        "https://supabase.com/docs/guides/database",
        undefined,
        "External · Supabase",
      ],
      [
        "Supabase Auth",
        "supabase.svg",
        "https://supabase.com/docs/guides/auth",
        undefined,
        "External · Supabase",
      ],
      [
        "Supabase Storage",
        "supabase.svg",
        "https://supabase.com/docs/guides/storage",
        undefined,
        "External · Supabase",
      ],
      [
        "Trigger.dev",
        "trigger.ico",
        "https://trigger.dev/docs/guides/frameworks/nextjs",
        undefined,
        "External · Trigger.dev",
      ],
      [
        "Sentry",
        "sentry.svg",
        "https://docs.sentry.io/platforms/javascript/guides/nextjs/",
        undefined,
        "External · Sentry",
      ],
      [
        "Redis",
        "upstash.svg",
        "https://upstash.com/docs/redis/overall/getstarted",
        undefined,
        "External · Upstash",
      ],
      [
        "Algolia",
        "algolia.svg",
        "https://supabase.com/partners/integrations/algolia",
        undefined,
        "External · Algolia",
      ],
    ],
    note: "There is less freedom to pick each backend feature independently. You still set up who can read each record and file, and connect a separate background-job service.",
    example: {
      company: "Resend",
      product: "Resend",
      productUrl: "https://resend.com/",
      url: "https://supabase.com/blog/supabase-vercel-partnership",
      publisher: "Supabase, quoting Resend’s CEO",
      published: "2024-08-28",
      confirmed:
        "Resend’s CEO explicitly confirms using Vercel and Supabase together.",
      limitation:
        "Does not establish use of Supabase Auth, Supabase Storage, Trigger.dev or Sentry.",
    },
  },
  {
    id: "vercel-neon-clerk",
    name: "Vercel + Neon + Clerk",
    whenToChoose:
      "Fits apps where the database, user accounts and files need separate choices. Each service can evolve independently instead of being tied to one backend suite.",
    services: [
      ["Vercel", "vercel.svg", "https://vercel.com/docs"],
      [
        "PostgreSQL",
        "neon.svg",
        "https://neon.com/docs/guides/vercel",
        undefined,
        "External · Neon",
      ],
      [
        "Clerk",
        "clerk.svg",
        "https://clerk.com/docs/nextjs/getting-started/quickstart",
        undefined,
        "External · Clerk",
      ],
      [
        "Cloudflare R2",
        "cloudflare.svg",
        "https://developers.cloudflare.com/r2/",
        undefined,
        "External · Cloudflare",
      ],
      [
        "Inngest",
        "inngest.svg",
        "https://www.inngest.com/docs/deploy/vercel",
        undefined,
        "External · Inngest",
      ],
      [
        "Sentry",
        "sentry.svg",
        "https://docs.sentry.io/platforms/javascript/guides/nextjs/",
        undefined,
        "External · Sentry",
      ],
      [
        "Redis",
        "upstash.svg",
        "https://upstash.com/docs/redis/overall/getstarted",
        undefined,
        "External · Upstash",
      ],
      [
        "Typesense Cloud",
        "typesense.png",
        "https://typesense.org/docs/guide/install-typesense.html",
        [
          [
            "Algolia",
            "algolia.svg",
            "https://www.algolia.com/doc/guides/getting-started/what-is-algolia/",
            "External · Algolia",
          ],
        ],
        "External · Typesense",
      ],
    ],
    note: "More services means more connections to maintain. Your app must link Clerk users to database records and file permissions, and connect its background jobs separately.",
    example: {
      company: "Neptune",
      product: "Neptune",
      productUrl: "https://meetneptune.com/",
      url: "https://neon.com/blog/neptune-built-a-fast-serverless-backend-with-neon-and-vercel",
      publisher: "Neon case study",
      published: "2025-08-13",
      confirmed:
        "A Next.js app hosted on Vercel with Neon as its primary database.",
      limitation:
        "Does not establish Clerk, R2, Inngest or Sentry. This is evidence for the hosting/database pair, not the full combination.",
    },
  },
  {
    id: "cloudflare-clerk",
    name: "Cloudflare + Clerk",
    whenToChoose:
      "Keeps browser files, server code, SQL data, file storage and queues on Cloudflare. It suits apps that fit the Workers runtime and a SQLite-style database.",
    services: [
      [
        "Workers + Static Assets",
        "cloudflare.svg",
        "https://developers.cloudflare.com/workers/static-assets/",
      ],
      [
        "D1",
        "cloudflare.svg",
        "https://developers.cloudflare.com/d1/",
        undefined,
        "Within Cloudflare",
      ],
      [
        "Clerk",
        "clerk.svg",
        "https://clerk.com/docs/references/backend/overview",
        undefined,
        "External · Clerk",
      ],
      [
        "R2",
        "cloudflare.svg",
        "https://developers.cloudflare.com/r2/",
        undefined,
        "Within Cloudflare",
      ],
      [
        "Queues + Workers",
        "cloudflare.svg",
        "https://developers.cloudflare.com/queues/",
        undefined,
        "Within Cloudflare",
      ],
      [
        "Workers Observability",
        "cloudflare.svg",
        "https://developers.cloudflare.com/workers/observability/",
        undefined,
        "Within Cloudflare",
      ],
      [
        "Redis",
        "upstash.svg",
        "https://upstash.com/docs/redis/features/restapi",
        undefined,
        "External · Upstash",
      ],
      [
        "Algolia",
        "algolia.svg",
        "https://www.algolia.com/doc/guides/getting-started/what-is-algolia/",
        [
          [
            "Typesense Cloud",
            "typesense.png",
            "https://typesense.org/docs/guide/syncing-data-into-typesense.html",
            "External · Typesense",
          ],
        ],
        "External · Algolia",
      ],
    ],
    note: "Workers is not a general-purpose server, and D1 has database limits to check. Clerk remains a separate sign-in service; your app still enforces data and file permissions.",
    example: {
      company: "New Harbor",
      product: "New Harbor",
      productUrl: "https://newharbor.co/",
      url: "https://www.cloudflare.com/case-studies/new-harbor/",
      publisher: "Cloudflare customer story",
      confirmed:
        "The story describes Workers and lists D1, R2 and Queues among New Harbor’s Cloudflare products.",
      limitation:
        "Does not establish Clerk, Static Assets or Workers Observability, or how all listed products are connected.",
    },
  },
  {
    id: "digitalocean",
    name: "DigitalOcean + Clerk",
    whenToChoose:
      "Keeps app hosting, workers, managed PostgreSQL and file storage with one infrastructure provider. Useful when you want to run an app without maintaining its servers.",
    services: [
      [
        "App Platform",
        "digitalocean.svg",
        "https://docs.digitalocean.com/products/app-platform/",
      ],
      [
        "PostgreSQL",
        "digitalocean.svg",
        "https://docs.digitalocean.com/products/databases/postgresql/",
        undefined,
        "Within DigitalOcean",
      ],
      [
        "Clerk",
        "clerk.svg",
        "https://clerk.com/docs/references/backend/overview",
        undefined,
        "External · Clerk",
      ],
      [
        "Spaces",
        "digitalocean.svg",
        "https://docs.digitalocean.com/products/spaces/",
        undefined,
        "Within DigitalOcean",
      ],
      [
        "App Platform workers",
        "digitalocean.svg",
        "https://docs.digitalocean.com/products/app-platform/how-to/manage-workers/",
        undefined,
        "Within DigitalOcean",
      ],
      [
        "App Platform metrics",
        "digitalocean.svg",
        "https://docs.digitalocean.com/products/app-platform/how-to/manage-observability/",
        undefined,
        "Within DigitalOcean",
      ],
      [
        "Valkey",
        "valkey.png",
        "https://docs.digitalocean.com/products/databases/valkey/",
        [
          [
            "Redis",
            "upstash.svg",
            "https://upstash.com/docs/redis/overall/getstarted",
            "External · Upstash",
          ],
        ],
        "Within DigitalOcean",
      ],
      [
        "Typesense Cloud",
        "typesense.png",
        "https://typesense.org/docs/guide/syncing-data-into-typesense.html",
        [
          [
            "Algolia",
            "algolia.svg",
            "https://www.algolia.com/doc/guides/getting-started/what-is-algolia/",
            "External · Algolia",
          ],
        ],
        "External · Typesense",
      ],
    ],
    note: "Use Managed PostgreSQL for production, not the small development database. Workers run code you supply; a queue may still be needed. You connect Clerk and configure access to files yourself.",
    example: {
      company: "Picap",
      product: "Picap",
      productUrl: "https://www.picap.app/",
      url: "https://www.digitalocean.com/customers/picap",
      publisher: "DigitalOcean customer story",
      confirmed:
        "App Platform + Managed Databases, explicitly including Postgres.",
      limitation:
        "Does not establish Clerk, Spaces, worker components or the monitoring setup in this row.",
    },
  },
  {
    id: "render",
    name: "Render + Clerk",
    whenToChoose:
      "Fits apps with web services and task workers that stay running. Hosting and managed PostgreSQL live together, with separate choices for accounts and file storage.",
    services: [
      [
        "Render Web Services",
        "render.svg",
        "https://render.com/docs/web-services",
      ],
      [
        "PostgreSQL",
        "render.svg",
        "https://render.com/docs/postgresql",
        undefined,
        "Within Render",
      ],
      [
        "Clerk",
        "clerk.svg",
        "https://clerk.com/docs/references/backend/overview",
        undefined,
        "External · Clerk",
      ],
      [
        "Amazon S3",
        "aws.svg",
        "https://aws.amazon.com/s3/",
        undefined,
        "External · AWS",
      ],
      [
        "Background workers + Key Value",
        "render.svg",
        "https://render.com/docs/background-workers",
        undefined,
        "Within Render",
      ],
      [
        "Render metrics",
        "render.svg",
        "https://render.com/docs/service-metrics",
        undefined,
        "Within Render",
      ],
      [
        "Valkey",
        "render.svg",
        "https://render.com/docs/key-value",
        undefined,
        "Within Render",
      ],
      [
        "Typesense Cloud",
        "typesense.png",
        "https://typesense.org/docs/guide/syncing-data-into-typesense.html",
        [
          [
            "Algolia",
            "algolia.svg",
            "https://www.algolia.com/doc/guides/getting-started/what-is-algolia/",
            "External · Algolia",
          ],
        ],
        "External · Typesense",
      ],
    ],
    note: "You still write the task-processing code and connect Clerk and S3. Files saved on an app's local disk are not automatically shared file storage or safe from replacement.",
    example: {
      company: "Hamilton AI",
      product: "Hamilton AI",
      productUrl: "https://www.hamilton.ai/",
      url: "https://render.com/customers/hamiltonai",
      publisher: "Render customer story",
      confirmed:
        "Web services, background workers, Postgres and Redis for background pipelines.",
      limitation:
        "Does not establish Clerk, S3 or the monitoring setup. The story calls its queue store Redis; it does not name Render Key Value explicitly.",
    },
  },
  {
    id: "railway",
    name: "Railway + Clerk",
    whenToChoose:
      "Groups app services, a PostgreSQL service and scheduled jobs in one project. Useful for getting connected services running without managing separate servers.",
    services: [
      [
        "Railway services",
        "railway.svg",
        "https://docs.railway.com/guides/services",
      ],
      [
        "PostgreSQL",
        "railway.svg",
        "https://docs.railway.com/databases/postgresql",
        undefined,
        "Within Railway",
      ],
      [
        "Clerk",
        "clerk.svg",
        "https://clerk.com/docs/references/backend/overview",
        undefined,
        "External · Clerk",
      ],
      [
        "Railway Buckets",
        "railway.svg",
        "https://docs.railway.com/guides/storage-buckets",
        undefined,
        "Within Railway",
      ],
      [
        "Services + cron jobs",
        "railway.svg",
        "https://docs.railway.com/guides/cron-jobs",
        undefined,
        "Within Railway",
      ],
      [
        "Railway metrics",
        "railway.svg",
        "https://docs.railway.com/guides/metrics",
        undefined,
        "Within Railway",
      ],
      [
        "Redis",
        "railway.svg",
        "https://docs.railway.com/guides/redis",
        [
          [
            "Redis",
            "upstash.svg",
            "https://upstash.com/docs/redis/overall/getstarted",
            "External · Upstash",
          ],
        ],
        "Within Railway",
      ],
      [
        "Typesense Cloud",
        "typesense.png",
        "https://typesense.org/docs/guide/syncing-data-into-typesense.html",
        [
          [
            "Algolia",
            "algolia.svg",
            "https://www.algolia.com/doc/guides/getting-started/what-is-algolia/",
            "External · Algolia",
          ],
        ],
        "External · Typesense",
      ],
    ],
    note: "The default PostgreSQL service runs on one node. Configure backups and any extra protection against downtime. Buckets are private, so serve files through signed links or your app, and connect Clerk separately.",
    example: {
      company: "Bilt Rewards",
      product: "Bilt experiences",
      productUrl: "https://www.bilt.com/rewards/experiences",
      url: "https://blog.railway.com/p/bilt-deliver-scale",
      publisher: "Railway customer story",
      published: "2025-12-07",
      confirmed:
        "Railway hosting for Bilt’s marketing engineering team’s apps and backend projects.",
      limitation:
        "Hosting-only example: does not establish PostgreSQL, Clerk, Buckets, cron jobs or the monitoring setup in this row.",
    },
  },
];
