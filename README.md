# Blood Lagbe

Centralized platform for blood donation and emergency donor management. See [`SPEC.md`](./SPEC.md) for the technical spec.

## Setup

```bash
pnpm install
vercel link              # if not already linked
vercel env pull .env.local --yes
cp .env.local .env       # prisma CLI only autoloads .env
pnpm exec prisma migrate dev
pnpm dev
```

Open http://localhost:3000 (or the port printed in the terminal).

## Scripts

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm exec prisma studio` — browse the database
- `pnpm exec prisma migrate dev` — apply schema changes

## Project structure

See `SPEC.md` → Routes / API for the folder layout and route map.
