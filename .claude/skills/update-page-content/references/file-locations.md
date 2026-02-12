# Page File Locations Reference

## Core Pages

| ページ名 / Page | ファイルパス / File Path |
|----------------|----------------------|
| ホーム / Home | `src/pages/index.astro` |
| 会社概要 / Company | `src/pages/company.astro` |
| お問い合わせ / Contact | `src/pages/contact.astro` |
| 採用情報 / Recruit | `src/pages/recruit.astro` |
| プライバシーポリシー / Privacy | `src/pages/privacy.astro` |
| AIページ / AI | `src/pages/ai.astro` |

## Product Pages

| 製品名 / Product | ファイルパス / File Path |
|----------------|----------------------|
| Popohu | `src/pages/products/popohu.astro` |
| Popohu Mini | `src/pages/products/popohu-mini.astro` |
| Popohu Mini Lite 5 | `src/pages/products/popohu-minilite5.astro` |
| Pitopa | `src/pages/products/pitopa.astro` |
| Pitoshiyu | `src/pages/products/pitoshiyu.astro` |

## Solution Pages

| ソリューション / Solution | ファイルパス / File Path |
|-------------------------|----------------------|
| システム開発 / System Development | `src/pages/solutions/system-development.astro` |
| システム運用保守 / System Operation | `src/pages/solutions/system-operation.astro` |
| インフラ / Infrastructure | `src/pages/solutions/infrastructure.astro` |
| Nubia 3D Pad | `src/pages/solutions/nubia-3d-pad.astro` |

## Index Pages

| ページ名 / Page | ファイルパス / File Path |
|----------------|----------------------|
| 製品一覧 / Products Index | `src/pages/products/index.astro` |
| ソリューション一覧 / Solutions Index | `src/pages/solutions/index.astro` |
| ニュース一覧 / News Index | `src/pages/news/index.astro` |

## Content Structure

### Standard .astro Page Structure

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import FadeIn from '../../components/FadeIn.astro';
// ... other imports
---

<BaseLayout>
  <Header />

  <!-- Hero Section -->
  <section class="pt-20 pb-16 px-6 bg-white">
    <!-- Hero content -->
  </section>

  <!-- Content Sections -->
  <section class="py-20 px-6 bg-white">
    <!-- Section content -->
  </section>

  <!-- CTA Section -->
  <section class="py-20 px-6 bg-gradient-to-br from-brand-teal to-brand-blue">
    <!-- CTA content -->
  </section>

  <Footer />
</BaseLayout>
```

### Common Section Identifiers

When editing, look for these HTML comments:

```astro
<!-- Hero Section -->
<!-- Features Section -->
<!-- Specifications Section -->
<!-- Use Cases Section -->
<!-- CTA Section -->
<!-- About Section -->
<!-- Services Section -->
<!-- Contact Section -->
```

## Image Locations

### Product Images
```
/public/wp-content/uploads/2025/01/
/public/wp-content/uploads/2024/11/
/public/wp-content/uploads/2024/10/
```

### Company Images
```
/public/wp-content/uploads/2024/10/ (company photos)
```

## Component Locations

| コンポーネント / Component | ファイルパス / File Path |
|-------------------------|----------------------|
| BaseLayout | `src/layouts/BaseLayout.astro` |
| Header | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| FadeIn | `src/components/FadeIn.astro` |
| ScaleIn | `src/components/ScaleIn.astro` |
| SlideIn | `src/components/SlideIn.astro` |

## Sitemap Location

```
src/pages/sitemap.xml.ts
```

## RSS Feed Location (if applicable)

```
src/pages/rss.xml.js
```
