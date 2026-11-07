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

/** A combination's summary, ordered services, configuration boundary and example. */
export interface Combination {
  id: string;
  name: string;
  description: string;
  services: [name: string, logo: string, url: string][];
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
];

// Editorial order uses broad platform adoption, not measured combination usage.
export const combinations: (Combination & {
  example: CompanyExample;
})[] = [
  {
    id: "aws",
    name: "AWS",
    description: "A container-based app using AWS services for each part.",
    services: [
      [
        "ECS Express Mode",
        "aws.svg",
        "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/express-service-overview.html",
      ],
      [
        "RDS for PostgreSQL",
        "aws.svg",
        "https://aws.amazon.com/rds/postgresql/",
      ],
      ["Amazon Cognito", "aws.svg", "https://aws.amazon.com/cognito/"],
      ["Amazon S3", "aws.svg", "https://aws.amazon.com/s3/"],
      [
        "SQS + Lambda",
        "aws.svg",
        "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
      ],
      ["CloudWatch", "aws.svg", "https://aws.amazon.com/cloudwatch/"],
    ],
    note: "Many configuration choices. You connect permissions, networking and separately billed services.",
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
    description:
      "An app hosted on Azure, with Microsoft services for data and accounts.",
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
      ],
      [
        "Entra External ID",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/entra/external-id/customers/overview-customers-ciam",
      ],
      [
        "Azure Blob Storage",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview",
      ],
      [
        "Service Bus + Functions",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-service-bus",
      ],
      [
        "Azure Monitor",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/azure/azure-monitor/overview",
      ],
    ],
    note: "A SQL Server-based option. You configure service access, background processing and separate usage charges.",
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
    description:
      "A container-based app with a relational database, rather than Firestore.",
    services: [
      ["Cloud Run", "google-cloud.svg", "https://cloud.google.com/run"],
      [
        "Cloud SQL for PostgreSQL",
        "google-cloud.svg",
        "https://cloud.google.com/sql/docs/postgres/connect-run",
      ],
      [
        "Identity Platform",
        "google-cloud.svg",
        "https://cloud.google.com/identity-platform/docs",
      ],
      [
        "Cloud Storage",
        "google-cloud.svg",
        "https://cloud.google.com/storage/docs",
      ],
      [
        "Cloud Tasks + Cloud Run",
        "google-cloud.svg",
        "https://cloud.google.com/run/docs/triggering/using-tasks",
      ],
      [
        "Cloud Monitoring",
        "google-cloud.svg",
        "https://cloud.google.com/monitoring/docs",
      ],
    ],
    note: "Cloud Run can serve browser files and run server code. Configure database connections and access rules. Cloud SQL capacity and charges are separate from Cloud Run’s scaling.",
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
    description: "A document-based app built around Google services.",
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
      ],
      [
        "Firebase Authentication",
        "firebase.svg",
        "https://firebase.google.com/docs/auth",
      ],
      [
        "Cloud Storage for Firebase",
        "firebase.svg",
        "https://firebase.google.com/docs/storage",
      ],
      [
        "Cloud Tasks + Cloud Run",
        "google-cloud.svg",
        "https://cloud.google.com/run/docs/triggering/using-tasks",
      ],
      [
        "Cloud Monitoring",
        "google-cloud.svg",
        "https://cloud.google.com/monitoring/docs",
      ],
    ],
    note: "Firebase Hosting serves browser files; Cloud Run runs server code. Data access rules need careful setup.",
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
    description: "A web app with data, accounts and files managed together.",
    services: [
      ["Vercel", "vercel.svg", "https://vercel.com/docs"],
      [
        "Supabase Postgres",
        "supabase.svg",
        "https://supabase.com/docs/guides/database",
      ],
      [
        "Supabase Auth",
        "supabase.svg",
        "https://supabase.com/docs/guides/auth",
      ],
      [
        "Supabase Storage",
        "supabase.svg",
        "https://supabase.com/docs/guides/storage",
      ],
      [
        "Trigger.dev",
        "trigger.ico",
        "https://trigger.dev/docs/guides/frameworks/nextjs",
      ],
      [
        "Sentry",
        "sentry.svg",
        "https://docs.sentry.io/platforms/javascript/guides/nextjs/",
      ],
    ],
    note: "Fewer services to connect. You still configure data access rules and background tasks.",
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
    description: "Separate services for a Postgres database and user accounts.",
    services: [
      ["Vercel", "vercel.svg", "https://vercel.com/docs"],
      ["Neon", "neon.svg", "https://neon.com/docs/guides/vercel"],
      [
        "Clerk",
        "clerk.svg",
        "https://clerk.com/docs/nextjs/getting-started/quickstart",
      ],
      [
        "Cloudflare R2",
        "cloudflare.svg",
        "https://developers.cloudflare.com/r2/",
      ],
      ["Inngest", "inngest.svg", "https://www.inngest.com/docs/deploy/vercel"],
      [
        "Sentry",
        "sentry.svg",
        "https://docs.sentry.io/platforms/javascript/guides/nextjs/",
      ],
    ],
    note: "Choose each part independently. You connect user identities, data and file access yourself.",
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
    description:
      "Browser files and server code on Cloudflare, with separate sign-in.",
    services: [
      [
        "Workers + Static Assets",
        "cloudflare.svg",
        "https://developers.cloudflare.com/workers/static-assets/",
      ],
      ["D1", "cloudflare.svg", "https://developers.cloudflare.com/d1/"],
      [
        "Clerk",
        "clerk.svg",
        "https://clerk.com/docs/references/backend/overview",
      ],
      ["R2", "cloudflare.svg", "https://developers.cloudflare.com/r2/"],
      [
        "Queues + Workers",
        "cloudflare.svg",
        "https://developers.cloudflare.com/queues/",
      ],
      [
        "Workers Observability",
        "cloudflare.svg",
        "https://developers.cloudflare.com/workers/observability/",
      ],
    ],
    note: "Most services share one platform. D1 uses SQLite, so check its database limits against your needs.",
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
    description:
      "App hosting and managed Postgres on DigitalOcean, with separate customer sign-in.",
    services: [
      [
        "App Platform",
        "digitalocean.svg",
        "https://docs.digitalocean.com/products/app-platform/",
      ],
      [
        "Managed PostgreSQL",
        "digitalocean.svg",
        "https://docs.digitalocean.com/products/databases/postgresql/",
      ],
      [
        "Clerk",
        "clerk.svg",
        "https://clerk.com/docs/references/backend/overview",
      ],
      [
        "Spaces",
        "digitalocean.svg",
        "https://docs.digitalocean.com/products/spaces/",
      ],
      [
        "App Platform workers",
        "digitalocean.svg",
        "https://docs.digitalocean.com/products/app-platform/how-to/manage-workers/",
      ],
      [
        "App Platform metrics",
        "digitalocean.svg",
        "https://docs.digitalocean.com/products/app-platform/how-to/manage-observability/",
      ],
    ],
    note: "Use Managed PostgreSQL for production, not the small development database. Workers run your task-processing code; add a queue if needed. Clerk is a separate service you connect yourself.",
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
    description:
      "Web services and managed Postgres on Render, with separate sign-in and file storage.",
    services: [
      [
        "Render Web Services",
        "render.svg",
        "https://render.com/docs/web-services",
      ],
      ["Render Postgres", "render.svg", "https://render.com/docs/postgresql"],
      [
        "Clerk",
        "clerk.svg",
        "https://clerk.com/docs/references/backend/overview",
      ],
      ["Amazon S3", "aws.svg", "https://aws.amazon.com/s3/"],
      [
        "Background workers + Key Value",
        "render.svg",
        "https://render.com/docs/background-workers",
      ],
      [
        "Render metrics",
        "render.svg",
        "https://render.com/docs/service-metrics",
      ],
    ],
    note: "Render hosts your web and worker code and manages Postgres. You implement queue processing and connect Clerk and S3 separately; a local app filesystem is not shared file storage.",
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
    description:
      "App services, a Postgres service and private file buckets in one Railway project.",
    services: [
      [
        "Railway services",
        "railway.svg",
        "https://docs.railway.com/guides/services",
      ],
      [
        "Railway PostgreSQL",
        "railway.svg",
        "https://docs.railway.com/databases/postgresql",
      ],
      [
        "Clerk",
        "clerk.svg",
        "https://clerk.com/docs/references/backend/overview",
      ],
      [
        "Railway Buckets",
        "railway.svg",
        "https://docs.railway.com/guides/storage-buckets",
      ],
      [
        "Services + cron jobs",
        "railway.svg",
        "https://docs.railway.com/guides/cron-jobs",
      ],
      [
        "Railway metrics",
        "railway.svg",
        "https://docs.railway.com/guides/metrics",
      ],
    ],
    note: "The default Postgres service is a single node. Configure backups and, if needed, high availability. Buckets are private; serve files through signed links or your app. Connect Clerk separately.",
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
