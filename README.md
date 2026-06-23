# RopaVintage

A vintage clothing e-commerce portfolio built with **Next.js 16**, **Sanity CMS**, **Stripe**, and **Upstash Redis**. Features a 15-minute reservation system, real-time stock management, and a curated admin panel.

Live demo: [vintage-pi.vercel.app](https://vintage-pi.vercel.app)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| CMS | Sanity (headless, self-served) |
| Payments | Stripe (test mode) |
| Reservations | Upstash Redis (TTL 15min) |
| State | Zustand |
| UI | Lucide icons, custom design system |

## Features

- **Product catalog** — filtered by category, searchable by name/era
- **Product detail** — multi-image gallery, variant selector (size/color/condition), price modifier
- **Reservation system** — 15-minute TTL via Redis, real-time countdown, prevents overselling
- **Cart** — client-side Zustand store, slide-in drawer, full cart page
- **Checkout** — Stripe payment session, stock validation before purchase, webhook confirmation
- **Order tracking** — local session-based order history via Redis
- **Admin panel** — Sanity Studio at `/studio`, full CRUD for products and variants
- **View transitions** — native fade transitions between route changes
- **Optimized images** — `next/image` with blur placeholders, Sanity CDN
- **Raw/Industrial design** — custom design system with dark carbons, rust accent, harsh borders
- **Responsive** — mobile menu, adaptive grid, touch-friendly

## Design System

- **Colors:** Carbon (#0c0c0c), Charcoal, Concrete, Steel, Rust (#b84a2d), Parchment, Smoke
- **Fonts:** Inter (sans), JetBrains Mono (mono)
- **Aesthetic:** Raw, industrial, border-heavy, all-uppercase labels, monospace metadata

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|----------|-------------|
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (test mode) |
| `STRIPE_SECRET_KEY` | Stripe secret key (test mode) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name |

### Adding Products

1. Go to `http://localhost:3000/studio`
2. Log in with your Sanity account
3. Create a product with name, description, images, category, era, origin, material, and variants

### Deployment

Push to GitHub — Vercel auto-deploys. Environment variables must be configured in Vercel project settings.

## Project Structure

```
src/
├── app/                # App Router pages & API routes
│   ├── api/            # Stripe, checkout, orders, variants, products
│   ├── about/          # About page
│   ├── cart/           # Cart page
│   ├── checkout/       # Checkout page
│   ├── contact/        # Contact page
│   ├── orders/         # Order history
│   ├── products/       # Catalog & product detail
│   └── studio/         # Sanity Studio
├── components/
│   ├── layout/         # Navbar, CartDrawer, MobileMenu
│   ├── product/        # ProductCard, ProductGrid, ImageGallery, VariantSelector, CatalogClient
│   ├── reservation/    # ReserveButton, ReservationTimer
│   └── ui/             # Button, Badge, ProductImage, DirectionalTransition
├── lib/
│   ├── redis.ts        # Upstash Redis helpers (reservations, orders)
│   ├── stripe.ts       # Stripe client
│   ├── types.ts        # TypeScript types
│   └── utils.ts        # formatPrice, cn
├── sanity/
│   ├── lib/            # Sanity client, GROQ queries, urlFor
│   └── schemas/        # Product document schema
└── store/
    └── cart.ts         # Zustand cart store
```

## License

Franco Godoy 
