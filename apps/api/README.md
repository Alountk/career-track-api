# Career Track API - NestJS Backend

## 🚀 Overview

This is the backend of the **Career Track** application, built with **NestJS**. It follows **Hexagonal Architecture** to ensure a decoupled and highly testable core.

## 🏗 Architecture: Hexagonal (Ports and Adapters)

The backend is structured to separate domain logic from infrastructure concerns.

### Folder Structure

- `src/core/domain/`: Entities and business logic (framework-agnostic).
- `src/core/application/`: Business use cases and Ports (interfaces).
- `src/infrastructure/persistence/`: Database adapters (TypeORM/PostgreSQL).
- `src/infrastructure/controllers/`: REST API entry points.
- `src/infrastructure/auth/`: JWT and security implementations.

## 🛠 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Database:** PostgreSQL
- **Security:** Passport.js + JWT
- **Documentation:** Swagger UI

## 🏃 Getting Started

This package is part of a **pnpm workspace**.

```bash
# From the root directory
pnpm --filter career-track-api run start:dev
```

## 🖋 Naming Standards

- **Files:** `kebab-case.extension` (e.g., `login-user.use-case.ts`).
- **Classes:** `PascalCaseUseCase` (e.g., `LoginUserUseCase`).
- **Interfaces:** `I` Prefix (e.g., `IUserRepository`).

## 🧪 Testing

We follow TDD principles for all core Use Cases.

```bash
pnpm run test
```
