/**
 * Owns self-hosted product comparisons, license sources and operator boundaries.
 * @packageDocumentation
 */
import type { Category } from "./categories";

/** Responsibility status refers to software behavior, never managed hosting. */
type StatusNote = ["Auto" | "Manual" | "Excluded", string];

/** Product identity, editorial overview and two topic-specific capabilities. */
interface Product {
  name: string;
  company: string;
  logo: string;
  url: string;
  license: string;
  purpose: string;
  strengths: string;
  limitations: string;
  costs: string;
  capabilities: [StatusNote, StatusNote];
}

/** Row label and plain-language explanation for a software capability. */
interface Capability {
  label: string;
  explanation: string;
}

/**
 * Transpose product records into the existing comparison format with shared operating duties.
 * @param topic - Public topic label and route suffix.
 * @param title - Page heading that distinguishes software from provider-run services.
 * @param products - Focused product set, not an adoption ranking.
 * @param capabilities - Two topic-specific software boundaries.
 * @returns A complete self-hosted comparison for the shared renderer.
 */
function comparison(
  topic: string,
  title: string,
  products: Product[],
  capabilities: [Capability, Capability],
): Category {
  const suffix =
    topic === "Sign-in & accounts"
      ? "authentication"
      : topic === "Background tasks & queues"
        ? "jobs"
        : topic.toLowerCase();
  return {
    label: topic,
    title,
    path: `/self-hosted/${suffix}/`,
    selfHosted: true,
    data: {
      providers: products.map(({ name, company, logo, url, license }) => ({
        name,
        company,
        logo,
        url,
        license,
      })),
      overview: [
        {
          label: "Primary purpose",
          values: products.map(({ purpose }) => purpose),
        },
        {
          label: "Strengths",
          values: products.map(({ strengths }) => strengths),
        },
        {
          label: "Limitations",
          values: products.map(({ limitations }) => limitations),
        },
        {
          label: "License & operating costs",
          values: products.map(({ costs }) => costs),
        },
      ],
      responsibilities: [
        ...capabilities.map((capability, index) => ({
          ...capability,
          values: products.map((product) => product.capabilities[index]),
        })),
        {
          label: "Servers and network",
          explanation:
            "You supply the machines, storage, network access and firewall rules, whether you own hardware or rent it. Software installation does not include a managed hosting service or guarantee public availability.",
          values: products.map(() => [
            "Manual",
            "Provide servers, storage capacity and network protection",
          ]),
        },
        {
          label: "Updates and security",
          explanation:
            "You track security advisories, maintain the operating system and software, and test changes before applying them. An automatic software feature does not make the project responsible for securing your installation.",
          values: products.map(() => [
            "Manual",
            "Patch the operating system and software; review configuration",
          ]),
        },
        {
          label: "Access rules",
          explanation:
            "Decide who can reach the service and which operations they can perform. Configure credentials, service permissions and encrypted connections; never assume a default or example installation is safe to expose publicly.",
          values: products.map(() => [
            "Manual",
            "Configure credentials, permissions and encrypted connections",
          ]),
        },
        {
          label: "Backups and recovery",
          explanation:
            "You choose how to back up data and configuration, protect recovery copies and test restoration. Copies across disks or servers improve availability but do not replace backups against deletion or corruption.",
          values: products.map(() => [
            "Manual",
            "Back up data and configuration; test restore and failure recovery",
          ]),
        },
      ],
    },
  };
}

export const selfHostedCategories: Category[] = [
  comparison(
    "Databases",
    "Self-hosted databases",
    [
      {
        name: "PostgreSQL",
        logo: "/providers/postgresql.svg",
        company: "PostgreSQL project",
        url: "https://www.postgresql.org/docs/current/intro-whatis.html",
        license: "https://github.com/postgres/postgres/blob/master/COPYRIGHT",
        purpose:
          "Store and query relational data with SQL, transactions and extensible data types.",
        strengths:
          "Rich queries, constraints and extensions; works with many application languages.",
        limitations:
          "You plan capacity, query tuning, backups and any multi-server failover.",
        costs:
          "PostgreSQL License; no core license fee. Servers, storage and operations still cost money.",
        capabilities: [
          ["Auto", "Database software runs your queries and transactions"],
          ["Excluded", "Run your app server separately"],
        ],
      },
      {
        name: "MySQL Community",
        logo: "/providers/mysql.svg",
        company: "Oracle",
        url: "https://github.com/mysql/mysql-server",
        license: "https://github.com/mysql/mysql-server/blob/trunk/LICENSE",
        purpose: "Store and query relational data with SQL and transactions.",
        strengths:
          "Broad application support and a familiar relational database model.",
        limitations:
          "Community and commercial editions differ; you configure backups and replication.",
        costs:
          "GPLv2 Community edition with stated exceptions; commercial editions and support are separate. Pay infrastructure and operations.",
        capabilities: [
          ["Auto", "Database software runs your queries and transactions"],
          ["Excluded", "Run your app server separately"],
        ],
      },
      {
        name: "MariaDB Server",
        logo: "/providers/mariadb.svg",
        company: "MariaDB",
        url: "https://mariadb.com/docs/server",
        license: "https://github.com/MariaDB/server/blob/main/COPYING",
        purpose: "Store and query relational data with SQL and transactions.",
        strengths:
          "MySQL-related ecosystem with its own database features and storage options.",
        limitations:
          "Not interchangeable with every MySQL version or feature; test application compatibility.",
        costs:
          "GPLv2 Server; commercial products and support are separate. Pay infrastructure and operations.",
        capabilities: [
          ["Auto", "Database software runs your queries and transactions"],
          ["Excluded", "Run your app server separately"],
        ],
      },
      {
        name: "MongoDB Community",
        company: "MongoDB",
        logo: "/providers/mongodb.svg",
        url: "https://www.mongodb.com/docs/manual/introduction/",
        license:
          "https://github.com/mongodb/mongo/blob/master/LICENSE-Community.txt",
        purpose:
          "Store and query document data with flexible structures and indexes.",
        strengths:
          "Document-oriented queries and aggregation; supports replication and sharding.",
        limitations:
          "Not a SQL database. You design indexes, cluster operations and recovery; license terms need review.",
        costs:
          "Server Side Public License, not a permissive open-source license. Commercial terms can differ; pay infrastructure and operations.",
        capabilities: [
          ["Auto", "Database software runs document queries and aggregation"],
          ["Excluded", "Run your app server separately"],
        ],
      },
      {
        name: "CouchDB",
        logo: "/providers/couchdb.ico",
        company: "Apache",
        url: "https://docs.couchdb.org/en/stable/intro/overview.html",
        license: "https://github.com/apache/couchdb/blob/main/LICENSE",
        purpose:
          "Store JSON documents and synchronize copies between databases over HTTP.",
        strengths:
          "HTTP access and replication for applications that synchronize distributed document data.",
        limitations:
          "Query and consistency models differ from relational databases; you handle conflicts and operating the cluster.",
        costs:
          "Apache 2.0; no core license fee. Pay infrastructure, storage and operations.",
        capabilities: [
          ["Auto", "Database software stores and queries documents"],
          ["Excluded", "Its HTTP data interface is not a general app server"],
        ],
      },
      {
        name: "SQLite",
        company: "SQLite project",
        logo: "/providers/sqlite.svg",
        url: "https://sqlite.org/whentouse.html",
        license: "https://sqlite.org/copyright.html",
        purpose:
          "Embed a SQL database directly in your app, usually in a local file.",
        strengths:
          "No separate database server; useful for local apps and services with modest write concurrency.",
        limitations:
          "Not a shared network database server. Concurrent writes and network filesystems need care; use supported backup methods.",
        costs:
          "Core SQLite is public domain; some extensions and support have separate terms. Pay app hosting, disks and backup operations.",
        capabilities: [
          ["Auto", "Embedded engine executes queries inside your app process"],
          ["Excluded", "Embed the database in app code you run yourself"],
        ],
      },
      {
        name: "Redis",
        company: "Redis",
        logo: "/providers/redis.svg",
        url: "https://redis.io/docs/latest/",
        license: "https://github.com/redis/redis/blob/unstable/LICENSE.txt",
        purpose:
          "Store in-memory data structures for caching, counters, sessions and other fast-access workloads.",
        strengths:
          "Rich data structures, expiration and configurable persistence and replication.",
        limitations:
          "Memory capacity and persistence settings shape cost and durability. A cache is not automatically your durable system of record.",
        costs:
          "Redis 8 offers AGPLv3, SSPLv1 or RSALv2; older versions differ. Review your chosen license; pay memory, disks and operations.",
        capabilities: [
          ["Auto", "Executes supported data-structure commands after setup"],
          ["Excluded", "Run application logic and app servers separately"],
        ],
      },
      {
        name: "Valkey",
        company: "Valkey project",
        logo: "/providers/valkey.png",
        url: "https://valkey.io/",
        license: "https://github.com/valkey-io/valkey/blob/unstable/COPYING",
        purpose:
          "Provide an in-memory key-value and data-structure server for caches and fast-access data.",
        strengths:
          "Redis-derived command model with configurable persistence, replication and clustering.",
        limitations:
          "Not every Redis version, module or feature is interchangeable. Test clients and durability settings before migrating.",
        costs:
          "BSD-3-Clause core; no core license fee. Pay memory capacity, persistence storage and operations.",
        capabilities: [
          ["Auto", "Executes supported key-value and data-structure commands"],
          ["Excluded", "Run your app and its business rules separately"],
        ],
      },
      {
        name: "ClickHouse",
        company: "ClickHouse",
        logo: "/providers/clickhouse.png",
        url: "https://clickhouse.com/docs/intro",
        license: "https://github.com/ClickHouse/ClickHouse/blob/master/LICENSE",
        purpose: "Analyze large datasets using a column-oriented SQL database.",
        strengths:
          "Aggregation and analytical queries over event, log and reporting data.",
        limitations:
          "Designed for analytics, not a drop-in replacement for transaction-heavy app databases. Plan ingestion, retention and replication.",
        costs:
          "Apache 2.0 server; ClickHouse Cloud is separate. Pay servers, storage, ingestion and operations.",
        capabilities: [
          ["Auto", "Runs column-oriented analytical queries after setup"],
          ["Excluded", "Run application servers and ingestion code separately"],
        ],
      },
      {
        name: "Apache Cassandra",
        company: "Apache",
        logo: "/providers/cassandra.ico",
        url: "https://cassandra.apache.org/doc/latest/",
        license: "https://github.com/apache/cassandra/blob/trunk/LICENSE.txt",
        purpose:
          "Distribute wide-column data across machines with query-oriented table designs.",
        strengths:
          "Partitioned storage, replication and tunable consistency for distributed workloads.",
        limitations:
          "Its query language is not full relational SQL. You design partitions and operate repairs, capacity and cluster recovery.",
        costs:
          "Apache 2.0; no core license fee. Pay multiple servers, disks, network and cluster operations.",
        capabilities: [
          ["Auto", "Stores partitioned records and executes supported queries"],
          ["Excluded", "Run your app server and business logic separately"],
        ],
      },
    ],
    [
      {
        label: "Database engine",
        explanation:
          "Database engines execute supported queries or data commands after configuration; SQLite runs inside your app rather than on a separate server. Relational, document, in-memory and analytical databases solve different needs. Auto does not include hosting or backups.",
      },
      {
        label: "App server code",
        explanation:
          "A database processes data requests, not your general web application. You still deploy application server code and enforce the business rules that determine which data each user can access.",
      },
    ],
  ),
  comparison(
    "Hosting",
    "Self-hosted web servers",
    [
      {
        name: "Nginx",
        logo: "/providers/nginx.svg",
        company: "F5",
        url: "https://nginx.org/en/docs/beginners_guide.html",
        license: "https://github.com/nginx/nginx/blob/master/LICENSE",
        purpose:
          "Serve browser files and forward requests to separate application servers.",
        strengths:
          "File serving, request routing, caching and distributing requests between app servers.",
        limitations:
          "Not an app deployment platform; you install and supervise app processes separately.",
        costs:
          "BSD-2-Clause for open-source Nginx; commercial offerings are separate. Pay the server and operations.",
        capabilities: [
          ["Manual", "Configure certificates and a renewal tool"],
          ["Excluded", "Forward requests to a separately managed app process"],
        ],
      },
      {
        name: "Apache HTTP Server",
        logo: "/providers/apache.ico",
        company: "Apache",
        url: "https://httpd.apache.org/docs/2.4/",
        license: "https://github.com/apache/httpd/blob/trunk/LICENSE",
        purpose:
          "Serve browser files and connect requests to application handlers or other servers.",
        strengths:
          "Modular configuration, directory-level settings and broad application integration.",
        limitations:
          "Module and directory settings need maintenance; it does not deploy your entire app for you.",
        costs:
          "Apache 2.0; no core license fee. Pay the server, optional tooling and operations.",
        capabilities: [
          [
            "Manual",
            "Configure certificate renewal tooling or a suitable module",
          ],
          [
            "Manual",
            "Install and configure app handlers or a separate app server",
          ],
        ],
      },
      {
        name: "IIS",
        company: "Microsoft",
        logo: "/providers/microsoft.svg",
        url: "https://learn.microsoft.com/en-us/iis/get-started/introduction-to-iis/introduction-to-iis-architecture",
        license: "https://www.microsoft.com/licensing/terms/",
        purpose:
          "Serve websites and host configured application handlers on Windows.",
        strengths:
          "Windows integration, application pools and graphical administration tools.",
        limitations:
          "Requires Windows; application frameworks and hosting modules still need installation and configuration.",
        costs:
          "Microsoft software terms apply. Windows or Windows Server licensing and server operating costs depend on your deployment.",
        capabilities: [
          [
            "Manual",
            "Configure certificates and renewal through Windows or another tool",
          ],
          [
            "Manual",
            "Configure application pools, hosting modules and the app",
          ],
        ],
      },
      {
        name: "Caddy",
        logo: "/providers/caddy.png",
        company: "Caddy project",
        url: "https://caddyserver.com/docs/automatic-https",
        license: "https://github.com/caddyserver/caddy/blob/master/LICENSE",
        purpose:
          "Serve browser files and forward requests to separate application servers.",
        strengths:
          "Automatic HTTPS and a concise configuration format for many common setups.",
        limitations:
          "Certificate issuance needs domain validation and suitable connectivity; app processes remain separate.",
        costs:
          "Apache 2.0 core; plugins and support can have separate terms. Pay the server and operations.",
        capabilities: [
          [
            "Auto",
            "Obtains and renews certificates when validation requirements are met",
          ],
          ["Excluded", "Forward requests to a separately managed app process"],
        ],
      },
      {
        name: "OpenLiteSpeed",
        logo: "/providers/openlitespeed.png",
        company: "LiteSpeed",
        url: "https://github.com/litespeedtech/openlitespeed",
        license:
          "https://github.com/litespeedtech/openlitespeed/blob/master/LICENSE",
        purpose:
          "Serve browser files and connect applications through configured handlers.",
        strengths:
          "Web administration interface and caching tools, including PHP-oriented deployments.",
        limitations:
          "Different from commercial LiteSpeed Web Server; check platform support and configuration compatibility.",
        costs:
          "GPLv3 OpenLiteSpeed; commercial LiteSpeed products are separate. Pay the server and operations.",
        capabilities: [
          ["Manual", "Configure certificates and a renewal process"],
          [
            "Manual",
            "Install and configure application handlers and processes",
          ],
        ],
      },
      {
        name: "Apache Tomcat",
        company: "Apache",
        logo: "/providers/tomcat.png",
        url: "https://tomcat.apache.org/tomcat-11.0-doc/",
        license: "https://github.com/apache/tomcat/blob/main/LICENSE",
        purpose:
          "Serve web requests and run Java web applications using Jakarta Servlet technologies.",
        strengths:
          "A focused Java web container with application deployment and connection configuration.",
        limitations:
          "Requires a compatible Java runtime and application version. Not a full Jakarta EE platform or general language host.",
        costs:
          "Apache 2.0; no core license fee. Pay servers, the Java runtime where applicable and operations.",
        capabilities: [
          [
            "Manual",
            "Provide certificates and configure a renewal process or front proxy",
          ],
          [
            "Manual",
            "Install Java and deploy a compatible Java web application",
          ],
        ],
      },
      {
        name: "Eclipse Jetty",
        company: "Eclipse Foundation",
        logo: "/providers/jetty.ico",
        url: "https://jetty.org/docs/jetty/12.1/",
        license:
          "https://github.com/jetty/jetty.project/blob/jetty-12.1.x/NOTICE.txt",
        purpose:
          "Run a Java web server and Servlet engine, standalone or embedded in an application.",
        strengths:
          "Embeddable HTTP handling and modular configuration for Java applications.",
        limitations:
          "Requires Java and matching Servlet modules. You manage application packaging, runtime updates and deployment.",
        costs:
          "EPL 2.0 or Apache 2.0 project licenses; dependencies have their own terms. Pay servers and operations.",
        capabilities: [
          [
            "Manual",
            "Configure certificates and renewal tooling or a front proxy",
          ],
          [
            "Manual",
            "Configure Java application modules or embed Jetty in app code",
          ],
        ],
      },
      {
        name: "lighttpd",
        company: "lighttpd project",
        logo: "/providers/lighttpd.png",
        url: "https://redmine.lighttpd.net/projects/lighttpd/wiki/",
        license: "https://github.com/lighttpd/lighttpd1.4/blob/master/COPYING",
        purpose:
          "Serve browser files and connect dynamic requests to application handlers.",
        strengths:
          "A lightweight web server with FastCGI, request rewriting and configurable modules.",
        limitations:
          "You supply and supervise language runtimes or FastCGI processes; it is not an app deployment platform.",
        costs:
          "BSD-3-Clause core; check bundled components. Pay the server, app runtimes and operations.",
        capabilities: [
          ["Manual", "Install certificates and maintain a renewal process"],
          [
            "Manual",
            "Configure handlers and separately maintained app processes",
          ],
        ],
      },
      {
        name: "HAProxy",
        company: "HAProxy project",
        logo: "/providers/haproxy.png",
        url: "https://www.haproxy.org/",
        license: "https://github.com/haproxy/haproxy/blob/master/LICENSE",
        purpose:
          "Forward HTTP or TCP connections and balance traffic across application servers.",
        strengths:
          "Traffic routing, health checks and load balancing at the front of a service.",
        limitations:
          "Primarily a reverse proxy, not a general static-file or application host. Separate servers must serve your app and files.",
        costs:
          "Main code is GPLv2 with LGPL and other component terms; enterprise editions are separate. Pay proxy servers and operations.",
        capabilities: [
          [
            "Manual",
            "Configure certificates and the renewal mechanism for your version",
          ],
          [
            "Excluded",
            "Routes traffic to app code running on separate servers",
          ],
        ],
      },
      {
        name: "Traefik Proxy",
        company: "Traefik Labs",
        logo: "/providers/traefik.svg",
        url: "https://doc.traefik.io/traefik/",
        license: "https://github.com/traefik/traefik/blob/master/LICENSE.md",
        purpose:
          "Discover configured services and route incoming requests to their application servers.",
        strengths:
          "Dynamic routing integrations and automatic HTTPS with configured certificate resolvers.",
        limitations:
          "A reverse proxy, not a static-file server or app runtime. Protect its admin access and any infrastructure credentials.",
        costs:
          "MIT open-source Proxy; other Traefik products have separate terms. Pay proxy servers and operations.",
        capabilities: [
          [
            "Auto",
            "Renews certificates with a configured resolver and valid domain checks",
          ],
          ["Excluded", "Routes requests to separately deployed app services"],
        ],
      },
    ],
    [
      {
        label: "HTTPS certificate renewal",
        explanation:
          "HTTPS encrypts browser connections using certificates. Some server software obtains and renews certificates after domain validation; other setups need a separate renewal tool. You still configure domains, network access and key storage.",
      },
      {
        label: "Running app code",
        explanation:
          "These options include web servers, Java web containers and reverse proxies, not deployment platforms. Proxies route requests to separate app processes; servers with application handlers still need compatible language runtimes and configuration. Not every option serves static files.",
      },
    ],
  ),
  comparison(
    "Sign-in & accounts",
    "Self-hosted sign-in & accounts",
    [
      {
        name: "Keycloak",
        logo: "/providers/keycloak.svg",
        company: "Keycloak project",
        url: "https://www.keycloak.org/guides",
        license: "https://github.com/keycloak/keycloak/blob/main/LICENSE.txt",
        purpose:
          "Manage user identities and provide shared sign-in to connected applications.",
        strengths:
          "Standards-based sign-in, identity connections and account-management features.",
        limitations:
          "Production deployment, database maintenance and application permission rules remain your work.",
        costs:
          "Apache 2.0; no core license fee. Pay its database, servers, email delivery and operations.",
        capabilities: [
          [
            "Auto",
            "Provides sign-in and account-management interfaces after configuration",
          ],
          ["Manual", "Connect each app and enforce its data permissions"],
        ],
      },
      {
        name: "authentik",
        logo: "/providers/authentik.png",
        company: "authentik",
        url: "https://docs.goauthentik.io/docs/",
        license: "https://github.com/goauthentik/authentik/blob/main/LICENSE",
        purpose:
          "Provide shared sign-in and identity connections for applications and protected services.",
        strengths:
          "Configurable sign-in flows and both application connections and request-forwarding protection.",
        limitations:
          "Core and enterprise features differ; you configure flows, storage, email and service access.",
        costs:
          "MIT core with separately licensed enterprise components. Pay servers, database, email and operations.",
        capabilities: [
          ["Auto", "Provides configurable sign-in flows after setup"],
          [
            "Manual",
            "Connect apps or protection components and enforce data permissions",
          ],
        ],
      },
      {
        name: "ZITADEL",
        logo: "/providers/zitadel.png",
        company: "ZITADEL",
        url: "https://zitadel.com/docs/self-hosting/deploy/overview",
        license: "https://github.com/zitadel/zitadel/blob/main/LICENSE",
        purpose:
          "Manage user identities and provide shared sign-in to connected applications.",
        strengths:
          "Organization-based identity management and standards-based app connections.",
        limitations:
          "Self-hosted operations differ from ZITADEL Cloud; you maintain its database and deployment.",
        costs:
          "Current server uses AGPLv3; review terms for your version and any commercial agreement. Pay infrastructure and operations.",
        capabilities: [
          ["Auto", "Provides configured identity and sign-in services"],
          [
            "Manual",
            "Register apps and enforce their business and data permissions",
          ],
        ],
      },
      {
        name: "Authelia",
        logo: "/providers/authelia.svg",
        company: "Authelia project",
        url: "https://www.authelia.com/overview/prologue/introduction/",
        license: "https://github.com/authelia/authelia/blob/master/LICENSE",
        purpose:
          "Add sign-in and extra identity checks in front of protected web applications.",
        strengths:
          "Access protection with compatible request-forwarding servers; supports identity-based app connections.",
        limitations:
          "Primarily an access-protection service, not an interchangeable customer-account platform; app data permissions stay in your app.",
        costs:
          "Apache 2.0; no core license fee. Pay supporting storage, email, servers and operations.",
        capabilities: [
          ["Auto", "Provides a sign-in portal for configured protection flows"],
          [
            "Manual",
            "Connect the forwarding server or app and enforce data permissions",
          ],
        ],
      },
      {
        name: "Ory Kratos",
        company: "Ory",
        logo: "/providers/ory.svg",
        url: "https://github.com/ory/kratos",
        license: "https://github.com/ory/kratos/blob/master/LICENSE",
        purpose:
          "Provide identity and account-management APIs for registration, sign-in, recovery and profile changes.",
        strengths:
          "API-first account flows that let your application control its own user interface.",
        limitations:
          "You build or deploy a separate sign-in UI. Kratos alone is not an OAuth or OpenID Connect authorization server; pair with Hydra if needed.",
        costs:
          "Apache 2.0 self-hosted core; Ory's hosted and enterprise offerings differ. Pay database, email, UI hosting and operations.",
        capabilities: [
          [
            "Excluded",
            "Supplies account-flow APIs; deploy a separate user interface",
          ],
          [
            "Manual",
            "Connect account flows and enforce app and data permissions",
          ],
        ],
      },
      {
        name: "Ory Hydra",
        company: "Ory",
        logo: "/providers/ory.svg",
        url: "https://github.com/ory/hydra",
        license: "https://github.com/ory/hydra/blob/master/LICENSE",
        purpose:
          "Issue OAuth and OpenID Connect tokens using a separately connected identity system.",
        strengths:
          "Separates authorization protocols and app clients from your choice of identity storage and sign-in experience.",
        limitations:
          "Not a user-account store or ready-made login portal. You supply identity verification plus login and consent applications.",
        costs:
          "Apache 2.0 self-hosted core; commercial offerings are separate. Pay database, identity service, UI hosting and operations.",
        capabilities: [
          [
            "Excluded",
            "Connect your own login, consent UI and identity system",
          ],
          [
            "Manual",
            "Register clients and implement login and consent connections",
          ],
        ],
      },
      {
        name: "Dex",
        company: "Dex project",
        logo: "/providers/dex.ico",
        url: "https://dexidp.io/docs/",
        license: "https://github.com/dexidp/dex/blob/master/LICENSE",
        purpose:
          "Connect applications to existing identity providers through one OpenID Connect interface.",
        strengths:
          "Connectors bridge identity systems such as LDAP, SAML and other sign-in providers.",
        limitations:
          "Primarily identity federation, not a full customer registration and account-lifecycle platform. Connector capabilities differ.",
        costs:
          "Apache 2.0; no core license fee. Pay servers, storage, upstream identity systems and operations.",
        capabilities: [
          [
            "Auto",
            "Presents configured connectors and delegates upstream sign-in",
          ],
          [
            "Manual",
            "Configure connectors, app clients and application permissions",
          ],
        ],
      },
      {
        name: "Logto OSS",
        company: "Logto",
        logo: "/providers/logto.ico",
        url: "https://github.com/logto-io/logto",
        license: "https://github.com/logto-io/logto/blob/master/LICENSE",
        purpose:
          "Manage app users and provide standards-based sign-in with prebuilt user interfaces.",
        strengths:
          "Sign-in flows and application integrations with configurable identity connectors.",
        limitations:
          "Self-hosted and Cloud features differ. You maintain PostgreSQL, delivery providers and app permission enforcement.",
        costs:
          "MPL 2.0 open-source code; Cloud and commercial features have separate terms. Pay database, servers, email and operations.",
        capabilities: [
          ["Auto", "Provides configured prebuilt sign-in interfaces"],
          ["Manual", "Connect each app and enforce its resource permissions"],
        ],
      },
      {
        name: "Casdoor",
        company: "Casbin",
        logo: "/providers/casdoor.png",
        url: "https://casdoor.ai/docs/overview",
        license: "https://github.com/casdoor/casdoor/blob/master/LICENSE",
        purpose:
          "Manage identities and shared sign-in through a web console and connected applications.",
        strengths:
          "Multiple identity protocols and configurable sign-in, account and provider connections.",
        limitations:
          "Protocol support does not make every app compatible automatically. Configure database, delivery providers and per-app access rules.",
        costs:
          "Apache 2.0 core; hosted services are separate. Pay database, servers, email or SMS and operations.",
        capabilities: [
          [
            "Auto",
            "Provides configured sign-in and account-management screens",
          ],
          [
            "Manual",
            "Register applications and enforce app-specific permissions",
          ],
        ],
      },
      {
        name: "Kanidm",
        company: "Kanidm project",
        logo: "/providers/kanidm.png",
        url: "https://kanidm.github.io/kanidm/stable/",
        license: "https://github.com/kanidm/kanidm/blob/master/LICENSE.md",
        purpose:
          "Manage identities for connected web applications and Unix or network services.",
        strengths:
          "Passkey-oriented identity management, an app portal and web and Unix integrations.",
        limitations:
          "Not every legacy identity workflow fits. You configure supported integrations, encrypted access and recovery procedures.",
        costs:
          "MPL 2.0; no core license fee. Pay identity servers, storage, backups and operations.",
        capabilities: [
          [
            "Auto",
            "Provides a configured user portal and self-service interface",
          ],
          [
            "Manual",
            "Connect supported apps and services and set access rules",
          ],
        ],
      },
    ],
    [
      {
        label: "Sign-in interface",
        explanation:
          "Some products supply sign-in screens, while API-first identity software and authorization servers need a separate interface. Federation can delegate sign-in to an upstream provider. None automatically protects every app or replaces its data-permission checks.",
      },
      {
        label: "App integration",
        explanation:
          "Each application needs a compatible sign-in connection or a deliberately configured access gateway. A successful sign-in proves identity; your app still decides which records and actions that identity is allowed to access.",
      },
    ],
  ),
  comparison(
    "Storage",
    "Self-hosted object storage",
    [
      {
        name: "Ceph Object Gateway",
        logo: "/providers/ceph.ico",
        company: "Ceph project",
        url: "https://docs.ceph.com/en/latest/radosgw/",
        license: "https://github.com/ceph/ceph/blob/main/COPYING",
        purpose:
          "Expose object storage through S3-compatible and Swift-compatible interfaces backed by Ceph.",
        strengths:
          "Connects object storage to a distributed storage platform with several storage interfaces.",
        limitations:
          "Requires operating a Ceph cluster; disk layout, capacity, network and failure recovery need expertise.",
        costs:
          "Mainly LGPL-2.1 or LGPL-3 with component exceptions; check the license inventory. Pay disks, network, servers and operations.",
        capabilities: [
          [
            "Auto",
            "Implements object operations after cluster and gateway setup",
          ],
          ["Excluded", "Connect a separate customer sign-in service if needed"],
        ],
      },
      {
        name: "SeaweedFS",
        logo: "/providers/seaweedfs.ico",
        company: "SeaweedFS project",
        url: "https://github.com/seaweedfs/seaweedfs",
        license: "https://github.com/seaweedfs/seaweedfs/blob/master/LICENSE",
        purpose:
          "Store files and expose object storage through an S3-compatible interface.",
        strengths:
          "Several file-access options and distributed storage components for large file collections.",
        limitations:
          "Components and metadata storage need configuration; verify the S3 operations your app needs.",
        costs:
          "Apache 2.0 core; check separate product terms where applicable. Pay disks, servers, network and operations.",
        capabilities: [
          ["Auto", "Provides configured file and object storage operations"],
          [
            "Excluded",
            "Storage credentials are not a complete app sign-in system",
          ],
        ],
      },
      {
        name: "Garage",
        logo: "/providers/garage.svg",
        company: "Deuxfleurs",
        url: "https://garagehq.deuxfleurs.fr/documentation/quick-start/",
        license:
          "https://github.com/deuxfleurs-org/garage/blob/main-v2/LICENSE",
        purpose:
          "Provide distributed object storage through a supported subset of the S3 interface.",
        strengths:
          "Designed for self-hosted storage across multiple machines, including smaller deployments.",
        limitations:
          "Not every S3 operation is supported; you plan placement, redundancy and recovery.",
        costs:
          "AGPLv3; review obligations for your deployment. Pay storage machines, network and operations.",
        capabilities: [
          ["Auto", "Implements supported S3 object operations after setup"],
          [
            "Excluded",
            "Connect app sign-in and file-access decisions separately",
          ],
        ],
      },
      {
        name: "OpenStack Swift",
        logo: "/providers/openstack.ico",
        company: "OpenStack",
        url: "https://docs.openstack.org/swift/latest/",
        license: "https://github.com/openstack/swift/blob/master/LICENSE",
        purpose:
          "Store and retrieve objects through the Swift object-storage interface.",
        strengths:
          "Distributed object storage with configurable replication or erasure coding.",
        limitations:
          "Not simply an S3 replacement; S3-compatible access needs additional middleware and configuration.",
        costs:
          "Apache 2.0; no core license fee. Pay storage machines, network and operations.",
        capabilities: [
          ["Auto", "Implements Swift object operations after cluster setup"],
          [
            "Excluded",
            "Storage authorization is not a full customer sign-in product",
          ],
        ],
      },
      {
        name: "MinIO AIStor",
        company: "MinIO",
        logo: "/providers/aistor.png",
        url: "https://docs.min.io/enterprise/aistor-object-store/",
        license: "https://docs.min.io/license/",
        purpose:
          "Run an S3-compatible object store on infrastructure you operate.",
        strengths:
          "Object-storage administration and deployment tooling with commercial support options.",
        limitations:
          "Not the discontinued AGPL MinIO Community edition. Free single-node and paid distributed offerings differ; obtain the license terms for your deployment.",
        costs:
          "Commercial MinIO Software License, not AGPL. Default terms allow non-production evaluation only; confirm any Free-tier or production agreement. Pay infrastructure and operations too.",
        capabilities: [
          [
            "Auto",
            "Implements supported S3 operations after licensed deployment",
          ],
          [
            "Excluded",
            "Storage identities do not replace customer app accounts",
          ],
        ],
      },
      {
        name: "RustFS",
        company: "RustFS project",
        logo: "/providers/rustfs.png",
        url: "https://github.com/rustfs/rustfs",
        license: "https://github.com/rustfs/rustfs/blob/main/LICENSE",
        purpose:
          "Run distributed object storage with an S3-compatible interface.",
        strengths:
          "Rust-based object storage with a published feature and S3-compatibility matrix.",
        limitations:
          "Check the status of each feature for your release, including preview features. Test app compatibility and failure recovery rather than assuming S3 parity.",
        costs:
          "Apache 2.0 core; no core license fee. Pay storage servers, disks, network and operations.",
        capabilities: [
          [
            "Auto",
            "Implements the S3 operations supported by your configured version",
          ],
          [
            "Excluded",
            "Connect application user accounts and file permissions separately",
          ],
        ],
      },
      {
        name: "Apache Ozone",
        company: "Apache",
        logo: "/providers/ozone.svg",
        url: "https://ozone.apache.org/docs/",
        license: "https://github.com/apache/ozone/blob/master/LICENSE.txt",
        purpose:
          "Operate a distributed object store with S3 and Hadoop filesystem interfaces.",
        strengths:
          "Object storage for Hadoop and other distributed data workloads with an S3 gateway.",
        limitations:
          "A multi-component storage cluster, not a small standalone file server. You plan metadata services, disks, security and recovery.",
        costs:
          "Apache 2.0; no core license fee. Pay cluster servers, disks, network and operations.",
        capabilities: [
          [
            "Auto",
            "Provides configured object operations through its S3 gateway",
          ],
          [
            "Excluded",
            "Storage access control is not a customer account platform",
          ],
        ],
      },
      {
        name: "Zenko CloudServer",
        company: "Scality",
        logo: "/providers/cloudserver.png",
        url: "https://github.com/scality/cloudserver",
        license:
          "https://github.com/scality/cloudserver/blob/development/9.6/LICENSE",
        purpose:
          "Expose an S3-compatible server over configured local or external storage backends.",
        strengths:
          "An S3 abstraction layer and local development or integration-test environment.",
        limitations:
          "Not Scality's complete commercial storage platform. Backend choice determines persistence and availability; test production suitability separately.",
        costs:
          "Apache 2.0 CloudServer; other Scality products differ. Pay backend storage, servers and operations.",
        capabilities: [
          [
            "Auto",
            "Translates supported S3 requests to configured storage backends",
          ],
          [
            "Excluded",
            "Configure customer accounts in a separate identity service",
          ],
        ],
      },
      {
        name: "JuiceFS S3 Gateway",
        company: "Juicedata",
        logo: "/providers/juicefs.ico",
        url: "https://juicefs.com/docs/community/guide/gateway",
        license: "https://github.com/juicedata/juicefs/blob/main/LICENSE",
        purpose:
          "Expose a JuiceFS filesystem through an S3-compatible gateway.",
        strengths:
          "Lets S3 clients access data also used through supported JuiceFS filesystem interfaces.",
        limitations:
          "Not an independent object-storage engine: JuiceFS needs underlying object storage plus a metadata database. You operate all layers.",
        costs:
          "Apache 2.0 Community code; commercial editions differ. Pay underlying object storage, metadata database, gateway and operations.",
        capabilities: [
          [
            "Auto",
            "Exposes supported S3 operations over a configured JuiceFS volume",
          ],
          [
            "Excluded",
            "Connect app identities and enforce user file access separately",
          ],
        ],
      },
      {
        name: "VersityGW",
        company: "Versity",
        logo: "/providers/versity.png",
        url: "https://github.com/versity/versitygw",
        license: "https://github.com/versity/versitygw/blob/main/LICENSE",
        purpose:
          "Translate S3 requests to an existing filesystem or another supported storage backend.",
        strengths:
          "Adds S3 access to existing storage without requiring a new distributed object-storage engine.",
        limitations:
          "A gateway, not its own redundant disk-storage cluster. Your backend must provide capacity, durability and backup protection.",
        costs:
          "Apache 2.0 gateway; enterprise support is separate. Pay backend storage, gateway servers and operations.",
        capabilities: [
          ["Auto", "Translates supported S3 requests to a configured backend"],
          [
            "Excluded",
            "Storage keys and permissions are not a full app account system",
          ],
        ],
      },
    ],
    [
      {
        label: "Object storage interface",
        explanation:
          "This comparison includes complete object stores and gateways over existing storage. Gateways do not supply their own durable disk layer. S3 compatibility describes supported operations, not every Amazon S3 feature or identical behavior; check the backend and feature matrix.",
      },
      {
        label: "App user accounts",
        explanation:
          "Storage services can authenticate keys and authorize file operations without providing your application's customer registration and account-management experience. Connect identity and check each user's file permissions separately.",
      },
    ],
  ),
  comparison(
    "Background tasks & queues",
    "Self-hosted background tasks & queues",
    [
      {
        name: "RabbitMQ",
        logo: "/providers/rabbitmq.svg",
        company: "RabbitMQ project",
        url: "https://www.rabbitmq.com/docs",
        license:
          "https://github.com/rabbitmq/rabbitmq-server/blob/main/LICENSE",
        purpose:
          "Route messages between applications and workers using message queues.",
        strengths:
          "Message routing, acknowledgements and queue types for different delivery needs.",
        limitations:
          "You deploy workers, configure durable delivery and handle duplicate processing safely.",
        costs:
          "MPL 2.0 core, with component exceptions. Commercial offerings are separate; pay servers, disks and operations.",
        capabilities: [
          [
            "Excluded",
            "Queue delivery is not a record of your multi-step task progress",
          ],
          ["Manual", "Deploy worker code to receive and process messages"],
        ],
      },
      {
        name: "Apache Kafka",
        logo: "/providers/kafka.svg",
        company: "Apache",
        url: "https://kafka.apache.org/44/getting-started/introduction",
        license: "https://github.com/apache/kafka/blob/trunk/LICENSE",
        purpose:
          "Retain streams of events so applications can consume and replay them.",
        strengths:
          "Retained event streams and independent consumers; not limited to a single work queue.",
        limitations:
          "Partitioning, storage retention and consumer operations need planning; replay can repeat app actions.",
        costs:
          "Apache 2.0; no core license fee. Pay cluster capacity, disk retention, network and operations.",
        capabilities: [
          [
            "Excluded",
            "Consumer positions are not your app's task-step history",
          ],
          ["Manual", "Deploy consumers and implement safe processing"],
        ],
      },
      {
        name: "NATS JetStream",
        logo: "/providers/nats.svg",
        company: "NATS project",
        url: "https://docs.nats.io/nats-concepts/jetstream",
        license: "https://github.com/nats-io/nats-server/blob/main/LICENSE",
        purpose:
          "Store message streams and deliver messages to configured consumers.",
        strengths:
          "Adds persistence and replay to NATS messaging with configurable delivery behavior.",
        limitations:
          "Plain NATS and JetStream are different; enable and configure persistence, retention and consumers.",
        costs:
          "Apache 2.0 server; no core license fee. Pay servers, persistent storage and operations.",
        capabilities: [
          [
            "Excluded",
            "Message acknowledgements are not a multi-step workflow history",
          ],
          ["Manual", "Deploy subscribers or workers and implement processing"],
        ],
      },
      {
        name: "Temporal",
        company: "Temporal",
        logo: "/providers/temporal.svg",
        url: "https://docs.temporal.io/self-hosted-guide",
        license: "https://github.com/temporalio/temporal/blob/main/LICENSE",
        purpose:
          "Track durable application workflows and coordinate task execution by your workers.",
        strengths:
          "Recorded workflow history lets configured workers resume long-running application processes.",
        limitations:
          "You run the Temporal service, its database and app workers; workflow code has specific execution rules.",
        costs:
          "MIT server; hosted Temporal Cloud is separate. Pay persistence databases, servers and operations.",
        capabilities: [
          [
            "Auto",
            "Records workflow history when used with compatible workflow code",
          ],
          ["Manual", "Deploy and maintain application worker processes"],
        ],
      },
      {
        name: "BullMQ",
        logo: "/providers/bullmq.ico",
        company: "Taskforce.sh",
        url: "https://docs.bullmq.io/",
        license: "https://github.com/taskforcesh/bullmq/blob/master/LICENSE",
        purpose:
          "Manage background jobs in Node.js applications using Redis-backed queues.",
        strengths:
          "Job states, retry settings and scheduling connected to application worker code.",
        limitations:
          "A code library, not a hosted worker service. Requires Redis and your own Node.js worker processes.",
        costs:
          "MIT core; BullMQ Pro is separately licensed. Pay Redis, worker servers and operations.",
        capabilities: [
          ["Auto", "Tracks job states in configured Redis-backed queues"],
          ["Manual", "Run Node.js workers and maintain their Redis dependency"],
        ],
      },
      {
        name: "Celery",
        company: "Celery project",
        logo: "/providers/celery.ico",
        url: "https://docs.celeryq.dev/en/stable/",
        license: "https://github.com/celery/celery/blob/main/LICENSE",
        purpose:
          "Dispatch and run Python background tasks through configured brokers and workers.",
        strengths:
          "Task routing, retries and scheduling with Python and Django integrations.",
        limitations:
          "Requires a broker and your own workers; task results need a configured result backend. Retries can repeat app side effects.",
        costs:
          "BSD-3-Clause core; dependencies have separate terms. Pay broker, result storage, worker servers and operations.",
        capabilities: [
          ["Manual", "Configure a result backend for task states and results"],
          [
            "Manual",
            "Deploy Python workers and maintain the broker and scheduler",
          ],
        ],
      },
      {
        name: "Dramatiq",
        company: "Dramatiq project",
        logo: "/providers/dramatiq.png",
        url: "https://dramatiq.io/",
        license: "https://github.com/Bogdanp/dramatiq/blob/master/COPYING",
        purpose:
          "Run Python background tasks using a RabbitMQ or Redis message broker.",
        strengths:
          "A focused task API with retries and configurable processing middleware.",
        limitations:
          "Not a durable workflow-history system. Results need optional middleware and storage; you deploy and supervise workers.",
        costs:
          "LGPLv3 core; broker and dependency terms are separate. Pay broker, worker capacity and operations.",
        capabilities: [
          [
            "Manual",
            "Add result middleware and storage when task results are needed",
          ],
          ["Manual", "Run Python workers and maintain RabbitMQ or Redis"],
        ],
      },
      {
        name: "Huey",
        company: "Charles Leifer",
        logo: "/providers/huey.png",
        url: "https://huey.readthedocs.io/en/latest/",
        license: "https://github.com/coleifer/huey/blob/master/LICENSE",
        purpose:
          "Queue and schedule Python tasks with a configurable storage backend.",
        strengths:
          "A small task library with delayed and recurring work, retries and result storage.",
        limitations:
          "Backend choice affects durability and concurrency. In-memory storage is not durable; workers and scheduling remain your responsibility.",
        costs:
          "MIT core; storage backend terms differ. Pay worker servers, persistent storage and operations.",
        capabilities: [
          [
            "Auto",
            "Stores task results when enabled with a configured backend",
          ],
          [
            "Manual",
            "Run the Python consumer and maintain its storage backend",
          ],
        ],
      },
      {
        name: "Sidekiq",
        company: "Contributed Systems",
        logo: "/providers/sidekiq.svg",
        url: "https://github.com/sidekiq/sidekiq",
        license: "https://github.com/sidekiq/sidekiq/blob/main/LICENSE.txt",
        purpose:
          "Run Ruby background jobs using threaded workers and Redis-compatible storage.",
        strengths:
          "Ruby and Rails job integration with retries, scheduling and an operational web interface.",
        limitations:
          "You run workers and a supported Redis-compatible server. Jobs must be safe to retry; Pro and Enterprise capabilities differ from core.",
        costs:
          "LGPLv3 core; Pro and Enterprise are commercial. Pay queue storage, worker servers and operations.",
        capabilities: [
          [
            "Auto",
            "Tracks configured job queues, retries and operational job state",
          ],
          ["Manual", "Run Ruby workers and maintain supported queue storage"],
        ],
      },
      {
        name: "Apache Artemis",
        company: "Apache",
        logo: "/providers/artemis.png",
        url: "https://artemis.apache.org/components/artemis/documentation/latest/",
        license: "https://github.com/apache/artemis/blob/main/LICENSE",
        purpose:
          "Broker messages between applications using protocols such as AMQP, MQTT and JMS clients.",
        strengths:
          "Multiple messaging protocols, persistent queues and configurable broker clustering.",
        limitations:
          "A message broker, not an application task runner. You configure persistence, delivery rules and duplicate-safe consumer code.",
        costs:
          "Apache 2.0; no core license fee. Pay broker servers, persistent disks and operations.",
        capabilities: [
          [
            "Excluded",
            "Broker message state is not a history of application task steps",
          ],
          [
            "Manual",
            "Deploy message consumers to perform your application work",
          ],
        ],
      },
    ],
    [
      {
        label: "Remembering task progress",
        explanation:
          "A broker's stored messages or consumer positions are not necessarily a history of application task steps. Workflow systems or job libraries can record progress when you use their supported code model and provide reliable persistence.",
      },
      {
        label: "Running task code",
        explanation:
          "Task and queue software still needs your application worker code to perform useful work. You deploy those processes, give them access to data, monitor failures and make retries safe for operations such as payments or email.",
      },
    ],
  ),
  comparison(
    "Monitoring",
    "Self-hosted monitoring",
    [
      {
        name: "Prometheus",
        logo: "/providers/prometheus.svg",
        company: "Prometheus project",
        url: "https://prometheus.io/docs/introduction/overview/",
        license: "https://github.com/prometheus/prometheus/blob/main/LICENSE",
        purpose:
          "Collect and query numerical measurements from applications and machines.",
        strengths:
          "Time-series queries and alert rules for instrumented services and exporters.",
        limitations:
          "Not a log store. Long retention, redundancy and alert delivery need additional planning or components.",
        costs:
          "Apache 2.0; no core license fee. Pay collection capacity, storage, network and operations.",
        capabilities: [
          ["Auto", "Collects configured metrics from targets"],
          [
            "Excluded",
            "Use its query interface or connect a separate saved-dashboard tool",
          ],
        ],
      },
      {
        name: "Grafana OSS",
        company: "Grafana Labs",
        logo: "/providers/grafana.svg",
        url: "https://grafana.com/docs/grafana/latest/introduction/",
        license: "https://github.com/grafana/grafana/blob/main/LICENSE",
        purpose:
          "Build dashboards and alerts from connected monitoring data sources.",
        strengths:
          "Combines visualizations from supported metrics, logs and other data sources.",
        limitations:
          "Grafana OSS is not itself a metrics or log storage engine; connect separate data services.",
        costs:
          "AGPLv3 OSS core; enterprise features and some plugins have separate terms. Pay its server and data sources.",
        capabilities: [
          ["Excluded", "Connect a metrics collection and storage service"],
          ["Auto", "Stores and renders configured dashboards"],
        ],
      },
      {
        name: "Loki",
        company: "Grafana Labs",
        logo: "/providers/loki.png",
        url: "https://grafana.com/docs/loki/latest/get-started/overview/",
        license: "https://github.com/grafana/loki/blob/main/LICENSE",
        purpose: "Store and query logs grouped by descriptive labels.",
        strengths:
          "Log search that integrates with Grafana and supported log collectors.",
        limitations:
          "Not a general metrics collector; configure log shipping, storage, retention and a viewing interface.",
        costs:
          "AGPLv3; no core license fee. Pay log ingestion capacity, storage and operations.",
        capabilities: [
          ["Excluded", "Collect metrics with a separate service"],
          [
            "Excluded",
            "Connect Grafana or another supported log-viewing interface",
          ],
        ],
      },
      {
        name: "OpenTelemetry Collector",
        logo: "/providers/opentelemetry.svg",
        company: "OpenTelemetry project",
        url: "https://opentelemetry.io/docs/collector/",
        license:
          "https://github.com/open-telemetry/opentelemetry-collector/blob/main/LICENSE",
        purpose:
          "Receive, process and forward metrics, logs and request traces to storage services.",
        strengths:
          "Connects supported data receivers and exporters without requiring a single storage vendor.",
        limitations:
          "Not a long-term storage engine or dashboard. Supported components differ between distributions.",
        costs:
          "Apache 2.0; no core license fee. Pay collector capacity and separate storage and dashboard services.",
        capabilities: [
          ["Auto", "Receives or collects metrics with configured components"],
          ["Excluded", "Send data to separate storage and dashboard services"],
        ],
      },
      {
        name: "Zabbix",
        logo: "/providers/zabbix.png",
        company: "Zabbix",
        url: "https://www.zabbix.com/documentation/current/en/manual/introduction/about",
        license: "https://github.com/zabbix/zabbix/blob/master/COPYING",
        purpose:
          "Monitor machines, networks and applications using configured checks and agents.",
        strengths:
          "Integrated monitoring, dashboards and alert configuration for infrastructure operations.",
        limitations:
          "Requires a supported database and configured checks; app-level tracing is a separate concern.",
        costs:
          "Current versions use AGPLv3; support and training are optional paid services. Pay servers, database and operations.",
        capabilities: [
          ["Auto", "Collects configured agent and network measurements"],
          ["Auto", "Provides configured dashboards in its web interface"],
        ],
      },
      {
        name: "VictoriaMetrics",
        company: "VictoriaMetrics",
        logo: "/providers/victoriametrics.ico",
        url: "https://docs.victoriametrics.com/victoriametrics/",
        license:
          "https://github.com/VictoriaMetrics/VictoriaMetrics/blob/master/LICENSE",
        purpose:
          "Store and query time-series metrics in single-server or clustered deployments.",
        strengths:
          "Prometheus-compatible integrations and deployment options for different retention and capacity needs.",
        limitations:
          "Not a log or trace backend. Configure scraping directly or with vmagent; saved dashboards usually use a separate tool.",
        costs:
          "Apache 2.0 community code; Enterprise features have separate terms. Pay metrics servers, storage and operations.",
        capabilities: [
          ["Auto", "Collects configured metrics directly or through vmagent"],
          [
            "Excluded",
            "Use the query UI or connect a separate saved-dashboard service",
          ],
        ],
      },
      {
        name: "Netdata Agent",
        company: "Netdata",
        logo: "/providers/netdata.png",
        url: "https://github.com/netdata/netdata",
        license: "https://github.com/netdata/netdata/blob/master/LICENSE",
        purpose:
          "Collect infrastructure metrics and show live local monitoring views.",
        strengths:
          "Integrated collectors and built-in charts for configured machines and services.",
        limitations:
          "The open-source agent and Netdata Cloud are different products. Dashboard components and centralized features can have separate terms.",
        costs:
          "GPLv3 Agent; bundled UI components and Cloud features can have different terms. Pay agent hosts, retention storage and operations.",
        capabilities: [
          ["Auto", "Collects measurements through enabled agent integrations"],
          [
            "Auto",
            "Provides built-in monitoring charts; custom and Cloud views differ",
          ],
        ],
      },
      {
        name: "Icinga 2",
        company: "Icinga",
        logo: "/providers/icinga.png",
        url: "https://icinga.com/docs/icinga-2/latest/",
        license: "https://github.com/Icinga/icinga2/blob/master/LICENSE.md",
        purpose:
          "Check service and machine availability and trigger configured notifications.",
        strengths:
          "Distributed checks, monitoring plugins and configuration for infrastructure availability.",
        limitations:
          "The monitoring engine needs Icinga Web 2 for a web interface and additional components for historical metric graphs.",
        costs:
          "Icinga 2.16+ uses GPLv3-or-later; earlier versions use GPLv2-or-later. Pay monitoring servers, web/database components and operations.",
        capabilities: [
          ["Auto", "Runs configured checks and gathers their performance data"],
          [
            "Excluded",
            "Install Icinga Web 2 and supporting dashboard components",
          ],
        ],
      },
      {
        name: "Uptime Kuma",
        company: "Uptime Kuma project",
        logo: "/providers/uptime-kuma.svg",
        url: "https://github.com/louislam/uptime-kuma",
        license: "https://github.com/louislam/uptime-kuma/blob/master/LICENSE",
        purpose:
          "Check whether endpoints respond and publish configured status pages.",
        strengths:
          "Uptime checks, notifications and a built-in web interface for smaller availability-monitoring setups.",
        limitations:
          "Not a general application-metrics, log or trace store. Run checks outside the monitored machine to detect that machine failing.",
        costs:
          "MIT core; no core license fee. Pay the monitoring host, persistent storage, notification services and operations.",
        capabilities: [
          [
            "Excluded",
            "Checks uptime and response time, not general app metric collection",
          ],
          [
            "Auto",
            "Provides built-in monitor views and configured status pages",
          ],
        ],
      },
      {
        name: "Jaeger",
        company: "Jaeger project",
        logo: "/providers/jaeger.svg",
        url: "https://www.jaegertracing.io/docs/latest/",
        license: "https://github.com/jaegertracing/jaeger/blob/main/LICENSE",
        purpose:
          "Collect and explore request traces across connected application services.",
        strengths:
          "Trace search and request-flow views for diagnosing distributed application behavior.",
        limitations:
          "Requires instrumented apps and suitable persistent trace storage. Its trace UI is not a general metrics dashboard or log store.",
        costs:
          "Apache 2.0; no core license fee. Pay collection servers, trace storage, retention and operations.",
        capabilities: [
          [
            "Excluded",
            "Collects request traces; general metrics need a separate service",
          ],
          [
            "Excluded",
            "Provides trace exploration rather than general saved metric dashboards",
          ],
        ],
      },
    ],
    [
      {
        label: "Metrics collection",
        explanation:
          "Metrics are numerical measurements such as request counts, response times and memory use. A collector gathers them from configured targets; a dashboard or log store alone does not automatically collect your application's measurements.",
      },
      {
        label: "Saved dashboards",
        explanation:
          "Saved dashboards organize graphs and views for repeated use. Storage engines and collectors can be useful without supplying a dashboard interface; connecting several products is often necessary for a complete monitoring setup.",
      },
    ],
  ),
];
