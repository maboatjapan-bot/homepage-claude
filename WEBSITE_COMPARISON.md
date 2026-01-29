# Website Comparison Report
## Old WordPress vs New Astro Website

**Date**: 2026-01-29
**Old Site**: www.swiftechie.com
**New Site**: https://main.d3572wh1uqcd5u.amplifyapp.com

---

## Executive Summary

This document provides a comprehensive comparison between the original WordPress site and the new Astro-based website. Each section identifies changes and recommends which version's approach is better.

---

## 1. Site Identity & Branding

### Company Name Display
| Aspect | Old Site | New Site | Recommendation |
|--------|----------|----------|----------------|
| Header Title | シーテック株式会社 (Japanese) | Swiftechie (English) | **New Site** - More international appeal |
| SEO Title | シーテック株式会社 - ITソリューションに変革 | Swiftechie - 技術で未来をつなぐ | **New Site** - Modern branding |

### Company Slogan
| Aspect | Old Site | New Site | Recommendation |
|--------|----------|----------|----------------|
| Main Slogan | 「脱昭和」 (Leave Showa Era) | 「技術で未来をつなぐ」 (Connecting Future with Technology) | **New Site** - More positive and forward-looking |
| Sub-hero | デジタルの力で未来を加速する。革新の一歩を共に。 | 最先端の AI 技術とプロフェッショナルなシステム開発で、ビジネスの可能性を広げます。 | **New Site** - Clearer value proposition |

### Logo
| Aspect | Old Site | New Site | Status |
|--------|----------|----------|--------|
| Logo Image | logo_white.png (820x901) | logo_white.png (820x901) | **Unified** - Same logo now used consistently |
| Logo Size | ~40px | 44px (w-11 h-11) | **New Site** - Slightly larger for better visibility |
| Browser Favicon | logo_white.png | logo_white.png | **Unified** - Fixed inconsistency |

**Logo Change Rationale**: The logo itself hasn't changed - we're using the same original logo (logo_white.png). The previous inconsistency was due to using different logo variants in different places (gradient SVG in footer, different sizes). Now all locations use the unified original logo for consistency.

---

## 2. Navigation Structure

### Desktop Navigation
| Old Site | New Site | Recommendation |
|----------|----------|----------------|
| ホーム | (Logo link) | **New Site** - Cleaner |
| 事業案入 ▼ | AIソリューション | **New Site** - More specific |
| 会社情報 | 製品 | **New Site** - Better organization |
| お知らせ | エンタープライズ | **New Site** - Clearer categorization |
| お問い合わせ | 会社情報 | **Same** |
| 採用情報 | (in CTA) | **Old Site** - More visible |

**Key Change**: Old site has dropdown menus under "事業案入", new site has flat navigation with dedicated sections. **New site is better** for clarity and modern design.

### Missing Navigation Items
- **「お知らせ」(News/Notices)**: MAJOR CONTENT LOSS - Old site has extensive dated news content
  - 年末年始休業のお知らせ (2025.12.08)
  - 「ポポフmini」発売開始のご案内 (2025.10.27)
  - 「ポポフmini」蔦屋家電＋にて展示開始のお知らせ (2025.9.19)
  - And more...

**Action Required**: Implement news section using Astro Content Collections

---

## 3. Hero Section

### Old Site Hero
- Traditional layout with multiple blob images
- Less focused messaging
- No statistics or social proof

### New Site Hero
| Feature | Description |
|---------|-------------|
| Headline | 「技術で 未来 を つなぐ」 |
| Subheadline | 最先端の AI 技術とプロフェッショナルなシステム開発で、ビジネスの可能性を広げます。 |
| CTAs | ソリューションを見る / 製品を見る |
| Statistics | 500+ companies, 98% satisfaction, 15 years, 24/7 support |
| Design | Modern gradient background (teal to blue) |

**Recommendation**: **New Site** - Modern, professional, with clear value proposition and social proof.

---

## 4. Main Content Sections

### 4.1 Core Technology Section
| Old Site | New Site | Recommendation |
|----------|----------|----------------|
| Three sections: システム開発, 製品/サービス, AIソリューション | Two sections: AI ソリューション, 製品・サービス | **Old Site** - More complete with system development |

**Missing from New Site**: Dedicated system development section (visible but could be more prominent)

### 4.2 Statistics Section
| Old Site | New Site | Recommendation |
|----------|----------|----------------|
| No statistics displayed | 500+ companies, 98% satisfaction, 15 years, 24/7 support | **New Site** - Builds trust |

### 4.3 CTA Section
| Old Site | New Site | Recommendation |
|----------|----------|----------------|
| 「まずはご相談ください」 | Same text, cleaner design | **New Site** - Better design |

---

## 5. News/Notices Section - CRITICAL CONTENT LOSS

### Old Site News Content
The old site has a comprehensive news section with date-based entries:

| Date | Title | Category |
|------|-------|----------|
| 2025.12.08 | 年末年始休業のお知らせ | お知らせ |
| 2025.10.27 | 「ポポフmini」発売開始のご案内 | お知らせ |
| 2025.9.19 | 「ポポフmini」蔦屋家電＋にて展示開始のお知らせ | お知らせ |

### New Site News Content
- Only 3 sample news articles in `/src/content/news/`
- No real company news or announcements

**Action Required**:
1. Migrate all news entries from old site to Astro Content Collections
2. Set up proper date-based news system
3. Add news section to main navigation or homepage

**Implementation**: Use Astro Content Collections at `/src/content/news/*.md`

---

## 6. Services/Pages Comparison

### System Development (システム開発)
| Old Site | New Site |
|----------|----------|
| Detailed description of custom development | Available in エンタープライズ section |
| 「作る過程を見える化」 | Less prominent |

### Products/Services (製品/サービス)
| Old Site | New Site |
|----------|----------|
| 「すぐに使える高品質な製品／サービス」 | Split into Consumer Products and Enterprise |
| 「身近なIT化で業務をスマート」 | Same message, better organized |

### AI Solutions (AIソリューション)
| Old Site | New Site |
|----------|----------|
| 「頼れる業務パートナー」 | Same concept, modern design |
| 「進化する言語処理型のAIソリューション」 | Highlighted as core technology |

---

## 7. Visual Assets

### Images
**Status**: NEEDS AUDIT
- Old site has multiple blob URLs (not directly accessible via webReader)
- New site uses public/assets directory structure
- Company photos on recruit page are present in both versions

### Videos
**Status**: NEEDS AUDIT
- Old site may have video content
- New site does not currently include video content

**Action Required**: Manual review of original site for image and video assets

---

## 8. Footer Comparison

### Old Site Footer
```
シーテック株式会社
〒104-0033
東京都中央区新川1-14-5金盃第3ビル7階
03-6222-8452（代表）

事業案入
  システムソリューション
  製品/サービス
  AIソリューション
会社情報
採用情報
プライバシーポリシー
Copyright (C) Swiftechie Co., Ltd. All Rights Reserved.
```

### New Site Footer
```
Swiftechie
技術で未来をつなぐ

AIソリューション
  AI 概要
  AI サービス
製品
  Popohu
  Pitopa
  Pitoshiyu
エンタープライズ
  システム開発
  システム集成
  インフラ
会社情報
  会社概要
  採用情報
  プライバシーポリシー
  お問い合わせ
© 2026 Swiftechie Co., Ltd. All rights reserved.
```

**Differences**:
- Old site shows full address and phone number
- New site has more detailed product/service links
- New site has better visual design

**Recommendation**: **Add address and phone to new site footer**

---

## 9. Search Functionality

### Current Status
| Component | Status |
|-----------|--------|
| Pagefind Version | 1.4.0 (installed and working) |
| Build Process | `npm run build:search` generates 18 pages, 997 Japanese words |
| Local Search | Works correctly |
| Deployed Search | **NOT WORKING** - pagefind-entry.json returns 403 Forbidden |

### Root Cause
The `pagefind-entry.json` file is being blocked (403 Forbidden) on AWS Amplify, preventing the search index from loading.

**Action Required**:
1. Check Amplify build settings for custom headers/redirects
2. Verify pagefind files are being deployed correctly
3. May need to add custom headers for JSON files in Amplify configuration

---

## 10. Performance & Technical

### Page Count
- Old site: Unknown (WordPress dynamic)
- New site: 18 static pages

### Performance
- New site uses Astro 5.16.15 for optimal performance
- Static site generation for fast loading
- View Transitions API for smooth page transitions
- Sharp image optimization service
- Lazy loading for images

### Build Tools
- Astro 5.16.15
- Tailwind CSS
- Pagefind 1.4.0 for search
- Swiper.js for photo carousels

---

## 11. Design & UX

### Color Scheme
| Old Site | New Site |
|----------|----------|
| Traditional corporate colors | Brand teal (#0d9488) and brand blue gradients |
| Less visual hierarchy | Modern gradient backgrounds |

### Typography
- Both sites use Noto Sans JP for Japanese text
- New site adds Inter for English text
- Better font weight hierarchy in new site

### Animations
- Old site: Animate.css plugin
- New site: Custom FadeIn, ScaleIn, SlideIn components
- Smoother, more performant animations in new site

### Responsiveness
- Both sites are mobile-responsive
- New site has more polished mobile menu with search integration

---

## 12. Content Gaps Summary

### High Priority Missing Content
1. **News/Notices Section** - Complete migration of all dated news entries
2. **Company Address & Phone** - Add to footer
3. **System Development prominence** - Make more visible on homepage

### Medium Priority
1. Video content (if exists on old site)
2. Additional images from old site
3. More detailed case studies (if exist)

### Low Priority
1. 「採用情報」link in main navigation (currently only in footer/CTA)

---

## 13. Action Items

### Immediate (Required)
- [ ] Fix search functionality on Amplify (pagefind-entry.json 403 error)
- [ ] Migrate all news entries to Astro Content Collections
- [ ] Add company address and phone to footer
- [ ] Add 「お知らせ」(News) section to navigation

### Short Term (Recommended)
- [ ] Make system development more prominent on homepage
- [ ] Audit and migrate missing images/videos from old site
- [ ] Consider adding 「採用情報」to main navigation

### Long Term (Optional)
- [ ] Add more detailed case studies
- [ ] Implement blog functionality
- [ ] Add multi-language support (English/Japanese)

---

## 14. Conclusion

### Overall Assessment
The new Astro site represents a significant modernization with:
- ✅ Better performance and SEO
- ✅ Cleaner, more professional design
- ✅ Better mobile experience
- ✅ Improved content organization

### Critical Issues to Address
- ❌ Search not working on deployed site
- ❌ Missing comprehensive news/notice content
- ❌ Missing company contact info in footer

### Recommendation
**Proceed with new site** after addressing the critical issues above. The design and performance improvements are substantial, and the missing content can be migrated systematically.
