# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Swiftechie (株式会社シーテック) company website - a static site rebuild from WordPress to Astro. This is a Japanese technology company's web presence with both B2C (consumer products) and B2B (enterprise solutions) content.

## Current State

This repository is in **planning/setup phase**. The Astro project has not been initialized yet. The repository contains:
- `design.txt` - Comprehensive design document in Chinese outlining the 2026 refactoring plan
- `legacy-data/www.swiftechie.com/` - Complete WordPress site export to migrate from

## Tech Stack (Planned)

- **Astro 5.0+** - Static Site Generator (SSG)
- **Tailwind CSS v4** - Utility-first CSS, no traditional CSS files
- **React/SolidJS** - For complex interactions only (optional)
- **Astro Content Collections** - Markdown/MDX for products, news, case studies
- **Framer Motion** - Animations (React) or CSS View Transitions
- **Pagefind** - Search functionality

**Do NOT use:** jQuery, legacy CSS, WordPress-specific patterns

## Architecture & Site Structure

```
/                  # Home (Hero + 3 main entry points: To C, To B, AI)
/products/         # To C products (Popohu, Pitopa, Nubia 3D Pad)
/solutions/        # To B solutions (system dev, integration, infrastructure, RPA)
/ai                # AI Innovation Lab
/company           # About us, recruitment, contact, privacy policy
```

## Design System

**Typography:** Inter (sans-serif) for body, Cardo (serif) for headings/emphasis

**Colors:**
- Primary: Swiftechie brand blue
- Dark: Slate-900 (B2B backgrounds)
- Light: Slate-50 (B2C backgrounds)
- Accent: Amber-500 (CTA buttons)

**Components:**
- Navbar: Responsive, mobile hamburger menu
- Footer: Sitemap links, copyright, social icons
- Section: `py-16 px-4 max-w-7xl mx-auto` container pattern

## Development Commands

Once Astro is initialized:

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## Content Migration Strategy

When migrating from `legacy-data/www.swiftechie.com/`:

1. **Ignore all WordPress-specific classes/styles** (wp-block-library, elementor, etc.)
2. **Extract only semantic content:** `<p>`, `<h1>-<h6>`, `<ul>`, `<img>`
3. **Move images** from `wp-content/uploads/` to `public/assets/images/` with semantic names
4. **Convert product data** to Frontmatter YAML in `src/content/products/`

## Key Content Sources (Legacy)

**To C Products:** `popohu_mini`, `product_pitopa`, `nubia-3d-pad`
**To B Solutions:** `system_development`, `system_integration`, `infrastructure`, `rpa`
**AI:** `ai` directory
**Company:** `about`, `recruitment`, `contact`, `privacy_policy`

## Important Notes

- All content is in **Japanese** - preserve language during migration
- **No CSS files** - use Tailwind utilities only
- **Content Collections** replace database queries
- Images should be converted to WebP/AVIF using Astro `<Image />` component
- Contact form should use API routes or third-party service (e.g., Web3Forms)
