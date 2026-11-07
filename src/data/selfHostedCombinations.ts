/**
 * Compares ten self-operated associations backed by documented application configurations.
 * @packageDocumentation
 */
import type { Combination } from "./combinations";

export const selfHostedRoles = [
  { label: "Hosting", path: "/self-hosted/hosting/" },
  { label: "Database", path: "/self-hosted/databases/" },
  { label: "Sign-in & accounts", path: "/self-hosted/authentication/" },
  { label: "Storage", path: "/self-hosted/storage/" },
  { label: "Background tasks & queues", path: "/self-hosted/jobs/" },
  { label: "Monitoring", path: "/self-hosted/monitoring/" },
  { label: "Caching", path: "/self-hosted/caching/" },
  { label: "Search", path: "/self-hosted/search/" },
];

// Evidence describes reviewed upstream docs/configurations, not company adoption or every release.
export const selfHostedCombinations: (Combination & {
  example: NonNullable<Combination["example"]>;
})[] = [
  {
    id: "sqlite-app",
    name: "SQLite + built-in app server",
    whenToChoose:
      "A small service with one app and a local database file. There are fewer processes to run and monitor, making this useful for a single-machine setup.",
    services: [
      ["App's built-in server", null, null],
      ["SQLite", "sqlite.svg", "https://sqlite.org/whentouse.html"],
      ["Built-in app accounts", null, null],
      ["Local files", null, null],
      ["App's internal tasks", null, null],
      ["Add separately if needed", null, null],
      ["—", null, null],
      ["App-managed search", null, null],
    ],
    note: "Not every app fits SQLite or a single machine. Keep files and the database on persistent storage, back them up together and add HTTPS for public access. Forgejo Actions also needs a separate runner.",
    example: {
      company: "Forgejo project",
      product: "Forgejo",
      productUrl: "https://forgejo.org/",
      url: "https://forgejo.org/docs/latest/admin/installation/docker/",
      publisher: "Forgejo documentation",
      confirmed:
        "The single-container installation uses persistent app data and defaults to SQLite when no database is configured.",
      limitation:
        "Documents a compact Forgejo installation, not a claim that every application can use SQLite or needs no external services.",
    },
  },
  {
    id: "php-relational",
    name: "Apache + PHP + MariaDB",
    whenToChoose:
      "A familiar setup for PHP apps with structured data. Regular maintenance can run on a schedule without adding a separate message queue.",
    services: [
      [
        "Apache + PHP",
        "apache.ico",
        "https://docs.nextcloud.com/server/stable/admin_manual/installation/system_requirements.html",
      ],
      ["MariaDB", "mariadb.svg", "https://mariadb.com/docs/server"],
      ["Built-in app accounts", null, null],
      ["Local files or object storage", null, null],
      [
        "cron + app tasks",
        null,
        "https://docs.nextcloud.com/server/stable/admin_manual/configuration_server/background_jobs_configuration.html",
      ],
      ["Add separately if needed", null, null],
      [
        "APCu + Redis",
        "redis.svg",
        "https://docs.nextcloud.com/server/stable/admin_manual/configuration_server/caching_configuration.html",
      ],
      ["App-managed search", null, null],
    ],
    note: "You maintain PHP, the web server and the database. Nextcloud can also use caching and Redis or Valkey for file locking. Back up the files, database and settings together; scheduled jobs do not replace a message queue for every workload.",
    example: {
      company: "Nextcloud",
      product: "Nextcloud",
      productUrl: "https://nextcloud.com/",
      url: "https://docs.nextcloud.com/server/stable/admin_manual/installation/system_requirements.html",
      publisher: "Nextcloud administration manual",
      confirmed:
        "The supported server combinations include Apache with PHP and MariaDB; the admin manual separately documents caches and cron tasks.",
      limitation:
        "One supported PHP/database combination, not the only Nextcloud configuration. Cache and storage choices need separate setup.",
    },
  },
  {
    id: "rails-sidekiq",
    name: "Nginx + PostgreSQL + Sidekiq",
    whenToChoose:
      "Separates web requests from background work while keeping app data in PostgreSQL. Useful for Ruby apps with emails, imports or other tasks that should not hold up a page load.",
    services: [
      [
        "Nginx + Ruby app server",
        "nginx.svg",
        "https://docs.gitlab.com/development/architecture/",
      ],
      ["PostgreSQL", "postgresql.svg", "https://www.postgresql.org/docs/"],
      ["Built-in app accounts", null, null],
      ["App-managed files / object storage", null, null],
      [
        "Sidekiq + Redis",
        "sidekiq.svg",
        "https://docs.gitlab.com/development/architecture/#sidekiq",
      ],
      [
        "Prometheus (Linux package)",
        "prometheus.svg",
        "https://docs.gitlab.com/administration/monitoring/prometheus/",
      ],
      [
        "Redis (app-managed)",
        "redis.svg",
        "https://docs.gitlab.com/development/architecture/",
      ],
      ["Basic search", null, "https://docs.gitlab.com/user/search/"],
    ],
    note: "You run the app, workers and Redis. GitLab also needs Git-specific services; its Linux package bundles Prometheus. Basic search is app-managed. Advanced search needs a supported Elasticsearch or OpenSearch deployment, a Premium or Ultimate tier, and administrator setup.",
    example: {
      company: "GitLab",
      product: "GitLab Self-Managed",
      productUrl: "https://about.gitlab.com/install/",
      url: "https://docs.gitlab.com/development/architecture/",
      publisher: "GitLab architecture documentation",
      confirmed:
        "The architecture explicitly connects Nginx, Workhorse/Puma, PostgreSQL, Redis and Sidekiq, with separate monitoring components.",
      limitation:
        "A simplified core of GitLab's larger system, not its full installation or a ready-made recipe for another Rails app.",
    },
  },
  {
    id: "python-celery",
    name: "PostgreSQL + Valkey + Celery",
    whenToChoose:
      "Keeps slow document processing out of web requests. Python workers can read documents, extract text and process imports while the web app remains available.",
    services: [
      ["Python app server", null, null],
      ["PostgreSQL", "postgresql.svg", "https://www.postgresql.org/docs/"],
      ["Built-in app accounts", null, null],
      ["Persistent document files", null, null],
      [
        "Celery + Valkey",
        "celery.ico",
        "https://github.com/paperless-ngx/paperless-ngx/blob/main/pyproject.toml",
      ],
      ["Add separately if needed", null, null],
      ["—", null, null],
      ["App-managed document search", null, null],
    ],
    note: "There are more services to maintain than a single app. Workers need access to the right documents, and backups must include original files, database data and settings. Use the deployment files for your Paperless-ngx release.",
    example: {
      company: "Paperless-ngx project",
      product: "Paperless-ngx",
      productUrl: "https://github.com/paperless-ngx/paperless-ngx",
      url: "https://github.com/paperless-ngx/paperless-ngx/blob/main/docker/compose/docker-compose.postgres.yml",
      publisher: "Paperless-ngx official Compose sample",
      confirmed:
        "The PostgreSQL Compose sample includes PostgreSQL, a Valkey broker and persistent data/media volumes; pyproject.toml identifies Celery.",
      limitation:
        "An upstream PostgreSQL configuration; SQLite is also supported. Upstream main can differ from a published release.",
    },
  },
  {
    id: "node-queue-workers",
    name: "PostgreSQL + Redis + app workers",
    whenToChoose:
      "Lets automation workflows run across several worker processes. Worker capacity can grow without putting every execution on the app's main process.",
    services: [
      ["Node.js app + worker processes", null, null],
      ["PostgreSQL", "postgresql.svg", "https://www.postgresql.org/docs/"],
      ["App accounts; SSO depends on edition", null, null],
      [
        "Shared binary storage if used",
        null,
        "https://docs.n8n.io/hosting/scaling/queue-mode/",
      ],
      [
        "Redis + n8n workers",
        "redis.svg",
        "https://docs.n8n.io/hosting/scaling/queue-mode/",
      ],
      [
        "Metrics endpoint",
        null,
        "https://docs.n8n.io/hosting/scaling/queue-mode/#worker-server",
      ],
      ["—", null, null],
      ["—", null, null],
    ],
    note: "This is a larger setup than a single n8n process. Workers share the database and encryption key, and file storage must support this mode. Check n8n's license and paid-feature limits before building around it.",
    example: {
      company: "n8n",
      product: "n8n queue mode",
      productUrl: "https://n8n.io/",
      url: "https://docs.n8n.io/hosting/scaling/queue-mode/",
      publisher: "n8n hosting documentation",
      confirmed:
        "Queue-mode documentation connects main and worker processes through Redis and a shared database, with PostgreSQL guidance.",
      limitation:
        "A documented scaling configuration, not every n8n installation. Multi-main and other capabilities have edition restrictions.",
    },
  },
  {
    id: "wiki-external-identity",
    name: "PostgreSQL + Redis + external sign-in",
    whenToChoose:
      "Connects a team knowledge base to an existing sign-in system. People do not need another Outline password, while documents and files stay in services you operate.",
    services: [
      [
        "App server + HTTPS proxy",
        null,
        "https://docs.getoutline.com/s/hosting/doc/docker-7pfeLP5a8t",
      ],
      ["PostgreSQL", "postgresql.svg", "https://www.postgresql.org/docs/"],
      [
        "External identity provider",
        null,
        "https://docs.getoutline.com/s/hosting/doc/authentication-7ViKRmRY5o",
      ],
      [
        "Local files or S3-compatible storage",
        null,
        "https://github.com/outline/outline/blob/main/.env.sample",
      ],
      [
        "App tasks backed by Redis",
        "redis.svg",
        "https://github.com/outline/outline/blob/main/.env.sample",
      ],
      ["Add separately if needed", null, null],
      ["—", null, null],
      ["App-managed search", null, null],
    ],
    note: "Outline has no built-in email/password login, so a supported sign-in connection is required. You maintain PostgreSQL, Redis and either local files or S3-compatible storage. Check its edition features and Business Source License restrictions.",
    example: {
      company: "Outline",
      product: "Outline",
      productUrl: "https://www.getoutline.com/",
      url: "https://docs.getoutline.com/s/hosting/doc/docker-7pfeLP5a8t",
      publisher: "Outline hosting documentation",
      confirmed:
        "The Docker example connects Outline to PostgreSQL, Redis, persistent local storage and an HTTPS front end; separate auth docs describe identity integration.",
      limitation:
        "No particular identity provider is claimed. Configure a supported provider and check edition and license requirements.",
    },
  },
  {
    id: "media-processing",
    name: "PostgreSQL + Valkey + media workers",
    whenToChoose:
      "Handles photo uploads, thumbnails, video conversion and search in background jobs. Media processing has its own capacity instead of making every task wait on a web request.",
    services: [
      [
        "Media app + machine-learning service",
        null,
        "https://docs.immich.app/install/docker-compose/",
      ],
      [
        "PostgreSQL + vector extensions",
        "postgresql.svg",
        "https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml",
      ],
      [
        "Built-in app accounts or OAuth",
        null,
        "https://docs.immich.app/administration/oauth",
      ],
      ["Persistent media directories", null, null],
      [
        "BullMQ + Valkey",
        "bullmq.ico",
        "https://docs.immich.app/developer/architecture/",
      ],
      ["Add separately if needed", null, null],
      ["—", null, null],
      [
        "PostgreSQL + vectors",
        "postgresql.svg",
        "https://docs.immich.app/features/searching/",
      ],
    ],
    note: "Immich needs the matching PostgreSQL extensions, Valkey and machine-learning service. Use its release files and back up both media and database: a database backup alone does not contain your photo library.",
    example: {
      company: "Immich project",
      product: "Immich",
      productUrl: "https://immich.app/",
      url: "https://docs.immich.app/install/docker-compose/",
      publisher: "Immich installation documentation and release configuration",
      confirmed:
        "The recommended release Compose file defines the Immich server, machine-learning service, Valkey, PostgreSQL and persistent media paths.",
      limitation:
        "Version-specific media-processing setup, not a generic requirement for every app. Use release files rather than mixing upstream configurations.",
    },
  },
  {
    id: "integrated-backend",
    name: "PostgreSQL + Auth + data APIs",
    whenToChoose:
      "Groups accounts, data APIs, files and live updates around PostgreSQL. Useful when you want connected backend building blocks rather than designing every connection yourself.",
    services: [
      [
        "Supabase API services + gateway",
        "supabase.svg",
        "https://github.com/supabase/supabase/blob/master/docker/docker-compose.yml",
      ],
      [
        "PostgreSQL",
        "postgresql.svg",
        "https://supabase.com/docs/guides/database",
      ],
      [
        "Supabase Auth",
        "supabase.svg",
        "https://supabase.com/docs/guides/self-hosting",
      ],
      [
        "Supabase Storage + local files",
        "supabase.svg",
        "https://github.com/supabase/supabase/blob/master/docker/docker-compose.yml",
      ],
      ["Add task workers if needed", null, null],
      ["Add separately; app logs available", null, null],
      ["—", null, null],
      [
        "PostgreSQL full-text",
        "postgresql.svg",
        "https://supabase.com/docs/guides/database/full-text-search",
      ],
    ],
    note: "The full suite has more moving parts than a plain database. You still run app and task code, set data permissions, connect email, apply updates and test recovery. Self-hosting does not include every Supabase Cloud feature.",
    example: {
      company: "Supabase",
      product: "Self-hosted Supabase",
      productUrl: "https://supabase.com/docs/guides/self-hosting",
      url: "https://github.com/supabase/supabase/blob/master/docker/docker-compose.yml",
      publisher: "Supabase official self-hosted Compose configuration",
      confirmed:
        "The upstream configuration includes PostgreSQL, GoTrue/Auth, PostgREST, Realtime, Storage and an Envoy API gateway among its services.",
      limitation:
        "A simplified subset of the self-hosted suite, not Cloud feature parity or an included general background-worker service.",
    },
  },
  {
    id: "federated-chat",
    name: "PostgreSQL + federated chat workers",
    whenToChoose:
      "A foundation for a Matrix chat service that can communicate with other Matrix servers. One process can start small, with workers added as traffic grows.",
    services: [
      [
        "HTTPS proxy + Synapse",
        null,
        "https://element-hq.github.io/synapse/latest/setup/installation.html",
      ],
      [
        "PostgreSQL",
        "postgresql.svg",
        "https://element-hq.github.io/synapse/latest/postgres.html",
      ],
      ["Server accounts or external sign-in", null, null],
      ["Media repository files", null, null],
      [
        "Internal tasks; Redis for multi-worker",
        "redis.svg",
        "https://element-hq.github.io/synapse/latest/workers.html",
      ],
      ["Add separately if needed", null, null],
      [
        "In-process; Redis for workers",
        "redis.svg",
        "https://element-hq.github.io/synapse/latest/workers.html",
      ],
      ["App-managed search", null, null],
    ],
    note: "Use PostgreSQL and HTTPS for a real deployment. Redis is needed for the multi-worker setup, not every single-process installation. Chat clients, calls and media retention need additional planning.",
    example: {
      company: "Element / Synapse project",
      product: "Matrix Synapse",
      productUrl: "https://github.com/element-hq/synapse",
      url: "https://element-hq.github.io/synapse/latest/setup/installation.html",
      publisher: "Synapse installation and worker documentation",
      confirmed:
        "Production installation guidance recommends PostgreSQL and an HTTPS proxy; worker documentation adds Redis to multi-process deployments.",
      limitation:
        "A Matrix homeserver pattern, not a complete chat installation or proof that Redis is required for a single process.",
    },
  },
  {
    id: "event-pipeline",
    name: "Kafka + ClickHouse + object storage",
    whenToChoose:
      "Combines an event queue, an analytics database and file storage for event-heavy apps. Each part handles a different kind of work instead of pushing everything into one database.",
    services: [
      [
        "Nginx + app services",
        "nginx.svg",
        "https://github.com/getsentry/self-hosted/blob/master/docker-compose.yml",
      ],
      [
        "PostgreSQL + ClickHouse",
        "clickhouse.png",
        "https://github.com/getsentry/self-hosted/blob/master/docker-compose.yml",
      ],
      ["Built-in app accounts", null, null],
      [
        "SeaweedFS",
        "seaweedfs.ico",
        "https://github.com/getsentry/self-hosted/blob/master/docker-compose.yml",
      ],
      [
        "Kafka + Valkey + app workers",
        "kafka.svg",
        "https://github.com/getsentry/self-hosted/blob/master/docker-compose.yml",
      ],
      ["Monitor the stack separately", null, null],
      [
        "Memcached (app-managed)",
        "memcached.png",
        "https://github.com/getsentry/self-hosted/blob/master/docker-compose.yml",
      ],
      ["App-managed event search", null, null],
    ],
    note: "This is a large system to run, not a lightweight starter setup. Sentry adds many supporting services. You must still monitor the installation's storage and queues, maintain it and test recovery; check release and license requirements.",
    example: {
      company: "Sentry",
      product: "Self-hosted Sentry",
      productUrl: "https://develop.sentry.dev/self-hosted/",
      url: "https://github.com/getsentry/self-hosted/blob/master/docker-compose.yml",
      publisher: "Sentry official self-hosted Compose configuration",
      confirmed:
        "The upstream Compose file defines Nginx, PostgreSQL, ClickHouse, Kafka, a Valkey-backed redis service, SeaweedFS and application task/ingestion workers.",
      limitation:
        "Only a subset of Sentry's many services. Follow release-specific requirements, upgrades and license terms; do not deploy from this summary.",
    },
  },
];
