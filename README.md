## 🚀 Getting Started

### 📋 Prerequisites

- node >= v16.14.1
- npm >= v8.19.3

### 🔧 Installing

#### Clone this repo

```bash
git clone <repo_url> <project_directory>
cd ./<project_directory>
```

#### Install all dependencies

```bash
npm i
```

### Developement

#### NPM Scripts

| Script            | Purpose                                     |
| ----------------- | ------------------------------------------- |
| start             | aliased to `start:development`              |
| start:development | run locally in development mode             |
| start:staging     | run locally in staging mode                 |
| start:production  | run locally in production mode              |
| build             | aliased to `build:development`              |
| build:development | create development build                    |
| build:staging     | create staging build                        |
| build:production  | create production build                     |
| preview           | preview available build                     |
| lint              | lint                                        |
| lint:fix          | fix auto-fixable linter errors and warnings |
| test              | `vitest --run` (run unit tests)             |
| test:ui           | `vitest --ui` (web ui, watch for changes)   |
| test:watch        | `vitest --watch` (watch for changes)        |

#### Run locally

```bash
npm start # npm run start
```

#### Run tests

```bash
npm test # npm run test
```
