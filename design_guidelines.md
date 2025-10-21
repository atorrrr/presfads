# Presfades Premium Barbershop - Design Guidelines

## Design Approach

**Reference-Based Luxury Urban Aesthetic** drawing from:
- **Rolex**: Timeless elegance, gold accents, black sophistication, meticulous attention to detail
- **Saint Laurent**: Bold typography, high-contrast imagery, urban edge meets luxury
- **Barber Culture**: Authentic street credibility, craftsmanship pride, community respect

**Core Philosophy**: Create an elite experience that balances opulence with authenticity—where luxury doesn't sacrifice urban roots.

---

## Color Palette

**Primary Colors**:
- **Premium Gold**: 45 75% 52% (brand accent, CTAs, highlights)
- **Deep Black**: 0 0% 8% (primary background)
- **Rich Charcoal**: 0 0% 15% (cards, sections)

**Supporting**:
- **Soft White**: 0 0% 95% (body text)
- **Warm Gray**: 0 0% 65% (secondary text)
- **Accent Black**: 0 0% 5% (overlays, depth)

**Usage Strategy**: Black dominates (80%), gold used strategically (10-15%) for premium accents, not overwhelming. White text for maximum luxury contrast.

---

## Typography

**Headlines**: Playfair Display (serif)
- Hero: text-6xl/text-7xl, font-bold, tracking-tight
- Section headers: text-4xl/text-5xl, font-semibold
- Card titles: text-2xl, font-medium

**Body & UI**: Inter (sans-serif)
- Body text: text-base/text-lg, font-normal, leading-relaxed
- Buttons/CTAs: text-sm/text-base, font-semibold, uppercase tracking-wide
- Captions: text-sm, font-light

**Hierarchy**: Large serif headlines create drama, clean sans-serif maintains readability and modern edge.

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm.

**Section Structure**:
- Mobile: py-12, px-6
- Desktop: py-20/py-24, px-8 with max-w-7xl containers
- Hero: min-h-[85vh] (not forced 100vh)

**Grid Philosophy**: 
- Single column mobile throughout
- Desktop: 2-column for services/pricing, 3-column for gallery, 2-column for testimonials
- Asymmetric layouts where appropriate for visual interest

---

## Component Library

### Navigation
**Desktop**: Fixed top, backdrop-blur-md with bg-black/80, logo left, menu center (Services, Gallery, About, Contact), gold "Book Now" button right
**Mobile**: Hamburger menu, full-screen overlay with large Playfair Display links, gold accent lines

### Hero Section
- Full-width background image (fade work/shop interior)
- Dark gradient overlay (from black/70 to black/40)
- Centered content: Playfair Display headline, Inter subheading, dual CTA (primary gold button + outline white button with blur backdrop)
- Social proof badge: "Dallas-Fort Worth's #1 Fade Specialist" with gold star accent

### Service Cards
- Charcoal background cards (hover: subtle gold border glow)
- Service icon/image top, Playfair title, Inter description, gold price accent
- 3-column desktop grid, stacked mobile
- Services: Signature Fade, Beard Sculpting, VIP Experience, Hot Towel Shave

### Gallery/Portfolio
- Masonry grid showcasing before/after transformations
- Full-bleed images with subtle hover overlay revealing client testimonial snippet
- "View Full Portfolio" gold CTA at section end

### Testimonials
- 2-column card layout with client photo, quote in Playfair italic, name/social handle in Inter
- Gold quote marks as decorative elements
- Rotating selection of 4-6 testimonials

### Booking CTA Section
- Full-width black section with gold accent border top
- Large Playfair headline: "Reserve Your Premium Experience"
- Availability indicators, prominent gold button
- Trust elements: "72hr cancellation policy", "VIP lounge access"

### Footer
- 3-column desktop: Brand info + social, Quick links, Hours/Contact
- Newsletter signup with gold accent input border
- Social icons with gold hover states
- Copyright in warm gray

---

## Images

### Required Images:
1. **Hero**: Premium shot of barber perfecting a fade (over-the-shoulder, focused on craft) - full-width, 1920x1080
2. **About Section**: Owner portrait with barbershop backdrop - 600x800, left-aligned
3. **Gallery**: 9-12 high-quality before/after fade shots - square format, 800x800 each
4. **Service Cards**: 4 close-up detail shots (clippers, beard trim, hot towel, finished fade) - 400x300 each
5. **Testimonials**: 4-6 client headshots - circular crop, 150x150
6. **Shop Ambiance**: Interior shot showing VIP chairs, mirrors, premium atmosphere - 1200x600

**Image Treatment**: Maintain high contrast, slightly desaturated for sophistication, subtle vignettes to draw focus.

---

## Interaction & Animation

**Minimal Motion Philosophy**: Luxury feels confident, not flashy.

- **Hover states**: Subtle gold border glow (transition-all duration-300)
- **Scroll**: Gentle fade-in for sections (opacity + slight translateY)
- **Buttons**: Scale(1.02) on hover, no aggressive animations
- **Gallery**: Smooth overlay transitions on hover
- **Navigation**: Smooth backdrop blur on scroll

**NO**: Parallax, spinning elements, excessive transitions, carousel auto-play

---

## Page Structure (Comprehensive Sections)

1. **Navigation** (sticky)
2. **Hero** (85vh with image)
3. **Value Proposition** (centered statement, 3-stat grid: Years Experience, Clients Served, 5-Star Reviews)
4. **Signature Services** (4-card grid)
5. **Master Craftsman** (about section, 2-column: owner story + image)
6. **Portfolio Gallery** (masonry before/afters)
7. **Client Testimonials** (2-column cards)
8. **VIP Booking CTA** (full-width accent section)
9. **Location & Hours** (2-column: map embed + info)
10. **Footer** (comprehensive 3-column)

---

## Mobile-First Responsive Strategy

- All multi-column layouts collapse to single column
- Navigation becomes hamburger overlay
- Hero maintains impact at reduced height (70vh mobile)
- Typography scales: hero from text-4xl mobile to text-7xl desktop
- Touch-friendly targets: min 44px height for all interactive elements
- Generous mobile padding: px-6 vs px-8 desktop

**Accessibility**: High contrast maintained, all buttons include focus states with gold outline, semantic HTML structure, image alt text describing craft/results.