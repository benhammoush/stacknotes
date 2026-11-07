/**
 * Suggests self-operated service combinations without claiming turnkey integration or customer adoption.
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
];

export const selfHostedCombinations: Combination[] = [
  {
    id: "general-web-app",
    name: "General web app",
    description:
      "A relational database and separate identity, file and message services behind Caddy.",
    services: [
      ["Caddy", "caddy.png", "https://caddyserver.com/docs/"],
      ["PostgreSQL", "postgresql.svg", "https://www.postgresql.org/docs/"],
      ["Keycloak", "keycloak.svg", "https://www.keycloak.org/guides"],
      [
        "Garage",
        "garage.svg",
        "https://garagehq.deuxfleurs.fr/documentation/quick-start/",
      ],
      ["RabbitMQ", "rabbitmq.svg", "https://www.rabbitmq.com/docs"],
      [
        "Prometheus + Grafana",
        "grafana.svg",
        "https://grafana.com/docs/grafana/latest/datasources/prometheus/",
      ],
    ],
    note: "Caddy forwards requests; you still run your app server and message workers. Connect Keycloak identities to app permissions and Garage file access. Plan independent backups and monitor all services.",
  },
  {
    id: "php-web-app",
    name: "PHP app with MariaDB",
    description:
      "A PHP application with relational data and separately connected sign-in and object storage.",
    services: [
      [
        "Apache + PHP",
        "apache.ico",
        "https://httpd.apache.org/docs/2.4/mod/mod_proxy_fcgi.html",
      ],
      ["MariaDB Server", "mariadb.svg", "https://mariadb.com/docs/server"],
      ["authentik", "authentik.png", "https://docs.goauthentik.io/docs/"],
      [
        "OpenStack Swift",
        "openstack.ico",
        "https://docs.openstack.org/swift/latest/",
      ],
      ["RabbitMQ", "rabbitmq.svg", "https://www.rabbitmq.com/docs"],
      [
        "Zabbix",
        "zabbix.png",
        "https://www.zabbix.com/documentation/current/en/manual",
      ],
    ],
    note: "Install PHP and a suitable application handler or process manager; Apache alone is not PHP. The app needs compatible identity and Swift connections. You run workers and configure monitoring checks and recovery.",
  },
  {
    id: "windows-app",
    name: "Windows app with PostgreSQL",
    description:
      "A Windows-hosted application connected to separately operated database, identity and workflow services.",
    services: [
      [
        "IIS",
        "microsoft.svg",
        "https://learn.microsoft.com/en-us/iis/get-started/introduction-to-iis/introduction-to-iis-architecture",
      ],
      ["PostgreSQL", "postgresql.svg", "https://www.postgresql.org/docs/"],
      ["Keycloak", "keycloak.svg", "https://www.keycloak.org/guides"],
      [
        "Garage",
        "garage.svg",
        "https://garagehq.deuxfleurs.fr/documentation/quick-start/",
      ],
      [
        "Temporal",
        "temporal.svg",
        "https://docs.temporal.io/self-hosted-guide",
      ],
      [
        "Zabbix",
        "zabbix.png",
        "https://www.zabbix.com/documentation/current/en/manual",
      ],
    ],
    note: "IIS requires Windows and the correct app hosting modules. The other services can require Linux or separate machines; this is not an all-Windows installation recipe. Deploy Temporal-compatible app workers and provide its persistence database.",
  },
  {
    id: "event-driven-app",
    name: "Document and event app",
    description:
      "Document data and stored event streams connected to a separately hosted app.",
    services: [
      ["Nginx", "nginx.svg", "https://nginx.org/en/docs/beginners_guide.html"],
      [
        "MongoDB Community",
        "mongodb.svg",
        "https://www.mongodb.com/docs/manual/introduction/",
      ],
      [
        "ZITADEL",
        "zitadel.png",
        "https://zitadel.com/docs/self-hosting/deploy/overview",
      ],
      ["SeaweedFS", "seaweedfs.ico", "https://github.com/seaweedfs/seaweedfs"],
      [
        "NATS JetStream",
        "nats.svg",
        "https://docs.nats.io/nats-concepts/jetstream",
      ],
      [
        "Prometheus + Grafana + Loki",
        "grafana.svg",
        "https://grafana.com/docs/loki/latest/get-started/overview/",
      ],
    ],
    note: "Nginx forwards requests to app code you run. Configure JetStream persistence and safe message processing, connect identities to app and file permissions, and configure metrics and log collection. Review MongoDB and other component license terms.",
  },
];
