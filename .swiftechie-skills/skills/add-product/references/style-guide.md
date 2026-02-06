# Product Page Style Guide

## Color Scheme

### Primary Colors
```css
/* Text Colors */
text-slate-900    /* Main headings - #0f172a */
text-slate-700    /* Body text - #334155 */
text-slate-600    /* Secondary text - #475569 */

/* Brand Colors */
text-brand-teal   /* Accent text - #0d9488 */
bg-brand-teal     /* Accent background - #0d9488 */
text-brand-blue   /* Secondary accent - #1e40af */
bg-brand-blue     /* Secondary background - #1e40af */

/* Button Colors */
bg-slate-800      /* Primary button - #1e293b */
hover:bg-slate-700 /* Primary button hover - #334155 */
```

### Background Colors
```css
bg-white          /* Main sections */
bg-slate-50       /* Alternate sections - #f8fafc */
```

## Component Structure

### Standard Page Layout
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import FadeIn from '../../components/FadeIn.astro';
import ScaleIn from '../../components/ScaleIn.astro';
import SlideIn from '../../components/SlideIn.astro';
---

<BaseLayout>
  <Header />

  <!-- Hero Section -->
  <section class="pt-20 pb-16 px-6 bg-white">
    <!-- Hero content -->
  </section>

  <!-- Features Section -->
  <section class="py-20 px-6 bg-white">
    <!-- Features content -->
  </section>

  <!-- Specifications Section -->
  <section class="py-16 px-6 bg-slate-50">
    <!-- Specs content -->
  </section>

  <!-- Use Cases Section -->
  <section class="py-20 px-6 bg-white">
    <!-- Use cases content -->
  </section>

  <!-- CTA Section -->
  <section class="py-20 px-6 bg-gradient-to-br from-brand-teal to-brand-blue text-white">
    <!-- CTA content -->
  </section>

  <Footer />
</BaseLayout>
```

## Section Patterns

### Hero Section
```astro
<section class="pt-20 pb-16 px-6 bg-white">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col lg:flex-row items-center gap-12">
      <div class="lg:w-1/2">
        <h3 class="text-xl md:text-2xl font-bold mb-4">
          <!-- Headline -->
        </h3>
        <p class="text-slate-700 leading-relaxed mb-4">
          <!-- Description -->
        </p>
        <div class="flex flex-wrap gap-4 pt-2">
          <a href="/download-link" class="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition">
            資料をダウンロード
          </a>
          <a href="/contact" class="border border-slate-300 hover:border-brand-teal text-slate-700 hover:text-brand-teal px-6 py-3 rounded-lg font-medium transition">
            お問合せ・導入相談
          </a>
        </div>
      </div>
      <div class="lg:w-1/2">
        <div class="overflow-hidden rounded-2xl shadow-xl">
          <img src="/path/to/image" alt="..." class="w-full h-auto object-cover" />
        </div>
      </div>
    </div>
  </div>
</section>
```

### Feature Card
```astro
<div class="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
  <div class="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center mb-6">
    <!-- Icon -->
  </div>
  <h3 class="text-xl font-semibold mb-3 text-slate-900">
    <!-- Feature title -->
  </h3>
  <p class="text-slate-600 leading-relaxed">
    <!-- Feature description -->
  </p>
</div>
```

### CTA Section
```astro
<section class="py-20 px-6 bg-gradient-to-br from-brand-teal to-brand-blue text-white relative overflow-hidden">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
      <!-- CTA headline -->
    </h2>
    <p class="text-xl text-white/90 mb-10">
      <!-- CTA description -->
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/contact" class="inline-flex px-10 py-5 bg-white hover:bg-slate-50 text-slate-900 text-lg font-semibold rounded-full transition-all shadow-2xl">
        お問い合わせ
      </a>
    </div>
  </div>
</section>
```

## Typography

### Headings
- **H1**: `text-4xl sm:text-5xl md:text-6xl font-bold`
- **H2**: `text-3xl sm:text-4xl font-bold`
- **H3**: `text-xl font-semibold` or `text-2xl font-bold`

### Body Text
- **Primary**: `text-slate-700 leading-relaxed`
- **Secondary**: `text-slate-600 leading-relaxed`

## Spacing

- **Section padding**: `py-16 px-6` or `py-20 px-6`
- **Container**: `max-w-7xl mx-auto` or `max-w-4xl mx-auto`
- **Gap**: `gap-12` for sections, `gap-8` for cards

## Animation Usage

```astro
<FadeIn>
  <!-- Section content -->
</FadeIn>

<ScaleIn delay={0} from={0.9}>
  <!-- Card content -->
</ScaleIn>

<SlideIn direction="left">
  <!-- Hero content -->
</SlideIn>
```

## Image Paths

Images should be stored in:
```
/public/wp-content/uploads/YYYY/MM/
```

Reference format:
```astro
<img src="/wp-content/uploads/2025/01/image-name.jpg" alt="..." />
```

## Required Elements Checklist

- [ ] Hero section with main image and description
- [ ] Features section (3-4 key features)
- [ ] Specifications table or list
- [ ] Use cases section with images
- [ ] CTA section (contact/download)
- [ ] Consistent color scheme (slate + brand-teal)
- [ ] Proper animations on sections
- [ ] Responsive design (mobile-first)
- [ ] Proper alt text for images
