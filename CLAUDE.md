@AGENTS.md

# Blood Lagbe — Project Guide

Read this before doing anything in this repo. It's written so a fresh session (or a
teammate) can pick this project up cold.

## What this is

University/thesis project: centralized blood donation + emergency donor management
platform. Full idea doc lives in the conversation history that created this repo; short
version — donors register with blood group/location/availability, seekers post blood
requests, hospitals/orgs manage verified requests, admin moderates everything.

Delivered in **3 milestones** so progress can be demoed/committed incrementally:
25% → 50% → 100%. See "Branch strategy" below — each milestone has its own branch.

## Tech stack

- Next.js 16 (App Router, Turbopack), TypeScript, Tailwind v4
- shadcn/ui, **base-nova style** (Base UI primitives, not Radix — see Gotchas)
- Redux Toolkit + RTK Query (`src/store/`) for all client data fetching
- react-hook-form + zod for every form
- next-intl for i18n: **Bangla (default) + English**, locale-routed under `[locale]`
- Supabase (Postgres + Auth), provisioned via Vercel Marketplace
  (`vercel integration add supabase`) — real project, not a placeholder
- Prisma 6.19.3 ORM (pinned — see Gotchas, do not bump to Prisma 7 casually)
- Deploy target: Vercel

## Branch strategy

`main`, `staging`, `25-percent`, `50-percent`, `100-percent` — all on GitHub
(`git@github.com:mostofa-s-cse/blood-lagbe.git`). Workflow so far: build on `main`,
then fast-forward the milestone branches to the same commit and push all of them
together:

```bash
git add -A && git commit -m "..."
for b in staging 25-percent 50-percent 100-percent; do git branch -f "$b" main; done
git push origin main staging 25-percent 50-percent 100-percent
```

Once milestone 2 work actually diverges from milestone 1, stop fast-forwarding
`25-percent` — it should freeze at the 25% commit so the supervisor can diff it. Only
keep advancing `main`/`staging`/the *current* milestone branch.

Commit messages: plain, no AI co-author trailer (user asked for this explicitly —
own name only, no `Co-Authored-By: Claude`).

## Environment setup (fresh clone / fresh session)

```bash
pnpm install
vercel link                      # if not linked (project: mostofa-s/blood-lagbe)
vercel env pull .env.local --yes
cp .env.local .env               # prisma CLI only autoloads .env, not .env.local
pnpm exec prisma db push         # NOT `prisma migrate dev` — see Gotchas
pnpm dev
```

Supabase project was provisioned once via `vercel integration add supabase`
(Vercel Marketplace, native integration) — already exists, env vars are pulled not
recreated. Don't re-run `vercel integration add supabase`, it would provision a
second database.

## Architecture map

```
src/app/[locale]/
  (marketing)/          # public site: SiteNav + SiteFooter chrome
    page.tsx              home (hero search, live stats, how-it-works, tips, features)
    about/, contact/, donors/search/
    (auth)/login/, (auth)/signup/   # split-screen auth layout, own brand panel
  dashboard/             # authenticated app shell (AppSidebarShell), NO SiteNav
  admin/                 # same shell, ADMIN-only
  api/                   # REST route handlers used by RTK Query
src/components/
  app-sidebar-shell.tsx  # shared sidebar shell for dashboard + admin
  dashboard-shell.tsx / admin-shell.tsx   # role-specific nav items, wrap the shell
  dashboard-topbar-actions.tsx  # locale switcher + logout, lives in the sidebar topbar
  site-nav.tsx / site-footer.tsx  # marketing-only chrome
  hero-illustration.tsx  # original inline SVG illustration (not a copied asset)
  empty-state.tsx        # shared "coming soon" placeholder for unbuilt stub pages
src/lib/
  supabase/{client,server}.ts   # browser vs server Supabase clients
  current-user.ts        # getCurrentAuthUser() / getCurrentUser() (Prisma row)
  roles.ts                Role type + SIGNUP_ROLES
  validation/*            zod schemas shared by forms + API routes
src/store/                RTK Query api slices (api.ts is the base, others inject)
src/i18n/                 next-intl routing/navigation/request config
src/proxy.ts               Next.js 16 middleware (renamed from middleware.ts) —
                           handles locale routing + Supabase session refresh + RBAC
                           (/dashboard requires auth, /admin requires ADMIN role)
prisma/schema.prisma       full data model (see below)
messages/{bn,en}.json      all UI strings — never hardcode text in components
```

**Route groups matter here.** `(marketing)` owns the public nav/footer.
`dashboard`/`admin` deliberately sit *outside* that group so they get their own full
sidebar app shell instead — see Gotchas for why this isn't optional.

## Data model (Prisma)

`User` (id = Supabase auth UID), `DonorProfile`, `Organization`, `BloodRequest`,
`DonationHistory`, `Notification`. Enums: `Role` (DONOR/SEEKER/ORG/ADMIN),
`BloodGroup`, `RequestStatus`, `OrgType`. Full spec in `SPEC.md`.

Auth flow: Supabase Auth handles signup/login; `role` is stored in
`user_metadata.role` at signup. After login, client calls `POST /api/auth/sync-user`
which upserts the Prisma `User` row from the Supabase session (see
`src/app/api/auth/sync-user/route.ts`). Middleware reads role straight from
`user_metadata` (no DB hit) for route gating.

## Gotchas (learned the hard way this session — don't rediscover these)

- **Prisma 7 breaks schema-based `datasource url`** (needs `prisma.config.ts` +
  driver adapters). Pinned to `prisma@6.19.3` / `@prisma/client@6.19.3` deliberately.
  Don't `pnpm add -D prisma@latest`.
- **`prisma migrate dev` hangs/times out against Supabase's pooler** (shadow DB
  creation gets stuck). Use `pnpm exec prisma db push` instead — no shadow DB needed,
  fine for this project's stage.
- **shadcn base-nova uses Base UI, not Radix.** No `asChild` prop on `Button` —
  use `render={<Link href="...">text</Link>}` instead, and add
  `nativeButton={false}` whenever the `render` target isn't a real `<button>`
  (otherwise a console error about native button semantics).
- **`SelectValue` shows the raw value, not the item's label**, unless you pass a
  children-as-function: `<SelectValue>{(v) => LABEL_MAP[v]}</SelectValue>`. Bit us on
  the role picker and the locale switcher both showing raw enum/locale codes.
- **shadcn's `Sidebar` is `fixed inset-y-0 h-svh`** — it assumes it owns the whole
  viewport. Nesting it under the public `SiteNav` caused a visual collision (a stray
  duplicate header sliver). Fix was structural, not CSS: dashboard/admin live outside
  the `(marketing)` route group and get zero public nav — the sidebar shell *is* their
  app shell, with its own locale switcher + logout in the topbar.
- **Next.js 16 renamed `middleware.ts` → `proxy.ts`**, and the exported function must
  be named `proxy` (not `middleware`) or the build fails outright.
- **Port 3000 may already be taken by an unrelated project** (`hisabloom` on this
  machine) — `next dev` silently falls back to 3001. Check the actual bound port
  before assuming curl/playwright hit the right server.
- **Never fabricate content.** No fake testimonials, fake donor counts, fake
  campaign/event cards. The home page stats bar queries real Prisma counts
  (`donorProfile.count()`, etc.) — keep it that way even though it shows `0+` on a
  fresh DB. When pulling design inspiration from reference sites, take the layout/
  color ideas, not their copy or their literal image assets.
- **Test users**: use the Supabase Admin API (`/auth/v1/admin/users`, service role
  key) to create pre-confirmed test accounts for browser verification, and delete
  them (+ the matching Prisma `User` row) afterward. Don't leave test data in the DB.

## Verification workflow (do this before claiming anything works)

```bash
pnpm lint
pnpm build          # rm -rf .next first if a previous dev server left it dirty
pnpm dev            # then actually load it in a browser (playwright) — screenshot,
                     # don't just check HTTP status codes
```

Full round-trip check: signup → `POST /api/auth/sync-user` fires → login → dashboard
shows synced role → donor profile save → confirm the row landed in Postgres via
`psql "$POSTGRES_URL_NON_POOLING" -c '...'`.

## Status

- **25%** (done): scaffold, i18n, Supabase Auth + Prisma, donor profile CRUD, public
  pages, full design pass (see commit history on `main` for the design-iteration
  story — theme color, per-page redesign, dashboard shell restructure).
- **50%** (not started): donor search, blood request creation, status tracking.
- **100%** (not started): emergency requests, notifications, donation history, org +
  admin dashboards.

Full milestone breakdown: `SPEC.md`. Original plan doc (data model reasoning, folder
structure rationale) was written to
`/Users/mostofa/.claude/plans/pasted-content-id-2f56-project-name-resilient-swan.md`
during planning — not part of the repo, but useful history if you need the "why"
behind an early decision.
