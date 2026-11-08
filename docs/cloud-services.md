# Cloud service inventory

`src/data/cloudServices.ts` owns the Services offered inventory. It replaces the
Cloud combination suggestions, retaining `/combinations/` so existing links still
work. JavaScript application stacks and all dedicated comparisons are separate.

## Scope

The nineteen rows cover the providers and branded platforms from the former cloud
suggestions, including providers previously shown only as external alternatives.
Rows sort by the number of listed nonempty service categories, most to fewest,
with alphabetical ties. Multiple products in one category count once. This measures
coverage of this selected inventory, not overall provider quality or catalog completeness.
Firebase remains a branded platform within
Google Cloud rather than being presented as an independent company.

This is a selected inventory, not every product in each provider's catalog or
every provider in the dedicated comparisons. A dash means no offering listed in
scope, not a verified assertion that no related capability exists. Marketplace
integrations are not first-party offerings. Railway's supported database templates
are explicitly labeled rather than equated with other managed database products.

Hosting includes website hosting and backend function runtimes, labeled where
they are not full website hosting. Sign-in covers customer accounts, not workforce
or dashboard access. Storage covers files/objects, not merely local disks. Caching
includes data stores and HTTP caches, distinguished by name and notes. Search
covers dedicated managed search/retrieval products, not full-text database
extensions. Monitoring includes native logs/metrics as well as dedicated APM;
these do not have identical coverage. Job columns distinguish queues, schedulers
and code-running workers. Placement never establishes equivalent capabilities,
free pricing, bundled billing or automatic integration.

## Sources

Each offering links its official documentation. Linked product pages were checked
in November 2026, including Azure AI Search, Google Agent Search (formerly Vertex
AI Search), Cloudflare AI Search, Vercel's native storage/caching/observability and
beta Schedules/Queues, Supabase Queues/Cron, and Neon's native authentication,
storage and function offerings. Availability, regions, plans and limits can change;
check the linked sources before adoption. No live provider APIs are queried by the
site, and documentation checks do not test service integrations.

Upstash's former standalone Search product is not listed: its documentation says
new databases can no longer be created. Redis Search is outside the dedicated
search scope. Local icons reuse the existing assets and attribution in
`THIRD_PARTY_NOTICES.txt`; no new assets or dependencies are required.
