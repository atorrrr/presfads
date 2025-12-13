# Presfades Premium Barbershop

## Overview

Presfades is a premium barbershop website for a Dallas-Fort Worth elite fade specialist. The application is a single-page marketing site showcasing services, portfolio work, and contact information. It features a luxury design aesthetic inspired by high-end lifestyle brands (Rolex, Saint Laurent) combined with urban culture elements, targeting clients seeking VIP grooming experiences.

The project is built as a full-stack application with React on the frontend and Express on the backend, though currently the backend is minimal as the site is primarily a static marketing page. The architecture supports future expansion into booking systems or user authentication.

**Recent Updates:**
- Holiday gift card promo added: banner below hero + popup with Christmas gold theme
- Gallery section replaced with testimonials featuring client feedback
- Floating "Book Now" button added with pulse animation
- Lead magnet popup for SMS consultations with photo upload flow
- All booking buttons updated to link to Square booking system (https://book.squareup.com/appointments/mhhy3h6z761e4o/location/LKWJHT5S9KSN3/services)
- Google Tag Manager (GTM-M9CP6QKD) integrated for analytics tracking
- Enhanced SEO with comprehensive meta tags and Schema.org structured data

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type safety and modern component patterns
- Vite as the build tool and dev server for fast HMR and optimized builds
- Wouter for lightweight client-side routing (only Home and 404 pages currently)

**UI Component System:**
- Shadcn/ui component library (New York style variant) provides the foundation
- Radix UI primitives power all interactive components (dialogs, dropdowns, etc.)
- Custom component composition following atomic design principles
- All components located in `client/src/components/` with UI primitives in `client/src/components/ui/`

**Styling Approach:**
- TailwindCSS for utility-first styling with dark mode as the primary theme
- Custom design system defined in `design_guidelines.md` specifying:
  - Premium gold and black color palette (deep black backgrounds with rich gold accents)
  - Typography hierarchy using Playfair Display for luxury headlines and Inter/Outfit for body text
  - Luxury service industry design patterns
- CSS variables in `client/src/index.css` for theme customization
- Custom Tailwind config extends default with brand-specific colors and border radii

**State Management:**
- TanStack Query (React Query) v5 for server state and API interactions
- Local component state using React hooks
- Custom hooks in `client/src/hooks/` for reusable logic (mobile detection, toast notifications)

**Key Pages & Sections:**
- Single-page application with smooth scrolling navigation
- Hero section with full-screen background imagery
- About section showcasing the master barber (centered single-column layout without profile image)
- Services section with pricing cards
- Instagram feed section with prominent call-to-action to view latest posts and follow @presfades (replaces traditional gallery)
- Contact section with location and booking information
- Responsive navigation with mobile menu
- Footer with social links and business information

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for the HTTP server
- Modular route registration system (though routes currently minimal)
- Custom middleware for request logging and error handling
- Development mode integrates with Vite's middleware for HMR

**Development Environment:**
- Vite dev server runs in middleware mode during development
- Custom logging utility tracks API requests with timestamps
- Replit-specific plugins for error overlays and development banners

**Storage Layer:**
- In-memory storage implementation (`MemStorage`) as the default
- Storage interface (`IStorage`) designed for easy swapping to persistent storage
- User schema defined but not actively used in current implementation
- Ready for database integration through the storage abstraction

### Data Layer

**Database Schema (Prepared but not actively used):**
- Drizzle ORM configured for PostgreSQL
- Schema defines users table with id, username, and password fields
- Drizzle-Zod integration for runtime validation
- Migration files would go to `./migrations` directory
- Database connection configured through `DATABASE_URL` environment variable

**Type Safety:**
- Shared types in `shared/schema.ts` used by both frontend and backend
- Zod schemas for runtime validation
- TypeScript path aliases (`@/`, `@shared/`, `@assets/`) for clean imports

### Project Structure

```
/client              # Frontend React application
  /src
    /components      # React components
      /ui           # Shadcn/ui primitives
    /hooks          # Custom React hooks
    /lib            # Utility functions and query client
    /pages          # Route pages (Home, NotFound)
    index.css       # Global styles and CSS variables
    main.tsx        # React entry point
    App.tsx         # App router and providers
  index.html        # HTML template with SEO meta tags

/server             # Backend Express application
  index.ts          # Server entry point
  routes.ts         # Route registration
  storage.ts        # Storage abstraction layer
  vite.ts           # Vite integration utilities

/shared             # Code shared between frontend and backend
  schema.ts         # Database schema and types

/migrations         # Database migration files (when generated)
```

### Build & Deployment

**Development:**
- `npm run dev` starts both Vite dev server and Express in development mode
- Hot module replacement for instant feedback
- TypeScript type checking runs separately via `npm run check`

**Production:**
- `npm run build` compiles both frontend (Vite) and backend (esbuild)
- Frontend builds to `dist/public`
- Backend bundles to `dist/index.js` as ESM
- `npm start` runs the production server serving static files

**Database Management:**
- `npm run db:push` synchronizes schema changes to database via Drizzle Kit
- No migrations directory exists yet as database isn't actively used

## External Dependencies

### Core Frontend Libraries
- **React & React DOM** (v18+): UI framework
- **TanStack Query**: Server state management and data fetching
- **Wouter**: Lightweight routing library
- **Vite**: Build tool and development server

### UI Component Libraries
- **Shadcn/ui**: Component collection built on Radix UI primitives
- **Radix UI**: Unstyled, accessible component primitives (20+ packages including accordion, dialog, dropdown, tooltip, etc.)
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management
- **Tailwind Merge**: Utility class merging

### Styling
- **TailwindCSS**: Utility-first CSS framework
- **PostCSS & Autoprefixer**: CSS processing
- **Embla Carousel React**: Carousel component

### Backend Libraries
- **Express**: Web server framework
- **@neondatabase/serverless**: PostgreSQL driver for Neon Database
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **Drizzle Kit**: Schema management and migrations
- **Connect-pg-simple**: PostgreSQL session store (prepared for future auth)

### Form & Validation
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **Zod**: Schema validation library
- **Drizzle-Zod**: Integration between Drizzle and Zod

### Development Tools
- **TypeScript**: Type safety across the stack
- **TSX**: TypeScript execution for development
- **ESBuild**: Fast bundling for production backend
- **Nanoid**: Unique ID generation
- **@replit/* plugins**: Development experience enhancements on Replit platform

### Fonts (via Google Fonts CDN)
- **Playfair Display**: Luxury serif font for headlines
- **Inter & Outfit**: Modern sans-serif fonts for body text

### Image Hosting
- **Imgur**: External image hosting for profile and placeholder images
- **Unsplash**: Stock photography for backgrounds and gallery placeholders

### Future Integration Points
- Database will use Neon PostgreSQL (configuration already in place via `@neondatabase/serverless`)
- Session management prepared via `connect-pg-simple`
- Authentication system can be added using existing user schema
- Booking system could integrate with external calendar APIs