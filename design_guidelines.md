# Upcheck Aquaculture Technology - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern SaaS platforms with industry-specific aquaculture elements, combining clean data visualization patterns with organic water-inspired motion design.

## Core Design Elements

### A. Color Palette

**Primary Brand Colors:**
- Primary Cyan: 194 100% 43% (from logo - #00B4D8)
- Deep Ocean Blue: 197 100% 36% (trust elements - #0077B6)
- Bright Aqua Accent: 194 73% 75% (interactive components - #90E0EF)

**Dark Mode:**
- Background: 210 30% 8%
- Surface: 210 25% 12%
- Text Primary: 0 0% 95%

**Light Mode:**
- Background: 0 0% 100%
- Surface: 210 40% 98%
- Text Primary: 210 40% 10%

### B. Typography

**Font Stack:**
- Primary: Modern sans-serif (Inter, Poppins, or system fonts)
- Headlines: Bold weights (700-800) with gradient text effects
- Body: Regular/Medium weights (400-500)

**Gradient Text Implementation:**
- Hero headlines: Cyan to Deep Ocean Blue gradient (194 100% 43% → 197 100% 36%)
- Applied to primary headings and "Reinventing Aquaculture!" tagline

**Hierarchy:**
- Hero H1: 3.5rem (desktop), 2.5rem (mobile), bold
- Section H2: 2.5rem (desktop), 2rem (mobile), bold
- Body: 1rem, regular
- Captions: 0.875rem, medium

### C. Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent vertical rhythm
- Section padding: py-20 (desktop), py-12 (mobile)
- Component spacing: gap-8 (desktop), gap-6 (mobile)
- Container max-width: max-w-7xl

**Grid System:**
- Features: 4-column grid (lg:grid-cols-4, md:grid-cols-2, base:grid-cols-1)
- Pricing: 2-column comparison
- Statistics: 3-column counter display

## Section-Specific Guidelines

### Hero Section
**Layout:**
- Full viewport height (min-h-screen) with centered content
- Animated pond-inspired grid background with interactive hover tiles
- Stacked layout: Logo → Hero headline → Subtext → CTA buttons

**Elements:**
- Logo entrance: Scale animation (0.8 to 1.0) with fade-in
- Headline "Reinventing Aquaculture!": Gradient text with slide-up animation
- Interactive background grid: Individual cells glow cyan on hover with ripple effects
- Dual CTA buttons: Primary (solid cyan) + Secondary (outline with blur backdrop)

### Feature Cards Section
**Layout:** 4-column grid showcasing Real-time Monitoring, Disease Prediction, Smart Feeding, Farmer Network

**Card Design:**
- 3D tilt effects on hover responding to cursor position
- Floating icon animations with subtle continuous bounce
- Gradient background shift from light cyan to deeper blue on hover
- Stagger entrance animations as cards enter viewport
- Icons: Fish/shrimp animations that swim across on hover

### Data Visualization Dashboard
**Components:**
- Animated line charts with path drawing animations showing water quality
- Live counter animations for dissolved oxygen, pH, chlorophyll-a values
- Sliding notification cards from right: "Disease Alert", "Feed Optimization"
- Custom-styled map with pond location markers

**Color Coding:**
- Healthy metrics: Bright aqua (#90E0EF)
- Warning states: Amber tones
- Critical alerts: Coral/red tones

### Trust & Social Proof
**Statistics Counter:**
- Odometer-style counting animations triggered on scroll
- Three key metrics: "Farms monitored" | "Diseases prevented %" | "Feed waste reduced"
- Large numbers with gradient text effect

**Testimonials:**
- Parallax carousel with expandable cards
- Background images with Ken Burns zoom effect
- Location pins showing farm origins

### Pricing Section
**Interactive Comparison:**
- Basic/Plus tier cards with animated checkmark sequences
- 3D flip animation for monthly/yearly toggle
- Gradient animated borders on Plus plan card
- Floating "Most Popular" badge with subtle rotation
- Highlight effect traveling down feature lists on hover

### Technology Showcase
**Visual Elements:**
- 3D rendered pond with floating sensor markers
- Animated data flow: sensors → cloud → mobile app
- Interactive hotspots revealing sensor specifications
- Morph transitions between healthy vs disease-detected pond states

### Navigation
**Smart Header:**
- Scroll-responsive: Shrinks with backdrop blur as user scrolls
- Logo scales down maintaining visibility
- Transparent to solid cyan gradient background transition
- Mobile: Animated hamburger with drawer slide-in

### Call-to-Action Section
**App Download:**
- Animated phone mockup with screen transitions
- Download buttons with ripple effects and success states
- Pulsing QR code for attention
- Animated connection lines showing data flow

### Footer
**Newsletter Form:**
- Focus animations on input fields (border color shift, scale)
- Success state with checkmark animation and confetti particles
- Animated wave divider separating from main content

## Animation Principles

**Framer Motion Specifications:**
- Entrance delays: Stagger by 0.2s between elements
- Hover transitions: 0.3s duration with easeOut
- Spring physics: Use for organic water-like movements
- useInView hook: Trigger animations at viewport intersection
- Reduced motion respect: Implement prefers-reduced-motion queries

**Performance:**
- GPU-accelerated: Use transform and opacity properties only
- Lazy load: Animations outside viewport with once: true
- Asset optimization: Lazy load background videos/images

## Aquaculture-Specific Elements

**Visual Motifs:**
- Water texture overlays with animated caustic light patterns
- Shrimp lifecycle illustrations in feature explanations
- Pond aerial photography with data overlay hotspots
- Weather condition animations (sun, rain, clouds) affecting visualizations
- Seasonal cycle indicators for optimal farming periods

**Authentic Imagery:**
- Pond monitoring dashboards with real-time data
- Sensor hardware in natural farm environments
- Farmer success stories with location context
- Shrimp growth stages visual timeline

## Images Strategy

**Hero Section:** Large background image of aquaculture pond with data overlay grid (animated interactive tiles on top)

**Feature Cards:** Icon-based (no photos), use animated fish/shrimp vector icons

**Dashboard Section:** Screenshot/mockup of actual Upcheck monitoring interface

**Trust Section:** Farmer testimonial photos in carousel cards with farm backgrounds

**Technology Showcase:** 3D rendered pond illustration with sensor markers

**CTA Section:** Phone mockup showing app interface with animated screens