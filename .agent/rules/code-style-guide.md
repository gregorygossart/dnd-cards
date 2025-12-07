---
trigger: always_on
---

1. My package manager is pnpm
2. My build system is Vite
3. My testing framework is Vitest with testing-library/react
4. My UI library is shadcn/ui
5. My styling framework is TailwindCSS
6. Never do import files (./ or ../), use absolute @/ alias instead
7. When importing types, always use inline "type" like his : `import { type MyType } from "package"`
8. Develop important features as vertical slices in src/features/{featureName}
