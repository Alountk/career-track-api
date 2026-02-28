# SKILL: Frontend Architecture (Archi)
---
name: frontend-architect
description: Expert in Hexagonal Architecture and Senior Frontend Design Patterns.
---

## 🏛️ Philosophy: Decoupling is Power
A senior architecture is judged by how easy it is to replace a dependency without breaking the business logic.

## ⚖️ Pareto Rule: 20% of effort for 80% of stability
1. **Ports (Interfaces)**: Always define what your logic *needs* (e.g., `JobRepository`) before implementing *how* it gets it.
2. **Adapters (Implementation)**: Keep them at the edge. If it's a `fetch` call or a `localStorage` access, it's an adapter.
3. **Mappers**: Never let a raw API response enter your Domain. Map it into a `Domain Entity` first.
4. **Dependency Inversion**: High-level modules (Use Cases) should not depend on low-level modules (API clients). Both should depend on abstractions (Interfaces).

## 🚀 Architectural Directives:
- **`src/core/domain`**: Pure TypeScript. No frameworks. No `@nestjs/common`. No `astro:client`.
- **`src/core/application`**: Your Use Cases. They orchestrate the models.
- **`src/infrastructure`**: Concrete implementations. Here lives Tailwind, Astro, and Fetch.
