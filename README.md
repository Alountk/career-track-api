# Career Track - Monorepo

## 🚀 Project Overview

A high-performance job application tracking system built with **NestJS** (Backend) and **Astro** (Frontend), utilizing a **Hexagonal Architecture** across the entire stack.

## 🏗 Monorepo Structure

We use **pnpm workspaces** to manage multiple packages in a single repository.

- `apps/api`: NestJS Backend (REST API).
- `apps/web`: Astro + React Frontend.

## 🛠 Tech Stack (Universal)

- **Language:** TypeScript
- **Architectural Pattern:** Hexagonal (Ports and Adapters)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Quality Control:** Husky + lint-staged + ESLint 9 + Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (`npm install -g pnpm`)

### Installation

```bash
pnpm install
```

### Running the Project

You can run both applications simultaneously or individually:

```bash
# Run everything (API + Web)
pnpm run dev

# Run Backend only
pnpm --filter career-track-api run start:dev

# Run Frontend only
pnpm --filter @career-track/web run dev
```

## 📖 API Documentation

Once the backend is running, visit:
`http://localhost:3000/api/docs`

## 🧪 Testing and Quality

We use **Husky** to ensure all code passes linting and basic checks before every commit.

```bash
# Run linting for the entire monorepo
pnpm run lint

# Run tests
pnpm -r test
```

## 🗺 Roadmap

- [x] Phase 1: Monorepo Setup & Migration to pnpm
- [x] Phase 2: Astro Frontend Scaffolding (Hexagonal Ready)
- [x] Phase 3: Infrastructure & Quality Setup (Husky, ESLint, Prettier)
- [ ] Phase 4: UI Design System (Tailwind CSS Integration)
- [ ] Phase 5: Core Features Implementation (Dashboard, Job Tracking)
- [ ] Phase 6: Sync Backend Entities with Frontend Domain
- [ ] Phase 7: Deployment (Vercel/Docker)
