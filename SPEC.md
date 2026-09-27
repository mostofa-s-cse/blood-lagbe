# Blood Lagbe — Technical Spec

Centralized platform for blood donation and emergency donor management.

## Stack

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **UI**: shadcn/ui (base-nova style, Base UI primitives)
- **Forms**: react-hook-form + zod
- **State/data**: Redux Toolkit + RTK Query (`/api/*` REST routes)
- **i18n**: next-intl — Bangla (default) + English, `messages/{bn,en}.json`
- **Database**: Supabase Postgres, provisioned via Vercel Marketplace
- **ORM**: Prisma 6
- **Auth**: Supabase Auth (email + password), role stored in `user_metadata.role`
- **Hosting**: Vercel

## Roles

| Role | Description |
|---|---|
| `DONOR` | registers a donor profile, responds to requests |
| `SEEKER` | creates/manages blood requests |
| `ORG` | hospital/NGO, manages requests once verified by admin |
| `ADMIN` | manages users, verifies orgs, moderates requests |

## Data Model (see `prisma/schema.prisma`)

- `User` — mirrors Supabase auth user (`id` = Supabase auth UID), `role`, `verified`
- `DonorProfile` — 1:1 with `User` (DONOR): `bloodGroup`, `location`, `available`, `lastDonationDate`, `donationCount`
- `Organization` — 1:1 with `User` (ORG): `orgName`, `orgType` (HOSPITAL/NGO), `verified`
- `BloodRequest` — `bloodGroup`, `bagsNeeded`, `hospital`, `location`, `patientInfo`, `contactInfo`, `isEmergency`, `status` (PENDING/DONOR_FOUND/COMPLETED/CANCELLED)
- `DonationHistory` — one row per completed donation, linked to donor + optional request
- `Notification` — in-app notification per user, linked to optional request

## Routes

```
/[locale]                      home
/[locale]/about
/[locale]/contact
/[locale]/login
/[locale]/signup
/[locale]/donors/search        donor search (milestone 2)
/[locale]/dashboard            role-aware dashboard shell
/[locale]/dashboard/profile    donor profile CRUD (DONOR)
/[locale]/dashboard/requests   blood requests (milestone 2)
/[locale]/dashboard/notifications  (milestone 3)
/[locale]/admin                admin dashboard (ADMIN only, milestone 3)
```

## API (Next.js route handlers, unlocalized under `/api`)

- `POST /api/auth/sync-user` — upserts the Prisma `User` row from the current Supabase session
- `GET/PUT /api/donors/me` — own donor profile
- `GET /api/donors` — search donors by blood group + location (milestone 2)
- `POST /api/contact` — contact form submission
- Milestone 2/3 add: `/api/requests`, `/api/requests/[id]`, `/api/notifications`, `/api/admin/*`

## Access control

- `src/proxy.ts` (Next.js 16 middleware/proxy) handles locale routing (next-intl) + Supabase session refresh + RBAC:
  - `/dashboard/**` requires an authenticated session
  - `/admin/**` requires `role === "ADMIN"`

## Milestones (see project plan for full breakdown)

1. **25%** — scaffold, i18n, auth, donor profiles, public pages
2. **50%** — donor search, blood request creation + status tracking
3. **100%** — emergency requests, notifications, donation history, org + admin dashboards

## Deferred / out of scope

- Real map/geocoding-based location search (simple city/text match instead)
- SMS/email/push notifications (in-app notifications only)
