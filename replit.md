# Web3 Developer Portfolio

## Overview

A dual-sided Web3 developer portfolio platform featuring a public-facing portfolio website and a private admin dashboard. The public site showcases blockchain projects and certificates in a modern "green gradient" design with glassmorphism effects and bento-grid layouts. The admin panel allows content management through password-protected forms.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (February 2026)

- Added background music component with playlist functionality (song1.mp3 and song2.mp3)
- Added "Live Link" field to projects for showcasing deployed dApps
- Added "Image URL" field to certificates for lightbox viewing
- Implemented certificate lightbox modal with Framer Motion animations
- Added persistent header with glowing Connect Wallet button
- Added About Me section with stats grid and Web3 developer bio

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
├── client/
│   ├── public/
│   │   ├── audio/           # Background music files (place mp3s here)
│   │   │   ├── song1.mp3    # 53 Thieves - dreamin'
│   │   │   └── song2.mp3    # 53 Thieves - what you do to me
│   │   └── images/          # Static images directory
│   └── src/
│       ├── components/      # UI components including shadcn/ui
│       │   ├── background-music.tsx    # Playlist audio player
│       │   ├── certificate-lightbox.tsx # Framer Motion lightbox modal
│       │   ├── header.tsx              # Persistent navigation header
│       │   ├── hero-section.tsx        # Landing hero with 3D orb
│       │   ├── about-section.tsx       # Bio and stats grid
│       │   ├── project-card.tsx        # Bento-grid project cards
│       │   └── certificates-section.tsx # Certificate list with lightbox
│       ├── pages/           # Route pages (portfolio, admin)
│       ├── hooks/           # Custom React hooks
│       └── lib/             # Utilities and query client
├── server/                  # Express backend
│   ├── routes.ts            # API route definitions
│   ├── storage.ts           # Database operations
│   └── index.ts             # Server entry point
├── shared/                  # Shared code between frontend/backend
│   └── schema.ts            # Drizzle schema definitions
└── migrations/              # Database migrations
```

## Audio Files Setup

To enable background music:
1. Place your MP3 files in `client/public/audio/`
2. Name them `song1.mp3` and `song2.mp3`
3. The playlist will automatically play and loop through both tracks
4. The music player appears in the bottom-right corner with play/pause and mute controls
5. If no valid audio files are found, the music player gracefully hides itself

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

### Database Schema

#### Projects Table
- `id`: Serial primary key
- `name`: Project name (required)
- `hackathonName`: Optional hackathon name
- `hackathonPlacement`: Optional placement (e.g., "1st Place")
- `githubLink`: Optional GitHub repository URL
- `liveLink`: Optional live demo URL
- `techStack`: Array of technologies used
- `imageUrl`: Optional cover image URL
- `createdAt`: Timestamp

#### Certificates Table
- `id`: Serial primary key
- `name`: Certificate name (required)
- `issuingOrganization`: Issuing organization (required)
- `issueDate`: Issue date string (required)
- `link`: Optional verification URL
- `imageUrl`: Optional certificate image URL for lightbox display
- `createdAt`: Timestamp

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `ADMIN_PASSWORD`: Password for admin panel access (defaults to "admin123")
