# Job Tracker Application

A responsive React dashboard for tracking job applications through every stage of the hiring pipeline — from first apply to final offer.

---

## Features

### Core
- **Add / Edit / Delete** job applications with structured fields (company, title, status, date, location, salary, notes, link)
- **Search & filter** by company, title, or location
- **Sort** by newest, oldest, company name, or status
- **Status tracking** — Applied, Interview, Offer, Rejected

### Dashboard & Analytics
- Stats cards with counts per status
- Insights strip — active pipeline, response rate, success rate, days since last application
- Donut chart (applications by status) and bar chart (applications per month) via Recharts

### UX Polish
- **Onboarding flow** — three-step welcome modal on first visit (dismissable, persisted to localStorage)
- **Delete confirmation modal** — prevents accidental deletions with a clear confirmation dialog
- **Application cards** with status-colored avatars, location/salary/calendar icons, and notes preview
- **Dark / light mode** toggle with full theme system via CSS custom properties
- **Fully responsive** — collapses to a horizontal nav bar on mobile and single-column cards on small screens

### Data
- All data persists in **localStorage** — no backend required
- Structured constants and helpers for IDs, statuses, and storage operations

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 |
| Routing | React Router 7 |
| State | Context API + `useState` |
| Charts | Recharts |
| Styling | CSS (custom properties, responsive grid) |
| Linting | oxlint |
| Build | Vite 8 |

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install & Run

```bash
# clone the repo
git clone https://github.com/derxm/Job-Tracker-Application.git
cd Job-Tracker-Application

# install dependencies
npm install

# start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | Run oxlint |
| `npm run preview` | Preview the production build locally |

---

## Project Structure

```
job-application-tracker/
├── public/
│   ├── favicon.svg
│   └── icons.svg              # SVG sprite (app + utility icons)
│
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         # Side navigation
│   │   ├── Header.jsx          # Page title + theme toggle
│   │   ├── StatsCard.jsx       # Dashboard stat card
│   │   ├── ApplicationCard.jsx # Application card with avatar & delete confirmation
│   │   ├── ApplicationForm.jsx # Shared add/edit form
│   │   ├── SearchFilter.jsx    # Search + status filter + sort controls
│   │   ├── EmptyState.jsx      # Empty state placeholder
│   │   ├── ConfirmModal.jsx    # Reusable confirmation dialog
│   │   └── OnboardingModal.jsx # First-run welcome flow
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx       # Stats, insights, recent apps
│   │   ├── Applications.jsx    # Full list with search/filter/sort
│   │   ├── AddApplication.jsx  # Add new application
│   │   ├── EditApplication.jsx # Edit existing application
│   │   └── Analytics.jsx       # Recharts donut + bar charts
│   │
│   ├── context/
│   │   ├── ApplicationContext.jsx  # CRUD operations + localStorage sync
│   │   ├── ThemeContext.jsx        # Dark/light toggle
│   │   └── OnboardingContext.jsx   # First-run flag
│   │
│   ├── utils/
│   │   ├── constants.js        # Status definitions, colors, ID generator
│   │   └── storage.js          # localStorage helpers + onboarding flag
│   │
│   ├── App.jsx                 # Router + layout shell
│   ├── main.jsx                # Entry point with providers
│   ├── index.css               # Full design system (light + dark themes)
│   └── App.css
│
├── package.json
├── vite.config.js
└── .gitignore
```

---

## Data Model

Each application is stored as:

```js
{
  id: string,            // crypto.randomUUID
  company: string,       // required
  jobTitle: string,      // required
  status: string,        // 'applied' | 'interview' | 'offer' | 'rejected'
  appliedDate: string,   // ISO date string
  location: string,
  salary: string,
  notes: string,
  link: string,
  createdAt: string      // ISO datetime (auto-set on creation)
}
```

---

## Theming

Colors are defined via CSS custom properties in `src/index.css` with two theme blocks:

- **Light mode** — off-white background, white cards, charcoal sidebar, emerald primary accent
- **Dark mode** — `#111312` background, `#1B1E1C` cards, `#0B0D0C` sidebar, `#34D399` primary accent

Status colors are consistent across themes:

| Status | Color |
|---|---|
| Applied | Slate gray `#64748b` |
| Interview | Amber `#f59e0b` |
| Offer | Emerald `#10b981` |
| Rejected | Soft red `#ef4444` |

---

## Screenshots

<!-- Add screenshots to the assets folder and link them here -->
*Coming soon — run `npm run dev` to see it live.*

---

## License

This project is open source and available for personal and educational use.
