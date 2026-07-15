# Pilot Logbook Dashboard

A mobile-first pilot companion app built with Nuxt 3 for Susi Air. Covers three screens: Sign In, Home Dashboard, and Schedule Calendar.

> Built as a frontend developer test submission. This is my first Vue/Nuxt project — I come from a React/Next.js background. I used Claude as a development partner to analyze requirements, clarify edge cases, and navigate Nuxt conventions. All code and architecture decisions are mine.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

### Setup

```bash
# Clone the repo
git clone <repo-url>
cd susiair-test

# Install dependencies
npm install
```

### Development

```bash
# Start dev server with hot reload
npm run dev
# → http://localhost:3000
```

### Build & Preview

```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Static site generation (if needed)
npm run generate
```

### Login

Credentials: `admin` / `admin`

---

## Tech Stack

| Library | Version | Why |
|---|---|---|
| **Nuxt 3** | 3.21.8 | File-based routing, auto-imports, layout system — eliminates boilerplate for multi-page apps |
| **Vue 3** | 3.5.39 | Composition API with `<script setup>` keeps component logic concise |
| **Pinia** | 3.0.4 | Official Vue state management. Composition API style pairs naturally with `<script setup>` |
| **Chart.js + vue-chartjs** | 4.5.1 / 5.3.4 | Lightweight charting with solid Vue 3 wrapper. Good for line charts without heavy config |
| **Lucide Vue Next** | 1.0.0 | Tree-shakeable icons with native Vue 3 components. Clean, consistent icon set |
| **SCSS (sass)** | 1.101.0 | Variables and nesting for centralized design tokens. Nuxt's `additionalData` injects tokens globally |

---

## Project Structure

```
├── pages/
│   ├── index.vue              # Sign In (layout: false)
│   ├── home.vue               # Dashboard
│   └── schedule.vue           # Monthly calendar
├── components/
│   ├── layout/                # AppHeader, BottomNav
│   ├── home/                  # UpcomingFlight, NewsCarousel, DocumentList
│   ├── hours/                 # LimitCard, TrendChart, RangeToggle, HoursToLimit
│   └── schedule/              # CalendarDay, CalendarLegend
├── stores/
│   ├── pilot.ts               # Flight hours + rolling sum logic
│   ├── documents.ts           # Document expiry state
│   └── schedules.ts           # Calendar grid + duty schedule
├── composables/
│   ├── useRollingSum.ts       # Rolling sum calculation utility
│   └── useDocExpiry.ts        # Document expiry helpers
├── data/
│   ├── mockFlightHours.ts     # 521 daily flight hour entries
│   ├── mockDocuments.ts       # 5 pilot documents
│   └── mockSchedules.ts       # 54 duty schedule entries
├── styles/
│   ├── variables.scss         # Design tokens (colors, spacing, typography)
│   └── main.scss              # Global reset + utility classes
├── layouts/
│   └── default.vue            # Page wrapper with bottom nav
└── docs/                      # Analysis, design specs, raw mock data
```

---

## Key Implementation Notes

### Rolling Sum (Hours to Limit)

The chart shows a rolling sum — for each date D and a given window (e.g. 7 days), it calculates total hours flown in `[D - window + 1, D]`.

```ts
function rollingSum(endDate: string, windowDays: number): number {
  let total = 0
  for (let i = 0; i < windowDays; i++) {
    total += getHours(addDays(endDate, -i))
  }
  return Math.round(total * 10) / 10
}
```

Renders 15 points: 7 before today, today (red highlight), 7 after. Toggle switches between 5 ranges (1w/1m/3m/6m/1y), changing the rolling window. Today is hardcoded as `2026-05-31` per the brief.

### Calendar Grid

The schedule store generates a 7-column calendar grid for the current month, handles prev/next navigation, and maps each day to its duty entry. Tapping a day opens a bottom sheet with duty details and logbook progress.

### Mock Data

No backend. All data is embedded as TypeScript modules loaded directly into Pinia stores. The app is entirely static.

### Client-Only Chart

TrendChart uses Nuxt's `.client.vue` suffix to avoid SSR issues with Chart.js (which requires the DOM).

---

## What I'd Do Differently with More Time

1. **Real authentication** — Replace hardcoded `admin/admin` with a proper auth composable and route middleware guard
2. **Unit tests for rolling sum** — The rolling sum is the most critical calculation and has no test coverage. This would be the first thing I'd add
3. **Pure utils instead of composables** — `useRollingSum` and `useDocExpiry` don't use reactive state; they belong in `lib/` as plain utility functions
4. **Single source for mock today** — `TODAY = '2026-05-31'` is referenced in two places. A shared `useToday()` composable would make switching to real dates easier
5. **Persist chart toggle in store** — The selected range resets on navigation. Lifting it into Pinia would preserve it across route changes
6. **PWA support** — Listed as optional in the brief. Prioritized correctness over optional features since this was my first Nuxt project
7. **Real avatar** — Currently uses initials derived from pilot name. Would integrate a profile photo API or upload
8. **Accessibility audit** — Add proper ARIA labels, keyboard navigation for the calendar, and screen reader support for the chart

---

## Design

Mobile-first, max-width 430px centered. Designed to feel native on a 390px viewport (iPhone 14 Pro). Color palette follows Susi Air's brand — navy (`#0E2138`) as primary, red (`#E63757`) as accent. Full design system documented in `docs/SYSTEM_DESIGN.md`.
