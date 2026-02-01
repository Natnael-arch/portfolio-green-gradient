# Web3 Developer Portfolio

## Overview

A dual-sided Web3 developer portfolio platform featuring a public-facing portfolio website and a private admin dashboard. The public site showcases blockchain projects and certificates in a modern "green gradient" design with glassmorphism effects and bento-grid layouts. The admin panel allows content management through password-protected forms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing (two main routes: `/` for portfolio, `/admin` for dashboard)
- **Styling**: Tailwind CSS with custom green gradient theme (colors: #051F20, #0B2B26, #163832, #235347, #8EB69B, #DAF1DE)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and effects
- **State Management**: TanStack React Query for server state and data fetching
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **API Design**: RESTful endpoints under `/api/` prefix
- **Authentication**: Simple environment-based password protection for admin routes (ADMIN_PASSWORD env variable)
- **Build Process**: Custom esbuild script for production bundling with Vite for client assets

### Data Layer
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains table definitions for projects and certificates
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization
- **Shared Types**: Schema types are shared between frontend and backend via `@shared/` path alias

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # UI components including shadcn/ui
│   ├── pages/           # Route pages (portfolio, admin)
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and query client
├── server/              # Express backend
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Database operations
│   └── index.ts         # Server entry point
├── shared/              # Shared code between frontend/backend
│   └── schema.ts        # Drizzle schema definitions
└── migrations/          # Database migrations
```

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### UI Framework
- **Radix UI**: Headless UI primitives for accessible components
- **shadcn/ui**: Pre-built component library (new-york style variant)
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration

### Build Tools
- **Vite**: Frontend development server and bundler
- **esbuild**: Production server bundling
- **TypeScript**: Type checking across the full stack

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `ADMIN_PASSWORD`: Password for admin panel access (defaults to "admin123")