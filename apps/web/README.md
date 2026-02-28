# Career Track Web - Astro Frontend

## 🚀 Overview

This is the frontend of the **Career Track** application, built with **Astro 5** and **React 19**. It follows **Hexagonal Architecture** principles to match the robust design of the backend (NestJS).

## 🏗 Architecture: Hexagonal (Ports and Adapters)

We apply clean architecture to ensure the business logic is decoupled from frameworks and external services.

```mermaid
graph TD
    subgraph UI/Infrastructure
        A[Astro Pages]
        B[React Components]
        C[API Adapters]
    end
    subgraph Application
        D[Ports/Interfaces]
        E[Use Cases]
    end
    subgraph Domain
        F[Entities]
        G[Value Objects]
    end

    A --> E
    B --> E
    C --> D
    E -.-> D
    E --> F
```

### Folder Structure

- `src/core/domain/`: Pure TypeScript entities and business rules.
- `src/core/application/`: Port definitions (interfaces) and Use Cases.
- `src/infrastructure/adapters/`: Implementations of ports, like API clients using `fetch`.
- `src/infrastructure/components/`: Reusable UI components (React/Astro).
- `src/pages/`: Astro routing system.

## 🛠 Tech Stack

- **Framework:** [Astro 5](https://astro.build/)
- **UI Library:** [React 19](https://react.dev/)
- **Validation:** [Zod](https://zod.dev/)
- **Language:** TypeScript (Strict mode)
- **Formatting & Linting:** ESLint 9 + Prettier (with Astro plugins)

## 🏃 Getting Started

This package is part of a **pnpm workspace**. To run it individually:

```bash
# From the root directory
pnpm --filter @career-track/web run dev
```

Or from within this directory:

```bash
pnpm dev
```

## 🧪 Best Practices

- **Zero placeholders**: Always use real assets or generated mocks.
- **Type Safety**: Use Zod for runtime validation from API responses.
- **Component Island Architecture**: Use React only where interactivity is required.
