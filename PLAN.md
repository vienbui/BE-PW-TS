# QA Automation Showcase - Step-by-Step Guide

## Project Structure

```
qa-be-pw-ts/
├── backend/
│   ├── src/
│   │   └── index.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── tests/
│   ├── ui/
│   │   ├── pages/
│   │   │   ├── HerokuappPage.ts
│   │   │   └── TestMuAIPage.ts
│   │   └── specs/
│   │       ├── herokuapp.spec.ts
│   │       └── testmuai.spec.ts
│   ├── api/
│   │   ├── helpers/
│   │   │   └── apiClient.ts
│   │   └── specs/
│   │       ├── reqres.spec.ts
│   │       └── backend.spec.ts
│   ├── Dockerfile
│   ├── package.json
│   ├── playwright.config.ts
│   └── tsconfig.json
├── docker-compose.yml
└── README.md
```

---

## Phase 1: Backend Setup

**Why this matters for interviews:** Shows you understand what you're testing, not just how to test.

### Step 1.1: Initialize the project

```bash
cd backend
npm init -y
```

This creates a basic `package.json`.

### Step 1.2: Install dependencies

```bash
npm install express cors
npm install -D typescript ts-node @types/node @types/express @types/cors
```

| Package | Purpose |
|---------|---------|
| `express` | Web framework for your API |
| `cors` | Allows cross-origin requests (needed when tests call your API) |
| `typescript` | TypeScript compiler |
| `ts-node` | Run TypeScript directly without compiling first |
| `@types/*` | Type definitions for TypeScript |

### Step 1.3: Add scripts to package.json

```json
"scripts": {
  "dev": "ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

### Step 1.4: Create tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 1.5: Create src/index.ts

Create a simple REST API with these endpoints:
- `GET /health` - Health check endpoint
- `GET /users` - Return mock users
- `POST /users` - Create a user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Step 1.6: Create Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache curl
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

### Step 1.7: Test the backend

```bash
npm run dev
# Visit http://localhost:3000/health
```

**Interview talking point:** "I created a simple API to demonstrate I understand both sides - the application and the tests."

---

## Phase 2: Playwright Test Setup

**Why this matters:** Demonstrates modern test automation skills with proper structure.

### Step 2.1: Initialize the project

```bash
cd tests
npm init -y
```

### Step 2.2: Install dependencies

```bash
npm install -D @playwright/test typescript @types/node
npx playwright install
```

| Package | Purpose |
|---------|---------|
| `@playwright/test` | Playwright test framework |
| `typescript` | TypeScript compiler |
| `@types/node` | Node.js type definitions |
| `npx playwright install` | Downloads browser binaries (Chrome, Firefox, WebKit) |

### Step 2.3: Add scripts to package.json

```json
"scripts": {
  "test": "playwright test",
  "test:ui": "playwright test --project=ui-chrome",
  "test:api": "playwright test --project=api",
  "test:headed": "playwright test --headed",
  "test:debug": "playwright test --debug",
  "report": "playwright show-report"
}
```

### Step 2.4: Create tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@pages/*": ["ui/pages/*"],
      "@helpers/*": ["api/helpers/*"]
    }
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 2.5: Create playwright.config.ts

Key configuration decisions:
- Use projects to separate UI tests from API tests
- Configure multiple browsers for cross-browser testing
- Use environment variables for backend URL (Docker vs local)

```typescript
projects: [
  { name: 'ui-chrome', testDir: './ui/specs', use: { ...devices['Desktop Chrome'] } },
  { name: 'ui-firefox', testDir: './ui/specs', use: { ...devices['Desktop Firefox'] } },
  { name: 'api', testDir: './api/specs', use: { baseURL: process.env.BACKEND_URL || 'http://localhost:3000' } }
]
```

**Interview talking point:** "I use Playwright projects to separate concerns - UI tests run in browsers, API tests are headless and faster."

---

## Phase 3: UI Tests with Page Object Model

**Why POM matters:** It's the most asked-about pattern in QA interviews.

### Step 3.1: Create folder structure

```bash
mkdir -p ui/pages ui/specs
```

### Step 3.2: Create Page Objects

**tests/ui/pages/HerokuappPage.ts**
- For https://the-internet.herokuapp.com
- Login page interactions
- Locators for username, password, login button, flash messages

**tests/ui/pages/TestMuAIPage.ts**
- For https://www.testmuai.com
- Navigation helpers
- Element locators

Page Object should contain:
- Locators as class properties
- Methods for actions (login, click, fill)
- Methods for assertions (assertLoginSuccess)

### Step 3.3: Create UI Test Specs

**tests/ui/specs/herokuapp.spec.ts**
- Login with valid credentials
- Login with invalid credentials
- Verify secure area access
- Logout functionality

**tests/ui/specs/testmuai.spec.ts**
- Page load verification
- Navigation tests
- Responsive design tests

**Interview talking point:** "Page Objects encapsulate locators and actions. If the UI changes, I update one file, not every test."

---

## Phase 4: API Tests

**Why separate API tests:** Shows you understand the testing pyramid.

### Step 4.1: Create folder structure

```bash
mkdir -p api/helpers api/specs
```

### Step 4.2: Create API Helper

**tests/api/helpers/apiClient.ts**
- Type definitions for API responses
- Reusable methods for GET, POST, PUT, DELETE
- Separate clients for your backend and ReqRes API

### Step 4.3: Create API Test Specs

**tests/api/specs/reqres.spec.ts** (external API: https://reqres.in)
- GET users list
- GET single user
- POST create user
- Response validation

**tests/api/specs/backend.spec.ts** (your backend)
- Health check
- CRUD operations on users
- Error handling scenarios (404, 400)

**Interview talking point:** "API tests are faster and more stable than UI tests. I test the contract, not the UI rendering."

---

## Phase 5: Docker Compose Orchestration

### Step 5.1: Create tests/Dockerfile

```dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-jammy
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npx", "playwright", "test"]
```

### Step 5.2: Create docker-compose.yml

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 10s
      timeout: 5s
      retries: 5

  tests:
    build: ./tests
    depends_on:
      backend:
        condition: service_healthy
    environment:
      - BACKEND_URL=http://backend:3000
```

**Interview talking point:** "Using `depends_on` with healthcheck ensures tests only run when the backend is ready."

---

## Phase 6: Documentation (README.md)

A good README shows communication skills. Include:
- Project overview
- Tech stack
- How to run locally
- How to run with Docker
- Test structure explanation
- Key design decisions

---

## Running the Project

### Local Development

```bash
# Terminal 1: Start backend
cd backend && npm install && npm run dev

# Terminal 2: Run tests
cd tests && npm install && npx playwright test
```

### Docker (Full Stack)

```bash
docker-compose up --build
```

### Run Specific Tests

```bash
npx playwright test --project=ui-chrome
npx playwright test --project=api
npx playwright test --headed  # See browser
npx playwright test --debug   # Step through tests
```

---

## Key Interview-Relevant Decisions

| Decision | Why It Matters |
|----------|----------------|
| TypeScript everywhere | Type safety, better IDE support, industry standard |
| Page Object Model | Most common pattern, easy to maintain |
| Separate UI/API tests | Shows understanding of testing pyramid |
| Docker Compose | Demonstrates DevOps awareness |
| Health checks | Reliable test execution, no race conditions |
| Multiple browsers | Cross-browser testing awareness |
| ReqRes + own backend | Tests both external and internal APIs |
