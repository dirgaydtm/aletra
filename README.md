<img src="public/logo.png" style="width: 200px; height: auto;">

  **Aletra** is an interactive, terminal-themed web application designed to test and challenge your Computer Science knowledge. Built with a sleek, hacker-inspired aesthetic.

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=reactrouter&logoColor=white)](https://tanstack.com/router)
  [![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
  [![Lucide](https://img.shields.io/badge/Lucide-F97316?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)
  [![React Icons](https://img.shields.io/badge/React_Icons-E91E63?style=for-the-badge&logo=react&logoColor=white)](https://react-icons.github.io/react-icons/)
  [![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
  [![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
  [![OpenTDB](https://img.shields.io/badge/OpenTDB-000000?style=for-the-badge)](https://opentdb.com/)
  [![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)

---

## Tech Stack

<details open>
<summary><b>Technology Overview</b></summary>

| Category | Technologies |
| -------- | ------------ |
| **Core** | React 18, Vite, TypeScript, TanStack Router, Zustand |
| **Styling & UI** | Tailwind CSS v4, Shadcn UI, Framer Motion, Lucide, React Icons |
| **Backend & Data** | Supabase Auth, Axios, OpenTDB API |

</details>

---

## Quick Start & Install

One command to install dependencies and start the local development server. We strongly recommend using `bun`.

### Bun (Recommended)
```sh
bun install
bun dev
```

### npm / pnpm / yarn
```sh
npm install && npm run dev
```

That installs all required packages (including Shadcn UI dependencies) and starts the Vite development server at `http://localhost:3000`.

<details open>
<summary><b>Environment Variables (Supabase)</b></summary>

Create a `.env` file in the root directory and configure your Supabase credentials to enable the backend services:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note**: Ensure that **Email Confirmations** are disabled in your Supabase Dashboard (`Authentication > Providers > Email`) if you wish to allow seamless email registration without SMTP verification during development.

</details>

---

## Architecture

Aletra forces strict feature-based isolation over traditional "file-type" folder structures. Components, hooks, and types related to a specific domain live together to maintain a scalable, cohesive codebase.

<details open>
<summary><b>Project Tree</b></summary>

```text
src/
├── features/           # Feature-based modules
│   ├── auth/           # Authentication UI (Login & Register forms, auth logic)
│   └── quiz/           # Quiz engine (Question cards, results, API calls, timer hooks)
├── routes/             # TanStack Router definitions
│   ├── auth/           # Auth routes (/auth/login, /auth/register, /auth/callback)
│   ├── quiz/           # Quiz routes (/quiz, /quiz/result)
│   └── __root.tsx      # Global application layout
├── shared/             # Shared utilities and global components
│   ├── animations/     # Reusable Framer Motion variants
│   ├── components/     # Reusable UI primitives (Terminal shells, Shadcn, Typewriter)
│   ├── lib/            # External library configurations (Supabase client, Utils)
│   ├── schemas/        # Zod validation schemas for strict runtime checking
│   └── stores/         # Zustand global stores (auth.store.ts, quiz.store.ts)
├── styles.css          # Global Tailwind and custom theme variables
└── routeTree.gen.ts    # Auto-generated route tree map
```

</details>

---

