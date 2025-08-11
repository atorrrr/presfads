# Overview

Presfades is a single-page barbershop website specializing in elite fade haircuts and men's grooming services in the Dallas-Fort Worth area. The application is built as a mobile-first experience with a focus on conversion optimization, featuring multiple "Book Now" call-to-action buttons that direct users to Square's appointment booking system. The site maintains the barbershop's specific brand palette (purple/green gradients on dark backgrounds) and incorporates Google Analytics for tracking user engagement and booking conversions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with React 18 using TypeScript and Vite as the build tool. The application follows a component-based architecture with:
- **Routing**: Wouter for lightweight client-side routing with a single main route for the homepage
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for brand colors and gradients
- **State Management**: TanStack Query for server state management (though minimal server interaction currently)
- **Mobile-First Design**: Responsive layouts with specific breakpoints and a floating CTA for mobile users

## Backend Architecture
The backend uses Express.js with TypeScript in a minimal configuration:
- **Server Framework**: Express.js with middleware for JSON parsing and request logging
- **Development Setup**: Vite middleware integration for development with HMR support
- **Database Layer**: Drizzle ORM configured for PostgreSQL with a basic user schema
- **Storage Interface**: Abstract storage interface with in-memory implementation for development

## Design System
The application implements a strict brand design system:
- **Color Palette**: Custom CSS variables for purple (#c600ff), green (#00ff84), and dark backgrounds (#0a0a0d)
- **Typography**: Google Fonts Poppins (300-700 weights) with caps-heavy heading styles
- **Gradients**: 45-degree linear gradients (purple to green) used consistently across borders, buttons, and text
- **Components**: Reusable sections (Hero, Services, Gallery, Contact) with consistent gradient styling

## Performance Optimizations
- **Asset Loading**: Lazy loading for images and optimized image formats
- **Bundle Optimization**: Vite's built-in code splitting and tree shaking
- **CSS Strategy**: Tailwind CSS with custom utility classes for brand-specific styling
- **Font Loading**: Google Fonts with preload strategy for performance

# External Dependencies

## Third-Party Services
- **Square Appointments**: Integration for online booking system (https://app.squareup.com/appointments/book/mhhy3h6z761e4o/LKWJHT5S9KSN3/start)
- **Google Analytics**: GA4 implementation for tracking page views and booking conversion events
- **Google Tag Manager**: Additional tracking and marketing tag management
- **Instagram API**: Social media feed integration for displaying recent barbershop work

## Database and Hosting
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL
- **Render**: Deployment platform with separate development and production environments
- **GitHub Actions**: CI/CD pipeline for automated deployments

## Development Dependencies
- **Drizzle ORM**: Type-safe database queries and schema management
- **Radix UI**: Accessible component primitives for the design system
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing library
- **Vite**: Build tool and development server with React plugin support

## Content and Assets
- **Imgur**: Image hosting for hero images and profile photos
- **Unsplash**: Stock photography for gallery placeholders
- **Custom Assets**: Brand-specific images and content stored in attached_assets directory