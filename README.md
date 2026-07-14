# Pilot Logbook Dashboard

A mobile-first pilot companion app built with Nuxt 3, Pinia, and SCSS. Covers three screens: Sign In, Home Dashboard, and Schedule.

> **How I built this (AI-assisted workflow):**
> This is my first time working with Vue and Nuxt — I come from a React/Next.js background. I used Claude (AI) as my development partner throughout this project, but not as a code generator. Here's how the process worked:
>
> 1. **Analysis first** — I gave Claude the full test brief and asked it to break down exactly what features needed to be built, what each screen should look like, and what the expected behavior/output was for every component (e.g., rolling sum logic, calendar grid generation, document expiry status).
> 2. **Understanding expectations** — Before writing any code, we clarified the "definition of done" for each feature: what data structure the chart expects, how the calendar should handle month transitions, what the bottom sheet should display, etc. This prevented rework later.
> 3. **Implementation** — Once I had a clear picture of the requirements and expected outputs, I mapped the concepts to what I already knew (`useState` → `ref`, `useMemo` → `computed`, custom hooks → composables, `app/layout.tsx` → `layouts/default.vue`) and built it out with Claude helping me understand Nuxt conventions, debug SSR issues, and validate architectural decisions along the way.
>
> The code and design decisions are mine. AI helped me think through requirements upfront and move faster on an unfamiliar stack.

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

**Login credentials:** `admin` / `admin`

---

## Project Structure

```
├── pages/
│   ├── index.vue          # Sign In
│   ├── home.vue           # Dashboard
│   └── schedule.vue       # Monthly calendar
├── components/
│   ├── layout/            # AppHeader, BottomNav
│   ├── home/              # UpcomingFlight, NewsCarousel, DocumentList
│   ├── hours/             # LimitCard, TrendChart, RangeToggle, HoursToLimit
│   └── schedule/          # CalendarDay, CalendarLegend
├── stores/
│   ├── pilot.ts           # Flight hours state + rolling sum logic
│   ├── documents.ts       # Document expiry state
│   └── schedules.ts       # Calendar grid + duty schedule state
├── composables/
│   ├── useRollingSum.ts   # Rolling sum calculation
│   └── useDocExpiry.ts    # Document expiry helpers
├── styles/
│   ├── variables.scss     # Design tokens (colors, spacing, typography)
│   └── main.scss          # Global reset + utility classes
└── docs/
    ├── mock-flight-hours.json
    ├── mock-documents.json
    └── mock-schedules.json
```

---

## Key Implementation

### Rolling Sum (Hours to Limit)

The chart shows a rolling sum — for each date D and a given window (e.g. 7 days), it calculates the total hours flown in the range `[D - window + 1, D]`.

```ts
function rollingSum(endDate: string, windowDays: number): number {
  let total = 0
  for (let i = 0; i < windowDays; i++) {
    total += getHours(addDays(endDate, -i))
  }
  return Math.round(total * 10) / 10
}
```

The chart renders 15 points: 7 days before today, today (highlighted in red), and 7 days after. Today is hardcoded as `2026-05-31` per the brief.

### Mock Data

No backend. All data is loaded from JSON files in `/docs` directly into Pinia stores at startup. The app is entirely static.

### Calendar

The schedule store generates a calendar grid for the current month, handles prev/next month navigation, and maps each day to its duty entry from `mock-schedules.json`. Tapping a day opens a bottom sheet modal with duty details and logbook progress.

---

## Library Choices

| Library | Why |
|---|---|
| **Nuxt 3** | File-based routing, auto-imports, and layout system out of the box — reduces boilerplate significantly |
| **Pinia** | Official Vue state management. Composition API style matches `<script setup>` naturally |
| **Chart.js + vue-chartjs** | Lightweight charting with good Vue 3 support. `vue-chartjs` wraps Chart.js as Vue components |
| **Lucide Vue Next** | Consistent, tree-shakeable icon set with native Vue 3 component support |
| **SCSS** | Variables and nesting keep the design system centralized. Nuxt's `additionalData` injects tokens globally without manual imports |

**Not used:**
- **PWA** — Listed as optional in the brief. Given this was my first Nuxt project, I prioritized correctness over optional features. A broken PWA would score worse than no PWA.

---

## What I'd Do Differently

1. **Real authentication** — Replace hardcoded `admin/admin` with a proper auth composable and route guard (`middleware/auth.ts`)

2. **Pure utils over composables for stateless logic** — `useRollingSum` and `useDocExpiry` don't use reactive state; they'd be better placed in `lib/` as plain utility functions

3. **Persist chart toggle in store** — The selected range (`1w`, `1m`, etc.) resets on navigation. Lifting it into Pinia would preserve it

4. **Real avatar** — Currently uses initials derived from the pilot name. Would use a profile photo from an API or allow upload

5. **Unit tests for rolling sum** — The rolling sum is the most critical calculation in the app and has no test coverage. This would be the first thing I'd add

6. **Single source for mock today** — `TODAY = '2026-05-31'` is referenced in two places. A shared `composables/useToday.ts` would make it easier to switch to real date in production

---

## Design

Mobile-first, max-width 430px centered. Designed to feel like a native app on a 390px viewport (iPhone 14 Pro). Color palette follows Susi Air's brand — navy (`#0E2138`) as primary, red (`#E63757`) as accent.
