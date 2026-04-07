# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

No test framework is configured.

## Architecture

**Next.js 16 app-router** frontend that talks directly to **Supabase** (PostgreSQL + Auth + Storage) from client components. There is no separate API layer — all data fetching uses the Supabase JS client initialized in `utils/supabase.ts`.

All pages use `"use client"` and manage state with React hooks.

### User Roles

Three roles stored in the `profiles.role` column:
- **competitor** — registers, signs waiver, manages dashboard
- **judge** — accesses scoring pad, submits scores per stage/role
- **admin** — check-in desk, CSV import, manual verification

### Key Routes

| Route | Purpose |
|---|---|
| `app/page.tsx` | Landing page with countdown timer |
| `app/layout.tsx` | Root layout — hosts the legal gatekeeper (checks waiver acceptance before allowing navigation) |
| `app/register/page.tsx` | Multi-step registration with profile image cropping (react-easy-crop) |
| `app/dashboard/page.tsx` | Competitor profile management, image upload to Supabase Storage |
| `app/judge/page.tsx` | Real-time scoring pad (stage: Preliminary/Semi-Final/Final, role: Leader/Follower) |
| `app/admin/page.tsx` | CSV import (PapaParse), check-in tracking, competitor verification |
| `app/results/page.tsx` | Leaderboards with rankings and judge breakdowns |
| `app/qualifiers/[slug]/page.tsx` | Dynamic qualifier detail pages |

### Database Tables

- **profiles** — `id`, `role`, `full_name`, `gender`
- **registrations** — competitor registration data, `terms_accepted`
- **scores** — judge submissions with technique/musicality/connection/style/attitude fields, stage, leader/follower role
- **leaderboards** — computed rankings with bib numbers, total scores, yes counts, qualification status

Supabase Storage bucket `avatars` holds profile images.

### Path Alias

`@/*` maps to the project root. Use `@/utils/supabase` to import the Supabase client.

### Environment Variables

`.env.local` (not committed):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Styling

Tailwind CSS v4 via PostCSS. Custom `Mortend` font loaded from `public/fonts/` and applied via `app/globals.css`.
