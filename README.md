# AWS Amplify Gen2 + Next.js Starter (Turborepo)

This repository is a starter template for building AWS Amplify Gen2 applications with Next.js as the frontend.

It is designed to be used directly for fullstack serverless development, with:

- A Next.js web frontend (`apps/webapp`)
- An Amplify Gen2 backend (`packages/backend/amplify`) for auth and data resources
- A monorepo setup using npm workspaces + Turbo for scalable project organization

## What You Can Build With This Template

Use this template as a foundation to build production-ready fullstack serverless applications, including:

- Authentication flows (email login, user sessions)
- API/data-driven features backed by Amplify Data
- Secure frontend + backend integration through generated Amplify outputs
- Extendable backend resources (Storage, Functions, custom resources via Amplify Gen2)

In short: you can clone this repo and start implementing fullstack features immediately without manually wiring infrastructure from scratch.

## Tech Stack

- AWS Amplify Gen2
- Next.js (App Router)
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS + DaisyUI
- Turborepo + npm workspaces

## Project Structure

```text
.
├── amplify.yml
├── package.json
├── apps/
│   └── webapp/
│       ├── amplify_outputs.json
│       ├── app/
│       │   ├── page.tsx
│       │   ├── admin/page.tsx
│       │   └── auth/login/page.tsx
│       ├── components/
│       ├── context/
│       ├── redux/
│       ├── utils/
│       └── package.json
└── packages/
	└── backend/
		├── amplify_outputs.json
		├── package.json
		└── amplify/
			├── backend.ts
			├── auth/resource.ts
			└── data/resource.ts
```

## Folder Breakdown

### Root

- `package.json`: Monorepo scripts (`dev`, `build`, `lint`, `check-types`) run via Turbo
- `amplify.yml`: Amplify Hosting build/deploy configuration for backend and frontend apps
- `apps/`: Frontend applications
- `packages/`: Shared packages and backend workspace packages

### `apps/webapp`

Frontend Next.js application.

- `app/`: App Router routes, layouts, and pages
- `components/`: Reusable UI components
- `context/`: React context providers (Amplify/auth/store integration)
- `redux/`: Redux store, slices, and selectors
- `utils/`: Utility modules including Amplify server helpers

### `packages/backend`

Amplify Gen2 backend workspace.

- `amplify/backend.ts`: Backend entrypoint where resources are composed (`auth`, `data`, etc.)
- `amplify/auth/resource.ts`: Authentication resource definition
- `amplify/data/resource.ts`: Data schema and authorization setup
- `amplify_outputs.json`: Generated backend outputs used by connected clients

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- AWS account + Amplify access

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Frontend (Next.js)

From repository root:

```bash
npm run dev -- --filter=@ui/webapp
```

Or from `apps/webapp`:

```bash
npm run dev
```

### 3. Run Amplify Backend Sandbox

From `packages/backend`:

```bash
npx ampx sandbox --identifier <your-unique-identifier>
```

After backend outputs are generated, ensure `apps/webapp/amplify_outputs.json` is up to date.

## Build and Lint

From repository root:

```bash
npm run build
npm run lint
npm run check-types
```

## Extending This Template

This starter currently includes Auth and Data resources, and can be extended with:

- Storage
- Functions
- Custom backend resources
- Additional frontend apps or shared packages in the monorepo

Refer to Amplify Gen2 docs for resource extension patterns:

- https://docs.amplify.aws/react/build-a-backend/
- https://docs.amplify.aws/gen2/
